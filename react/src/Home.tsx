import { Fragment, useEffect, useState } from "react";
import { auth } from "./firebase";
import "./Home.css";
import Content from "./Content";
import EditorApp from "./Editor";
import List from "./CreateNote";
import { getNotes, _updateEditor, _deleteNote, createNote } from "./Fetch";
import { GrLogout, GrMenu } from "react-icons/gr";

const Home = (props: any) => {
	const [userId, setUserId] = useState<string | undefined>("");
	const [notes, setNotes] = useState([
		{ _id: "", note: { title: "", body: "" } },
	]);
	// const [note, setNote] = useState({
	// 	_id: "",
	// 	note: { title: "", body: "" },
	// });
	const [sidebar, setSidebar] = useState(true);
	const [selectIndex, setSelectIndex] = useState(0);
	const [noteCount, setNoteCount] = useState(0);
	const [listUpdate, setListUpdate] = useState(false);

	useEffect(() => {
		console.log("home useEffect");
		auth.onAuthStateChanged((user) => {
			user ? setUserId(user?.uid) : props.history.push("/login");
			// setUserId(user?.uid);
			getNotes(user?.uid).then((docs: any) => {
				setNotes(docs);
				setNoteCount(docs.length);
				// console.log(note._id);
			});
		});
	}, [listUpdate]);

	const HandleOnclick = () => {
		newNote("Untitled");
	};

	const newNote = async (title: string) => {
		const note = {
			title,
			body: "",
			userId: userId,
		};
		console.log("try newNote");
		await createNote(note);
		console.log("finish newNote");
		setSelectIndex(noteCount);
		setListUpdate(!listUpdate);
		// getNotes(userId).then((docs: any) => {
		// 	const last = docs.slice(-1)[0];
		// 	console.log(last);
		// 	setNote(last);
		// });
	};
	const updateEditor = async (_title: string, text: string, id: string) => {
		await _updateEditor(_title, text, id);
		if (notes[selectIndex].note.title != _title) {
			const newNotes = notes;
			newNotes[selectIndex].note.title = _title;
			newNotes[selectIndex].note.body = text;
			console.log("try update");
			await setNotes(newNotes);
			console.log("finish update");
			// setListUpdate(!listUpdate);

			// console.log(notes[selectIndex].note.title);
			// setNotes([
			// 	{ ...notes[selectIndex], note: { title: _title, body: text } },
			// ]);
			// getNotes(userId).then((docs: any) => {
			// 	console.log(docs[0].note.title);
			// 	setNotes(docs);
			// });
		}
	};

	const deleteNote = async (SelectedNote: any) => {
		// setNote({ _id: "", note: { title: "", body: "" } });
		console.log("try delete");
		await _deleteNote(SelectedNote);
		console.log("finish delete");
		setListUpdate(!listUpdate);
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
					<GrLogout />
					Logout
				</button>
				<div className="Home_main">
					<div className={"Sidebar " + sidebar}>
						<div className="category">
							PRIVATE{" "}
							<button
								className={"sidebarButton button-" + sidebar}
								onClick={() => setSidebar(!sidebar)}
							>
								<GrMenu />
							</button>
						</div>
						{notes.map((array, index) => (
							<div>
								{
									<Content
										index={index}
										note={array}
										selectNote={setSelectIndex}
										deleteNote={deleteNote}
									/>
								}
							</div>
						))}
						{<List newNote={newNote} />}
					</div>
					{noteCount > selectIndex && (
						<EditorApp
							note={notes[selectIndex]}
							noteUpdate={updateEditor}
							deleteNote={deleteNote}
						/>
					)}
				</div>
				<button className="Home_newpage" onClick={HandleOnclick}>
					+ New Page
				</button>
			</div>
		</Fragment>
	);
};

export default Home;
