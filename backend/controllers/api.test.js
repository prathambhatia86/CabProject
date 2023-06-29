const request=require("supertest");
const {server_test}=require("../index")
const db=require("../config/db")
describe('tests',()=>{
    beforeAll(async()=>{
      await  db();
    });
   
    describe('TEST POST/adminLogin',()=>{
        test('It should respond with 200 code',async()=>{
            const credentials={
                email:process.env.ADMIN_EMAIL,
                password:process.env.ADMIN_PASSWORD
            }
            const response=await request(server_test)
            .post('/adminlogin')
            .send(credentials)
            .expect(200);
        })
    })
});