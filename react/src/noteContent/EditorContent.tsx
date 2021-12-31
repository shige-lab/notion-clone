import { useState, useEffect, useRef, createRef } from "react";
import ContentEditable from "react-contenteditable";
import ContentSideButton from "../components/ContentSideButton";
import BackSlashCommand from "./BackSlashCommand";
import { BsFillRecordFill } from "react-icons/bs";
var classNames = require("classnames");

const EditorContent = (props: any) => {
	let ref = createRef<HTMLDivElement>();
	const [nonDisplay, setNonDisplay] = useState(true);
	const contentButtonClass = classNames({
		text_button: true,
		nonDisplay: nonDisplay,
	});
	const classTag = props.html.class;
	const [textClass, setTextClass] = useState(classTag);
	const [todo, setTodo] = useState(false);
	const [bullet, setBullet] = useState(false);
	const [openMenu, setOpenMenu] = useState(false);
	const [ifDropUp, setIfDropUp] = useState(0);
	const isFirstRender = useRef(false);
	const [placeHolder, setPlaceHolder] = useState("");

	useEffect(() => {
		isFirstRender.current = true;
	}, []);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
		} else {
			console.log("useEffect for class");
			if (openMenu) {
				const deleteBackSlash = props.html.text.slice(0, -1);
				props.onChange(deleteBackSlash, props.index, textClass);
				const currentText = document.getElementById(
					"text" + props.index
				);
				if (currentText) currentText.focus();
			} else props.onChange(props.html.text, props.index, textClass);
		}
	}, [textClass]);

	useEffect(() => {
		setTextClass(classTag);
		if (classTag === "bullet") setBullet(true);
		else setBullet(false);
		if (classTag.includes("todo")) setTodo(true);
		else setTodo(false);
		SetPlaceHolder();
	}, [classTag]);

	const handleInput = (e: any) => {
		console.log("handleInput");
		props.onChange(e.target.value, props.index, textClass);
	};

	const focusDown = (e: any) => {
		if (e.keyCode === 13 && !e.shiftKey) {
			e.preventDefault();
			if (classTag !== "divText" && !props.html.text) {
				toText();
			} else props.addText(props.index, textClass);
		} else if (e.key === "Backspace" && !props.html.text) {
			console.log("delete text");
			e.preventDefault();
			if (classTag !== "divText") toText();
			else props.deleteText(props.index);
		} else if (e.keyCode === 191) {
			if (e.target.getBoundingClientRect().top + 255 > window.innerHeight)
				setIfDropUp(e.target.getBoundingClientRect().top - 230);
			else setIfDropUp(e.target.getBoundingClientRect().top + 25);
			setOpenMenu(true);
		} else setOpenMenu(false);
	};

	const toText = () => {
		setTextClass("divText");
	};
	const toHeader1 = () => {
		setTextClass("header1Text");
	};
	const toHeader2 = () => {
		setTextClass("header2Text");
	};
	const toHeader3 = () => {
		setTextClass("header3Text");
	};
	const toTodo = () => {
		setTextClass("todo");
	};
	const toBullet = () => {
		setTextClass("bullet");
	};

	const deleteText = () => {
		props.deleteText(props.index);
	};

	const duplicateText = () => {
		props.duplicateText(props.html.text, props.index, textClass);
	};

	const handleTodo = () => {
		if (classTag === "todo") setTextClass("todo-done");
		else if (classTag === "todo-done") setTextClass("todo");
	};

	const addTextWithStyle = (index: number, className: string) => {
		const deleteBackSlash = props.html.text.slice(0, -1);
		props.onChange(deleteBackSlash, props.index, textClass);
		props.addTextWithStyle(index, className);
	};

	const SetPlaceHolder = () => {
		if (classTag.includes("header"))
			setPlaceHolder("Heading " + classTag.charAt(6));
		else if (classTag.includes("todo")) setPlaceHolder("To-do");
		else if (classTag === "bullet") setPlaceHolder("List");
		else if (
			classTag === "divText" &&
			document.getElementById("text" + props.index) ==
				document.activeElement
		)
			setPlaceHolder("Type '/' for commands");
		else setPlaceHolder("");
	};

	const ifDisplayPlaceHolder = () => {
		if (!placeHolder && classTag === "divText")
			setPlaceHolder("Type '/' for commands");
	};
	const ifNonDisplayPlaceHolder = () => {
		if (placeHolder === "Type '/' for commands") setPlaceHolder("");
	};

	return (
		<div
			className="text-field"
			onMouseEnter={() => setNonDisplay(false)}
			onMouseLeave={() => setNonDisplay(true)}
			onFocus={ifDisplayPlaceHolder}
			onBlur={ifNonDisplayPlaceHolder}
		>
			<div
				className="text-block"
				onBlur={() => setTimeout(() => setOpenMenu(false), 300)}
			>
				<ContentSideButton
					className={contentButtonClass}
					textClass={textClass}
					toText={toText}
					toHeader1={toHeader1}
					toHeader2={toHeader2}
					toHeader3={toHeader3}
					toTodo={toTodo}
					toBullet={toBullet}
					deleteText={deleteText}
					duplicateText={duplicateText}
				/>
				{todo && (
					<input
						onChange={handleTodo}
						className="todo-checkbox"
						type="checkbox"
						checked={textClass === "todo" ? false : true}
					/>
				)}
				{bullet && (
					<BsFillRecordFill
						style={{
							marginTop: "3px",
							marginRight: "5px",
							flexShrink: 0,
						}}
					/>
				)}
				<ContentEditable
					className={"text-input " + textClass}
					innerRef={ref}
					html={props.html.text}
					disabled={false}
					tagName="div"
					id={"text" + props.index}
					data-placeholder={placeHolder}
					onChange={handleInput}
					onKeyDown={(e: any) => focusDown(e)}
				/>
				<BackSlashCommand
					index={props.index}
					text={props.html.text}
					addTextWithStyle={addTextWithStyle}
					ifDropUp={ifDropUp}
					isBackSlash={openMenu}
					onBlur={() => setOpenMenu(false)}
					toText={toText}
					toHeader1={toHeader1}
					toHeader2={toHeader2}
					toHeader3={toHeader3}
					toTodo={toTodo}
					toBullet={toBullet}
				/>
			</div>
		</div>
	);
};

export default EditorContent;
