# Slice

- `[start_index..end_index]` 来获取slice，其中 `start_index` 和 `end_index` 可省略
- 字符串字面量是一个 slice `&str`，是一个不可变引用

```rust
fn main() {
    let s = String::from("hello world");
    let s1 = &s[0..5];
    let s2 = &s[6..];
    println!("{} {}", s1, s2); // hello world
}
```