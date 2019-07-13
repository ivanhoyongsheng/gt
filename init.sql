CREATE DATABASE IF NOT EXISTS st_tc_db;
USE st_tc_db;

CREATE TABLE students (
    email varchar(255) NOT NULL PRIMARY KEY,
    name varchar(255),
    suspended boolean DEFAULT false
);

CREATE TABLE teachers (
    email varchar(255) NOT NULL PRIMARY KEY,
    name varchar(255)
);

CREATE TABLE students_teachers (
    student_email varchar(255) NOT NULL,
    teacher_email varchar(255) NOT NULL,
    PRIMARY KEY (student_email, teacher_email)
);

CREATE TABLE notifications (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    teacher_email varchar(255) NOT NULL,
    content varchar(255)
)

