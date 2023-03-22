const jwt = require('jsonwebtoken');
import StatusCodes from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import {  userSessionModel, adminModel } from '@models/index'
import { errors } from '@constants'

const verifyAuthToken = async (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            error: errors.en.noToken,
            message: errors.en.noToken,
            code: StatusCodes.UNAUTHORIZED
        })
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        if (verified.role == 'Admin') {
            const admin = await adminModel.findOne({ _id: verified.id }, { isActive: 1 })
            if (admin?.isActive) {
                req.user = verified;
                next()
                return
            } else {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    error: errors.en.accountBlocked,
                    message: errors.en.accountBlocked,
                    code: StatusCodes.UNAUTHORIZED
                })
            }

        }
    } catch (err) {
        if (err.message == "jwt expired") {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                error: errors.en.sessionExpired,
                message: errors.en.sessionExpired,
                code: StatusCodes.UNAUTHORIZED
            })
        }
        return res.status(StatusCodes.UNAUTHORIZED).json({
            error: errors.en.noToken,
            message: errors.en.noToken,
            code: StatusCodes.UNAUTHORIZED
        })
    }
}

const checkRole = (roles: string[]) => {
    return (req: any, res: Response, next: NextFunction) => {
        if (roles.includes(req.user.role)) {
            next()
        }
        else {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                error: errors.en.unAuthRole,
                code: StatusCodes.UNAUTHORIZED
            })
        }
    }
}
export {
    verifyAuthToken,
    checkRole
}