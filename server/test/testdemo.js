let assert =require('chai').assert;
let should =require('chai').should();
let supertest =require('supertest');
let sinon=require('sinon');
let schema=require('../model/schema');
var app = require('../app');
//var user=require('../routes/user');

let url=supertest('http://127.0.0.1:3000');

// describe('testing the connection',function(){
// 	it('hii checking',function(done){
// 		url.get('/')
// 		.expect(200)
// 		.end(function(err,res){
// 			if(err){
// 				console.log("sidfbsfd error");
// 			}
// 			else{
// 				//console.log("dsfgdsgdsf");
// 			assert.equal(res.text,"hiiidfgi");
// 			done();
// 		}
// 		})
// 	});
// });
// describe('testing the routing..........',function(){
// 	it('routing testing...',function(done){
// 		url.get('/user/4/5')
// 		.expect(200)
// 		.end(function(err,res){
// 			if(err){
// 				console.log("error");

// 			}
// 				else{
// 					assert.equal(res.text,'30');
// 					done();
// 				}
			
// 		})
// 	});
// });

describe('testing fetching using stubs',function(){
	beforeEach(()=>{
		let schemaStub=sinon.stub(schema,'find');
		schemaStub.yields(null,[{name:"nishant",age:22,mobile:"8565865279",course:"btech"}]);
		// let schemaStub1=sinon.stub(schema,'save');
	})
 
	it('fetch the data and match',function(done){
		
		
		url.get('/fetch')
		//.expect(200)
          //.set('Accept', 'application/json')
          //.expect('Content-Type', 'application/json; charset=utf-8')
          .end((err, res) => {
              if (err) {
              	console.log(err);
              	//return done(err);

              }
              else{
              	//console.log(res.body);
              assert.equal(res.body[0].name,"nishant");
              //expect(res.body[0].name).to.be.equal("nishant");
              done();
          }
      });
       });  
       });     
          



	 
describe('testing fetching using stubs',function(){
	// before(()=>{
	// 	let schemaStub=sinon.stub(schema.prototype,'save');
	// 	schemaStub.yields(null,[{name:"shefali",age:21,mobile:"85422525",course:"bca"}]);
	// 	 //let schemaStub1=sinon.stub(schema,'save');
	// })
	
          it('insert the data and match',function(done){
          	let schemaStub=sinon.stub(schema.prototype,'save');
		schemaStub.yields(null,[{name:"shefali",age:21,mobile:"85422525",course:"bca"}]);
	 	url.post('/save')
	 	.send({name:"",
	 		age:25,
	 		mobile:"85422525",
	 		course:"bca"})
	 	//.set('Accept', 'application/json')
	 	//.expect('Content-Type', 'application/json; charset=utf-8')
	 	.end(function(err,res){
	 		if(err){
	 			console.log("error");
	 		}
	 		else{
	 		
	 			res.body[0].should.have.property("name","shefali");
	 			done();
	 		}
	 	})

	})
          it('testing for update',(done)=>{
          	let updateSchema=sinon.stub(schema,'update');
            updateSchema.yields(null,[{ ok: 1,nModified:1,n: 1}]);
           	url.put('/updateUser/nikhil')
          	.send({course:"bca"})
          	.end((err,res)=>{
          		if(err){
          			console.log("error");
          		}
          		else{
          			console.log(res.body);
          			res.body[0].should.have.property("ok",1);
          			done();
          		}


          		

          	})
          })

          it('testing for delete',(done)=>{
let del=sinon.stub(schema,'remove');
del.yields(null,{ok: 1,n: 1});
url.delete('/del/nikhil')
.end((err,res)=>{
	if(err){
		console.log("error");
	}
	else{
		console.log(res.body);
		res.body.should.have.property("ok",1);
		done();
	}
})
          })



})

