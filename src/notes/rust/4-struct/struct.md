# Struct

## 定义

```rust
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}
```

## 创建

```rust
let user = User {
    email: String::from("username@example.com"),
    username: String::from("username"),
    active: true,
    sign_in_count: 1,
};
```

在变量与字段同名的时候，可以简写：

```rust
let email = String::from("someone@example.com");
let username = String::from("someusername123");
let user = User {
    email,
    username,
    active: true,
    sign_in_count: 1,
};
```

通过更新语法 `..` 可以从已有实例创建新实例：

```rust
let user1 = User {
    email: String::from("user1@example.com"),
    username: String::from("user1"),
    active: true,
    sign_in_count: 1,
};

let user2 = User {
    email: String::from("user2@example.com"),
    username: String::from("user2"),
    ..user1
};
```

## 属性访问与更新

```rust
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}

fn main() {
    let mut user = User {
        email: String::from("username@example.com"),
        username: String::from("username"),
        active: true,
        sign_in_count: 1,
    };
    user.active = false;
    println!("{}", user.email);
    println!("{}", user.username);
    println!("{}", user.active);
    println!("{}", user.sign_in_count);
}
```

## tuple struct

- 字段无名字，类似于 tuple
- 通过下标访问字段

```rust
struct Point(i32, i32);

fn main() {
    let mut p = Point(0, 0);
    println!("x = {}, y = {}", p.0, p.1); // x = 0, y = 0

    p.0 += 50;
    p.1 += 100;
    println!("x = {}, y = {}", p.0, p.1); // x = 50, y = 100
}
```

## 结构体的所有权

TODO
