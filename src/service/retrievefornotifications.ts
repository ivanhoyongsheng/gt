import sql from './sql';
import { RowDataPacket } from 'mysql2';
import { validMentionEmailRegex } from 'lib/util';

class RetrieveService {
  parseListOfStudents = (students: string[]): string => {
    return `( ${students.map((s) => `'${s}'`).toString()} )`;
  };

  getData = async (teacher: string, notification: string) => {
    const studentArray = this.getListOfStudentsMentioned(notification);
    const parsedStudents = this.parseListOfStudents(studentArray);
    const qs = `SELECT * FROM students INNER JOIN students_teachers ON students_teachers.student_email = students.email
    WHERE ( teacher_email = '${teacher}' ${
      studentArray.length > 0 ? `OR email IN ${parsedStudents}` : ''
    }) AND suspended = false`;

    const res = await sql.query(qs);
    return res;
  };

  getListOfStudentsMentioned = (notification: string) => {
    let m;
    let results: string[] = [];
    do {
      m = validMentionEmailRegex.exec(notification);
      if (m) {
        // remove first '@'
        results.push(m[0].substr(1));
      }
    } while (m);
    return results;
  };

  retrieveStudents = async (teacher: string, notification: string) => {
    const res = await this.getData(teacher, notification);
    return (res[0] as RowDataPacket[]).map((item) => item.email);
  };
}
export default RetrieveService;
