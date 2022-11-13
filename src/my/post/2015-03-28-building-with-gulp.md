---
layout:     post
title:      基于gulp的自动化构建
date:       2015-03-28 00:00:00 +0800
---

[gulp](http://gulpjs.com/)是一个前端的自动化项目构建工具，与[grunt](http://gruntjs.com/)
类似，不过相比之下，grunt的配置以及使用较为繁琐，而gulp则比较简单易学。

一个项目从最初的启动到实现，基本上有如下的构建任务：

- 依赖包管理 [npm](https://www.npmjs.com/), [bower](http://bower.io/)
- 语法检查 [JSHint](https://github.com/jshint/jshint), [JSLint](https://github.com/douglascrockford/JSLint)
- 代码合并 [browserify](http://browserify.org/)
- 代码压缩 [UglifyJS](https://github.com/mishoo/UglifyJS)
- 测试 [mocha](http://mochajs.org/)
- 删除临时文件 [del](https://github.com/sindresorhus/del)

通过使用gulp，可以自动化执行以上的大部分构建任务，从而使得项目的构建变得轻松易行。下面是一个例子：

项目结构如图所示：

```
|---build/
|---node_modules/
|---src/
|    |---foo.js
|    |---bar.js
|    |---main.js
|---test/
|    |---test.js
|---gulpfile.js
|---index.html
|---package.json
```

其中src目录下的代码如下，通过browserify，我们可以在浏览器环境中使用CommonJS规范进行模块开发：

```javascript
/* foo.js */
module.exports = function(i) {
	return i + 1;
};

/* bar.js */
module.exports = function(i) {
	return i * 100;
};

/* main.js */
var foo = require('./foo.js');
var bar = require('./bar.js');
var a = foo(3) + bar(4);
console.log(a);
```

然后是gulpfile.js：

```javascript
var gulp = require('gulp');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var uglisfy = require('gulp-uglify');
var jshint = require('gulp-jshint');
var browserify = require('gulp-browserify');
var mocha = require('gulp-mocha');

gulp.task('clean', function() {
    del('build/*');
});

gulp.task('scripts', ['clean'], function() {
    gulp.src('test/test.js')
        .pipe(mocha());

    gulp.src('src/main.js')
        .pipe(sourcemaps.init())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(browserify())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
    gulp.watch('src/*.js', ['scripts']);
})

gulp.task('default', ['watch', 'scripts']);
```

gulp的构建过程以task为基本单位，默认task为default，通过这种方式，可以很方便地定义构建任务。在上面的代码中，主要有如下任务：

- clean 清除之前的build代码
- scripts 脚本构建任务，包括测试、检查、合并以及压缩等
- watch 实时监控脚本的变化并自动build
- default 默认的执行任务

然后执行gulp命令即可进行自动构建。

关于gulp的详细文档，可以参看[https://github.com/gulpjs/gulp/blob/master/docs/README.md](https://github.com/gulpjs/gulp/blob/master/docs/README.md)。
