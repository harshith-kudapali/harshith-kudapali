import { Router } from "express";
import { sendLeet } from "../controller/controller.sendLeet.js";
export const leetRouter = Router();

leetRouter.get('/stats/:username', sendLeet)