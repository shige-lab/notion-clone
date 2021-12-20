import { Fragment, useEffect, useState } from "react";
import { auth} from "./firebase";
import "./Home.css";
import Content from "./Content";
import EditorApp from "./Editor";
import List from "./CreateNote";
import { getNotes, _updateEditor, _deleteNote, createNote} from "./Fetch";

const Home = (props: any) => {
	const [userId, setUserId] = useState<string | undefined>("");
	const [notes, setNotes] = useState([{ _id: "", note: {title: "", body: ""}}]);
	const [note, setNote] = useState({ _id: "", note: {title: "", body: ""}});

	useEffect(() => {
		console.log("useEffect");
		auth.onAuthStateChanged( (user) => {
			user ? setUserId(user?.uid) : props.history.push("/login");
			// setUserId(user?.uid);
			getNotes(user?.uid).then((docs: any) => { 
				setNotes(docs);
				//  console.log(docs.length);
				//  console.log(note._id);
				if (docs.length &&!note._id)
				setNote(docs[0]);
			});
		});
		
	}, [note]);
	
	const HandleOnclick = () => {
		newNote("Untitled");
	};
		
		const newNote = async (title: string) => {
		console.log("6");
		const note = {
			title,
			body: "",
			userId : userId,
		};
				await createNote(note);
				console.log("0");
				getNotes(userId).then((docs: any) => { 
			const last = docs.slice(-1)[0];
			console.log(last);
			setNote(last);
		});
		
	};
	const updateEditor = async(_title: string, text: string, id: string) => {
		await _updateEditor(_title, text, id);
		if (note.note.title != _title)
		{
			console.log(_title);
			getNotes(userId).then((docs: any) => { 
				setNotes(docs);
			});
		}
	}

	const deleteNote = async (SelectedNote: any) => {
		setNote({ _id: "", note: {title: "", body: ""}});
		_deleteNote(SelectedNote);
	};

	return (
		<Fragment>
			<div className="Home">
				<header className="HomeHeader">notion clone</header>
				<button
					className="Heme_logout"
					onClick={async (event) => {
						try {
							await auth.signOut();
							props.history.push("/login");
						} catch (error) {
							alert(error);
						}
					}}
					style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
				>
					Logout
				</button>
				<div className="Home_main">
					<div className="Sidebar">
						<div className="category">PRIVATE</div>
						{notes.map((array) => (
							<div>
								{
									<Content
										note={array}
										selectNote={setNote}
										deleteNote={deleteNote}
									/>
								}
							</div>
						))}
						{<List newNote={newNote} />}
					</div>
					<div className="Note">
						{note._id && (
							<EditorApp note={note} noteUpdate={updateEditor} />
						)}
							
					</div>
				</div>
				<button className="Home_newpage" onClick={HandleOnclick}>
					+ New Page
				</button>
			</div>
		</Fragment>
	);
};

export default Home;
