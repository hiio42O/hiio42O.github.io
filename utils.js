var fs = require("fs");
const path = require("path");

const makePagesListJson = () => {
  let prevDirs = [];

  const pagesDirPath = path.resolve(__dirname, "src", "project");
  if (fs.existsSync(pagesDirPath)) {
    setInterval(() => {
      let dirs = fs.readdirSync(pagesDirPath);
      dirs = dirs.filter((file) =>
        fs
          .lstatSync(path.resolve(__dirname, "src", "project", file))
          .isDirectory()
      );
      let dirsMap = dirs.map((dir) => {
        let childDir = fs.readdirSync(
          path.resolve(__dirname, "src", "project", dir)
        );
        childDir = childDir.filter((cd) =>
          fs
            .lstatSync(path.resolve(__dirname, "src", "project", dir, cd))
            .isDirectory()
        );
        return [dir, ...childDir];
      });
      if (prevDirs.length !== dirsMap.length) {
        prevDirs = dirsMap;
        fs.writeFile(
          path.resolve(__dirname, "src", "project", "projectList.json"),
          (dirsMap = JSON.stringify(dirsMap)),
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
