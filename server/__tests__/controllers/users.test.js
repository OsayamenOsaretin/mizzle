import chai from 'chai';
import chaiHTTP from 'chai-http';

import app from '../../server';


const should = chai.should();   
chai.use(chaiHTTP);


describe('User Registeration', () => {
  it('should return a jwt on successful signup', () => {
    const user = {
      username: 'testUser',
      email: 'testemail@email.com',
      password: '123456',
      avatar: 'http://testavatarhost.com'
    };
    chai.request(app)
      .post('/api/v1/users/register')
      .type('form')
      .send(user)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.should.have.property('message')
          .eql('Successful registeration');
        res.body.should.have.property('token');
      });
  });

  it('should return a status 409 when username exists', () => {
    const user = {
      username: 'testUser',
      email: 'anothertestemail@email.com',
      password: '123456',
      avatar: 'http://testavatarhost.com'
    };
    chai.request(app)
      .post('/api/v1/users/register')
      .type('form')
      .send(user)
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.should.have.property('error')
          .eql('Username exists already');
      });
  });

  it('should return a status 409 when email exists', () => {
    const user = {
      username: 'anothertestUser',
      email: 'testemail@email.com',
      password: '123456',
      avatar: 'http://testavatarhost.com'
    };
    chai.request(app)
      .post('/api/v1/users/register')
      .type('form')
      .send(user)
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.should.have.property('error')
          .eql('Email already exists, try another');
      });
  });

  it('should return a status 400 when invalid email', () => {
    const user = {
      username: 'anothertestUser',
      email: 'testemailemail.com',
      password: '123456',
      avatar: 'http://testavatarhost.com'
    };
    chai.request(app)
      .post('/api/v1/users/register')
      .type('form')
      .send(user)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.have.property('error')
          .eql('Email is invalid');
      });
  });

  it('should return a status 400 for invalid username', () => {
    const user = {
      username: '',
      email: 'testemail@email.com',
      password: '123456',
      avatar: 'http://testavatarhost.com'
    };
    chai.request(app)
      .post('/api/v1/users/register')
      .type('form')
      .send(user)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.have.property('error')
          .eql('Username is invalid');
      });
  });

  it('should return a status 400 for invalid password', () => {
    const user = {
      username: 'anothertestUser',
      email: 'testemail@email.com',
      password: '',
      avatar: 'http://testavatarhost.com'
    };
    chai.request(app)
      .post('/api/v1/users/register')
      .type('form')
      .send(user)
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.should.have.property('error')
          .eql('Password is too short or too long');
      });
  });
});

describe('User Authentication', () => {
  it('should return status 200 on successful login with username', () => {
    const user = {
      username: 'testUser',
      password: '123456'
    };
    chai.request(app)
      .post('/api/v1/users/login')
      .type('form')
      .send(user)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.have.property('token');
      });
  });

  it('should return status 200 on successful login with email', () => {
    const user = {
      email: 'testemail@email.com',
      password: '123456'
    };
    chai.request(app)
      .post('/api/v1/users/login')
      .type('form')
      .send(user)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.have.property('token');
      });
  });

  it('should return status 400 when neither username or email', () => {
    const user = {
      password: '123456'
    };
    chai.request(app)
      .post('/api/v1/users/login')
      .type('form')
      .send(user)
      .end((err, res) => {
        res.status.should.equal(400);
        // TODO: Fix error message details for case of no username and password
        res.body.should.have.property('error');
      });
  });

  it('should return status 400 when password is not given', () => {
    const user = {
      username: 'testUser',
      email: 'testemail@email.com'
    };
    chai.request(app)
      .post('/api/v1/users/login')
      .type('form')
      .send(user)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.have.property('Password is too short or too long');
      });
  });
});
