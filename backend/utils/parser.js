let { SWE } = require("../models/jobs/swe.js");
let { DS } = require("../models/jobs/ds.js");
let { DA } = require("../models/jobs/da.js");
class Parser {
  constructor() {}

  reqParsing(req) {
    let job;
    switch (req.params.position) {
      case "swe":
        job = new SWE({
          userId: req.params.id,
          position: req.params.position,
          attendance: req.body.attendance,
          level: req.body.level,
          education: req.body.education,
          experience: req.body.experience,
          tools: req.body.tools,
          languages: req.body.languages,
          frameworks: req.body.frameworks,
          company: req.body.company,
          site: req.body.site,
          address: req.body.address,
          city: req.body.city,
          link: req.body.link,
        });
        break;
      case "da":
        job = new DA({
          userId: req.params.id,
          position: req.params.position,
          attendance: req.body.attendance,
          level: req.body.level,
          education: req.body.education,
          experience: req.body.experience,
          software: req.body.software,
          languages: req.body.languages,
          databases: req.body.databases,
          company: req.body.company,
          site: req.body.site,
          address: req.body.address,
          city: req.body.city,
          link: req.body.link,
        });
        break;
      case "ds":
        job = new DS({
          userId: req.params.id,
          position: req.params.position,
          attendance: req.body.attendance,
          level: req.body.level,
          education: req.body.education,
          experience: req.body.experience,
          software: req.body.software,
          languages: req.body.languages,
          libraries: req.body.libraries,
          company: req.body.company,
          databases: req.body.databases,
          site: req.body.site,
          address: req.body.address,
          city: req.body.city,
          link: req.body.link,
        });
        break;
    }
    return job;
  }
}
module.exports = { Parser };
