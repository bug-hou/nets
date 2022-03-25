const fs = require("fs");

module.exports = function registerRoute() {
  const files = fs.readdirSync(__dirname, { withFileTypes: true });
  files.forEach(file => {
    if (!file.isDirectory() && file.name !== 'index.js') {
      const route = require(`./${file.name}`);
      this.use(route)
    }
  })
}