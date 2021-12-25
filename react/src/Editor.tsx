import React, { useState, useEffect } from "react";
import { useRef, useCallback } from "react";
import ReactQuill from "react-quill";
import _ from "lodash";
import EditorContent from "./EditorContent";
import SelectButton from "./components/SelectButton";
// import BorderColorIcon from "@material-ui/icons/BorderColor";
import { render } from "@testing-library/react";
import ReactDOM from "react-dom";
import { useDebounce } from "use-debounce";
// import { TextButton } from "../components/TextButton";

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
	const [update] = useDebounce(isUpdate, 1000);
	const [nextIndex, setNextIndex] = useState(-1);
	const [cursorMove, setCursorMove] = useState(false);
	// const [html, setHtml] = useState("<div>" + body + "</div>");

	const ref = useRef<HTMLInputElement>(null);

	useEffect(() => {
		isFirstRender.current = true;
	}, []);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = true;
		} else {
			console.log("debounce");
			noteUpdate(title_, texts, id);
			console.log(isUpdate);
		}
	}, [update]);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
		} else {
			console.log("cursor move");
			const nextText = document.querySelector<HTMLElement>(
				`[data-position="${nextIndex}"]`
			);
			if (nextText) nextText.focus();
		}
	}, [cursorMove]);

	const updateTitle = async (t: string) => {
		await setTitle_(t);
		setIsUpdate(isUpdate + 1);
		// update(t, texts);
		// console.log(title_);
	};
	const updateBody = (content: string, index: number, tag: string) => {
		// console.log("eidtor texts", ref.current);
		const newBody = texts;
		newBody[index].text = content;
		newBody[index].class = tag;
		setTexts(newBody);
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

	const addText = async (index: number) => {
		const newBody = texts;
		await newBody.splice(index + 1, 0, { text: "", class: "divText" });
		setTexts(newBody);
		console.log("add text");
		// 	// ref.previousElementSibling.focus();
		setNextIndex(index + 1);
		setCursorMove(!cursorMove);
		setIsUpdate(isUpdate + 1);
	};

	const deleteText = async (index: number) => {
		const newBody = texts;
		newBody.splice(index, 1);
		await setTexts(newBody);
		const nextText = document.querySelector<HTMLElement>(
			`[data-position="${index - 1}"]`
		);
		if (nextText) nextText.focus();
		setIsUpdate(isUpdate + 1);
	};

	const focusDown = (e: any) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			setNextIndex(0);
			setCursorMove(!cursorMove);
		}
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
			<div
				className="noteField"
				style={{
					width: props.sidebar
						? "calc(100vw - 300px)"
						: "calc(100vw - 60px)",
				}}
			>
				<div className="titleField">
					<input
						className="titleInput"
						placeholder="Untitled"
						autoFocus={true}
						value={title_ ? title_ : ""}
						onChange={(e) => updateTitle(e.target.value)}
						onKeyDown={(e) => focusDown(e)}
					/>
				</div>

				<div className="contentField">
					{texts.map((text: any, index: number) => {
						return (
							text && (
								<EditorContent
									// value={text}
									// value={ref.current}
									// ref={ref}
									index={index}
									key={index}
									onChange={updateBody}
									id={id}
									html={text}
									addText={addText}
									deleteText={deleteText}
									// onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									// 	updateBody(event.target.value);
									// }}
								/>
							)
						);
					})}
				</div>
				{/* {/* <ContentEditable value={tex} onChange={updateBody} /> */}
			</div>
		</div>
	);
};

export default Editor;
