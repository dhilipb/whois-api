const _ = require("lodash");
const express = require("express");
const app = express();

var whois = require("./whois");

app.get("/api/", (req, res) => {
    const domain = req.query.domain;
    const path = req.query.path;

    whois.whois(domain, function (err, data) {
        if (err) {
            res.json(err);
            return;
        }

        if (path) {
          res.json(_.get(data, path));
        } else {
          res.json(data);
        }
    });
});

app.listen(3000, () => console.log("App listening on port http://localhost:3000! Api at /api/"));
