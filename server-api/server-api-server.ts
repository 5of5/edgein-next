import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import app from './server-api-app';

// start server
const PORT = process.env.PORT || 8005;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});