# Cargo

cargo 是 Rust 的包管理器。

## 创建项目

```shell
$ cargo new hello
```

```shell
$ cd hello
$ tree .
.
├── Cargo.toml
└── src
    └── main.rs
```

默认情况下，`cargo new` 使用的是 `--bin` 选项，创建的是一个 Binary 项目。因此会默认创建 `src/main.rs` 文件。

也可以指定 `--lib` 选项，这样创建出来的是一个 Library 项目，例如：

```shell
$ cargo new --lib hello
```

```shell
$ cd hello
$ tree .
.
├── Cargo.toml
└── src
    └── lib.rs
```

## 打包

```shell
$ cargo build
$ tree .
.
├── Cargo.lock
├── Cargo.toml
├── src
│   └── main.rs
└── target
    ├── CACHEDIR.TAG
    └── debug
        ├── build
        ├── deps
        │   ├── hello
        │   ├── hello.1ebkhbrkkl10rdtu.rcgu.o
        │   ├── hello.1jy8mz98r3kdq0to.rcgu.o
        │   ├── hello.1oima6mhrulpch5p.rcgu.o
        │   ├── hello.3rdu62eo0fatktx3.rcgu.o
        │   ├── hello.451mle0s7hicqm36.rcgu.o
        │   ├── hello.54ffmkp5b1h92q8k.rcgu.o
        │   ├── hello.6w9ya07t0jedxws.rcgu.o
        │   ├── hello.d
        │   └── hello.doq7gq3zhpnwt9n.rcgu.o
        ├── examples
        ├── hello
        ├── hello.d
        └── incremental
            └── hello-1qyma14vq257f
                ├── s-g1xsrkk6wz-1ivscap-26ktiub8rmwye
                │   ├── 1ebkhbrkkl10rdtu.o
                │   ├── 1jy8mz98r3kdq0to.o
                │   ├── 1oima6mhrulpch5p.o
                │   ├── 3rdu62eo0fatktx3.o
                │   ├── 451mle0s7hicqm36.o
                │   ├── 54ffmkp5b1h92q8k.o
                │   ├── 6w9ya07t0jedxws.o
                │   ├── dep-graph.bin
                │   ├── doq7gq3zhpnwt9n.o
                │   ├── query-cache.bin
                │   └── work-products.bin
                └── s-g1xsrkk6wz-1ivscap.lock
```

然后执行

```shell
$ ./target/debug/hello
```

或者

```shell
$ cargo run
```


## 参考资料

- [The Cargo Book](https://doc.rust-lang.org/cargo/index.html)
