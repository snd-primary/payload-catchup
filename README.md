## メモ

### psqlを使う方法

以下コマンド実行

```bash
snd@snd-03:~/payload-catchup$ docker exec -it payload-catchup-postgres-1 psql -U paylo
ad -d payload
```

### psqlコマンド

- **\l** -> 全部のDBを一覧で確認する
- **\dt** -> 今接続してるDBのテーブル一覧を確認する
