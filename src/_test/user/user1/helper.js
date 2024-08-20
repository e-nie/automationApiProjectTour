const { userCreateQ } = require('./queries')
const { user } = require('./data')
const User = require('../../../models/User')
const gqlRequest = require('../gqlRequest')

process.env.USER_ID = null
let postData = null;
let respData = null

before('DELETE MANY', () => {
  User.deleteMany({})
  console.log("ALL USERS ARE DELETED");
})

describe('USER CREATE', () => {
  it('user create all fields',
    (done) => {
      postData = {
        query: userCreateQ,
        variables: user
      }
      gqlRequest(postData)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          respData = res.body.data.userCreate
          process.env.USER_ID = respData._id
          console.log(respData);
          done()
        })
    })
})
