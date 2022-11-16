# Vector

- `Vec<T>` 为 vector，只能存储相同类型的值
- 新建：
  - `Vec::new()`
  - `vec![]`
- 添加：`v.push(item)`
- 获取元素：
  - `&v[index]`，下标不存在会 panic
  - `v.get(index)`，下标不存在返回 `None`
- 遍历：
  - `for i in &v`
  - `for i in &mut v`

```rust
fn main() {
    let mut v1 = Vec::new();
    v1.push(1);
    v1.push(2);
    v1.push(3);
    for i in &v1 {
        println!("{}", i); // 1 2 3
    }

    let mut v2 = vec![1, 2, 3];
    for i in &mut v2 {
        *i *= 2;
        println!("{}", i); // 2 4 6
    }

    println!("{}", &v2[2]);      // 6
    println!("{:?}", v2.get(3)); // None
}
```
