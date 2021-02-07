import http from 'http';
import fs from 'fs';

const port = process.env.PORT || 3000;

// const html = fs.readFileSync('index.html');

const log = (entry) => {
  fs.appendFileSync('/tmp/sample-app.log', `${new Date().toISOString()} - ${entry}\n`);
};

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      if (req.url === '/') {
        log(`Received message: ${body}`);
      } else if ((req.url = '/scheduled')) {
        log(`Received task ${req.headers['x-aws-sqsd-taskname']} scheduled at ${req.headers['x-aws-sqsd-scheduled-at']}`);
      }

      res.writeHead(200, 'OK', { 'Content-Type': 'text/plain' });
      res.end();
    });
  } else {
    res.writeHead(200);
    res.write('ok, good here!');
    res.end();
  }
});

console.log('listening on port 8080');
server.listen(8080);
