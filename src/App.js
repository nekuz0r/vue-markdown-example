import Component from 'vue-class-component';
import MarkdownEditor from './components/MarkdownEditor';

const defaultInput = `# Some title

## Some table

|Name|Description|
|---|---|
|foo|bar|
|baz|qux|
|quux|corge|
|grault|garply|
|waldo|fred|

## Some image

![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

## Some list

* foo
* bar
* baz
* qux`;

@Component({
  name: 'App',
  components: { MarkdownEditor }
})
export default class App {
  render (h) {
    return (
      <div id="app">
        <MarkdownEditor value={defaultInput} />
      </div>
    );
  }
}
