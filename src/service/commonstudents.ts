import sql from './sql';

class CommonStudentsService {
  /** validates and returns list of students as comma delimited string */
  parseTeachers = (teachers: string[]): string => {
    return `( ${teachers.map((s) => `'${s}'`).toString()} )`;
  };

  get = async (teachers: string[]) => {
    const qs = `SELECT email FROM students INNER JOIN students_teachers ON
    students_teachers.student_email = students.email WHERE teacher_email IN
    ${this.parseTeachers(teachers)}
    GROUP BY students.email
    HAVING count(email) >= ${teachers.length}
    `;
    const res = await sql.query(qs);
    return res[0];
  };

  getStudentsOfTeacher = async (teachers: string[]) => {
    const a = await this.get(teachers);
    return a;
  };
}
const commonStudentsService = new CommonStudentsService();

export default commonStudentsService;
