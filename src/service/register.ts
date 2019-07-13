import sql from './sql';
import { stripNewLines } from 'lib/util';

class RegisterService {
  /** validates and returns list of students as comma delimited string */
  parseStudents = (students: string[]): string => {
    return students.map((s, i) => `('${s}')`).toString();
  };

  insertStudentsIntoTable = async (students: string[]) => {
    const values = this.parseStudents(students);
    const qs = stripNewLines(`INSERT IGNORE INTO students(email)
    VALUES
    ${values};
      `);
    const res = await sql.query(qs);
    return res;
  };

  parseStudentTeacherRelationship = (students: string[], teacher: string) => {
    return students
      .map((student) => {
        return `('${student}', '${teacher}')`;
      })
      .toString();
  };

  insertTeacherIntoTable = async (teacher: string) => {
    const qs = stripNewLines(`INSERT IGNORE INTO teachers(email) VALUES ('${teacher}') `);
    const res = await sql.query(qs);
    return res;
  };
  insertStudentTeacherRelationship = async (students: string[], teacher: string) => {
    const qs = `INSERT IGNORE INTO students_teachers(student_email, teacher_email)
    VALUES
    ${this.parseStudentTeacherRelationship(students, teacher)}
    `;
    const res = await sql.query(qs);
    return res;
  };

  registerStudentsToTeacher = async (students: string[], teacher: string) => {
    await this.insertStudentsIntoTable(students);
    await this.insertTeacherIntoTable(teacher);
    await this.insertStudentTeacherRelationship(students, teacher);
  };
}
export default RegisterService;
