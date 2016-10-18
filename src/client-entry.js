import * as Vue from 'vue';
import serverStyleCleanup from 'node-style-loader/clientCleanup';

import App from './App';

serverStyleCleanup();

new Vue({
  el: '#app',
  render: (h) => h(App)
});
