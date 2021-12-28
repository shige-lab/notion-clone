import { useState, useEffect, useRef, createRef } from "react";
import ContentEditable from "react-contenteditable";
import ContentSideButton from "../components/ContentSideButton";
import { TurnInto } from "../components/MenuContent";
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
	const isFirstRender = useRef(false);

	useEffect(() => {
		isFirstRender.current = true;
	}, []);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
		} else {
			console.log("useEffect for class");
			setBullet(false);
			props.onChange(props.html.text, props.index, textClass);
		}
	}, [textClass]);

	useEffect(() => {
		setTextClass(classTag);
		if (classTag === "bullet") setBullet(true);
		if (classTag.includes("todo")) setTodo(true);
		else setTodo(false);
	}, [classTag]);

	const handleInput = (e: any) => {
		console.log("handleInput");
		props.onChange(e.target.value, props.index, textClass);
	};

	const focusDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			if (classTag !== "divText" && !props.html.text) {
				toText();
			} else props.addText(props.index, textClass);
		}
		if (e.key === "Backspace" && !props.html.text) {
			console.log("delete text");
			e.preventDefault();
			if (classTag !== "divText") toText();
			else props.deleteText(props.index);
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
	const toBullet = () => {
		setTextClass("bullet");
	};

	const deleteText = () => {
		props.deleteText(ref.current, props.index);
	};

	const duplicateText = () => {
		props.duplicateText(props.html.text, props.index, textClass);
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
						style={{ marginTop: "3px", marginRight: "5px" }}
					/>
				)}
				<ContentEditable
					className={"text-input " + textClass}
					innerRef={ref}
					html={props.html.text}
					disabled={false}
					tagName="div"
					id={"text" + props.index}
					// placeholder="content"
					onChange={handleInput}
					onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
						focusDown(e)
					}
				/>
				<TurnInto isOpen={openMenu} />
			</div>
		</div>
	);
};

export default EditorContent;