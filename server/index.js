import express  from "express"
import morgan from "morgan"
import cors from "cors"
import { contactRouter } from "./routes/routes.contact.js"
import { leetRouter } from "./routes/routes.leet.js"




const app = express();
app.use(morgan('dev'))
// Enable CORS for all origins (or specify the one you need)
app.use(cors({
  origin: 'https://harshithkudapali.vercel.app',
  credentials: true // if using cookies
}));

// Other middlewares
app.use(express.json());
app.use('/api/contact',contactRouter)
// app.use('/api/github/contributions/:userID',gitRouter)
app.use('/api/leetcode/',leetRouter)
// Your routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});


app.listen(3000, () => {
  console.log('Backend running on http://localhost:3000');
});
