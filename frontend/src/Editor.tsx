import React, { useState, useEffect } from "react";
import { useRef, useCallback } from "react";
import ReactQuill from "react-quill";
import _ from "lodash";
import ContentEditable from "./ContentEditable";
// import BorderColorIcon from "@material-ui/icons/BorderColor";
import { render } from "@testing-library/react";
import ReactDOM from 'react-dom';
import {
	Button,
	Container,
	FormControl,
	Grid,
	Link,
	TextField,
	Typography,
} from "@material-ui/core";

	const EditorApp = (props: any) => {
	const noteUpdate = props.noteUpdate;
	const { title, body } = props.note.note;
	const id = props.note._id;
	const [text, setText] = useState(body);
	const [title_, setTitle_] = useState(title);

	const ref = useRef(body);

	useEffect(() => {
		setText(body);
		setTitle_(title);
		ref.current = body;
		console.log(ref.current)
		// refs["ref2"].focus();
	}, [id]);

	const updateTitle = async (t: string) => {
		await setTitle_(t);
		update(t, text);
		// console.log(title_);
		console.log(t);
	};
	const updateBody = async (content: string) => {
		await setText(content);
		// console.log(text);
		update(title, content);
	};
			
	const update = _.debounce((title, text) => {
		noteUpdate(title, text, id);
		
	}, 1500);

	return (
		<div>
			<input
				className="titleInput"
				placeholder="Untitled"
				autoFocus={true}
				value={title_ ? title_ : ""}
				onChange={(e) => updateTitle(e.target.value)}
			/>
			<ContentEditable
				className="textInput"
				// value={text ? text : ""}
				value={ref.current}
					// ref="ref2"
				onChange={updateBody}
				id={id}
				// onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
				// 	updateBody(event.target.value);
				// }}
			/>
			{/* <ContentEditable value={tex} onChange={updateBody} /> */}
		</div>
	);
};

	export default EditorApp;
