const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const express = require('express');
const morgan = require('morgan');
const {
  createProxyMiddleware,
  responseInterceptor,
} = require('http-proxy-middleware');
const sum = require('hash-sum');
const cors = require('cors');

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

// Create Express Server
const app = express();

app.use(cors());

// Configuration
const PORT = 3001;
const HOST = 'localhost';
const API_SERVICE_URL = 'https://api.baseql.com';

// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.get('/info', (_req, res, _next) => {
  res.send(
    'This is a proxy service which proxies to Billing and Account APIs.',
  );
});

// Authorization
app.use('', (req, res, next) => {
  if (req.headers.authorization) {
    next();
  } else {
    res.sendStatus(403);
  }
});

const cache = responseInterceptor(
  async (responseBuffer, proxyRes, req, res) => {
    const key = `.${proxyRes.req.path}/${sum(req.body)}`;
    console.log(key);
    let cachedBody;
    try {
      cachedBody = fs.readFileSync(key);
    } catch (e) {} // eslint-disable-line no-empty
    if (cachedBody) {
      console.log('use cache 2');
      res.send(cachedBody);
    } else {
      console.log('start set cache');
      ensureDirectoryExistence(key);
      fs.writeFileSync(key, responseBuffer.toString('utf8'));
    }
    return responseBuffer;
  },
);

app.use('/airtable', (req, res, next) => {
  const key = `.${req.path}/${sum(req.body)}`;
  console.log(key);
  let cachedBody;
  try {
    cachedBody = fs.readFileSync(key);
  } catch (e) {} // eslint-disable-line no-empty
  if (cachedBody) {
    console.log('use cache 2');
    res.send(cachedBody);
  } else {
    next();
  }
});

// Proxy endpoints
app.use(
  '/airtable',
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,

    /**
     * IMPORTANT: avoid res.end being called automatically
     **/
    selfHandleResponse: true, // res.end() will be called internally by responseInterceptor()

    onProxyRes: cache,
    onProxyReq: (proxyReq, req, res) => {
      const body = [];
      req.on('data', chuck => {
        body.push(chuck);
      });
      req.on('end', () => {
        req.body = body.toString();
        const key = `.${proxyReq.path}/${sum(req.body)}`;
        let cachedBody;
        try {
          cachedBody = fs.readFileSync(key);
        } catch (e) {} // eslint-disable-line no-empty
        if (cachedBody) {
          console.log('use cache');
          res.send(cachedBody);
          proxyReq.abort();
        }
      });
    },
  }),
);

// Start the Proxy
app.listen(PORT, () => {
  console.log(`Starting Proxy at ${PORT}`);
});
