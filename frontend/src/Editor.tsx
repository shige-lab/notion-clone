import React, { useState } from "react";
import {Editor, EditorState, RichUtils, convertToRaw, ContentState} from 'draft-js'
import 'draft-js/dist/Draft.css';
import {stateToHTML} from "draft-js-export-html";

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
		// const contentState: ContentState = editorState.getCurrentContent();
		const editorJSON = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

	// const saveText = (title) =>{
	// 	const contentState = this.state.editorState.getCurrentContent();
	// 	const  content = convertToRaw(contentState);
	// 	const html = stateToHTML(contentState);
	//    // 以下FireBaseの処理
	// 	const textsRef = this.db.ref(this.savePointPath + "savedText/");
	// 	const newTextRef = textsRef.push();
	// 	return newTextRef.update(
	// 	  {title:title, time:Date.now(), content:JSON.stringify(content), html:html}
	// 	);
	//   }
	
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