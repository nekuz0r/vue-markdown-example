import Component from 'vue-class-component';
import App from './App';
import {collectInitial} from 'node-style-loader/collect';

let initialStyle = collectInitial();
initialStyle = initialStyle.replace('<style class="server-style-loader-element">', '');
initialStyle = initialStyle.replace('</style>', '');

@Component({
  name: 'Root',
  components: { App },
  props: {
    initialState: {
      type: Object,
      default: () => { return {}; }
    }
  }
})
export default class Root {
  render (h) {
    return (
      <html>
        <head>
          <style
            class="server-style-loader-element"
            domProps-innerHTML={initialStyle}>
          </style>
          <script
            type="text/javascript"
            domProps-innerHTML={`window.__INITIAL_STATE__=${JSON.stringify(this.initialState)}`}>
          </script>
        </head>
        <body>
          <app />
          <script async type="text/javascript" src="/dist/client-bundle.js"></script>
        </body>
      </html>
    );
  }
}
