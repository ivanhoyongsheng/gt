var chai = require('chai');
var chaiHttp = require('chai-http');

var util = require('./util/misc');

const {
  url,
  testTeacher,
  testTeacher2,
  testStudents,
  testStudentRegUnderTestTeacher,
  testStudentRegUnderSecondTeacher
} = util;

chai.use(chaiHttp);
chai.should();

const req1 = (teacher, students) => (done) => {
  chai
    .request(url)
    .post('/register')
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
    .post('/register')
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
    .post('/register')
    .send({
      teacher: testTeacher
    })
    .end((err, res) => {
      res.should.have.status(400);
      done();
    });
};

describe('Register Students under Teacher', () => {
  it(
    'Register students under teacher #1',
    req1(testTeacher, ['studentjon@gmail.com', 'studenthon@gmail.com', testStudentRegUnderTestTeacher])
  );
  it('Register students under teacher #2', req1(testTeacher2, [testStudentRegUnderSecondTeacher]));
  it('should fail if no teacher provided', req2);
  it('should fail if no students provided', req3);
});
