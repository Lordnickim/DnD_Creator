const express = require('express');
const path = require('path');
//router
const port = 3000;

const app = express();

app.use(express.json());
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, '../client/dist')))

//use router

app.listen(port, err => {
  if (err) {
    console.log('error listining on port...', err);
  } else {
    console.log('listening on port:', port);
  }
})