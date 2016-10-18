import Component from 'vue-class-component';
import style from './style.scss';

@Component({
  name: 'HorizontalSplitPane'
})
export default class HorizontalSplitPane {
  data () {
    return {
      isResizing: false,
      handlePosition: 50
    };
  }

  startResizing (event) {
    if (this.isResizing) {
      return;
    }

    event.preventDefault();
    this.isResizing = true;
  }

  resize (event) {
    if (!this.isResizing) {
      return;
    }

    event.preventDefault();

    const boundingRect = this.$el.getBoundingClientRect()
    // Retrieve mouse position relative to component
    const x = event.clientX - boundingRect.left;
    // Retrieve progression percentage
    const pX = x / boundingRect.width;

    if (pX >= 0.1 && pX <= 0.9) {
      this.handlePosition = pX * 100;
    }
  }

  stopResizing (event) {
    if (!this.isResizing) {
      return;
    }

    this.isResizing = false;
  }

  render (h) {
    return (
      <div  class={style.splitPane}
            on-mousemove={this.resize}
            on-mouseup={this.stopResizing}
            on-mouseleave={this.stopResizing}>

        <div  class={style.panel}
              style={{ width: `${this.handlePosition}%` }}>
          {this.$slots.left}
        </div>

        <div  class={style.handle}
              style={{ left: `${this.handlePosition}%` }}
              on-mousedown={this.startResizing} />

        <div  class={style.panel}
              style={{ width: `${100 - this.handlePosition}%` }}>
          {this.$slots.right}
        </div>
      </div>
    );
  }
}
