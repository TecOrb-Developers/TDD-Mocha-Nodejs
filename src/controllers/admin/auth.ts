import { adminModel, userSessionModel } from '@models/index';
import { CustomError } from '@utils/errors';
import StatusCodes from 'http-status-codes';
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');
import moment from 'moment-timezone';

// Admin registration
function registerAdmin(admin: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
        try {
            const pass = bcrypt.hashSync(admin.password, 10);
            admin.password = pass;
            const response:any = await adminModel.create(admin);
            resolve(response);
        } catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new CustomError('accountAlreadyExist', StatusCodes.BAD_REQUEST));
            }
            reject(err);
        }
    });
}

// Admin Login 
function login(body: any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { devicetoken, devicetype, timezone, language, currentversion } = headers;
            const { email, password } = body;
            const adminData: any = await adminModel.findOne({
                email
            });
            if (!adminData) {
                reject(new CustomError('noSuchAccount', StatusCodes.BAD_REQUEST));
            }
            if(adminData.isActive == false){
                reject(new CustomError('subAdminBlocked', StatusCodes.BAD_REQUEST));

            }else{
                var match = bcrypt.compareSync(password, adminData.password);
                if (match == false) {
                    reject(new CustomError('WrongPassword', StatusCodes.BAD_REQUEST));
                } else {
                    const token: string = jwt.sign({
                        id: adminData.id,
                        role: 'Admin'
                    }, process.env.JWT_SECRET_TOKEN, { expiresIn: '30d' });
                    const sessionObj = {
                        deviceType: devicetype,
                        timezone:timezone ,
                        language:language,
                        currentVersion:currentversion,
                        deviceToken: devicetoken,
                        role: "Admin",
                        jwtToken: token,
                        userId: adminData.id
    
                    }
                    var dateAndTime = moment().tz(timezone).format('DD/MM/YYYY HH:mm')
                    var time = moment().tz(timezone).format('HH:mm')
                    var date = moment().tz(timezone).format('DD/MM/YYYY')
                    await userSessionModel.updateMany({ "userId": adminData.id }, { $set: { "status": false } });
                    await adminModel.updateOne({ "_id": adminData.id }, { $set: { login_dateTime: dateAndTime ,login_date:date,login_time:time} });
                    await userSessionModel.create(sessionObj);
                    resolve({
                        token,
                        isUser: true,
                        isVerified: true,
                        isActive:adminData.isActive,
                        _id: adminData._id,
                        permission:adminData.permission,
                        role:adminData.role
                    });
                }
            }
          
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}




export default {
    registerAdmin,
    login
} as const;