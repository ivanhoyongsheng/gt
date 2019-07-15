import sql from './sql';
import { validEmailRegex } from 'lib/util';

class RegisterService {
  /** validates and returns list of students as comma delimited string */
  parseStudents = (students: string[]): string => {
    return students.map((s) => `('${s}')`).toString();
  };

  checkEmailValidity = (val: string | string[]) => {
    if ((val as string[]).forEach) {
      for (let i = 0; i < val.length; i++) {
        const email = (val as string[])[i];
        if (validEmailRegex.test(email) === false) {
          return false;
        }
      }
      return true;
    }
    return validEmailRegex.test(val as string);
  };

  insertStudentsIntoTable = async (students: string[]) => {
    const values = this.parseStudents(students);
    const qs = `INSERT IGNORE INTO students(email)
    VALUES
    ${values};
      `;
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
    const qs = `INSERT IGNORE INTO teachers(email) VALUES ('${teacher}') `;
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
const registerService = new RegisterService();

export default registerService;
