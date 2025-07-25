import express from 'express';
import { validateInput } from '../middlewares/validateInput';
import { identifyContact,getAllContact } from '../controllers/identify.controller';

const router = express.Router();

router.post('/',validateInput,identifyContact);
router.get('/get',getAllContact)

export default router;