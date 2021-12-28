import React, { useState, useEffect, useRef } from "react";
import EditorContent from "./EditorContent";
import SelectButton from "../components/SelectButton";
import { useDebounce } from "use-debounce";

const Editor = (props: any) => {
	const noteUpdate = props.noteUpdate;
	const { title, body } = props.note.note;
	const id = props.note._id;
	const [texts, setTexts] = useState(body);
	const [title_, setTitle_] = useState(title);
	const isFirstRender = useRef(false);
	const [isUpdate, setIsUpdate] = useState(0);
	const [update] = useDebounce(isUpdate, 1000);
	const [nextIndex, setNextIndex] = useState(-1);
	const [cursorMove, setCursorMove] = useState(false);

	useEffect(() => {
		isFirstRender.current = true;
		if (!title) {
			const titleFocus = document.getElementById("text-1");
			if (titleFocus) titleFocus.focus();
		}
	}, []);

	useEffect(() => {
		setTexts(body);
		setTitle_(title);
	}, [title, body]);

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
			const nextText = document.getElementById("text" + nextIndex);
			if (nextText) {
				nextText.focus();
				// nextText.innerHTML += "";
			}
		}
	}, [cursorMove]);

	const updateTitle = (t: string) => {
		setTitle_(t);
		setIsUpdate(isUpdate + 1);
	};
	const updateBody = (content: string, index: number, tag: string) => {
		const newBody = texts;
		newBody[index].text = content;
		newBody[index].class = tag;
		setTexts(newBody);
		setIsUpdate(isUpdate + 1);
	};

	const _deleteNote = () => {
		props.deleteNote(props.index);
	};

	const addText = (index: number, textClass: string) => {
		let className = "divText";
		if (textClass.includes("todo")) className = "todo";
		if (textClass === "bullet") className = "bullet";
		const newBody = texts;
		newBody.splice(index + 1, 0, { text: "", class: className });
		setTexts(newBody);
		console.log("add text");
		setNextIndex(index + 1);
		setCursorMove(!cursorMove);
		setIsUpdate(isUpdate + 1);
	};

	const deleteText = (index: number) => {
		const newBody = texts;
		newBody.splice(index, 1);
		setTexts(newBody);
		const previousText = document.getElementById("text" + (index - 1));
		if (previousText) previousText.focus();
		setIsUpdate(isUpdate + 1);
	};

	const duplicateText = (text: string, index: number, textClass: string) => {
		const newBody = texts;
		newBody.splice(index + 1, 0, { text: text, class: textClass });
		setTexts(newBody);
		console.log("add text");
		setIsUpdate(isUpdate + 1);
	};

	const focusDown = (e: any) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			addText(-1, "");
		}
	};

	const duplicateNote = () => {
		props.duplicateNote(props.index);
	};

	return (
		<div className="note">
			<div className="note-bar">
				<div className="bar-title">{title_ ? title_ : ""}</div>
				<SelectButton
					delete={_deleteNote}
					duplicate={duplicateNote}
					isRename={false}
					buttonClass="button-note-bar"
					menuClass="menu-note-bar"
				/>
			</div>
			<div
				className="note-field"
				style={{
					width: props.sidebar
						? "calc(100vw - 300px)"
						: "calc(100vw - 60px)",
				}}
			>
				<div className="title-field">
					<input
						id="text-1"
						className="title-input"
						placeholder="Untitled"
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
									index={index}
									key={index}
									onChange={updateBody}
									id={id}
									html={text}
									addText={addText}
									deleteText={deleteText}
									duplicateText={duplicateText}
								/>
							)
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Editor;