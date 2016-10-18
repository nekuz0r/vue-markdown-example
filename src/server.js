process.env.VUE_ENV = 'server';

import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { createBundleRenderer } from 'vue-server-renderer';

const app = express();

/*const renderer = createBundleRenderer(
  fs.readFileSync(path.resolve(__dirname, './server-bundle.js')),
  'utf-8'
);*/

app.use('/dist', express.static(path.resolve(__dirname, './dist/')));

app.get('*', (req, res) => {
  const context = { url: req.url };
  const renderer = createBundleRenderer(
    fs.readFileSync(path.resolve(__dirname, './server-bundle.js')),
    'utf-8'
  );
  renderer.renderToString(context, (error, html) => {
    html = html.replace('<html server-rendered="true">', '<html>');
    html = html.replace('<div id="app">', '<div id="app" server-rendered="true">');
    res.send(html);
  });
});

app.listen(8080);
