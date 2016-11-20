
var superagent = require('superagent'),
  expect = require('expect.js'),
  config = require('../_config');

var port = config.serverPORT[process.env.NODE_ENV];
var server_url = 'http://localhost:'+port;

describe('listit-backend rest api server 2', function(){
  var user = {
    id : null,
    token : null,
    first_name : "Sabbir",
    last_name : "Rahman",
    address : "91 Ruten",
    city_name : "Copenhagen",
    post_code : 2700,
    email : "sakib3@gmail.com",
    mobile : 0712345678,
    password : "123456"
  }

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

  var company ={
    name:"Ericsson AB",
    email:"support@ericsson.com",
    phone:  46107190000,
    address:"Torshamnsgatan 21",
    password:"654321"
  }
  
  it('should create an employee', function(done){
    superagent.post(server_url+'/employees/signup')
      .send({
        first_name: user.first_name,
        last_name: user.last_name,
        address: user.address,
        city_name: user.city_name,
        post_code: user.post_code,
        email: user.email,
        mobile: user.mobile,
        password: user.password
      })
      .end(function(e, res){
        user.id = res.body.user._id
        user.token = res.body.token
        expect(e).to.eql(null)
        expect(user.token).not.to.eql(null)
        done()
      })
  })
  
  it('should return error if re-create an employee', function(done){
    superagent.post(server_url+'/employees/signup')
      .send({  
        email: user.email,
        password: user.password
      })
      .end(function(e, res){
        expect(e).not.to.eql(null)
        expect(res.body.message).to.eql('Employee validation failed')
        done()
      })
  })

  it('should login as an employee', function(done){
    superagent.post(server_url+'/employees/login')
      .send({
          email: user.email,
          password: user.password
      })
      .end(function(e, res){
        user.token = res.body.token
        user.id = res.body.user._id

        expect(e).to.eql(null)
        expect(res.body.token).not.to.eql(null)
        done()
      })
  })

//test perpose
  // it('should decode user if we post token', function(done){
  //   superagent
  //     .post(server_url+'/employees/chkauth')
  //     .set( 'x-access-token',token)
  //     .end(function(e, res){
  //       id = res.body.iss
  //       expect(e).to.eql(null)
  //       expect(res.body.iss).not.to.eql(null)
  //       expect(res.body.exp).not.to.eql(null)
  //       done()
  //     })
  // })

  it('should see employees', function(done){
    superagent
      .get(server_url+'/api/employees')
      //.set( 'x-access-token',user.token)
      .end(function(e, res){
        expect(e).to.eql(null)
        expect(res.body.iss).to.eql(undefined)
        expect(res.body.exp).not.to.eql(null)
        done()
      })
  })

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
          expect(admin.token).not.to.eql(null)
          done()
        })
  })

  it('should create company', function(done){
    superagent.post(server_url+'/api/companies')
      .set( 'x-access-token',admin.token)
      .send({
        name:company.name,
        email:company.email,
        phone:company.phone,
        address:company.address,
        password:company.password
      })
      .end(function(e, res){
        //console.log(res.body)
        expect(e).to.eql(null)
        id = res.body.company._id
        done()
      })
  })
})
