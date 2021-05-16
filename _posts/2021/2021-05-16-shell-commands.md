---
layout: post
title:  一些常用的Shell命令总结
date:   2021-05-16 10:30:00 +0800
---

* TOC
{:toc}

## 格式化输出

```shell
# http://linuxcommand.org/lc3_adv_tput.php
# for example:
#     echo "${red}Error ${normal}something wrong"
if test -t 1; then # if terminal
    ncolors=$(which tput > /dev/null && tput colors) # supports color
    if test -n "$ncolors" && test $ncolors -ge 8; then
        termcols=$(tput cols)
        bold="$(tput bold)"
        underline="$(tput smul)"
        standout="$(tput smso)"
        normal="$(tput sgr0)"
        black="$(tput setaf 0)"
        red="$(tput setaf 1)"
        green="$(tput setaf 2)"
        yellow="$(tput setaf 3)"
        blue="$(tput setaf 4)"
        magenta="$(tput setaf 5)"
        cyan="$(tput setaf 6)"
        white="$(tput setaf 7)"
    fi
fi
```

## Crontab

- [crontab guru](https://crontab.guru/) - The quick and simple editor for cron schedule expressions.

```
* * * * * command to be executed
- - - - -
| | | | |
| | | | ----- Day of week (0 - 7) (Sunday=0 or 7)
| | | ------- Month (1 - 12)
| | --------- Day of month (1 - 31)
| ----------- Hour (0 - 23)
------------- Minute (0 - 59)
```

```shell
# list cron jobs
$ crontab -l

# edit crontab file
$ crontab -e
$ EDITOR=vi crontab -e

# add a cron job
$ (crontab -l; echo "*/1 * * * 1-5 echo hello") | crontab -

# add a cron job with no duplication
$ croncmd="*/1 * * * 1-5 echo hello"
$ (crontab -l | grep -v -F "$croncmd"; echo "$croncmd") | crontab -

# remove a cron job
$ crontab -l | grep -v -F "$croncmd" | crontab -
```

## Logrotate

```conf
# /etc/logrotate.d/xxx

/path/to/your/logfile {
    daily                # or weekly/monthly/yearly
    size 100M            # or 100/100k/100G
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    create 644 root root
    postrotate
        /usr/bin/killall -HUP rsyslogd
    endscript
}
```

> Troubleshooting: [Logrotate not rotating file after file size exceeds the limit](https://serverfault.com/questions/480551/logrotate-not-rotating-file-after-file-size-exceeds-the-limit)

## SSH

### Generate SSH Key

```shell
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

### Set Alive Interval

```conf
# ~/.ssh/config

Host *
  ServerAliveInterval 30

Host example
  HostName 1.1.1.1
  User testuser
```

## SSL/TLS

### Generate self-signed certificate

```shell
# genrate private key
$ openssl genrsa -out server.key 2048

# generate certificate signing request
$ openssl req -new -sha256 -key server.key -out server.csr

# generate self-signed certificate
$ openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
```

## Hardware

### Arch

```shell
$ arch

$ dpkg --print-architecture
```

### CPU

```shell
# list cpu info
$ lscpu

# cpu info
$ cat /proc/cpuinfo
```

### Memory

```shell
# memory usage
$ free
$ free -m

# memory info
$ cat /proc/meminfo

# memory statistics
$ vmstat -s
```

### Disk

```shell
# file system disk usage
$ df -h

# list block devices
$ lsblk
```

### Other

```shell
# list hardware configuration
$ lshw
$ lshw -short

# list usb
$ lsusb

# list pci
$ lspci
```