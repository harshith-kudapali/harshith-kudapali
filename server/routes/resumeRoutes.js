// routes/resumeRoutes.js
import express from 'express';
import { getResumes, addResume, saveAnnotations } from '../controller/resumeController.js';

const router = express.Router();

router.get('/', getResumes);
router.post('/', addResume);
router.put('/:id/annotations', saveAnnotations);

export default router;
