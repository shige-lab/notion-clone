import React from 'react';
import {Editor, convertFromRaw, EditorState} from 'draft-js';

const ReadOnlyEditor = (props: any) => {
  const storedState =  convertFromRaw(JSON.parse(props.storedState));
  return (
     <div className="readonly-editor">
       <Editor editorState={storedState} /> 
     </div>
  );
}

export default ReadOnlyEditor;