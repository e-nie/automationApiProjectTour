import * as supertest from "supertest";
import {user} from "../../data/user";

const request = supertest('localhost:8001/api/v1')


describe('USER SIGN UP', () => {
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

    it('Create user again', async () => {
        const res = await request.post('/users/signup')
            .send(user).expect(201)
        expect(res.body.data.user.name).toBe('GROWN')
        expect(res.body.data.user.email).toBe('kynahuli7@mailinator.com')//change email each time
        expect(res.body.status).toBe('success')
        console.log('res: ', res.body);
    })
})
