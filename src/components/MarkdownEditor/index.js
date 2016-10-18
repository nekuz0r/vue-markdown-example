import Component from 'vue-class-component';
import * as style from './style.scss';
import * as marked from 'marked';
import { debouce } from 'lodash-es';

import Button from '../Button';

@Component({
  name: 'MarkdownEditor',
  component: {
    Button
  },
  props: {
    value: {
      type: String,
      default: String
    },
    height: {
      type: String
    },
    width: {
      type: String
    }
  }
})
export default class Counter {
  data () {
    return {
      input: String()
    }
  }

  get html () {
    return marked(this.input, { sanitize: true, breaks: true });
  }

  mounted () {
    this.processInput(this.value);
  }

  update (event) {
    this.processInput(event.target.value);
  }

  processInput (input) {
    this.input = input;
    this.$emit('change', this.input, this.html);
  }

  render (h) {
    return (
      <div class={style.editor} style={{ height: this.height, width: this.width }}>
        <div class={style.input}>
          <textarea on-input={this.update}>{this.value}</textarea>
        </div>
        <div class={style.render} domProps-innerHTML={this.html}>
        </div>
      </div>
    );
  }
}
