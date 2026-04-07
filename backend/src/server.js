const http = require("http");
const app = require("./app");
const { connectDB } = require("./utils/connectDB");

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();

  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

