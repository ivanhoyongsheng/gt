var chai = require('chai');
var chaiHttp = require('chai-http');

var util = require('./util/misc');

const { url, testSuspendStudent, studentNonExistent } = util;

chai.use(chaiHttp);
chai.should();

const apiUrl = '/suspend';

const req1 = (done) => {
  chai
    .request(url)
    .post(apiUrl)
    .send({
      student: testSuspendStudent
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
      student: studentNonExistent
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
    .send({})
    .end((err, res) => {
      res.should.have.status(400);
      done();
    });
};

const req4 = (done) => {
  chai
    .request(url)
    .post(apiUrl)
    .send({ student: testSuspendStudent })
    .end((err, res) => {
      res.should.have.status(400);
      done();
    });
};

describe('Suspend specific student', () => {
  it('should return 204 if OK', req1);
  it('should fail if no matching student found', req2);
  it('should fail if no student provided', req3);
  it('should warn if student already suspended', req4);
});
