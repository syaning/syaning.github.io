# String

## &str

- `str` 是字符串 slice，通常使用的是引用 `&str`
- 字符串字面量即此类型，`&'static str`
- 由于是不可变引用，因此不可修改

```rust
fn main() {
    let s1 = "Hello, world!";

    // with an explicit type annotation
    let s2: &'static str = "Hello, world!";

    println!("{}, {}", s1, s2);
}
```

## String

- 可变字符串
- `String::new()` 创建空字符串
- `String::from("hello")` 从字符串字面量创建字符串
- `"hello".to_string()` 将字符串字面量转为字符串
- `s1.push_str(s2)` 添加字符串
- `s1.push(c)` 添加单个字符

```rust
fn main() {
    let mut s1 = String::new();
    s1.push_str("hello");
    println!("{}", s1); // hello

    let s2 = String::from("hello");
    println!("{}", s2); // hello

    let mut s3 = "hell".to_string();
    s3.push('o');
    println!("{}", s3);
}
```
