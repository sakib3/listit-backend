
var superagent = require('superagent'),
  expect = require('expect.js'),
  config = require('../_config');

var port = config.serverPORT[process.env.NODE_ENV];
var server_url = 'http://localhost:'+port;

describe('listit-backend rest api server', function(){
  var id,token

  it('should login as an employee', function(done){
    superagent.post(server_url+'/employees/login')
      .send({
          email: 'sakib3@gmail.com',
          password: '123456'
      })
      .end(function(e, res){
        console.log(res.body)
        expect(e).to.eql(null)
        //expect(res.body.length).to.eql(1)
        token = res.body.token;
        expect(token).not.to.eql(null)
        id = res.body.user._id
        done()
      })
  })

  it('should decode user if we post token', function(done){
    superagent
      .post(server_url+'/employees/chkauth')
      .send({ name: 'Manny', species: 'cat' })
      .set( 'x-access-token',token)
      .end(function(e, res){
        //console.log(res.body)
        expect(e).to.eql(null)
        //expect(res.body.length).to.eql(1)
        expect(res.body.iss).not.to.eql(null)
        expect(res.body.exp).not.to.eql(null)
        id = res.body.iss
        done()
      })
  })

  it('should see employees', function(done){
    superagent
      .get(server_url+'/api/employees')
      .set( 'x-access-token',token)
      .end(function(e, res){
        console.log(res.body)
        expect(e).to.eql(null)
        expect(res.body.iss).to.eql(undefined)
        expect(res.body.exp).not.to.eql(null)
        id = res.body.iss
        done()
      })
  })
})
