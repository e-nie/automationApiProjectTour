import * as supertest from "supertest";

const request = supertest('localhost:8001/api/v1')
import {getUser, user} from "../../data/user";
import {logIn, signUp} from "../../data/helpers";


describe('LOGIN', () => {
    describe('POSITIVE TEST CASES', () => {
        let userImport = getUser()
        it(' log in user', async () => {
            await signUp(userImport)
                .then(el => {
                    console.log(el.body);
                    expect(el.body.status).toBe('success')
                    expect(el.body.data.user).toHaveProperty('_id')
                })
            await logIn({
                email: userImport.email,
                password: userImport.password
            }).then(el => {
                console.log(el.body);
                expect(el.body.status).toBe('success')
            })
        })
    })

    describe('NEGATIVE TEST CASES', () => {
        it('should not log in user without username', async () => {
            let userImport = getUser()
            await logIn({
                password: userImport.password
            }).then(el => {
                expect(el.body.status).toBe('fail')
            })
        })
        it('should not log in user without password', async () => {
            let userImport = getUser()
            await logIn({
                email: userImport.email,
            }).then(el => {
                expect(el.body.status).toBe('fail')
            })
        })
        it('should not log in user with wrong password', async () => {
            let userImport = getUser()
            await logIn({
                email: userImport.email,
                password: '123456'
            }).then(el => {
                expect(el.body.status).toBe('fail')
            })
        })
        it('should not log in user with wrong username', async () => {
            let userImport = getUser()
            await logIn({
                email: '',
                password: userImport.password
            }).then(el => {
                expect(el.body.status).toBe('fail')
            })
        })
    })
})
