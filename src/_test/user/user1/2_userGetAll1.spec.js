const { expect } = require("chai");
const { userGetByIdQ } = require('./queries')
const { user} = require("./data");
const User = require('../../../modules/users/Model')
const gqlRequest = require('../gqlRequest')

let respData = null;
let postData = null

describe('USER GET BY ID', () => {
  describe('USER GET BY ID - POSITIVE TESTS', () => {
    it('user get by id', (done) => {
      postData = {
        query: userGetByIdQ,
        variables: {
          userId: '66bacfcc007e35b541f75d6c'
        }
      }
      gqlRequest(postData)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          respData = res.body.data.userGetById
          console.log(respData);
          expect(respData._id).eq('66bacfcc007e35b541f75d6c')
         done()
    })
  })
})

  // describe('USER GET BY ID - NEGATIVE TESTS', () => {
  //
  // })
})
