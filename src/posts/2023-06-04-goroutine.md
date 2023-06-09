---
layout: post
title:  Goroutine的一些使用技巧
date:   2023-06-09 22:00:00 +0800
---

## 等待第一个goroutine结束

- 创建一个channel，多个goroutine向这个channel中写入数据。
- 只要channel可以读出数据，就返回。
- 注意channel需要带缓冲，避免阻塞goroutine。

```go{16,20,23}
package main

import (
  "fmt"
  "os"
  "time"
)

func startWorker(i int) {
  fmt.Fprintf(os.Stdout, "[worker-%d] start\n", i)
  time.Sleep(time.Duration(i) * time.Second)
  fmt.Fprintf(os.Stdout, "[worker-%d] end\n", i)
}

func main() {
  var ch = make(chan struct{}, 3)
  for i := 1; i <= 3; i++ {
    go func(i int) {
      startWorker(i)
      ch <- struct{}{}
    }(i)
  }
  <-ch

  fmt.Println("First done")
}
```

## 等待所有goroutine结束

使用`sync.WaitGroup`可以等待多个goroutine结束后再继续向下执行。这里需要注意：
- `wg.Add(1)`必须在goroutine之前调用，而不能放在goroutine中，否则就无法保证`wg.Add(1)`在`wg.Wait()`之前调用。
- `wg.Done()`等同于`wg.Add(-1)`。

```go{17,19,21,25}
package main

import (
  "fmt"
  "os"
  "sync"
  "time"
)

func startWorker(i int) {
  fmt.Fprintf(os.Stdout, "[worker-%d] start\n", i)
  time.Sleep(time.Duration(i) * time.Second)
  fmt.Fprintf(os.Stdout, "[worker-%d] end\n", i)
}

func main() {
  var wg sync.WaitGroup
  for i := 1; i <= 3; i++ {
    wg.Add(1)
    go func(i int) {
      defer wg.Done()
      startWorker(i)
    }(i)
  }
  wg.Wait()

  fmt.Println("All done")
}
```

效果类似于自己使用channel来处理：

```go{16,20,24-26}
package main

import (
  "fmt"
  "os"
  "time"
)

func startWorker(i int) {
  fmt.Fprintf(os.Stdout, "[worker-%d] start\n", i)
  time.Sleep(time.Duration(i) * time.Second)
  fmt.Fprintf(os.Stdout, "[worker-%d] end\n", i)
}

func main() {
  var ch = make(chan struct{}, 3)
  for i := 1; i <= 3; i++ {
    go func(i int) {
      startWorker(i)
      ch <- struct{}{}
    }(i)
  }

  for i := 0; i < 3; i++ {
    <-ch
  }
  fmt.Println("First done")
}
```

## 限制goroutine最大并发数

### 固定channel

- 使用一个固定长度的channel，只有正常向channel中写入消息才能够新建goroutine，否则会被阻塞。
- 执行结束后，从channel中取出一条消息，释放缓冲区。

```go{19,23,26}
package main

import (
  "fmt"
  "os"
  "sync"
  "time"
)

func startWorker(i int) {
  fmt.Fprintf(os.Stdout, "[worker-%d] start\n", i)
  time.Sleep(time.Second)
  fmt.Fprintf(os.Stdout, "[worker-%d] end\n", i)
}

func main() {
  var (
    wg sync.WaitGroup
    ch = make(chan struct{}, 3)
  )

  for i := 0; i < 10; i++ {
    ch <- struct{}{}
    go func(i int) {
      startWorker(i)
      <-ch
    }(i)
  }

  wg.Wait()
  fmt.Println("All done")
}
```

### 固定goroutine数量

- 启动固定个数的goroutine。
- 每个goroutine不断地获取任务（例如从channel中获取）并执行。
- 当所有任务被处理完后，退出goroutine。

```go{28,30,32-37}
package main

import (
  "fmt"
  "os"
  "sync"
  "time"
)

func startWorker(i int, n int) {
  time.Sleep(time.Second)
  fmt.Fprintf(os.Stdout, "[worker-%d] n=%d\n", i, n)
}

func main() {
  var (
    wg sync.WaitGroup
    ch = make(chan int, 10)
  )

  go func() {
    for i := 0; i < 10; i++ {
      ch <- i
    }
    close(ch)
  }()

  for i := 0; i < 3; i++ {
    wg.Add(1)
    go func(i int) {
      defer wg.Done()
      for {
        if n, ok := <-ch; ok {
          startWorker(i, n)
        } else {
          break
        }
      }
    }(i)
  }

  wg.Wait()
  fmt.Println("All done")
}
```

## 控制goroutine结束

### 控制单个goroutine结束

- 通过channel向worker传递结束信号（即执行`cancel`函数，会导致`ctx.Done()`有返回值）。
- 当worker收到结束信号后，执行清理操作。
- 主goroutine等待worker的结束信号（`worker.done`)，从而实现优雅退出。

```go{24,28,45,46}
package main

import (
  "context"
  "fmt"
  "os"
  "os/signal"
  "syscall"
  "time"
)

type Worker struct {
  id   int
  ctx  context.Context
  done chan struct{}
}

func (w *Worker) Run() {
  ticker := time.NewTicker(time.Second)
  defer ticker.Stop()

  for {
    select {
    case <-w.ctx.Done(): // 2. 接收到停止信号
      fmt.Fprintf(os.Stdout, "[worker-%d] stop...\n", w.id)
      time.Sleep(time.Second)
      fmt.Fprintf(os.Stdout, "[worker-%d] done\n", w.id)
      close(w.done) // 3. worker结束
      return
    case <-ticker.C:
      fmt.Fprintf(os.Stdout, "[worker-%d] tick\n", w.id)
    }
  }
}

func main() {
  ctx, cancel := context.WithCancel(context.Background())
  worker := &Worker{
    id:   0,
    ctx:  ctx,
    done: make(chan struct{}),
  }

  defer func() {
    cancel()      // 1. 发送停止信号
    <-worker.done // 4. 等待worker结束
    fmt.Println("All done")
  }()

  go worker.Run()

  term := make(chan os.Signal)
  signal.Notify(term, syscall.SIGINT, syscall.SIGTERM)

  for {
    select {
    case <-term:
      fmt.Println("Stop...")
      return
    }
  }
}
```

### 控制一组goroutine结束

```go
package main

import (
  "context"
  "fmt"
  "os"
  "os/signal"
  "sync"
  "syscall"
  "time"
)

type (
  Worker struct {
    id   int
    ctx  context.Context
    done chan struct{}
  }

  Manager struct {
    ctx    context.Context
    cancel context.CancelFunc
    done   chan struct{}
  }
)

func (w *Worker) Run() {
  ticker := time.NewTicker(time.Second)
  defer ticker.Stop()

  for {
    select {
    case <-w.ctx.Done(): // 2. worker接收到停止信号
      fmt.Fprintf(os.Stdout, "[worker-%d] stop...\n", w.id)
      time.Sleep(time.Second)
      fmt.Fprintf(os.Stdout, "[worker-%d] done\n", w.id)
      close(w.done) // 3. worker结束
      return
    case <-ticker.C:
      fmt.Fprintf(os.Stdout, "[worker-%d] tick\n", w.id)
    }
  }
}

func NewWorker(id int, ctx context.Context) *Worker {
  return &Worker{
    id:   id,
    ctx:  ctx,
    done: make(chan struct{}),
  }
}

func NewManager() *Manager {
  ctx, cancel := context.WithCancel(context.Background())
  return &Manager{
    ctx:    ctx,
    cancel: cancel,
    done:   make(chan struct{}),
  }
}

func (m *Manager) Run() {
  var wg sync.WaitGroup

  for i := 0; i < 3; i++ {
    wg.Add(1)
    go func(i int) {
      worker := NewWorker(i, m.ctx)
      worker.Run()
      <-worker.done // 4. 等待worker结束
      wg.Done()
    }(i)
  }

  wg.Wait()     // 5. 等待所有worker结束
  close(m.done) // 6. 标记manager停止
}

func (m *Manager) Stop() {
  m.cancel() // 1. manager发出停止信号
  <-m.done   // 7. 等待manager停止
  fmt.Println("[Manager] done")
}

func main() {
  manager := NewManager()
  go manager.Run()
  defer manager.Stop()

  term := make(chan os.Signal)
  signal.Notify(term, syscall.SIGINT, syscall.SIGTERM)

  for {
    select {
    case <-term:
      fmt.Println("Stop...")
      return
    }
  }
}
```