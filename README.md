# Prerequisites:
* node 11.6.0
* npm 6.5.0
* mySQL 5.7.26

* create database with `init.sql` script. Uses `st_tc_db` as the database name.
  Change mySQL credentials as needed according to your local environment.
  **WARNING: will drop the database `st_tc_db`  when run.**

  **mySQL 8 is not supported.**

```
mysql -uroot < init.sql
```

# Development
* Start dev server with env `DBUSER` and `DBPASSWORD` respectively. Will
  default to `root` and `password` if not provided.


```
env DBUSER=root DBPASSWORD=password npm run dev
```

* or build server files directly without hosting


```
env DBUSER=root DBPASSWORD=password npm run build
```

# API Endpoints

### `POST /api/register`

Registers an array of students to a teacher

Request body example: 
```
{
  "teacher": "teacherken@gmail.com"
  "students":
    [
      "studentjon@gmail.com",
      "studenthon@gmail.com"
    ]
}
```

Current valid user ID (email) format is `(/w|/.|/-)+@[^/.^/@]+(/./w+)+/b`

Returns `204` if successful, `400` if error encountered.

### `GET /api/commonstudents`

Gets a list of students that are registered to all the teachers provided

Request example: `/api/commonstudents?teacher=teacherken%40gmail.com&teacher=teacher2%40gmail.com`

Response body example:

```
{
  "students" :
    [
      "student_under_both_teachers_in_query_param_1@gmail.com", 
      "student_under_both_teachers_in_query_param_2@gmail.com", 
      "student_under_both_teachers_in_query_param_3@gmail.com", 
    ]
}
```

Returns `200` if successful, `400` if error encountered.

###  `POST /api/suspend`

Suspends a student. For simplicity, will always change the student's status to
suspended regardless of current status. Does not throw error if student is
already suspended. This API endpoint does not toggle the suspended status.


Request body example:

```
{
  "student" : "student@gmail.com"
}
```

Returns `204` if successful, `400` if error encountered.

###  `POST /api/retrievefornotifications`

Retrieves a list of eligible students based on request body. Will return
students that are not suspended, and are either a) under the teacher provided,
or b) mentioned directly in `notification`. mention RegExp is `@` character
followed by the valid user ID RegExp. Will not mentioned the following:

* unregistered students
* mentioned teachers

Request body example:

```
{
  "teacher":  "teacherken@gmail.com",
  "notification": "Hello students! notmentioned@gmail.com @studentagnes@gmail.com @studentmiche@gmail.com"
}
```

Response body example:

```
{
  "recipients":
    [
      "student_registered_under_teacherken@gmail.com",
      "studentagnes@gmail.com",
      "studentmiche@gmail.com"
    ]   
}
```

Returns `200` if successful, `400` if error encountered.

For simplicity, will always change the student's status to suspended regardless
of current status.

# Tests

* Run tests with mocha. This assumes that the target API server is set up and
  deployed. URL can be configured with the environment variable `API_HOST_URL`,
  or defaults to `http://localhost:3000`.


```
npm run tests
```

The tests are written as API unit/integration tests and does nothing other than
call the exposed APIs. As such, there are limitations with the current
specifications, such as not being able to reset the data because there is no
API to perform such actions.

# Notes

## Further Improvement

* Instantize testing - either connect to the SQL database in the tests
  themselves and execute commands, or expose APIs to reset/set database status
  outside of production functionality. Or, spin up a fresh database for each
  deployment and destroy it after tests pass

* Move tests to beside API files, however the tests currently rely on a
  specific order and a more verbose test command will be needed eventually.

* Write Swagger schema for API

* Implement middleware for API call logs

* implement precommit hooks to lint files with prettier for better coding style
  cohesion

## Code

### For this small project I have used the following:

* ExpressJS - simple API endpoint setup

* TypeScript - less errors at compile time with type checking, will have more
  benefits as the codebase grows and code gets harder to maintain.

* async/await mySQL requests with mysql2 - more readable code, better data
  consistency

* Heroku - PaaS for deployment with considerably easy setup, quick to get a
  node app up and running online, provides mySQL database instance as an add on
  in a few clicks -- configure environment variables and you're good to go.
  Bonus: it's free for low tier usage
