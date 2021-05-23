---
layout: post
title:  Go自定义MarshalJSON方法
date:   2021-05-23 17:30:00 +0800
---

在 Go 中，JSON 的序列化和反序列化并不总是能够很好满足我们的需求。例如有如下结构：

```json
{
	"interval": "5s"
}
```

我们可以定义相应的 struct 如下：

```go
type struct Task {
	Interval string `json:"interval"`
}
```

在这种情况下，如果我们希望将 `Interval` 字段作为 `time.Duration` 来使用，就不得不每次都做一次转换，比较麻烦。通过自定义 `MarshalJSON` 和 `UnmarshalJSON` 可以自动处理类似情况。示例如下：

```go
package main

import (
	"encoding/json"
	"fmt"
	"time"
)

type Duration time.Duration

type Task struct {
	Interval Duration `json:"interval"`
}

func (d *Duration) MarshalJSON() ([]byte, error) {
	s := fmt.Sprintf("%q", time.Duration(*d).String())
	return []byte(s), nil
}

func (d *Duration) UnmarshalJSON(b []byte) error {
	var s string
	if err := json.Unmarshal(b, &s); err != nil {
		return err
	}

	if len(s) == 0 {
		*d = Duration(0)
		return nil
	}

	t, err := time.ParseDuration(s)
	if err != nil {
		return err
	}

	*d = Duration(t)
	return nil
}

func main() {
	t1 := &Task{
		Interval: Duration(time.Duration(time.Second * 5)),
	}
	b, _ := json.Marshal(t1)
	fmt.Println(string(b))
	// {"interval":"5s"}

	var t2 Task
	json.Unmarshal([]byte(`{"interval":"10m"}`), &t2)
	fmt.Println(t2.Interval)
	// 600000000000
}
```