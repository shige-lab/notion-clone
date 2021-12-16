import React, { useState, useEffect } from "react";
import { useRef, useCallback } from "react";
import ReactQuill from "react-quill";
import _ from "lodash";
import ContentEditable from "./ContentEditable";
// import BorderColorIcon from "@material-ui/icons/BorderColor";
import { render } from "@testing-library/react";
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
	// const [title, setTitle] = useState("");
	// const [id, setId] = useState("");
	// const note = props.note;
	const noteUpdate = props.noteUpdate;
	const { id, title, body } = props.note;
	// const body: string = props.note.body;
	// const title: string = props.note.title;
	// const id: string = props.note.id;
	const [text, setText] = useState(body);
	const [title_, setTitle_] = useState(title);
	const [tex, setTex] = useState("この文章は書き換えることができます。");

	const ref = useRef(body);
	// const setRef = useCallback((body: string) => {
	// 	ref.current = body;
	// }, []);

	useEffect(() => {
		setText(body);
		setTitle_(title);
		ref.current = body;
		// console.log(title);
		// console.log(title_);
		// console.log(body);
		// console.log(text);
		// console.log(id);
	}, [id]);

	const updateTitle = async (t: string) => {
		await setTitle_(t);
		update(t, text);
		// console.log(title_);
		// console.log(t);
	};
	const updateBody = async (content: string) => {
		await setText(content);
		// console.log(text);
		update(title, content);
	};
	// const update = () => {
	// 	noteUpdate(id, {
	// 		id,
	// 		title,
	// 		body: text,
	// 	});
	// };

	const update = _.debounce((title, text) => {
		noteUpdate(id, {
			id,
			title: title,
			body: text,
		});
	}, 1500);
	console.log(text);
	return (
		<div>
			<input
				className="titleInput"
				placeholder="Untitled"
				value={title_ ? title_ : ""}
				onChange={(e) => updateTitle(e.target.value)}
			/>
			{/* <ReactQuill
				value={text}
				onChange={props.noteUpdate(note.id, note)}
			></ReactQuill> */}
			<ContentEditable
				className="textInput"
				placeholder="content"
				// value={text ? text : ""}
				value={ref.current}
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
