import * as supertest from "supertest";

const request = supertest('localhost:8001/api/v1')
import {getUser, user} from "../../data/user";
import {logIn, logIn1, signUp} from "../../data/helpers";


describe('LOGIN', () => {
    let userImport: ReturnType<typeof getUser>;

    beforeAll(async () => {
        userImport = getUser();
        // Ensure the user is deleted before creating a new one:
        // await request.delete(`/users/${userImport.email}`);
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

        it(' log in user  - option#2 - using try/catch', async () => {
            try {
                await logIn({
                    email: userImport.email,
                    password: userImport.password
                })
            } catch (error) {
                console.log(error.response.body);
                expect(error.response.body.status).toBe('fail')
                expect(error.response.body.error.statusCode).toBe(401)
                expect(error.response.body.message).toBe('Incorrect email or password')
            }
        })

        it(' log in user  - option#3 - using THEN', async () => {
            let errorBody
            await logIn({
                email: userImport.email,
                password: userImport.password
            }).then(res => {
                // console.log(res);
                expect(res.statusCode).toBe(200)
            }).catch(err => {
                errorBody = err.response.body
                console.log(err.response.body);
                expect(err.response.body.status).toBe('fail')
                expect(err.response.body.error.statusCode).toBe(401)
                expect(err.response.body.message).toBe('Incorrect email or password')
            }).finally(() => {
                if (errorBody) {
                    console.log(errorBody);
                }
            })
        })
//we rewrite our logIn helper function to use done, because  .end is a supertest method. But previous func returned Promise
        it(' log in user  - option#4 - using DONE and .end - without promise', (done) => {
            logIn1(userImport)
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res.body.status).toBe('success')
                    done()
                })
        })

        // it(' log in user  - option#4 - using DONE and .end - without promise', (done) => {
        //
        //
        // })
    })


    //=========================================================================================================

    describe.skip('NEGATIVE TEST CASES', () => {
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


