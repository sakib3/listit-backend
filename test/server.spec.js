
var superagent = require('superagent'),
  expect = require('expect.js'),
  config = require('../_config');

var port = config.serverPORT[process.env.NODE_ENV];
var server_url = 'http://localhost:'+port;

describe('listit-backend rest api server', function(){
  var id,token
  var first_name = "Sabbir",
  last_name = "Rahman",
  address = "91 Ruten",
  city_name = "Copenhagen",
  post_code = 2700,
  email = "sakib3@gmail.com",
  mobile = 0712345678,
  password = "123456"

  it('should create an employee', function(done){
    superagent.post(server_url+'/employees/signup')
      .send({
        first_name: first_name,
        last_name: last_name,
        address: address,
        city_name: city_name,
        post_code: post_code,
        email: email,
        mobile: mobile,
        password: password
      })
      .end(function(e, res){
        id = res.body.user._id
        token = res.body.token

        expect(e).to.eql(null)
        expect(token).not.to.eql(null)
        done()
      })
  })

  it('should login as an employee', function(done){
    superagent.post(server_url+'/employees/login')
      .send({
          email: email,
          password: password
      })
      .end(function(e, res){
        token = res.body.token
        id = res.body.user._id

        expect(e).to.eql(null)
        expect(token).not.to.eql(null)
        done()
      })
  })

  it('should decode user if we post token', function(done){
    superagent
      .post(server_url+'/employees/chkauth')
      .set( 'x-access-token',token)
      .end(function(e, res){
        id = res.body.iss
        expect(e).to.eql(null)
        expect(res.body.iss).not.to.eql(null)
        expect(res.body.exp).not.to.eql(null)
        done()
      })
  })

  it('should see employees', function(done){
    superagent
      .get(server_url+'/api/employees')
      .set( 'x-access-token',token)
      .end(function(e, res){
        id = res.body.iss
        expect(e).to.eql(null)
        expect(res.body.iss).to.eql(undefined)
        expect(res.body.exp).not.to.eql(null)
        done()
      })
  })

  var admin = {
    id :  null,
    token : null,
    first_name : "Test",
  	last_name : "Admin",
  	address : "Test Address",
  	city_name : "Stockholm",
  	post_code : 11251,
  	email : "admin@listit.dk",
  	mobile : 45712345678,
  	password : "123456"
  };

  it('should login as an admin', function(done){
      superagent.post(server_url+'/admin/login')
        .send({
            email: admin.email,
            password: admin.password
        })
        .end(function(e, res){
          admin.token = res.body.token
          admin.id = res.body.user._id

          expect(e).to.eql(null)
          expect(token).not.to.eql(null)
          done()
        })
    })
  // it('should create company', function(done){
  //   superagent.post(server_url+'/employees/signup')
  //     .send({
  //       first_name: first_name,
  //       last_name: last_name,
  //       address: address,
  //       city_name: city_name,
  //       post_code: post_code,
  //       email: email,
  //       mobile: mobile,
  //       password: password
  //     })
  //     .end(function(e, res){
  //       console.log(res.body)
  //       expect(e).to.eql(null)
  //       //expect(res.body.length).to.eql(1)
  //       token = res.body.token;
  //       expect(token).not.to.eql(null)
  //       id = res.body.user._id
  //       done()
  //     })
  // })
})
