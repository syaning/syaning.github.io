# 变量和常量

## 变量

- 使用 `let` 声明变量，变量默认不可变
- 使用 `let mut` 声明可变变量
- 使用 `let x: i32 = 5` 可以显式指定类型
- 命名风格：`snake_case`
- 建议：
	- 较大的数据结构，适当使用可变变量，有利于性能
	- 较小的数据结构，使用不可变变量，总是创建新实例，增强可读性

```rust
fn main() {
    let x = 5;
    println!("{}", x); // 5

    let mut y = 5;
    println!("{}", y); // 5
    
    y = 6;
    println!("{}", y); // 6

    let z: i32 = 5;
    println!("{}", x); // 5
}
```

## 常量

- 使用 `const` 声明，且必须指定类型
- 命名风格：`SNAKE_CASE`

```rust
fn main() {
    const HOUR_IN_SECONDS: u32 = 3600;
    println!("{}", HOUR_IN_SECONDS); // 3600
}
```

## Shadowing

- `let` 多次声明
- 可以改变值，也可以改变类型

```rust
fn main() {
    let x = 5;
    let x = x + 1;
    println!("{}", x); // 6

    {
        let x = x * 2;
        println!("{}", x); // 12
    }

    println!("{}", x); // 6

    let x = "hello";
    println!("{}", x); // hello
}
```