import { Router } from "express";
import axios from "axios"


import dotenv from 'dotenv';
    dotenv.config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;


export const getotpRouter=async (req, res) => {
  // Generate a random 4-digit number
  const code = Math.floor(1000 + Math.random() * 9000);

const message = `🔐 Your verification code is: ${code} \n Date: ${new Date().toLocaleString()}`;

  try {
    // Send the message via Telegram Bot API
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message
    });

    // Send response back to the client
    res.json({ success: true, code });
  } catch (error) {
    console.error('Telegram Error:', error.response?.data || error.message);
    res.status(500).json({ success: false, error: 'Failed to send message via Telegram' });
  }
}

