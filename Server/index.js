const express = require('express');
const axios = require('axios');
const path = require('path');
//router
const port = 3000;

const app = express();

app.use(express.json());
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, '../client/dist')))

//endpoints
app.use('/Class/:role', (req, res) => {
  return axios.get(`https://www.dnd5eapi.co/api/classes/${req.params.role.toLowerCase()}/`)
  .then(rawData => {
    console.log('data',rawData.data)
    res.status(200).send(rawData.data)
  })
  .catch(err => {
    res.status(400).send(err)
    console.log('err',err)
  })
})

app.use('/Race/:role', (req, res) => {
  return axios.get(`https://www.dnd5eapi.co/api/races/${req.params.role.toLowerCase()}/`)
  .then(rawData => {
    console.log('data',rawData.data)
    res.status(200).send(rawData.data)
  })
  .catch(err => {
    res.status(400).send(err)
    console.log('err',err)
  })
})

// API still adding backgrounds
// app.use('/Backgrounds/:role', (req, res) => {
//   return axios.get(`https://www.dnd5eapi.co/api/backgrounds/${req.params.role.toLowerCase()}/`)
//   .then(rawData => {
//     console.log('data',rawData.data)
//     res.status(200).send(rawData.data)
//   })
//   .catch(err => {
//     res.status(400).send(err)
//     console.log('err',err)
//   })
// })


app.listen(port, err => {
  if (err) {
    console.log('error listining on port...', err);
  } else {
    console.log('listening on port:', port);
  }
})