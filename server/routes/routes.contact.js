import express, { Router } from "express";
export const contactRouter=Router()
import { sendEmail } from "../controller/controller.contact.js";

contactRouter.post("/",sendEmail)