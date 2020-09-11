import 'dotenv/config';
import app from './app';
import './database';

app.listen(process.env.PORT || 3333, () => {
  console.log(`running on port ${process.env.PORT || 3333}`);
});
