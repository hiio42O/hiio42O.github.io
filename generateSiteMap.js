var fs = require("fs");
const path = require("path");

const getDirs = (dirPath) => {
  let dirs = fs.readdirSync(dirPath);
  return dirs.filter((file) =>
    fs.lstatSync(path.resolve(dirPath, file)).isDirectory()
  );
};

const generateSiteMap = () => {
  let sitemaps = ["/about/", "/work/", "/widget/"];

  const pagesDirPath = path.resolve(__dirname, "src", "project");
  if (fs.existsSync(pagesDirPath)) {
    let dirs = getDirs(pagesDirPath);
    dirs.map((dir) => {
      let dirPath = path.resolve(pagesDirPath, dir);
      let childDirs = getDirs(dirPath);
      if (childDirs.length > 0) {
        childDirs.map((child) => sitemaps.push(`/work/${dir}/${child}/`));
      }
    });
  }

  fs.writeFileSync(
    path.resolve(__dirname, "build", "sitemap.xml"),
    generateXmlString(sitemaps)
  );
};

const generateXmlString = (sitemaps) => {
  let xmlString = `<?xml version="1.0" encoding="UTF-8"?>
  `;
  xmlString += `\n<urlset>`;
  sitemaps.map((sitemap) => {
    xmlString += `\n<url>`;
    xmlString += `\n\t<loc>https://hiio420.com${sitemap}</loc>`;
    xmlString += `\n\t<lastmod>${
      new Date().toISOString().slice(0, 19) + "+00:00"
    }</lastmod>`;
    xmlString += `\n\t<changefreq>monthly</changefreq>`;
    xmlString += `\n\t<changefreq>0.6400</changefreq>`;
    xmlString += `\n</url>`;
  });
  xmlString += `\n</urlset>`;

  return xmlString;
};

generateSiteMap();
