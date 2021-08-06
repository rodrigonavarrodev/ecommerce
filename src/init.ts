import app from "./app";
import * as http from "http";
import debug from "debug";
import { Server } from "socket.io";

const port = 3000;
const server: http.Server = http.createServer(app);
const debugLog: debug.IDebugger = debug("init");
const io = new Server(server);

export default io;
import "./common/services/sockets/socket"


server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  debugLog(`Server running at http://localhost:${port}`);
});
