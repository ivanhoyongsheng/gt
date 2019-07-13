Prerequisites:
* node 11.6.0
* npm 6.5.0
* mysql 5.7.26

* create database with init script. uses `st_tc_db` as the database name. Change mysql credentials as needed according to your local environment.
```
mysql -uroot < init.sql
```

* start dev server with env DBUSER and DBPASSWORD respectively
```
env DBUSER=root DBPASSWORD=password npm run dev
```
* or build server files
```
env DBUSER=root DBPASSWORD=password npm run build
```
