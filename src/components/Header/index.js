import Component from 'vue-class-component';
import * as style from './style.scss';

@Component({
  name: 'Header'
})
export default class Counter {
  data () {
    return {
      squeezed: false
    };
  }

  mounted () {
    window.addEventListener('scroll', this.handleScroll);
  }

  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll (event) {
    this.squeezed = (window.scrollY > 100);
  }

  render (h) {
    return (
      <div class={[ style.header, { [style.squeezed]: this.squeezed } ]}></div>
    );
  }
}
