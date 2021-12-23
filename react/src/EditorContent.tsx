import { PinDropSharp } from "@material-ui/icons";
import React, { useState, useEffect, useCallback } from "react";
import { useRef, createRef } from "react";
import ContentEditable from "react-contenteditable";
import { TextButton } from "./TextButton";
import { IoApps } from "react-icons/io5";
var classNames = require("classnames");

const EditorContent = (props: any) => {
	let ref = createRef<HTMLDivElement>();
	// let ref = useRef(null);
	const [nonDisplay, setNonDisplay] = useState(true);
	const contentButtonClass = classNames({
		textButton: true,
		nonDisplay: nonDisplay,
	});
	const classTag = props.html.class;
	const [textClass, setTextClass] = useState(classTag);
	console.log(props.index);

	useEffect(() => {
		setTextClass(classTag);
	}, [classTag]);
	const handleInput = (e: any) => {
		console.log("handleInput");
		props.onChange(e.target.value, props.index, textClass);
	};
	// console.log("div value", props.value);

	const focusDown = (e: any) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			// props.addText(ref.current, props.index);
			// if (ref.current?.nextElementSibling)
			// 	ref.current.nextElementSibling.focus();
			// else console.log("null");
			console.log(ref.current);
			console.log(ref.current!.nextElementSibling);
		}
		if (e.key === "Backspace" && !props.html) {
			console.log("delete text");
			e.preventDefault();
			props.deleteText(ref.current, props.index);
		}
	};

	const onClickHandle = () => {
		setTextClass("headerText");
		// props.deleteText(ref.current, props.index);
	};

	return (
		<div
			className="textField"
			onMouseEnter={() => setNonDisplay(false)}
			onMouseLeave={() => setNonDisplay(true)}
		>
			<div className="textBlock">
				{/* <div className="textButton"> */}
				<div className={contentButtonClass} onClick={onClickHandle}>
					<IoApps />
				</div>
				<ContentEditable
					className={"textInput " + textClass}
					// innerRef={props.ref}
					// ref={ref}
					innerRef={ref}
					// innerRef={props.value}
					html={props.html.text}
					disabled={false}
					tagName="div"
					// id="test"
					// placeholder="content"
					// ref={props.ref2}
					// ref="refs"
					onChange={handleInput}
					onKeyDown={(e) => focusDown(e)}
					// dangerouslySetInnerHTML={{ __html: props.value }}
				/>

				{/* <form action=""> */}

				{/* <input type="text" value={text} onChange={ (e) => createUser(e.target.value)}/>
		<button type="button" onClick= {(e) => createUser} className="btn btn-danger">Create</button> */}
				{/* </form> */}
			</div>
		</div>
	);
};

export default EditorContent;
