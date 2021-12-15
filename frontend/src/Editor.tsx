import React, { useState } from "react";
import ReactQuill from 'react-quill';
import {Editor, EditorState, RichUtils, convertToRaw, ContentState} from 'draft-js'
import 'draft-js/dist/Draft.css';
import {stateToHTML} from "draft-js-export-html";
import { render } from "@testing-library/react";


function EditorApp(props: any) {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');
  const {classes,} = props;

  const updateBody = async (val: string) => {
    await setText(val);
    console.log(text);
  };


    return (
		<div>
		<ReactQuill value={text} onChange={updateBody}></ReactQuill>
			</div>
    );
}

export default EditorApp;