import { useState } from "react";

const CreateNote = (props: any) => {
	const [addingNote, setAddingNote] = useState(false);
	const [title, setTitle] = useState("");

	const newNoteBtnClick = () => {
		setAddingNote(!addingNote);
	};

	const updateTitle = (txt: string) => {
		setTitle(txt);
	};

	const newNote = () => {
		props.newNote(title);
		setTitle("");
		setAddingNote(false);
	};

	return (
		<div className="new-note">
			{addingNote ? (
				<div>
					<input
						type="text"
						placeholder="note title"
						value={title}
						onChange={(
							event: React.ChangeEvent<HTMLInputElement>
						) => {
							updateTitle(event.target.value);
						}}
					/>
					<button className="new-note-button" onClick={newNote}>
						Create note
					</button>
				</div>
			) : null}
			<button className="new-note-button" onClick={newNoteBtnClick}>
				{addingNote ? "Cancel" : "Add note"}
			</button>
		</div>
	);
};

export default CreateNote;
