const express = require('express');
const layouts = require('express-ejs-layouts');
const path = require('path');

const port = process.env.PORT || 3000;

const app = express();

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use('/html', express.static('./public'));

app.set('view engine', 'ejs');
app.use(layouts)

const staticController = require('./controllers/static-controller');
const errorController = require('./controllers/error-controller');

app.get('/', staticController.getHomePage);

app.use(errorController.getNotFoundErrorPage);
app.use(errorController.getInternalErrorPage);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})