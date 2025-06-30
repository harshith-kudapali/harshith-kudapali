import express  from "express"
import morgan from "morgan"
import cors from "cors"
import { contactRouter } from "./routes/routes.contact.js"
const app = express();
app.use(morgan('dev'))
// Enable CORS for all origins (or specify the one you need)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // if using cookies
}));

// Other middlewares
app.use(express.json());
app.use('/api/contact',contactRouter)
// Your routes


app.listen(3000, () => {
  console.log('Backend running on http://localhost:3000');
});
