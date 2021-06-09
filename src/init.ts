import app from './app'
import * as http from 'http'
import debug from 'debug'

const server: http.Server = http.createServer(app);
const port = 3000;
const debugLog: debug.IDebugger = debug('init');

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    debugLog(`Server running at http://localhost:${port}`);
});
