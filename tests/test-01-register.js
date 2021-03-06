var chai = require('chai');
var chaiHttp = require('chai-http');

var util = require('./util/misc');

const apiUrl = '/register';

const {
  url,
  testSuspendStudent,
  testTeacher,
  testTeacher2,
  testTeacher3,
  testStudents,
  testStudentRegUnderTestTeacher,
  testStudentRegUnderSecondTeacher,
  notiStudentMentioned1,
  notiStudentMentioned2,
  invalidEmail1
} = util;

chai.use(chaiHttp);
chai.should();

const req1 = (teacher, students) => (done) => {
  chai
    .request(url)
    .post(apiUrl)
    .send({
      teacher,
      students
    })
    .end((err, res) => {
      res.should.have.status(204);
      done();
    });
};

const req2 = (done) => {
  chai
    .request(url)
    .post(apiUrl)
    .send({
      students: testStudents
    })
    .end((err, res) => {
      res.should.have.status(400);
      done();
    });
};

const req3 = (done) => {
  chai
    .request(url)
    .post(apiUrl)
    .send({
      teacher: testTeacher
    })
    .end((err, res) => {
      res.should.have.status(400);
      done();
    });
};

const req4 = (done) => {
  chai
    .request(url)
    .post(apiUrl)
    .send({
      teacher: invalidEmail1
    })
    .end((err, res) => {
      res.should.have.status(400);
      done();
    });
};

const req5 = (done) => {
  chai
    .request(url)
    .post(apiUrl)
    .send({
      students: [invalidEmail1, 'validEmail@gmail.com'],
      teacher: 'validTeacherEmail@gmail.com'
    })
    .end((err, res) => {
      res.should.have.status(400);
      done();
    });
};

const req6 = (done) => {
  chai
    .request(url)
    .post(apiUrl)
    .send({
        teacher: testTeacher,
        students: [],
    })
    .end((err, res) => {
      res.should.have.status(400);
      done();
    });
};


const studentsRegToTeacher2 = [testStudentRegUnderSecondTeacher, testSuspendStudent];

describe('Register Students under Teacher', () => {
  it(
    'Register students under teacher #1',
    req1(testTeacher, ['customStudent@gmail.com', 'customStudent2@gmail.com', testStudentRegUnderTestTeacher])
  );
  it('Register students under teacher #2', req1(testTeacher2, studentsRegToTeacher2));
  it('Register students under teacher #3', req1(testTeacher3, [notiStudentMentioned1, notiStudentMentioned2]));
  it(
    'Register a student under teacher #3 who is also registered to teacher #2',
    req1(testTeacher3, [studentsRegToTeacher2[0]])
  );
  it('should fail if no teacher provided', req2);
  it('should fail if no students array provided', req3);
  it('should fail if no students provided in array', req6);
  it('should fail if teacher has invalid email format', req4);
  it('should fail if any students has invalid email format', req5);
});
