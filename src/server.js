require("dotenv").config();
const http = require("http");
const app = require("./app");

const server = http.createServer(app);

const port = process.env.APP_PORT || 8080;

server.listen(port, () => {
  console.log(`THE APP is listen on port ${port}`);
});
