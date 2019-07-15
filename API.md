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
students that are not suspended, and are either a) registered under the teacher
provided, or b) mentioned directly in `notification`. mention RegExp is `@`
character followed by the valid user ID RegExp. Will not mentioned the
following:

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


