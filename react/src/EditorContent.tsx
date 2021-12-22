import { PinDropSharp } from "@material-ui/icons";
import React, { useState, useEffect, useCallback } from "react";
import { useRef } from "react";
import ContentEditable from "react-contenteditable";

const EditorContent = (props: any) => {
	const handleInput = (e: any) => {
		console.log("handleInput");
		props.onChange(e.target.value);
	};
	console.log("div value", props.value);

	return (
		<>
			<ContentEditable
				innerRef={props.value}
				html={props.html}
				disabled={false}
				tagName="div"
				// id="test"
				className="textInput"
				// placeholder="content"
				// ref={props.ref2}
				// ref="refs"
				onChange={handleInput}
				// dangerouslySetInnerHTML={{ __html: props.value }}
			/>

			{/* <form action=""> */}

			{/* <input type="text" value={text} onChange={ (e) => createUser(e.target.value)}/>
		<button type="button" onClick= {(e) => createUser} className="btn btn-danger">Create</button> */}
			{/* </form> */}
		</>
	);
};

export default EditorContent;
