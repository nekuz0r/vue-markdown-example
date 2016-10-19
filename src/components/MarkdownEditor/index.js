import Component from 'vue-class-component';
import style from './style.scss';
import marked from 'marked';

import HorizontalSplitPane from '../HorizontalSplitPane';

@Component({
  name: 'MarkdownEditor',
  components: { HorizontalSplitPane },
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
export default class MarkdownEditor {
  data () {
    return {
      input: String()
    };
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
      <div class={style.editor}
            style={{ height: this.height, width: this.width }}>
        <HorizontalSplitPane>
          <div slot="left" class={style.input}>
            <textarea on-input={this.update}>{this.value}</textarea>
          </div>
          <div slot="right"
                class={style.render}
                domProps-innerHTML={this.html} />
        </HorizontalSplitPane>
      </div>
    );
  }
}
