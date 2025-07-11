import express from 'express';
import {
    getProgrammingSkills,
    getWebSkills,
    getOtherSkills,
    createSkill
} from '../controller/skills.controller.js';

const skillrouter = express.Router();

skillrouter.get('/programming', getProgrammingSkills);
skillrouter.get('/web', getWebSkills);
skillrouter.get('/other', getOtherSkills);
skillrouter.post('/', createSkill);

export default skillrouter;