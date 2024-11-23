import * as supertest from "supertest";
import {user, getUser} from "../../data/user";


const request = supertest('localhost:8001/api/v1')

//create user without helper, without data
describe('USER SIGN UP', () => {
    describe('POSITIVE TEST CASES', () => {
        it.skip('Create a new user', async () => {
            const res = await request.post('/users/signup')
                .send({
                    "name": "GROWN",
                    "email": "kynahuli6@mailinator.com",
                    "password": "123456789",
                    "passwordConfirm": "123456789"
                }).expect(201)
            expect(res.body.data.user.name).toBe('GROWN')
            expect(res.body.data.user.email).toBe('kynahuli6@mailinator.com')//change email each time
            expect(res.body.status).toBe('success')
            console.log('res: ', res.body);
        })

        //create user with hard coded data from user.ts
        it('Create user again', async () => {
            const res = await request.post('/users/signup')
                .send(user).expect(201)
            expect(res.body.data.user.name).toBe('GROWN')
            expect(res.body.data.user.email).toBe('kynahuli7@mailinator.com')//we need to change email each time
            expect(res.body.status).toBe('success')
            console.log('res: ', res.body);
        })

        //create user with faker ie with random dynamic data using helper function getUser
        it('Create user with faker and helper', function (done) {
            let userImport = getUser()
            request.post('/users/signup')
                .send(userImport).expect(201)
                .end(function (err, res) {
                    if (err) return done(err)
                    console.log('body:', res.body);
                    console.log(userImport);
                    expect(res.body.data.user.name).toBe(userImport.name)
                    expect(res.body.data.user.email).toBe(userImport.email.toLowerCase())
                    expect(res.body.status).toBe('success')
                    done()
                })

        })
    })

    describe('NEGATIVE TEST CASES', () => {
        it('should not create a new user with existing email', async () => {
         const res =    await request.post('/users/signup').send({
             "name": "GROWN",
             "email": "kynahuli6@mailinator.com", // 100% existing email
             "password": "123456789",
             "passwordConfirm": "123456789"
         }).expect(500)
            expect(res.body.status).toBe('error')
            expect(res.body.message).toBe("E11000 duplicate key error collection: test.users index: email_1 dup key: { email: \"kynahuli6@mailinator.com\" }" )
        })
        it.only('should not create a new user without email', async () => {
            const res =    await request.post('/users/signup').send({
                "name": "GROWN",
                // "email": "kynahuli6@mailinator.com",
                "password": "123456789",
                "passwordConfirm": "123456789"
            }).expect(500)
            // console.log('BODY: ', res.body);
            expect(res.body.status).toBe('error')
            expect(res.body.message).toBe('User validation failed: email: Please provide your email' )
        })
    })
})
