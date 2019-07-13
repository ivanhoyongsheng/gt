var chai = require('chai');
var chaiHttp = require('chai-http');

var util = require('./util/misc');

const { url, testTeacher, testStudents } = util;

chai.use(chaiHttp);
chai.should();

const req1 = (done) => {
  chai
    .request(url)
    .post('/register')
    .send({
      teacher: testTeacher,
      students: ['studentjon@gmail.com', 'studenthon@gmail.com']
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
  it('should return 204', req1);
  it('should fail if no teacher provided', req2);
  it('should fail if no students provided', req3);
});
