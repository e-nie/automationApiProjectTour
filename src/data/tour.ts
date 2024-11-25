import {faker} from "@faker-js/faker";
import {Tour} from "./interface";


export function tour():Tour{
            return {
                images: [],
                name: faker.lorem.word({length: {min: 10, max: 20}}),
                duration: 10,
                description: "Could be",
                maxGroupSize: 10,
                summary: "Test tour",
                difficulty: difficulty(),
                price: 100,
                rating: 4.8,
                imageCover: "tour-3-cover.jpg",
                ratingsAverage: 4.9,
                guides: [],
                startDates: ["2024-04-04"],
                startLocation: {
                    type: "Point",
                    coordinates: [-74.005974, 40.712776],
                },
            }
        }

        function difficulty() {
            const array = ['easy', 'medium', 'difficult']
            const index = Math.floor(Math.random() * array.length)
            return array[index]
        }

