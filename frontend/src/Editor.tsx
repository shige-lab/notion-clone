import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import _ from "lodash";
import {
	Editor,
	EditorState,
	RichUtils,
	convertToRaw,
	ContentState,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { stateToHTML } from "draft-js-export-html";
import { render } from "@testing-library/react";

function EditorApp(props: any) {
	// const [title, setTitle] = useState("");
	// const [id, setId] = useState("");
	// const note = props.note;
	const noteUpdate = props.noteUpdate;
	// const { id, title, body } = note;
	const body: string = props.note.body;
	const title: string = props.note.title;
	const id: string = props.note.id;
	const [text, setText] = useState(body);
	console.log(title);
	console.log(body);
	console.log(text);

	// useEffect(() => {
	// 	setText(body);
	// 	console.log(text);
	// }, []);

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
			title,
			body: text,
		});
	}, 1500);

	return (
		<div>
			<input
				// className={classes.titleInput}
				placeholder="Untitled"
				value={title ? title : ""}
				// onChange={(e) => this.updateTitle(e.target.value)}
			/>
			{/* <ReactQuill
				value={text}
				onChange={props.noteUpdate(note.id, note)}
			></ReactQuill> */}
			<input
				// className={classes.titleInput}
				placeholder="content"
				value={text ? text : ""}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					updateBody(event.target.value);
				}}
			/>
		</div>
	);
}

export default EditorApp;
