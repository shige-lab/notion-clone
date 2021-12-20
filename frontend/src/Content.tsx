import {
	Button,
	Container,
	FormControl,
	Grid,
	Link,
	TextField,
	Typography,
} from "@material-ui/core";

const Content = (props: any) => {
	const note = props.note;
	// console.log(index);

	const Handle_test = () => {
		// console.log(note.id);
		props.selectNote(note);
	};

	const deleteNote = () => {
		props.deleteNote(note);
	};

	return (
		<div className="List_Block">
			<div className="list" onClick={Handle_test}>
				{note.note.title}
			</div>
			<button className="button" onClick={deleteNote}>
				delete
			</button>
		</div>
	);
};

export default Content;
