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
  app.get('/sketch_0', (req, res) => res.render('pages/sketch_0')); // fix this
  app.get('/sketch_1', (req, res) => res.render('pages/sketch_1'));
  app.get('/sketch_2', (req, res) => res.render('pages/sketch_2'));
  app.get('/sketch_3', (req, res) => res.render('pages/sketch_3'));
  app.get('/sketch_4', (req, res) => res.render('pages/sketch_4'));
  app.get('/sketch_5', (req, res) => res.render('pages/sketch_5'));
  app.get('/sketch_6', (req, res) => res.render('pages/sketch_6'));
  app.get('/sketch_6', (req, res) => res.render('pages/sketch_6'));
  app.get('/sketch_7', (req, res) => res.render('pages/sketch_7'));
  app.get('/sketch_8', (req, res) => res.render('pages/sketch_8'));
  app.get('/sketch_9', (req, res) => res.render('pages/sketch_9'));
