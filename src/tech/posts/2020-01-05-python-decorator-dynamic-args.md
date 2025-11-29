---
layout: post
title:  Python decorator实现动态参数
date:   2020-01-05 12:00:00 +0800
tags:   Python
---

例如实现一个 decorator 用来鉴权，支持如下使用方式:

```python
# 默认 admin 才能访问（根据实现逻辑，也可以设置为只要登录就可以访问）
@auth_required

# 制定角色可以访问
@auth_required(roles=['admin', 'user'])
```

实现方案参考如下：

方案一：

```python
import functools


def auth_required(*args, **kwargs):
    if len(args) == 1 and len(kwargs) == 0 and callable(args[0]):
        func = args[0]

        @functools.wraps(func)
        def wrap(*args, **kwargs):
            # check auth
            if kwargs['role'] != 'admin':
                return None
            return func(*args, **kwargs)

        return wrap

    else:
        authRoles = kwargs['roles']

        def decorator(func):
            @functools.wraps(func)
            def wrap(*args, **kwargs):
                # check auth
                if kwargs['role'] not in authRoles:
                    return None
                return func(*args, **kwargs)

            return wrap

        return decorator


@auth_required
def f1(app, **kwargs):
    print(app)


@auth_required(roles=['admin'])
def f2(app, **kwargs):
    print(app)


f1('myapp', role='admin')
f2('myapp', role='admin')
```

方案二：

```python
import functools


def auth_required(func=None, roles=None):
    if func is None:
        return functools.partial(auth_required, roles=roles)

    @functools.wraps(func)
    def wrap(*args, **kwargs):
        # check auth
        if roles is None:
            if kwargs['role'] != 'admin':
                return None
        else:
            if kwargs['role'] not in roles:
                return None

        return func(*args, **kwargs)

    return wrap


@auth_required
def f1(app, **kwargs):
    print(app)


@auth_required(roles=['admin'])
def f2(app, **kwargs):
    print(app)


f1('myapp', role='admin')
f2('myapp', role='admin')
```
