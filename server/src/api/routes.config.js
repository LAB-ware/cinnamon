import express from "express";
import AccountRouter from "./accounts/accounts.routes";

const router = express.Router();

router.use("/accounts", AccountRouter);
// router.use('/auth', AuthRouter);
// router.use('/profiles', ProfileRouter);
// router.use('/drops', DropRouter);

export default router;
