const fs = require("fs");
const path = require("path");

const copyFile = (from, to) => {
  // write file
  fs.writeFileSync(to, fs.readFileSync(from, { flag: "r" }), { flag: "w" });
};

copyFile(
  path.resolve("src/config/config.prod.js"),
  path.resolve("src/config/config.local.js")
);
