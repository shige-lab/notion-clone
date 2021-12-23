import {
	Button,
	Container,
	FormControl,
	Grid,
	Link,
	TextField,
	Typography,
} from "@material-ui/core";
import SelectButton from "./SelectButton";
import { useState } from "react";
var classNames = require("classnames");

const Content = (props: any) => {
	const note = props.note;
	const [test, setTest] = useState(false);
	const [nonDisplay, setNonDisplay] = useState(true);
	const buttonClass = classNames({
		buttonSideBar: true,
		nonDisplay: nonDisplay,
	});

	const Handle_test = () => {
		// console.log(note.id);
		props.selectNote(props.index);
	};

	const deleteNote = () => {
		props.deleteNote(note);
	};

	return (
		<div
			className="List_Block"
			onMouseEnter={() => setNonDisplay(false)}
			onMouseLeave={() => setNonDisplay(true)}
		>
			<li className="list" onClick={Handle_test}>
				{note.note.title}
			</li>
			{/* <button className="button" onClick={deleteNote}>
				delete
			</button> */}

			<SelectButton
				delete={deleteNote}
				buttonClass={buttonClass}
				menuClass="menuSideBar"
			/>
		</div>
	);
};

export default Content;
