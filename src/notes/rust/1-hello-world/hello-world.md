# Hello World

## Install

参考 [Getting started](https://www.rust-lang.org/learn/get-started)，直接执行如下命令安装，这会使用 Rustup 来安装 Rust。

```shell
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### Rustup

Rustup 是一个 Rust 的安装器及版本管理器，相关数据默认在 `~/.rustup` 目录下。

直接通过 `rustup` 命令可以查看用法。通过 `rustup doc --book` 可以查看 Rust 的官方电子书。

### Cargo

Cargo 是 Rust 的包管理器，相关数据默认在 `~/.cargo` 目录下。

`rustup`、`rustc`、`cargo` 等命令都在 `~/.cargo/bin` 目录下。

## Hello World

```rust
fn main() {
    println!("Hello, world!");
}
```

```shell
$ rustc main.rs
$ ./main
```

## Reference

- [Rust](https://www.rust-lang.org/)
- [The Rust Programming Language](https://doc.rust-lang.org/book/)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/index.html)
- [Rust API Guidelines](https://rust-lang.github.io/api-guidelines/about.html)
- [The Rust Reference](https://doc.rust-lang.org/reference/introduction.html)
