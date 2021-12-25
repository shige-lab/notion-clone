import React, { useState, useEffect, useRef } from "react";
import EditorContent from "./EditorContent";
import SelectButton from "./components/SelectButton";
import { useDebounce } from "use-debounce";
// import { TextButton } from "../components/TextButton";
// import ContentEditable from "react-contenteditable";

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
		const newBody = texts;
		newBody[index].text = content;
		newBody[index].class = tag;
		setTexts(newBody);
		setIsUpdate(isUpdate + 1);
		// console.log(texts);
		// update(title, content);
	};

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
		<div className="note">
			<div className="note-bar">
				<div className="bar-title">{title_ ? title_ : ""}</div>
				<SelectButton
					delete={_deleteNote}
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
						className="title-input"
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
									// ref={ref}
									index={index}
									key={index}
									onChange={updateBody}
									id={id}
									html={text}
									addText={addText}
									deleteText={deleteText}
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
