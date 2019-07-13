var chai = require('chai');
var chaiHttp = require('chai-http');
var util = require('./util/misc');

const { url, testTeacher, testStudentRegUnderTestTeacher } = util;

const apiUrl = '/commonstudents';

req1 = (done) => {
  chai
    .request(url)
    .get(apiUrl)
    .query({ teacher: [testTeacher] })
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.key('students');
      res.body.students.should.be.a('array');
      res.body.students.should.include(testStudentRegUnderTestTeacher);
      done();
    });
};

req2 = (done) => {
  chai
    .request(url)
    .get(apiUrl)
    .query({ teacher: ['test@gmail.com', 'test2@gmail.com', 'test3@gmail.com'] })
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.key('students');
      res.body.students.should.be.a('array');
      done();
    });
};

req3 = (done) => {
  chai
    .request(url)
    .get(apiUrl)
    .query({})
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.key('message');
      done();
    });
};
chai.use(chaiHttp);
chai.should();
describe('Get list of students registered under ALL teachers in list provided', () => {
  it('should have correct students array when passed valid teacher', req1);
  it('should have correct students array when passed multiple teachers', req2);
  it('should fail with 400 error when no teacher passed', req3);
});
