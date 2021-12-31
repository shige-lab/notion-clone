import { SelectStyle } from "../components/MenuContent";
import { useState, useEffect } from "react";

const BackSlashCommand = (props: any) => {
	const [className, setClassName] = useState("");
	useEffect(() => {
		if (className) {
			console.log("change class name");
			props.addTextWithStyle(props.index, className);
		}
	}, [className]);

	const toText = () => {
		console.log(props.text);
		if (props.text === "/") props.toText();
		else setClassName("divText");
	};
	const toHeader1 = () => {
		if (props.text === "/") props.toHeader1();
		else setClassName("header1Text");
	};
	const toHeader2 = () => {
		if (props.text === "/") props.toHeader2();
		else setClassName("header2Text");
	};
	const toHeader3 = () => {
		if (props.text === "/") props.toHeader3();
		else setClassName("header3Text");
	};

	const toTodo = () => {
		if (props.text === "/") props.toTodo();
		else setClassName("todo");
	};
	const toBullet = () => {
		if (props.text === "/") props.toBullet();
		else setClassName("bullet");
	};

	return (
		<>
			<SelectStyle
				nonDisplay={props.isBackSlash}
				toText={toText}
				toHeader1={toHeader1}
				toHeader2={toHeader2}
				toHeader3={toHeader3}
				toTodo={toTodo}
				toBullet={toBullet}
				ifDropUp={props.ifDropUp}
			/>
		</>
	);
};
export default BackSlashCommand;
