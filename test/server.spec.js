var superagent = require('superagent')
var expect = require('expect.js')

describe('listit-backend rest api server', function(){
  var id,token

  it('should login as an employee', function(done){
    superagent.post('http://localhost:3000/employees/login')
      .send({
          email: 'sakib3@gmail.com',
          password: '123456'
      })
      .end(function(e, res){
        console.log(res.body)
        expect(e).to.eql(null)
        //expect(res.body.length).to.eql(1)
        expect(res.body.token).not.to.eql(null)
        id = res.body.user._id
        done()
      })
  })
})
