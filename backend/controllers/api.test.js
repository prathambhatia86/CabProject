const request = require("supertest");
const { server_test } = require("../index")
const db = require("../config/db")


describe('tests', () => {
    beforeAll(async () => {
        await db();
    });
    afterAll(() => {
        //Terminate after all tests.
        setTimeout((function () {
            return process.kill(process.pid);
        }), 100);
    })

    //Token for making authenticated requests.
    let DriverToken = null;
    let AdminToken = null;

    //Login
    describe('TEST POST/adminLogin', () => {
        test('It should respond with 200 code', async () => {
            const credentials = {
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD
            }
            const res = await request(server_test)
                .post('/adminlogin')
                .send(credentials)
                .expect(200);
            AdminToken = res.body.user.token;
        })
    });
    describe('TEST POST/driverLogin', () => {
        test('It should respond with 200 code', async () => {
            const credentials = {
                email: process.env.SAMPLE_DRIVER_EMAIL,
                password: process.env.SAMPLE_DRIVER_PASSWORD
            }
            const res = await request(server_test)
                .post('/driverlogin')
                .send(credentials)
                .expect(200);
            DriverToken = res.body.user.token;
        })
    });


    //Testing Cab assignment and deassignment
    describe('TEST POST/assignCab', () => {
        test('It should respond with true if cab assigned else respond with false', async () => {
            const credentials = {
                email: process.env.SAMPLE_DRIVER_EMAIL,
                registration_no: process.env.REG_NO
            }
            await request(server_test)
                .post('/assignCab')
                .set('x-auth-token', AdminToken)
                .send(credentials).expect('true');
        })
    });
    describe('TEST POST/deassignCab', () => {
        test('It should respond with true if cab deassigned else respond with false', async () => {
            const credentials = {
                email: process.env.SAMPLE_DRIVER_EMAIL,
                registration_no: process.env.REG_NO
            }
            await request(server_test)
                .post('/deassignCab')
                .set('x-auth-token', AdminToken)
                .send(credentials)
                .expect('true');
        })
    });

});