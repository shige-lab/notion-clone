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
import { TextButton } from "./TextButton";

import ContentEditable from "react-contenteditable";

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
	const [texts, setTexts] = useState(body);
	const [title_, setTitle_] = useState(title);
	// const [textsValue] = useDebounce(texts, 1500);
	// const [titleValue] = useDebounce(title_, 1500);
	const isFirstRender = useRef(false);
	const [isUpdate, setIsUpdate] = useState(0);
	const [update] = useDebounce(isUpdate, 1500);
	// const [html, setHtml] = useState("<div>" + body + "</div>");

	const ref = useRef<HTMLInputElement>(null);

	useEffect(() => {
		console.log(texts[0]);
		console.log("change note");
		setTexts(body);
		setTitle_(title);
		if (!body.includes("")) {
			addText(null, body.length);
		}
		// ref.current = body;
		// setHtml("<div>" + body + "</div>");
		// console.log("editor value", ref.current);
		isFirstRender.current = true;
		// refs["ref2"].focus();
	}, [id]);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
		} else {
			console.log("debounce");
			noteUpdate(title_, texts, id);
			console.log(isUpdate);
		}
	}, [update]);

	const updateTitle = async (t: string) => {
		await setTitle_(t);
		setIsUpdate(isUpdate + 1);
		// update(t, texts);
		// console.log(title_);
	};
	const updateBody = async (content: string, index: number) => {
		// console.log("eidtor texts", ref.current);
		const newBody = texts;
		newBody[index] = content;
		await setTexts(newBody);
		setIsUpdate(isUpdate + 1);
		// console.log(texts);
		// update(title, content);
	};

	// const update = _.debounce((title, texts) => {
	// 	console.log(title);
	// 	noteUpdate(title, texts, id);
	// }, 1500);

	const _deleteNote = () => {
		props.deleteNote(props.index);
	};

	const addText = async (ref: any, index: number) => {
		const newBody = texts;
		newBody.splice(index + 1, 0, "");
		await setTexts(newBody);
		// ref.nextElementSibling.focus();
		setIsUpdate(isUpdate + 1);
	};

	const deleteText = async (ref: any, index: number) => {
		const newBody = texts;
		if (newBody.length == 1) newBody[0] = "";
		else newBody.splice(index, 1);
		await setTexts(newBody);
		setIsUpdate(isUpdate + 1);
	};

	return (
		<div className="Note">
			<div className="noteBar">
				<div className="barTitle">{title_ ? title_ : ""}</div>
				<SelectButton
					delete={_deleteNote}
					buttonClass="buttonNoteBar"
					menuClass="menuNoteBar"
				/>
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

			<div className="contentField">
				{texts.map((text: string, index: number) => (
					<EditorContent
						// value={text}
						// value={ref.current}
						// ref={ref}
						index={index}
						onChange={updateBody}
						id={id}
						html={text}
						addText={addText}
						deleteText={deleteText}
						// onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						// 	updateBody(event.target.value);
						// }}
					/>
				))}
			</div>
			{/* {/* <ContentEditable value={tex} onChange={updateBody} /> */}
		</div>
	);
};

export default Editor;
