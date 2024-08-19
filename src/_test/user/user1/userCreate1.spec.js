const { expect } = require("chai");
const { userCreateQ } = require('./queries')
const { user } = require('./data')
const User = require('../../../models/User')
const gqlRequest = require('../gqlRequest')

let respData = null;
let postData = null;
let hook = 'beforeHook'
before('DELETE MANY', () => {
  User.deleteMany({})
  console.log("users are deleted");
})
describe('USER CREATE', () => {

  describe('USER CREATE - POSITIVE TESTS', () => {
    before('BEFORE ALL HOOK', () => {
      console.log(hook)
    })

    it('user create all fields -1',
      (done) => {
        postData = {
          query: userCreateQ,
          variables: user
        }
        gqlRequest(postData)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err)
            respData = res.body
            console.log(respData);
            // expect(respData.firstName).eq(user.userInput.firstName)
            // expect(respData.lastName).eq(user.userInput.lastName)
            done()
          })
      })

    it('user create all fields -2',
      (done) => {
        postData = {
          query: userCreateQ,
          variables: user
        }
        gqlRequest(postData)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err)
            respData = res.body
            //console.log(respData);
            done()
          })
      })

    it('user create all fields -3',
      (done) => {
        postData = {
          query: userCreateQ,
          variables: user
        }
        gqlRequest(postData)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err)
            respData = res
            // console.log(respData);
            // expect(respData.firstName).eq(user.userInput.firstName)
            // expect(respData.lastName).eq(user.userInput.lastName)
            done()
          })
      })
  })
})

//     it('user create all fields', ()=> {
//
//     })
//   })
//
//   describe('USER CREATE - NEGATIVE TESTS', () => {
//     it('user create all fields', ()=> {
//
//     })
//
//     it('user create all fields', ()=> {
//
//     })
//
//     it('user create all fields', ()=> {
//
//     })
//
//   })
//})
