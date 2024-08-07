const request = require ('supertest')
const url = 'http://localhost:5000'

function gqlRequest(postData) {
  return request(url)
    .post('/')
    .send(postData)
}

module.exports = gqlRequest
