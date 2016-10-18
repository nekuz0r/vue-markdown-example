import * as Vue from 'vue';
import Root from './Root';

const app = new Vue({
  render: (h) => h(Root)
});

export default (context) => {
  return Promise.resolve(app);
}
