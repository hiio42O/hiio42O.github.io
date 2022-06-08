var fs = require("fs");
const path = require("path");

const makePagesListJson = () => {
  let prevFiles = [];
  const pagesDirPath = path.resolve(__dirname, "src", "pages");
  if (fs.existsSync(pagesDirPath)) {
    setInterval(() => {
      let files = fs.readdirSync();
      if (prevFiles.length !== files.length) {
        prevFiles = files;
        fs.writeFile(
          path.resolve(__dirname, "src", "pages", "pageList.json"),
          (files = JSON.stringify(files)),
          (err) => {
            if (err) throw err;
            console.log("Created");
          }
        );
      }
    }, 0);
  }
};

module.exports = {
  makePagesListJson,
};
