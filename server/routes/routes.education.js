import express from 'express';
import { getEducation,createEducation } from '../controller/education.controller.js';

const edurouter = express.Router();

edurouter.get('/', getEducation);
edurouter.post('/', createEducation);

export default edurouter;

