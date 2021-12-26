import { useState, useEffect, useRef, createRef } from "react";
import ContentEditable from "react-contenteditable";
import ContentSideButton from "./components/ContentSideButton";
import { TurnInto } from "./components/MenuContent";
// import { TextButton } from "./components/TextButton";
var classNames = require("classnames");

const EditorContent = (props: any) => {
	let ref = createRef<HTMLDivElement>();
	// let ref = useRef(null);
	const [nonDisplay, setNonDisplay] = useState(true);
	const contentButtonClass = classNames({
		text_button: true,
		nonDisplay: nonDisplay,
	});
	const classTag = props.html.class;
	const [textClass, setTextClass] = useState(classTag);
	const [todo, setTodo] = useState(false);
	const [openMenu, setOpenMenu] = useState(false);
	const isFirstRender = useRef(false);
	// console.log(props.index);

	useEffect(() => {
		isFirstRender.current = true;
	}, []);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
		} else {
			console.log("useEffect for class");
			props.onChange(props.html.text, props.index, textClass);
		}
	}, [textClass]);

	useEffect(() => {
		setTextClass(classTag);
		if (classTag.includes("todo")) setTodo(true);
		else setTodo(false);
	}, [classTag]);

	const handleInput = (e: any) => {
		console.log("handleInput");
		props.onChange(e.target.value, props.index, textClass);
	};

	const focusDown = (e: any) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			props.addText(props.index, textClass);
		}
		if (e.key === "Backspace" && !props.html.text) {
			console.log("delete text");
			e.preventDefault();
			props.deleteText(props.index);
		}
		if (e.key === "/") setOpenMenu(true);
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

	const deleteText = () => {
		props.deleteText(ref.current, props.index);
	};

	const handleTodo = () => {
		if (classTag === "todo") setTextClass("todo-done");
		else if (classTag === "todo-done") setTextClass("todo");
	};

	return (
		<div
			className="textField"
			onMouseEnter={() => setNonDisplay(false)}
			onMouseLeave={() => setNonDisplay(true)}
		>
			<div className="text-block">
				<ContentSideButton
					className={contentButtonClass}
					textClass={textClass}
					toText={toText}
					toHeader1={toHeader1}
					toHeader2={toHeader2}
					toHeader3={toHeader3}
					toTodo={toTodo}
					deleteText={deleteText}
				/>
				{todo && (
					<input
						onChange={handleTodo}
						// onClick={handleTodo}
						className="todo-checkbox"
						type="checkbox"
						checked={textClass == "todo" ? false : true}
					/>
				)}
				<ContentEditable
					className={"text-input " + textClass}
					data-position={props.index}
					innerRef={ref}
					// innerRef={props.value}
					html={props.html.text}
					disabled={false}
					tagName="div"
					// id="test"
					// placeholder="content"
					onChange={handleInput}
					onKeyDown={(e) => focusDown(e)}
				/>
				<TurnInto isOpen={openMenu} />
			</div>
		</div>
	);
};

export default EditorContent;
