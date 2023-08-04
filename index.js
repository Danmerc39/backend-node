const express = require('express');
const initRoutes = require('./routes');
const cors = require('cors');
const { logError, handlerError, boomHandlerError } = require('./middlewares/errorHandler');

const app = express();
const port = 3000;

app.use(express.json());

//dominios permitidos in whitelist
const whitelist = ['http://127.0.0.1:5500', 'http://my-app.com'];
app.use(cors({
  origin: (origin, cb) => {
    if (whitelist.includes(origin) || !origin) {
      cb(null, true);
    }else{
      cb(new Error('No permitido'));
    }
  }
}))

app.get('/', (req, res) => {
  res.send('Welcome to my application');
})

app.get('/home', (req, res) => {
  res.send('Welcome to my home');
});

initRoutes(app);

app.use(logError);
app.use(boomHandlerError);
app.use(handlerError);

app.listen(port, () =>{
  console.log('listening on port ',port);
});
