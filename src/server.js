const http = require("http");
const app = require("./app");
const config = require("./core/config");

const server = http.createServer(app);

const port = config.getAppConfig().port;

server.listen(port, () => {
  console.log(`THE APP is listen on port ${port}`);
});
