// backend/routes/githubRoutes.js
import { Router } from 'express';
import { sendgit } from '../controller/controller.sendgit.js';

export const gitRouter=Router()


gitRouter.get('/contributions/:username',sendgit)