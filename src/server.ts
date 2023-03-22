import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
// var logger1 = require('./config/winston')
// import logger1 from '../src/config/winston'
import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

import logger from 'jet-logger';
import { CustomError } from '@utils/errors';
import adminRoutesBE from './routes/admin/index';
import { connect, disconnect } from '@utils/database';
import '@models/index';
// require('./controllers/customer/customer_order')
// Constants
const app = express();

//Connect DB
connect();

/***********************************************************************************
 *                                  Middlewares  
 **********************************************************************************/

// Common middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


/***********************************************************************************
 *                         API routes and error handling
 **********************************************************************************/




// Admin api router
app.use('/api/v1/admin', adminRoutesBE);

// Error handling
app.use((err: Error | CustomError, _: Request, res: Response, __: NextFunction) => {
    logger.err(err, true);
    const status = (err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST);
    return res.status(status).json({
        error: err.message,
        message: err.message,
        code: status
    });
});


/***********************************************************************************
 *                                  Front-end content
 **********************************************************************************/

// Export here and start in a diff file (for testing).
export default app;