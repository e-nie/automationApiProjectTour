import * as supertest from "supertest";

const request = supertest('localhost:8001/api/v1')

// export async function signUp(user: string | object | undefined){
//     await request.post('/users/signup').send(user)
// }


//Mischa says it is better to use promise than async await
export function signUp(user: string | object | undefined): Promise<any> {
    return  new Promise((resolve, reject) => {
         request
             .post('/users/signup')
             .send(user)
             .end((err, res) => {
                 if (err) return reject(err)
                 resolve(res)
             })
    })
}

// export async function logIn(user: string | object | undefined) {
//     await request.post('/users/login').send(user)
// }

//to work with done()
export  function logIn1(user: string | object | undefined){
    return request.post('/users/login').send(user)
}


export function logIn(user: string | object | undefined): Promise<any> {
    return new Promise((resolve, reject) => {
        request
            .post('/users/login')
            .send(user)
            .end((err, res) => {
                if (err) return reject(err)
                resolve(res)
            })
    })
}


