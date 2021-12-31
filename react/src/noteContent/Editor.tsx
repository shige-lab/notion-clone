import { useState, useEffect, useRef } from "react";
import EditorContent from "./EditorContent";
import SelectButton from "../components/SelectButton";
import _ from "lodash";

const Editor = (props: any) => {
	const noteUpdate = props.noteUpdate;
	const { title, body } = props.note.note;
	const id = props.note._id;
	const [texts, setTexts] = useState(body);
	const [title_, setTitle_] = useState(title);
	const isFirstRender = useRef(false);
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
		console.log("first");
		if (isFirstRender.current) {
			isFirstRender.current = false;
		} else {
			console.log("cursor move");
			const nextText = document.getElementById("text" + nextIndex);
			if (nextText) {
				nextText.focus();
			}
		}
	}, [cursorMove]);

	const updateNote = _.debounce((title: string) => {
		noteUpdate(title, texts, id);
		console.log("debounce");
	}, 1000);

	const updateTitle = (t: string) => {
		console.log(t);
		setTitle_(t);
		updateNote(t);
	};

	const updateBody = (content: string, index: number, tag: string) => {
		var newBody;
		if (texts[index].class !== tag) {
			newBody = texts.slice(0, texts.length);
			newBody[index].class = tag;
		} else {
			newBody = texts;
		}
		newBody[index].text = content;
		setTexts(newBody);
		updateNote(title_);
	};

	const _deleteNote = () => {
		props.deleteNote(props.index);
	};

	const addText = (index: number, textClass: string) => {
		let className = "divText";
		if (textClass.includes("todo")) className = "todo";
		if (textClass === "bullet") className = "bullet";
		addTextWithStyle(index, className);
	};

	const addTextWithStyle = (index: number, className: string) => {
		const newBody = texts.slice(0, texts.length);
		newBody.splice(index + 1, 0, { text: "", class: className });
		setTexts(newBody);
		setNextIndex(index + 1);
		setCursorMove(!cursorMove);
		updateNote(title_);
		console.log("add text");
	};

	const deleteText = (index: number) => {
		const newBody = texts.slice(0, texts.length);
		newBody.splice(index, 1);
		setTexts(newBody);
		const previousText = document.getElementById("text" + (index - 1));
		if (previousText) previousText.focus();
		updateNote(title_);
	};

	const duplicateText = (text: string, index: number, textClass: string) => {
		const newBody = texts.slice(0, texts.length);
		newBody.splice(index + 1, 0, { text: text, class: textClass });
		setTexts(newBody);
		console.log("add text");
		updateNote(title_);
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
					width: props.sidebar ? "calc(100vw - 240px)" : "100vw",
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
									addTextWithStyle={addTextWithStyle}
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
