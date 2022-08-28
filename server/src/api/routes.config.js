import express from 'express';
import AccountRouter from './accounts/accounts.routes';
import CinnamonRouter from './cinnamons/cinnamons.routes';

const router = express.Router();

router.use('/accounts', AccountRouter);
router.use('/cinnamons', CinnamonRouter);

export default router;
