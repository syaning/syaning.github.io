---
doctype: post
title:   查询Mysql中某个DB下的表大小
date:    2020-11-27 12:00:00 +0800
---

使用如下语句即可：

```sql
SELECT
  TABLE_NAME AS `Table`,
  ROUND((DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024) AS `Size (MB)`
FROM
  information_schema.TABLES
WHERE
  TABLE_SCHEMA = "database_name"
ORDER BY
  (DATA_LENGTH + INDEX_LENGTH)
DESC;
```

如果需要查看特定某张表，可以在 where 语句里加一个条件 `TABLE_NAME = "table_name"`。
