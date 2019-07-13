var chai = require('chai');
var chaiHttp = require('chai-http');

var util = require('./util/misc');

const { url, testTeacher, notiStudentMentioned1, notiStudentMentioned2, testStudentRegUnderTestTeacher } = util;

chai.use(chaiHttp);
chai.should();

const apiUrl = 'retrievefornotifications';

const req1 = (done) => {
  const notification = `Hello students! @${notiStudentMentioned1} @${notiStudentMentioned2}`;
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
      res.body.recipients.should.include(notiStudentMentioned1, notiStudentMentioned2);
      res.body.recipients.length.should.be(3)
      res.body.recipients.should.include(testStudentRegUnderTestTeacher);
      res.body.recipients.should.not.include(testStudentRegUnderSecondTeacher);
      done();
    });
};

describe('Retrieve list of students to receive notifications', () => {
  it('should correctly identify eligible students', req1);
  // it('should fail if no teacher provided', req2);
  // it('should receive empty list of recepients if no students provided', req3);
});
