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

        const transformedData = {};
        Object.entries(data).forEach(([key, value]) => {
          transformedData[_.camelCase(key)] = _.trim(value);
        })

        if (path) {
          res.send(_.get(transformedData, path));
        } else {
          res.json(transformedData);
        }
    });
});

app.listen(3000, () => console.log("App listening on port http://localhost:3000! Api at /api/"));
