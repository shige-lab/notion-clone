import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import _ from "lodash";
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

function EditorApp(props: any) {
	// const [title, setTitle] = useState("");
	// const [id, setId] = useState("");
	// const note = props.note;
	const noteUpdate = props.noteUpdate;
	// const { id, title, body } = note;
	const body: string = props.note.body;
	const title: string = props.note.title;
	const id: string = props.note.id;
	const [text, setText] = useState<string>(body);
	const [title_, setTitle_] = useState<string>(title);
	console.log(title);
	console.log(title_);
	console.log(body);
	console.log(text);

	useEffect(() => {
		setText(body);
		setTitle_(title);
		console.log(text);
	}, []);
	const updateTitle = (t: string) => {
		setTitle_(t);
		console.log(title_);
		// update();
	};
	const updateBody = (content: string) => {
		setText(content);
		console.log(text);
		// update();
	};
	// const update = () => {
	// 	noteUpdate(id, {
	//     id,
	//     title,
	// 		body: text,
	// 	});
	// };
	const update = _.debounce(() => {
		noteUpdate(id, {
			id,
			title: title_,
			body: text,
		});
	}, 1500);

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
			<ReactQuill
				className="textInput"
				placeholder="content"
				value={text ? text : ""}
				onChange={updateBody}
				// onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
				// 	updateBody(event.target.value);
				// }}
			/>
		</div>
	);
}

export default EditorApp;
