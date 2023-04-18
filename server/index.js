require('dotenv').config();
const express = require('express');
const path = require('path');

const db = require('./config/db');
const { authentication } = require('./middlewares/authMiddleware');
const { port, dbConnection } = require('./config/config');

const allowed = ['.js', '.css', '.png', '.jpg', '.jpeg', '.ico'];

const cors = require("cors");
const corsOptions = {
  // origin: 'https://metnime.vercel.app',
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

const app = express();
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(authentication());

const start = async () => {
  try {
    await db(`mongodb://mongo:G5X7ci7EQjepTmdTxjyl@containers-us-west-86.railway.app:5760`)
    // await db(dbConnection);
    require('./config/express')(app, express);
    require('./routes/router')(app);

    app.get('*', (req, res) => {
      if (allowed.filter((ext) => req.url.indexOf(ext) > 0).length > 0) {
        res.sendFile(path.resolve(`public/${req.url}`));
      } else {
        res.sendFile(path.join(__dirname, 'public/index.html'));
      }
    });
    console.log('*** >>> Database is connected <<< ***');
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
  } catch (error) {
    console.error('!!! >>> Database is not connected <<< !!!\nError:', error.message);
  }
};
start();
