const url = process.env.API_HOST_URL || 'http://localhost:3000';

module.exports = {
  url: `${url}/api`,
  testTeacher: 'testteacher@gmail.com',
  testTeacher2: 'testteacher2@gmail.com',
  testTeacher3: 'testteacher3@gmail.com',
  invalidEmail1: 'aZ@#$*(@$*7Z@#$*(@$*7sdflaskdjf.com',
  invalidEmail2: 'asdflaskdjf.com',
  testStudentRegUnderTestTeacher: 'st1@gmail.com',
  testStudentRegUnderSecondTeacher: 'st2@gmail.com',
  testSuspendStudent: 'testSuspendStudent@gmail.com',
  studentNonExistent: 'nonexistent@gmail.com',
  testStudents: ['studentjon@gmail.com', 'studenthon@gmail.com'],
  notiStudentMentioned1: 'notiStudentMentioned@gmail.com',
  notiStudentMentioned2: 'notiStudentMentioned1@gmail.com'
};
