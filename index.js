const express = require('express')
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks');
const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
});

// Serve Public asset folder
app.use('/assets', express.static('assets'))

// Use controllers
app.use('', require('./controllers/home'))
app.use('/votes', require('./controllers/votes'))
app.use('/regions', require('./controllers/regions'))
app.use('/rankings', require('./controllers/rankings'))
app.use('/about', require('./controllers/about'))

app.use(function(req, res, next) {
  res.render('404.html');
});

app.use(function(error, req, res, next) {
  res.render('error.html', {
    name: error.name,
    message: error.message
  });
});

app.listen(3000, function() {
  console.log('CHVOTE is running...')
})
