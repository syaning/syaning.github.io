# Methood

- 使用 `impl`
- 方法第一个参数为：
  - `&self`：不可变引用
  - `&mut self`：可变引用
  - `self`：获取所有权，很少使用

```rust
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn resize(&mut self, scale: u32) {
        self.width *= scale;
        self.height *= scale;
    }
}

fn main() {
    let mut rect = Rectangle {
        width: 30,
        height: 30,
    };
    println!("area is {}", rect.area()); // area is 900

    rect.resize(2);
    println!("area is {}", rect.area()); // area is 3600
}
```

方法名和字段名可以相同，在不同的使用场景下会被自动识别是方法还是字段：

```rust
impl Rectangle {
    fn width(&self) -> bool {
        self.width > 0
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    if rect1.width() {
        println!("The rectangle has a nonzero width; it is {}", rect1.width);
    }
}
```

允许有多个 `impl` 块，例如：

```rust
impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

impl Rectangle {
    fn resize(&mut self, scale: u32) {
        self.width *= scale;
        self.height *= scale;
    }
}
```

如果函数的第一个参数不是 `self`，可以起到类似静态函数的作用，需要使用 `::` 语法来调用。常用来作为构造函数来使用，`String::from` 就是类似的函数。例如：

```rust
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn square(size: u32) -> Rectangle {
        Rectangle {
            width: size,
            height: size,
        }
    }

    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn resize(&mut self, scale: u32) {
        self.width *= scale;
        self.height *= scale;
    }
}

fn main() {
    let mut rect = Rectangle::square(30);
    println!("area is {}", rect.area()); // area is 900

    rect.resize(2);
    println!("area is {}", rect.area()); // area is 3600

}
```
