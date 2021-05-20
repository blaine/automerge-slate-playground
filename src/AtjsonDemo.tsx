/** @jsx jsx */
/* @jsxFrag React.Fragment */

import { jsx, css } from '@emotion/react'
import ReactJson from 'react-json-view'
import AtjsonEditor from './AtjsonEditor'
import { useState } from 'react'

import SlateSource from './SlateSource';
import SlateRenderer from './SlateRenderer';

export default function AtjsonDemo() {
  const initContent:Node[] = [
    {
      type: "paragraph",
      children: [
        { text: 'Really basic ' },
        { text: 'slate', bold: true },
        { text: ' document' }
      ]
    },

    {
      type: "paragraph",
      children: [
        { text: 'Paragraph two' }
      ]
    },

    {
      type: "paragraph",
      children: [
        { text: "" }
      ]
    }
  ]

  const [content, setContent] = useState(initContent);

  const changeHandler = (newContent) => {

    // First convert the Slate output to annotations
    console.time()
    const slateAtjson = SlateSource.fromRaw(newContent);
    console.timeEnd();

    // Now convert those annotations back to Slate's internal format
    console.time();
    const roundtripContent = SlateRenderer.render(slateAtjson);
    console.timeEnd();
    if (content != roundtripContent) {
      console.log(content, 'ne', roundtripContent);
      setContent(roundtripContent);
    }
  }

  return <div css={css`
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: auto;
    grid-template-areas:
      "app-left app-right";
    column-gap: 50px;

    width: 90vw;
    height: 100%;
    box-sizing: border-box;
  `}>
    <div css={css`grid-area: app-left; overflow: hidden;`}>
      <div css={css`margin-bottom: 10px; font-size: 14px; text-transform: uppercase; color: #aaa;`}>Editor UI</div>
      <AtjsonEditor content={content} changeHandler={changeHandler} />
    </div>
    <div css={css`grid-area: app-right; overflow: hidden;`}>
      <div css={css`margin-bottom: 10px; font-size: 14px; text-transform: uppercase; color: #aaa;`}>Atjson doc state</div>
      <ReactJson src={ SlateSource.fromRaw(content) } collapsed={false} collapseStringsAfterLength={280} displayDataTypes={false} displayObjectSize={false} />
      <div css={css`margin-top: 20px; margin-bottom: 10px; font-size: 14px; text-transform: uppercase; color: #aaa;`}>Slate tree content</div>
      <ReactJson src={{
        content: content
      }} collapsed={false} collapseStringsAfterLength={280} displayDataTypes={false} displayObjectSize={false} />
    </div>
  </div>
}
