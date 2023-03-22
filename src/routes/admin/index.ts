import { Router } from 'express';
import authRoute from './admin_auth';

const baseRouter = Router();

// Setup routers
baseRouter.use('/auth', authRoute)
// Export default.
export default baseRouter;