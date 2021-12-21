import React, { Fragment, useEffect, useState } from "react";

function CreateNote(props: any) {
	const { classes, notes, selectedNoteIndex } = props;
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
		<div>
			{addingNote ? (
				<div>
					<input
						type="text"
						//   className={newNoteInput}
						placeholder="ノートのタイトル"
						value={title}
						onChange={(
							event: React.ChangeEvent<HTMLInputElement>
						) => {
							updateTitle(event.target.value);
						}}
					/>
					<button
						// className={classes.newNoteSubmitBtn}
						onClick={newNote}
					>
						ノートを作成する
					</button>
				</div>
			) : null}
			<button onClick={newNoteBtnClick}>
				{addingNote ? "キャンセル" : "新規ノート"}
			</button>
		</div>
	);
}

export default CreateNote;
