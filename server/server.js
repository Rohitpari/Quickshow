import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express';
import connectDB from './configs/db.js';
import { serve } from "inngest/express";
import { inngest, functions } from './inngest/index.js';

await connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.get('/', (req,res) => res.send('server is Live!'));
app.use('/api/inngest', serve({ client: inngest, functions }));

app.listen(3000, () => console.log(`server listening on 3000`));
