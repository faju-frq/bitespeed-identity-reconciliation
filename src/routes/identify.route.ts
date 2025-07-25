import express from 'express';
import { validateInput } from '../middlewares/validateInput';
import { identifyContact } from '../controllers/identify.controller';

const router = express.Router();

router.post('/identify',validateInput,identifyContact);

export default router;