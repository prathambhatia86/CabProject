const request = require("supertest");
const { server_test } = require("../index")
const db = require("../config/db");


describe('Assignment API Tests', () => {
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
    //Cab is Assigned
    describe('TEST POST/assignCab', () => {
        test('It should respond with true if cab is assigned ', async () => {
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
    //Check after assignment
    describe('TEST POST/driverAssigned', () => {
        test('It should respond with true if driver is assigned ', async () => {
            const credentials = {
                registration_no: process.env.REG_NO
            }
            await request(server_test)
                .post('/checkDriverAssigned')
                .set('x-auth-token', AdminToken)
                .send(credentials).expect('true');
        })
    });
    describe('TEST POST/cabAssigned', () => {
        test('It should respond with true if cab is assigned ', async () => {
            const credentials = {
                email: process.env.SAMPLE_DRIVER_EMAIL
            }
            await request(server_test)
                .post('/checkCabAssigned')
                .set('x-auth-token', AdminToken)
                .send(credentials).expect('true');
        })
    });
    //Check right cab/driver is assigned.
    describe('TEST POST/getAssignedCab', () => {
        test('It should respond with the correct cab', async () => {
            const credentials = {
                email: process.env.SAMPLE_DRIVER_EMAIL
            }
            const res = await request(server_test)
                .post('/getAssignedCab')
                .set('x-auth-token', AdminToken)
                .send(credentials);
            expect(res.body.registration_no).toBe(process.env.REG_NO);
        })
    });
    describe('TEST POST/getAssignedDriver', () => {
        test('It should respond with the correct driver', async () => {
            const credentials = {
                registration_no: process.env.REG_NO
            }
            const res = await request(server_test)
                .post('/getAssignedDriver')
                .set('x-auth-token', AdminToken)
                .send(credentials);
            expect(res.body.email).toBe(process.env.SAMPLE_DRIVER_EMAIL);
        })
    });
    //Deassign Cab
    describe('TEST POST/deassignCabTrue', () => {
        test('It should respond with true if cab deassigned ', async () => {
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
    //Deassigning Again to check false return.
    describe('TEST POST/deassignCabFalse', () => {
        test('It should respond with false if cab not deassigned ', async () => {
            const credentials = {
                email: process.env.SAMPLE_DRIVER_EMAIL,
                registration_no: process.env.REG_NO
            }
            await request(server_test)
                .post('/deassignCab')
                .set('x-auth-token', AdminToken)
                .send(credentials)
                .expect('false');
        })
    });
    //Check after Deassignment
    describe('TEST POST/driverAssigned', () => {
        test('It should respond with false if driver is not assigned ', async () => {
            const credentials = {
                registration_no: process.env.REG_NO
            }
            await request(server_test)
                .post('/checkDriverAssigned')
                .set('x-auth-token', AdminToken)
                .send(credentials).expect('false');
        })
    });
    describe('TEST POST/cabAssigned', () => {
        test('It should respond with false if cab is not assigned ', async () => {
            const credentials = {
                email: process.env.SAMPLE_DRIVER_EMAIL
            }
            await request(server_test)
                .post('/checkCabAssigned')
                .set('x-auth-token', AdminToken)
                .send(credentials).expect('false');
        })
    });

});