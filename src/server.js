const http = require("http");
const app = require("./app");
const config = require("./core/config");
const { connectToDB } = require("./core/db");

const server = http.createServer(app);

connectToDB();

const port = config.getAppConfig().port;

server.listen(port, () => {
  console.log(`THE APP is listen on port ${port}`);
});
