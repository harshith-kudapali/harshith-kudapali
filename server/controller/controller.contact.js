import dotenv from 'dotenv';

export const sendEmail = async (req, res) => {
    const { name, email, subject, message } = req.body;

    dotenv.config();

    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const text = `
    <b>New Contact Form Submission:</b>

<b>Name:</b> ${name}

<b>Email:</b> ${email}

<b>Subject:</b> ${subject}

<b>Message:</b> ${message}`;

    try {
        const telegramResponse = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: 'HTML'
            })
        });

        if (!telegramResponse.ok) {
            throw new Error('Failed to send Telegram message');
        }

        res.status(200).json({ success: true, message: 'Message sent to Telegram successfully' });
    } catch (error) {
        console.error('Telegram Error:', error.message);
        res.status(500).json({ success: false, error: 'Failed to send message to Telegram' });
    }
};