import express from 'express';
import router from './routes/index.js';
import connectDB from './config/db.js';
import 'dotenv/config.js';

const app = express();
const PORT = process.env.PORT || 5000;

connectDB()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', router)

app.listen(PORT, () => {
    console.log('Server has started at port', PORT);
});

export default app;