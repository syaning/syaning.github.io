# Ownership

## GC

Rust 无 GC，通过所有权来管理内存。

## 所有权规则

- Rust 中的每一个值都有一个被称为其 所有者（owner）的变量。
- 值在任一时刻有且只有一个所有者。
- 当所有者（变量）离开作用域，这个值将被丢弃。
- 当变量离开作用域时，Rust 会自动调用一个 `drop` 函数，进行内存释放。

```rust
{
    let s = String::from("hello"); // 从此处起，s 是有效的

    // 使用 s
}                                  // 此作用域已结束，
                                   // s 不再有效
```

## 数据交互

- 移动：在使用 `let y = x` 的时候，所有权会发生转移，称之为移动
- 拷贝：分配在栈上的数据，会发生拷贝，而不是所有权转移；分配在堆上的数据会发生所有权转移
- 克隆：如果不希望所有权转移（即需要深复制），需要使用 `clone` 函数

```rust
fn main() {
    let x = 5;
    let y = x;
    println!("x = {}, y = {}", x, y);

    // 字符串字面量分配在栈上，会发生拷贝
    let s1 = "hello";
    let s2 = s1;
    println!("s1 = {}, s2 = {}", s1, s2);
}
```

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;
    println!("s1 = {}, s2 = {}", s1, s2);
}
```

会发生如下报错：

```
error[E0382]: borrow of moved value: `s1`
 --> src/main.rs:4:34
  |
2 |     let s1 = String::from("hello");
  |         -- move occurs because `s1` has type `String`, which does not implement the `Copy` trait
3 |     let s2 = s1;
  |              -- value moved here
4 |     println!("s1 = {}, s2 = {}", s1, s2);
  |                                  ^^ value borrowed here after move
```

`Copy` trait 可以用在存储在栈上的数据类型上，例如整数。如果一个类型拥有 `Copy` trait，一个旧的变量在将其赋值给其他变量后仍然可用。Rust 不允许自身或其任何部分实现了 `Drop` trait 的类型使用 `Copy` trait。

以下类型默认有 `Copy` trait:

- 所有整数类型
- 所有浮点数类型
- 布尔类型
- 字符类型，`char`
- 元组，当且仅当其包含的类型也都是 `Copy` 的时候。比如，`(i32, i32)` 是 Copy 的，但 `(i32, String)` 就不是。

## 函数调用与所有权

函数调用以及返回也会转移所有权，例如：

```rust
fn calculate_length(s: String) {
    println!("{}", s.len());
}

fn main() {
    let s1 = String::from("hello");
    calculate_length(s1); // s1 的所有权转移到 calculate_length 函数中 
    println!("{}", s1);
}
```

报错：

```
--> src/main.rs:8:20
  |
6 |     let s1 = String::from("hello");
  |         -- move occurs because `s1` has type `String`, which does not implement the `Copy` trait
7 |     calculate_length(s1);
  |                      -- value moved here
8 |     println!("{}", s1);
  |                    ^^ value borrowed here after move
```

需要改成如下：

```rust
fn calculate_length(s: String) -> String {
    println!("{}", s.len());
    s
}

fn main() {
    let s1 = String::from("hello");
    let s2 = calculate_length(s1);
    println!("{}", s2);
}
```