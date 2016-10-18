import Component from 'vue-class-component';
import style from './style.scss';

@Component({
  name: 'Button'
})
export default class Button {
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
