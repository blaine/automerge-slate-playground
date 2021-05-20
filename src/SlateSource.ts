import Document from '@atjson/document';
import Paragraph from './slate-annotations/paragraph';

export default class SlateSource extends Document {
  static schema = [
    Paragraph
  ];

  static fromRaw(slateDoc) {

    const nodes = (children, currOffset = 0) => {

      let content = '';
      let annotations = [];

      for (let i = 0; i < children.length; i++) {
        const currNode = children[i];
        if (currNode.text != undefined) {
          if (currNode.text.length == 0) {
            // zero-width text nodes aren't supported, so just create an object replacement character and we'll remove it later.
            content += '\n';
            currOffset += 1;
          } else {
            content += currNode.text;
            currOffset += currNode.text.length;
          }
        } else {
          let thisAnnotation = { start: currOffset, type: "-slate-" + currNode.type, attributes: {} };
          let [innerText, childAnnotations] = nodes(currNode.children, currOffset);
          content += innerText;
          currOffset += innerText.length;
          thisAnnotation.end = currOffset;
          annotations.push(thisAnnotation);
        }
      }

      return [content, annotations];
    }

    let [text, annotations] = nodes(slateDoc);

    return new this({
      content: text,
      annotations: annotations
    });
  }
}


