
// const expect = chai.expect()
import chai, { expect, should } from "chai";
import { assert } from "chai";
import request from "request";

//test
var a = 2;
var b = 'fix'
describe('testing********', () => {
    it('if a is equal to 2', (done) => {
        expect(a).to.be.eq(2)
        assert.equal(a, 2, 'equal');
        assert.equal(b, 'fix', 'equal') //assert
        // a.should.to.be('2')
        done();
    });
});

//test cases for login api
var base_url = 'http://3.110.75.42:3009/admin' //enter base url here
describe('testing********', () => {
    it('Login api', (done) => {
        request.post(base_url + "" + '/auth/login', {
            json: true, headers: { 'timezone': "Asia/kolkata" }, body: {
                "email": "admin@gmail.com",
                "password": "123456"
            }
        },
            function (err: any, body: any, res: any) {
                expect(res.code).to.be.eq(200)
                expect(res.message).to.be.eq('Success');
                expect(res.data).to.have.property('token');
                done();
            });
    });
});