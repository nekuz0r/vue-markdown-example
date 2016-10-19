process.env.VUE_ENV = 'server';

import express from 'express';
import fs from 'fs';
import path from 'path';
import { createBundleRenderer } from 'vue-server-renderer';

const app = express();

/*
const renderer = createBundleRenderer(
  fs.readFileSync(path.resolve(__dirname, './server-bundle.js')),
  'utf-8'
);
*/

app.use('/dist', express.static(path.resolve(__dirname, './dist/')));

app.get('*', (req, res) => {
  const context = { url: req.url };

  // This is here only for dev purpose, should be move outside the request
  // handler for production
  const renderer = createBundleRenderer(
    fs.readFileSync(path.resolve(__dirname, './server-bundle.js')),
    'utf-8'
  );

  renderer.renderToString(context, (error, html) => {
    if (error) {
      throw error;
    }

    html = html.replace('<html server-rendered="true">', '<html>');
    html = html.replace('<div id="app">', '<div id="app" server-rendered="true">');
    res.send(html);
  });
});

app.listen(8080);
