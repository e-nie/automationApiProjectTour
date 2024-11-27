import * as supertest from "supertest";
import {signUp, tourFunction} from "../../data/helpers";
import {getUser} from "../../data/user";
import {tour} from "../../data/tour";

const request = supertest('localhost:8001/api/v1')

describe('REVIEW', () => {
    it('create review', async () => {
        let cookie;
        let userId;
        let tourId;
        const userImport = getUser('admin')
        const newTour = tour()
        await signUp(userImport).then(el => {
            expect(el.body.status).toBe('success')
            console.log(el, 'RES');
            cookie = el.headers['set-cookie'];
            userId = el.body.data.user._id
        })
        await tourFunction(cookie, newTour)
            .then(el => {
                console.log(el.body, 'el.body');
                expect(el.body.status).toBe('success')
                tourId = el.body.data.data._id
            })
        await request
            .post('/reviews')
            .set('Cookie', cookie)
            .send({
                review: "I love this tour",
                rating: 5,
                tour: tourId,
                user: userId
            })
            .then(el => {
                console.log(el.body, 'el.body');
                expect(el.body.status).toBe('success')
                expect(el.body.data.data.review).toBe('I love this tour')
                expect(el.body.data.data.rating).toBe(5)
                expect(el.body.data.data.tour).toBe(tourId)
            })
    })
})
