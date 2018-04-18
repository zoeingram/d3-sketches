const express = require('express');
const path = require('path');
const router = express.Router();
const PORT = process.env.PORT || 5000
const app = express();

  app.use(express.static(path.join(__dirname, 'public/')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  // Routes
  app.get('/', (req, res) => res.render('pages/index'));
  // app.get('/sketches/0', (req, res) => res.render('pages/sketches/sketch_0'));
