import Renderer from '@atjson/renderer-hir';
import Paragraph from './slate-annotations/paragraph';

export default class SlateRenderer extends Renderer {
  *root() {
    return yield;
  }

  *Paragraph(paragraph) {
    return {
      type: 'paragraph',
      children: yield
    }
  }

  text(text) {
    if (text == '\n') {
      return { text: "" }
    } else {
      return { text: text }
    }
  }
}
