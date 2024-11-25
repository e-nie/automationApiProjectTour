import {faker} from '@faker-js/faker';
import {User} from "./interface";

let password = faker.internet.password();// to avoid the error of password not matching
export const user:User = {
    "name": faker.internet.username(),
    "email": faker.internet.email(),
    "password": password,
    "passwordConfirm": password
}
//example of creating a random user from faker documentation - only required fields
export function getUser(role:string):User {
    let password = faker.internet.password();// to avoid the error of password not matching
    return {
        "name": faker.internet.username(),
        "email": faker.internet.email(),
        "password": password,
        "passwordConfirm": password,
        "role": role

    }
}

//example of creating a random user from faker documentation - all fields
export function createRandomUser() {
    return {
        userId: faker.string.uuid(),
        username: faker.internet.username(), // before version 9.1.0, use userName()
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
    };
}
