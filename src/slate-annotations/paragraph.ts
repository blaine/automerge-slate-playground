import { BlockAnnotation } from '@atjson/document';

export default class Paragraph extends BlockAnnotation<{}> {
  static vendorPrefix = 'slate';
  static type = 'paragraph';
  get rank() {
    return super.rank * 3 / 2;
  }
}
