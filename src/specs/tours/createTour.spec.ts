import * as supertest from "supertest";
import {getUser} from "../../data/user";
import {signUp} from "../../data/helpers";
import {faker} from '@faker-js/faker';
import {tour} from "../../data/tour";


const request = supertest('localhost:8001/api/v1')
describe('TOURS', () => {
    it.skip('create tour - hardcode', async () => {
        let userImport = getUser('admin');
        const res = await signUp(userImport);
        expect(res.body.status).toBe('success')
        const cookie = res.headers['set-cookie'][0];
        await request
            .post('/tours')
            .set('Cookie', cookie)
            .send({
                name: "The Forest Hiker123",
                duration: 10,
                description: "Could be",
                maxGroupSize: 10,
                summary: "Test tour",
                difficulty: "easy",
                price: 100,
                rating: 4.8,
                imageCover: "tour-1-cover.jpg",
                ratingsAverage: 4.9,
                guides: [],
                startDates: ["2024-04-04"],
                startLocation: {
                    type: "Point",
                    coordinates: [-74.005974, 40.712776],
                },
            }).then(el => {
                console.log(el.body, 'el.body');
                expect(el.body.status).toBe('success')
            })
    })

    it.skip('create tour using tour function', async () => {
        let userImport = getUser('admin');
        let newTour = tour()
        const res = await signUp(userImport);
        expect(res.body.status).toBe('success')
        const cookie = res.headers['set-cookie'];
        await request
            .post('/tours')
            .set('Cookie', cookie)
            .send(newTour).then(el => {
                console.log(el.body, 'el.body');
                expect(el.body.status).toBe('success')
            })
    })

    it('create tour with lead-guide role', async () => {

    })

    describe('NEGATIVE TEST CASES', () => {
        it('should not create tour with incorrect role', async () => {

        })
        it('should not create tour without required fields', async () => {

        })
        //validation
        it('should not create tour when validation is not met', async () => {

        })

    })
})
