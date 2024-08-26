const mongoose = require('mongoose');
const { expect } = require("chai");
const { userCreateQ } = require('./queries');
const { user } = require('./data');
const User = require('../../../modules/users/Model');
const gqlRequest = require('../gqlRequest');
require('dotenv').config();

const dbUrl = process.env.MONGODB
let postData = null;
let respData = null;

describe(' === DELETE ALL USERS ===', () => {
  before(async function() {
    this.timeout(30000); // Increase timeout if necessary
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(dbUrl);
    }
  });

  it('should delete all users', async () => {
    const result = await User.deleteMany({});
    console.log(` --- - -> ${result.deletedCount} users deleted <- - ---`);
  });
});

describe(' === USER CREATE === ', () => {
  it('user create all fields', (done) => {
    postData = {
      query: userCreateQ,
      variables: user
    };
    gqlRequest(postData)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        respData = res.body.data.userCreate;
        process.env.USER_ID = respData._id;
        console.log(respData);
        console.log("USER ID === ",process.env.USER_ID);
        done();
      });
  });
});
