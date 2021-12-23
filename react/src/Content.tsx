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
import { GrNotes } from "react-icons/gr";
var classNames = require("classnames");

const Content = (props: any) => {
	const note = props.note;
	const [test, setTest] = useState(false);
	const [nonDisplay, setNonDisplay] = useState(true);
	const buttonClass = classNames({
		nonDisplay: nonDisplay,
	});

	const Handle_test = () => {
		console.log("select from content");
		props.selectNote(props.index);
	};

	const deleteNote = () => {
		props.deleteNote(props.index);
	};

	return (
		<div
			className="List_Block"
			onMouseEnter={() => setNonDisplay(false)}
			onMouseLeave={() => setNonDisplay(true)}
		>
			<div>
				<GrNotes />
			</div>

			<div className="list" onClick={Handle_test}>
				{note.note.title}
			</div>
			<SelectButton
				delete={deleteNote}
				buttonClass={buttonClass}
				menuClass="menuSideBar"
			/>
		</div>
	);
};

export default Content;
