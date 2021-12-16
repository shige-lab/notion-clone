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
	const index = props.index;
	// console.log(index);

	const Handle_test = () => {
		// console.log(note.id);
		props.selectNote(note);
	};

	const deleteNote = () => {
		props.deleteNote(note);
	};

	return (
		<div>
			<div onClick={Handle_test}>{note.title}</div>
			<button onClick={deleteNote}>delete</button>
		</div>
	);
};

export default Content;
