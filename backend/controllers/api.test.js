const request = require("supertest");
const { server_test } = require("../index")
const db = require("../config/db");
const Driver_collection = require("../models/drivers.model");
const Cab_collection = require("../models/cabs.model");


describe('Assignment API Tests', () => {
    beforeAll(async () => {
        await db();
    });

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

describe('driverRegistration and driverUpdation API Tests', () => {

    //Token for making authenticated requests.
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

    //Create a new Driver
    describe('TEST POST/driverRegistration', () => {
        test('It should respond with true if driver is created ', async () => {
            const credentials = {
                email: 'Sample@gmail.com',
                password: 'SamplePassword',
                contact: '0123456789',
                name: 'Driver'
            }
            await request(server_test)
                .post('/driverRegistration')
                .set('x-auth-token', AdminToken)
                .send(credentials).expect('true');
        })
    });
    //Check email exists now
    describe('TEST POST/checkDriverLogin', () => {
        test('It should respond with true if driver exists ', async () => {
            const credentials = {
                email: 'Sample@gmail.com'
            }
            await request(server_test)
                .post('/checkDriverLogin')
                .set('x-auth-token', AdminToken)
                .send(credentials).expect('true');
        })
    });
    //Get all drivers and check the current driver exists in it.
    describe('TEST POST/getNames', () => {
        test('It should contain created driver', async () => {
            const res = await request(server_test)
                .get('/driverNames')
                .set('x-auth-token', AdminToken);
            let exists = false;
            for (let k of res.body) {
                if (k.email === 'Sample@gmail.com') exists = true;
            }
            expect(exists).toBe(true);
        })
    });
    //Update Driver Name
    describe('TEST POST/driverUpdate', () => {
        test('It should contain created driver', async () => {
            const doc = await Driver_collection.findOne({ email: 'Sample@gmail.com' });
            const credentials = {
                id: doc._id,
                email: 'Sample@gmail.com',
                password: 'SamplePassword',
                contact: '0123456789',
                name: 'Driver 2'
            }
            const res = await request(server_test)
                .post('/driverUpdate')
                .set('x-auth-token', AdminToken)
                .send(credentials);
            expect(res.body.matchedCount).toBeGreaterThan(0);
        })
    });
    //Get all non assigned drivers and check the current driver exists in it with the new na,e.
    describe('TEST POST/driverNonAssignedNames', () => {
        test('It should contain created driver', async () => {
            const res = await request(server_test)
                .get('/driverNonAssignedNames')
                .set('x-auth-token', AdminToken);
            let exists = false;
            let name = null;
            for (let k of res.body) {
                if (k.email === 'Sample@gmail.com') exists = true, name = k.name;
            }
            expect(exists).toBe(true);
            expect(name).toBe('Driver 2');
        })
    });

    //Cannot be tested without knowing _id
    describe('TEST DELETE/deleteDriver', () => {
        test('It should respond with true if driver is deleted ', async () => {
            const doc = await Driver_collection.findOne({ email: 'Sample@gmail.com' });
            const credentials = {
                id: doc._id
            }
            await request(server_test)
                .delete('/deleteDriver')
                .set('x-auth-token', AdminToken)
                .send(credentials).expect(200);
        })
    });
});

describe('cabRegistration and cabUpdation API Tests', () => {
    afterAll(() => {
        //Terminate after all tests.
        setTimeout((function () {
            return process.kill(process.pid);
        }), 100);
    })

    //Token for making authenticated requests.
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
    let today = new Date();
    today.setDate(today.getDate() + 10);
    //Create a new Driver
    describe('TEST POST/addCab', () => {
        test('It should respond with true if cab is created ', async () => {
            let values = {
                registration_no: 'HR 23 HR 2332',
                model: 'Toyota',
                capacity: 12,
                color: 'Red',
                odometer: 423
            }
            values.insurance = {
                policy_number: '3244',
                company: 'Company',
                expires: today,
                next_payment: today,
                amount: 1000,
            }
            values.pollution = {
                id: 'Sample ID',
                expires: today,
            }
            await request(server_test)
                .post('/addCab')
                .set('x-auth-token', AdminToken)
                .send(values).expect('true');
        })
    });
    //Check email exists now
    describe('TEST POST/checkCabExists', () => {
        test('It should respond with true if cab exists ', async () => {
            let values = {
                registration_no: 'HR 23 HR 2332',
                model: 'Toyota',
                capacity: 12,
                color: 'Red',
                odometer: 423
            }
            values.insurance = {
                policy_number: '3244',
                company: 'Company',
                expires: today,
                next_payment: today,
                amount: 1000,
            }
            values.pollution = {
                id: 'Sample ID',
                expires: today,
            }
            await request(server_test)
                .post('/checkCabExists')
                .set('x-auth-token', AdminToken)
                .send(values).expect('true');
        })
    });
    //Get all cabs and check the current cab exists in it.
    describe('TEST POST/cabNames', () => {
        test('It should contain created driver', async () => {
            const res = await request(server_test)
                .get('/cabNames')
                .set('x-auth-token', AdminToken);
            let exists = false;
            for (let k of res.body) {
                if (k.registration_no === 'HR 23 HR 2332') exists = true;
            }
            expect(exists).toBe(true);
        })
    });
    //Update Driver Name
    describe('TEST POST/updateCab', () => {
        test('It should contain created driver', async () => {
            const doc = await Cab_collection.findOne({ registration_no: 'HR 23 HR 2332' });
            let values = {
                id: doc._id,
                registration_no: 'HR 23 HR 2332',
                model: 'Toyota',
                capacity: 12,
                color: 'Blue',
                odometer: 423
            }
            values.insurance = {
                policy_number: '3244',
                company: 'Company',
                expires: today,
                next_payment: today,
                amount: 1000,
            }
            values.pollution = {
                id: 'Sample ID',
                expires: today,
            }
            const res = await request(server_test)
                .post('/updateCab')
                .set('x-auth-token', AdminToken)
                .send(values);
            expect(res.body.matchedCount).toBeGreaterThan(0);
        })
    });

    //Cannot be tested without knowing _id
    describe('TEST DELETE/deleteCab', () => {
        test('It should respond with true if driver is deleted ', async () => {
            const doc = await Cab_collection.findOne({ registration_no: 'HR 23 HR 2332' });
            let values = {
                id: doc._id
            }
            await request(server_test)
                .post('/deleteCab')
                .set('x-auth-token', AdminToken)
                .send(values).expect(200);
        })
    });
});