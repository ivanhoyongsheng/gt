var chai = require('chai');
var chaiHttp = require('chai-http');

var util = require('./util/misc');

const {
  url,
  testTeacher,
  notiStudentMentioned1,
  notiStudentMentioned2,
  testStudentRegUnderTestTeacher,
  testStudentRegUnderSecondTeacher,
  testSuspendStudent
} = util;

chai.use(chaiHttp);
chai.should();

const apiUrl = '/retrievefornotifications';

const req1 = (done) => {
  const notification = `Hello students! @${notiStudentMentioned1} @${notiStudentMentioned2} @${testSuspendStudent}`;
  chai
    .request(url)
    .post(apiUrl) .send({
      teacher: testTeacher,
      notification
    })
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.key('recipients');
      res.body.recipients.should.be.a('array');
      res.body.recipients.should.include(notiStudentMentioned1, notiStudentMentioned2);
      // length should be number of students mentioned in notification + number
      // of students registered under teacher that is given, excluding
      // suspended students
      res.body.recipients.should.have.lengthOf(5);
      res.body.recipients.should.include(testStudentRegUnderTestTeacher);
      res.body.recipients.should.not.include(testStudentRegUnderSecondTeacher);
      res.body.recipients.should.not.include(testSuspendStudent);
      done();
    });
};

const req2 = (done) => {
  const notification = `Hello students! @${notiStudentMentioned1} @${notiStudentMentioned2} @${testSuspendStudent}`;
  chai
    .request(url)
    .post(apiUrl)
    .send({
      notification
    })
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.key('message');
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
      res.body.should.be.a('object');
      res.body.should.have.key('message');
      done();
    });
};

const req4 = (done) => {
  const notification = `No students are directly mentioned in this message. ${notiStudentMentioned1} ${notiStudentMentioned2}`;
  chai
    .request(url)
    .post(apiUrl)
    .send({
      teacher: testTeacher,
      notification
    })
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.key('recipients');
      res.body.recipients.should.be.a('array');
      res.body.recipients.should.not.include(notiStudentMentioned1, notiStudentMentioned2);
      // length should be number of students mentioned in notification + number
      // of students registered under teacher that is given, excluding
      // suspended students
      res.body.recipients.should.have.lengthOf(3);
      res.body.recipients.should.include(testStudentRegUnderTestTeacher);
      res.body.recipients.should.not.include(testStudentRegUnderSecondTeacher);
      res.body.recipients.should.not.include(testSuspendStudent);
      done();
    });
};

describe('Retrieve list of students to receive notifications', () => {
  it('should correctly identify eligible students', req1);
  it('should fail if no teacher provided', req2);
  it('should fail if no notification provided', req3);
  it('should only return students registered under teacher if no students explicitly mentioned', req4);
});
