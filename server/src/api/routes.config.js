import express from 'express';
import AccountRouter from './accounts/accounts.routes';

const router = express.Router();

router.use('/accounts', AccountRouter);

export default router;
