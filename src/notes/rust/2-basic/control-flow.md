# 控制流

## If

- `if`
- `let` 可以使用 `if` 达到三元表达式的效果

```rust
fn main() {
    let x = 3;
    let y = 5;

    if x > y {
        println!("x > y");
    } else if x < y {
        println!("x < y");
    } else {
    	println!("x == y");
    }

    let z = if x > y {
        x
    } else {
        y
    };
    println!("{}", z); // 5
}
```

## 循环

### loop

- `loop` 无限循环
- 通过 `break` 跳出
- 嵌套情况下可以指定标签，标签格式为 `'label`，`break` 可以选择跳出哪一层循环
- `break` 后跟一个值，可以从循环返回值

```rust
#![allow(unused_labels)]

fn main() {
    'outer: loop {
        println!("Enter outer loop");

        'inner: loop {
            println!("Enter inner loop");
            break 'outer;
        }
    }

    let mut count = 0;
    let result = loop {
        count += 1;
        if count == 10 {
            break count * 2;
        }
    };
    println!("{}", result); // 20
}
```

### while

```rust
fn main() {
    let mut count = 0;
    while count < 10 {
        count += 1;
    }
    println!("{}", count); // 10
}
```

### for

- 遍历数组：`for x in arr.iter()`
- 生成序列：`for i in 1..10`（左闭右开）

```rust
fn main() {
    let a = [1, 2, 3];
    for i in a.iter() {
        println!("{}", i);
    }

    for i in 1..4 {
        println!("{}", i);
    }

    for i in (1..4).rev() {
        println!("{}", i);
    }
}
```