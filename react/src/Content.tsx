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

const Content = (props: any) => {
	const note = props.note;
	const [test, setTest] = useState(false);

	const Handle_test = () => {
		// console.log(note.id);
		props.selectNote(props.index);
	};

	const deleteNote = () => {
		props.deleteNote(note);
	};

	return (
		<div className="List_Block">
			<li className="list" onClick={Handle_test}>
				{note.note.title}
			</li>
			{/* <button className="button" onClick={deleteNote}>
				delete
			</button> */}
			<div className="button">
				<SelectButton delete={deleteNote} />
			</div>
		</div>
	);
};

export default Content;
