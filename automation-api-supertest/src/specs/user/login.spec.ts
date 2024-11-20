import * as supertest from "supertest";

const request = supertest('localhost:8001/api/v1')
import {getUser, user} from "../../data/user";
import {logIn, signUp} from "../../data/helpers";


describe('LOGIN', () => {
    let userImport;

    beforeAll(async () => {
        userImport = getUser();
        // Ensure the user is deleted before creating a new one
        await request.delete(`/users/${userImport.email}`);
        await signUp(userImport);
    });
    describe('POSITIVE TEST CASES', () => {
        // let userImport = getUser()
        it(' log in user', async () => {
            await logIn({
                email: userImport.email,
                password: userImport.password
            }).then(el => {
                // console.log(el.body);
                expect(el.body.status).toBe('success')
            })
        })


        describe('NEGATIVE TEST CASES', () => {
            it('should not log in user without username', async () => {
                // let userImport = getUser()
                await logIn({
                    password: userImport.password
                }).then(el => {
                    // console.log(el.body.message);
                    expect(el.body.status).toBe('fail')
                    expect(el.body.message).toBe('Please provide email and password!')
                })
            })
            it('should not log in user without password', async () => {
                // let userImport = getUser()
                await logIn({
                    email: userImport.email,
                }).then(el => {
                    expect(el.body.status).toBe('fail')
                    expect(el.body.message).toBe('Please provide email and password!')
                })
            })
            it('should not log in user with wrong password', async () => {
                // let userImport = getUser()
                await logIn({
                    email: userImport.email,
                    password: '123456'
                }).then(el => {
                    // console.log(el.body);
                    expect(el.body.error.statusCode).toBe(401)
                    expect(el.body.message).toBe('Incorrect email or password')
                })
            })
            it('should not log in user with wrong username', async () => {
                // let userImport = getUser()
                await logIn({
                    email: 'fdfdf',
                    password: userImport.password
                }).then(el => {
                    console.log(el.body);
                    expect(el.body.error.statusCode).toBe(401)
                    expect(el.body.message).toBe('Incorrect email or password')
                })
            })
        })
    })
})
