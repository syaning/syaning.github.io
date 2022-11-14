# 函数

## 语句和表达式

- 语句（statement）：执行一些操作但不返回值
- 表达式（expression）：计算并产生一个值
- Rust是一门基于表达式的语言

```rust
fn main() {
    // 赋值语句，不返回值
    // 因此 let x = (let y = 6); 会编译错误
    let x = 6;

    // 3 * 2 是一个表达式，返回一个值
    let y = 3 * 2;

    // {} 也是表达式
    let z = {
        let a = 3;
        a * 2
    };

    println!("{} {} {}", x, y, z);
}
```

> 特别注意：
> - `3 + 2` 是一个表达式，返回一个值为 `5`
> - `3 + 2;` 是一个语句，没有返回值

## 参数

- 参数必须指定类型

```rust
fn add(a: i32, b: i32) {
    println!("{} + {} = {}", a, b, a + b);
}

fn main() {
    add(2, 3);
}
```

## 返回值

- 函数签名使用 `->` 指定返回值类型
- 如果返回值有多个，可以返回一个 tuple
- 函数的返回值等同于函数体最后一个表达式的值
- 使用 `return` 和值，可以提前返回

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn divmod(a: i32, b: i32) -> (i32, i32) {
    (a / b, a % b)
}

fn max(a: i32, b: i32) -> i32 {
    if a >= b {
       return a;
    }
    return b;
}

fn main() {
    let a = 3;
    let b = 2;
    let sum = add(a, b);
    let (div, modulo) = divmod(a, b);
    let m = max(a, b);
    println!("{} + {} = {}", a, b, sum);    // 3 + 2 = 5
    println!("{} / {} = {}", a, b, div);    // 3 / 2 = 1
    println!("{} % {} = {}", a, b, modulo); // 3 % 2 = 1
    println!("max({}, {}) = {}", a, b, m);  // max(3, 2) = 3
}
```

例如下面例子，由于 `a + b;` 是一个语句，因此 `add` 函数并没有 `i32` 类型的返回值，从而导致编译报错：

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b;
}

fn main() {
    let a = 3;
    let b = 2;
    let sum = add(a, b);
    println!("{} + {} = {}", a, b, sum);
}
```

实际上返回值是 unit value：

```rust
fn add(a: i32, b: i32) {
    a + b;
}

fn main() {
    let a = 3;
    let b = 2;
    let sum = add(a, b);
    println!("{} + {} = {:?}", a, b, sum); // 3 + 2 = ()
}
```