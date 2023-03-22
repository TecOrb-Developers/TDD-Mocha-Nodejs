import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import adminController from '../../controllers/admin/auth';
import { verifyAuthToken, checkRole } from "../../utils/authValidator";

// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    add:'/signUp',
    login:'/login'
} as const;

/**
 * Admin registered SignUp
 */
 router.post(p.add, async (req: any, res: Response) => {
    const data = await adminController.registerAdmin(req.body);
    return res.status(CREATED).send({ data, code: CREATED, message:'success'});
});
/**
 * Admin login
 */
 router.post(p.login, async (req: any, res: Response) => {
    const data = await adminController.login(req.body,req.headers);
    return res.status(OK).send({ data, code: OK,message:'success'});
});

// Export default
export default router;