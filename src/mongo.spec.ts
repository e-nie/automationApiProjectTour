import * as supertest from "supertest";
import {signUp} from "../src/data/helpers";
import {getUser} from "../src/data/user";

const {MongoClient, ObjectId} = require("mongodb");

const request = supertest('localhost:8001/api/v1')

const DATABASE_URL = "mongodb+srv://Evan:pass1234@cluster0.pebdvbw.mongodb.net/"

describe('MONGO', () => {
    let connection
    let db
    beforeAll(async () => {
        try {
            connection = await MongoClient.connect(DATABASE_URL, {
                // useNewUrlParser: true,
                // useUnifiedTopology: true
            })
            db = await connection.db()
        } catch (e) {
            // console.log("Error connecting to the database : ", e);
        }
    })
    afterAll(async () => {
        await connection.close()
    })

    it('should find the document', async () => {
        const users = db.collection('users')
        // console.log(users, '=====================users=====================');
        const user = await users.findOne({name: "Shanny_Sanford"})// finds the first one
        // const user = await users.findMany({name: "GROWN"})//finds all - does not work
        // console.log('====================user====================', user);
        expect(user.name).toBe('Shanny_Sanford')
    });

    it.only('verify that user was deleted in mongoDB', async () => {
        const userImport = getUser()
        // console.log(userImport);//Uppercase email by faker
        try {
            const res = await signUp(userImport)
            // console.log('====================res====================', res.body);
            expect(res.statusCode).toBe(201)
            const users = db.collection('users')
            const userData = await users.findOne({name: userImport.name})
            // console.log(userData);
            if (!userData) {
                throw new Error('User was not found in MongoDB');
            }
            expect(userData.name).toBe(userImport.name)//lowercase name received from DB
            expect(userData.email).toBe(userImport.email.toLowerCase())
            expect(userData.role).toBe('user')
            expect(userData._id.toString()).toEqual(res.body.data.user._id)
            let deleteData = await users.deleteOne({_id: new ObjectId(userData._id)})
            // console.log('====================deleteData====================', deleteData)
            expect(deleteData.deletedCount).toBe(1)
            expect(deleteData.acknowledged).toBe(true)
            let findUser = await users.findOne({_id: userData._id})
            expect(findUser).toBeNull()
        } catch (e) {
            console.log('================ERROR in user creation=============', e);
        }
    })
})
