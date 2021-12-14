import React, { useState } from "react";
import {Editor, EditorState, RichUtils} from 'draft-js'
import 'draft-js/dist/Draft.css';

function EditorApp() {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  
  console.log(editorState);
  const onBoldClick = () => {
	  setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
	  console.log(editorState);
	}
	const onItalicClick = () => {
		setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
	}
	const onUnderlineClick = () => {
		setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
	}

  return (
    <div className="wrapper">
	 <button onClick={onBoldClick.bind(editorState)}>Bold</button>
        <button onClick={onItalicClick.bind(editorState)}>Italic</button>
        <button onClick={onUnderlineClick.bind(editorState)}>Underline</button>
     <Editor 
       editorState={editorState}
       onChange={setEditorState} 
     />
    </div>
  );
}

export default EditorApp;