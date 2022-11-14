# 引用和借用

## 引用

- `&` 进行引用（reference），`*` 进行解引用
- 获取引用作为函数参数称为借用（borrowing）
- 借用是不可变的

```rust
// s 只是对 s1 的引用，并不拥有 s1 的所有权
fn calculate_length(s: &String) {
    println!("{}", s.len());
}

fn main() {
    let s1 = String::from("hello");
    calculate_length(&s1);
    println!("{}", s1);
}
```

尝试修改借用会报错：

```rust
fn main() {
    let s = String::from("hello");
    change(&s);
}

fn change(s: &String) {
    s.push_str(", world");
}
```

```
error[E0596]: cannot borrow `*s` as mutable, as it is behind a `&` reference
 --> src/main.rs:8:5
  |
7 | fn change(s: &String) {
  |              ------- help: consider changing this to be a mutable reference: `&mut String`
8 |     s.push_str(", world");
  |     ^ `s` is a `&` reference, so the data it refers to cannot be borrowed as mutable
```

## 可变引用

- 变量必须为 `mut`
- `&mut` 为可变引用

```rust
fn main() {
    let mut s = String::from("hello");
    change(&mut s);
}

fn change(s: &mut String) {
    s.push_str(", world");
}
```

- 不能同时（即同一个作用域中）拥有多个可变引用，从而有效防止数据竞争

```rust
fn main() {
    let mut s = String::from("hello");

    let r1 = &mut s;
    let r2 = &mut s;

    println!("{}, {}", r1, r2);
}
```

```
error[E0499]: cannot borrow `s` as mutable more than once at a time
 --> src/main.rs:5:14
  |
4 |     let r1 = &mut s;
  |              ------ first mutable borrow occurs here
5 |     let r2 = &mut s;
  |              ^^^^^^ second mutable borrow occurs here
6 |
7 |     println!("{}, {}", r1, r2);
  |                        -- first borrow later used here
```

- 不能同时拥有引用和可变引用

```rust
fn main() {
    let mut s = String::from("hello");

    let r1 = &s;
    let r2 = &mut s;

    println!("{}, {}", r1, r2);
}
```

```
error[E0502]: cannot borrow `s` as mutable because it is also borrowed as immutable
 --> src/main.rs:5:14
  |
4 |     let r1 = &s;
  |              -- immutable borrow occurs here
5 |     let r2 = &mut s;
  |              ^^^^^^ mutable borrow occurs here
6 |
7 |     println!("{}, {}", r1, r2);
  |                        -- immutable borrow later used here
```

- 引用的作用域从声明的地方开始一直持续到最后一次使用为止。例如，因为最后一次使用不可变引用在声明可变引用之前，所以如下代码没有问题

```rust
fn main() {
    let mut s = String::from("hello");

    let r1 = &s;
    println!("{}", r1); // hello
    
    let r2 = &mut s;
    println!("{}", r2); // hello
}
```

## 悬垂引用

- Rust 编译时会避免出现悬垂引用（Dangling References）

```rust
fn main() {
    let reference_to_nothing = dangle();
}

fn dangle() -> &String {
    let s = String::from("hello");

    &s
}
```

```
error[E0106]: missing lifetime specifier
 --> src/main.rs:5:16
  |
5 | fn dangle() -> &String {
  |                ^ expected named lifetime parameter
  |
  = help: this function's return type contains a borrowed value, but there is no value for it to be borrowed from
help: consider using the `'static` lifetime
  |
5 | fn dangle() -> &'static String {
  |                ^^^^^^^^
```

分析如下：

```
fn dangle() -> &String { // dangle 返回一个字符串的引用

    let s = String::from("hello"); // s 是一个新字符串

    &s // 返回字符串 s 的引用
} // 这里 s 离开作用域并被丢弃。其内存被释放。
```