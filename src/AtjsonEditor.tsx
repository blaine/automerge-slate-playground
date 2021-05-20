/** @jsx jsx */
/* @jsxFrag React.Fragment */

import { useCallback, useMemo, useState } from "react";
import { jsx, css } from "@emotion/react";

import { createEditor, Text, Range, Point, Node, Operation, Editor, Path, Location, Transforms } from "slate";
import { withHistory } from "slate-history";
import { Slate, Editable, withReact } from "slate-react";

export default function AtjsonEditor({ content, changeHandler }) {

  const editor = useMemo(() => withReact(withHistory(createEditor())), []);

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, []);

  return (
    <div css={css`
      border: solid thin #ddd;
      padding: 5px;
      grid-area: editor;
    `}>
      <Slate editor={editor} value={content} onChange={changeHandler}>
        <Editable
          onKeyDown={event => {
            if (!event.ctrlKey) {
              return
            }

            switch (event.key) {
              case 'b': {
                event.preventDefault();
                Transforms.setNodes(
                  editor,
                  { bold: true },
                  { match: n => Text.isText(n), split: true }
                );
                break;
              }
            }
          }}
        />
      </Slate>
    </div>
  );
}

const Leaf = props => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  );
}
