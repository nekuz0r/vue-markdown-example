import Component from 'vue-class-component';
import * as style from './style.scss';

@Component({
  name: 'Button'
})
export default class Counter {
  handleClick () {
    this.$emit('click');
  }

  render (h) {
    return (
      <div class={style.button} on-click={this.handleClick}>
        {this.$slots.default}
      </div>
    );
  }
}
