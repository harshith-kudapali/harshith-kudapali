import express from 'express';
import { getCertifications , createCertification} from '../controller/certifications.controller.js';
const certirouter = express.Router();

certirouter.get('/', getCertifications);
certirouter.post('/', createCertification);

export default certirouter;