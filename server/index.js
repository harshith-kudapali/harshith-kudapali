import express  from "express"
import morgan from "morgan"
import cors from "cors"
import { contactRouter } from "./routes/routes.contact.js"
import { leetRouter } from "./routes/routes.leet.js"
import { gitRouter } from "./routes/routes.github.js"
import { getotpRouter } from "./routes/routes.getotp.js"
import { createProjectRouter } from "./routes/routes.createProject.js"
import { projectsRouter } from "./routes/routes.projects.js"
import skillrouter from "./routes/routes.skills.js"
import edurouter from "./routes/routes.education.js"
import certirouter from "./routes/routes.certifications.js"
import resumeRoutes from './routes/resumeRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import dotenv from 'dotenv'
dotenv.config()

import { logVisitor } from './middleware/visitorLogger.js';
import visitorRoutes from './routes/visitorRoutes.js';

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
app.use('/api/github/',gitRouter)
app.use('/api/leetcode/',leetRouter)
 app.use('/api/getotp',getotpRouter)
app.use('/api/createProject',createProjectRouter)
app.use('/api/projects',projectsRouter)
app.use('/api/skills',skillrouter)
app.use('/api/education',edurouter)
app.use('/api/certifications',certirouter)
app.use('/api/resumes', resumeRoutes);
// // Your routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use('/api', blogRoutes);
app.use(logVisitor);
app.use('/api', visitorRoutes);

app.listen(3000, () => {
  console.log('Backend running on http://localhost:3000');
});












import mongoose from "mongoose"

// MongoDB Connection
const connectDB = async () => {
  try {
    // MongoDB connection string - use environment variable or default to local
    const mongoURI = process.env.MONGODB_CONNECTIONSTRING ;
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

// Connect to MongoDB
connectDB();

// MongoDB connection event listeners
mongoose.connection.on('connected', () => {
  console.log('📦 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (error) => {
  console.error('❌ Mongoose connection error:', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose disconnected from MongoDB');
});