import chai from "chai";
import chaiHttp from "chai-http";
chai.use(chaiHttp);
import { expect } from "chai";
import request from "request";
import { StatusCodes } from "http-status-codes";
import { func } from "joi";
import exp from "constants";
import { Console } from "console";
const { OK, CREATED } = StatusCodes
var base_url = "http://1.124.12.22:3009/api/v1/admin/"
var jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNWExMmYxMzJlNmI0YTFiZWE1NjFjZiIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY3NjQ0ODIwOSwiZXhwIjoxNjc5MDQwMjA5fQ.bXHcqX0qLuqWQcMd_LAvhEhfzSGVE8pkAuKlcPltB9E"

//Admin Authentication ******************************
describe('Admin Authentication ***********************************', () => {
    //lOGIN
    describe('Login-------------------', () => {
        it('login api', (done) => {
            request.post(base_url + "" + 'auth/login', {
                json: true, headers: { 'timezone': 'Asia/Kolkata' }, body: {
                    "password": "1234qww56",
                    "email": "admiqqn@gmail.com"
                }
            },
                function (err: any, body: any, res: any) {
                    expect(res.code).to.be.eq(OK);
                    expect(res.message).to.be.eq('success');
                    expect(res.data).to.have.property('token');
                    expect(res.data).to.have.property('role');
                    done();
                })
        })
    });

});

