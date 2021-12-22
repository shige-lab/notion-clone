import React, { useState, useEffect } from "react";
import { useRef, useCallback } from "react";
import ReactQuill from "react-quill";
import _ from "lodash";
import EditorContent from "./EditorContent";
import SelectButton from "./SelectButton";
// import BorderColorIcon from "@material-ui/icons/BorderColor";
import { render } from "@testing-library/react";
import ReactDOM from "react-dom";
import { useDebounce } from "use-debounce";

import {
	Button,
	Container,
	FormControl,
	Grid,
	Link,
	TextField,
	Typography,
} from "@material-ui/core";

const Editor = (props: any) => {
	const noteUpdate = props.noteUpdate;
	const { title, body } = props.note.note;
	const id = props.note._id;
	const [text, setText] = useState(body);
	const [title_, setTitle_] = useState(title);
	// const [textValue] = useDebounce(text, 1500);
	// const [titleValue] = useDebounce(title_, 1500);
	const isFirstRender = useRef(false);
	const [isUpdate, setIsUpdate] = useState(0);
	const [update] = useDebounce(isUpdate, 1500);
	const [html, setHtml] = useState(body);
	// const [html, setHtml] = useState("<div>" + body + "</div>");

	const ref = useRef(body);

	useEffect(() => {
		console.log("change note");
		setText(body);
		setTitle_(title);
		ref.current = body;
		// setHtml("<div>" + body + "</div>");
		setHtml(body);
		console.log("editor value", ref.current);
		isFirstRender.current = true;
		// refs["ref2"].focus();
	}, [id]);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
		} else {
			console.log("debounce");
			noteUpdate(title_, text, id);
			console.log(isUpdate);
		}
	}, [update]);

	const updateTitle = async (t: string) => {
		await setTitle_(t);
		setIsUpdate(isUpdate + 1);
		// update(t, text);
		// console.log(title_);
	};
	const updateBody = async (content: string) => {
		console.log("eidtor text", ref.current);
		await setText(content);
		setIsUpdate(isUpdate + 1);
		// console.log(text);
		// update(title, content);
	};

	// const update = _.debounce((title, text) => {
	// 	console.log(title);
	// 	noteUpdate(title, text, id);
	// }, 1500);

	const deleteNote = () => {
		props.deleteNote(props.note);
	};

	return (
		<div className="Note">
			<div className="noteBar">
				<div className="barTitle">{title_ ? title_ : ""}</div>
				<SelectButton delete={deleteNote} />
			</div>
			<div className="titleField">
				<input
					className="titleInput"
					placeholder="Untitled"
					autoFocus={true}
					value={title_ ? title_ : ""}
					onChange={(e) => updateTitle(e.target.value)}
				/>
			</div>
			<EditorContent
				// value={text ? text : ""}
				value={ref.current}
				// ref="ref2"
				onChange={updateBody}
				id={id}
				html={html}
				// onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
				// 	updateBody(event.target.value);
				// }}
			/>
			{/* <ContentEditable value={tex} onChange={updateBody} /> */}
		</div>
	);
};

export default Editor;
