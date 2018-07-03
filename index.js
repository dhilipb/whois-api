const express = require('express')
const app = express()


var whois = require('./whois');


app.get('/api/', (req, res) => {

  let domain = req.query.domain

  whois.whois(domain, function (err, data) {
    res.json(data);
  });
})



app.listen(3000, () => console.log('App listening on port http://localhost:3000!'));