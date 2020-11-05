const _ = require("lodash");
const express = require("express");
const app = express();

const whois = require("./whois");

const cache = {};

app.get("/api/", (req, res) => {
    const domain = req.query.domain;
    const path = req.query.path;
    const nocache = req.query.nocache;

    if (domain in cache && !nocache) {
      const data = cache[domain];
      console.log("Cache: " + domain);
      
      if (path) {
        res.send(_.get(data, path));
      } else {
        res.json(data);
      }

      return;
    }

    console.log("API: " + domain);

    whois.whois(domain, function (err, data) {
        if (err) {
            res.json(err);
            return;
        }

        const transformedData = {};
        Object.entries(data).forEach(([key, value]) => {
          transformedData[_.camelCase(key)] = _.trim(value);
        });

        cache[domain] = transformedData;

        if (path) {
          res.send(_.get(transformedData, path));
        } else {
          res.json(transformedData);
        }
    });
});

app.listen(3000, () => console.log("App listening on port http://localhost:3000! Api at /api/"));
