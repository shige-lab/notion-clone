import "./style/Home.css";
import { Fragment, useEffect, useState, useRef } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { auth } from "./auth/firebase";
import NoteList from "./sidebar/NoteList";
import Editor from "./noteContent/Editor";
import {
	getNotes,
	_updateEditor,
	_deleteNote,
	createNote,
} from "./fetch/Fetch";
import { LogoutMenu } from "./components/MenuContent";
import { GrMenu } from "react-icons/gr";
import { BsPlusLg } from "react-icons/bs";
var classNames = require("classnames");

const Home = (props: any) => {
	const [userId, setUserId] = useState<string | undefined>("");
	const [notes, setNotes] = useState([
		{
			_id: "",
			note: { title: "", body: [{ text: "", class: "divText" }] },
		},
	]);
	const [sidebar, setSidebar] = useState(true);
	const [nonDisplay, setNonDisplay] = useState(true);
	const [selectIndex, setSelectIndex] = useState(0);
	const [noteCount, setNoteCount] = useState(0);
	const isFirstRender = useRef(false);
	const history = useHistory();
	const location = useLocation();
	const sidebar_buttonClass = classNames({
		sidebar_button: true,
		nonDisplay: nonDisplay && sidebar,
		sidebar_button_open: sidebar,
		sidebar_button_close: !sidebar,
	});

	useEffect(() => {
		console.log("home useEffect");
		isFirstRender.current = true;
		auth.onAuthStateChanged((user) => {
			user ? setUserId(user?.uid) : props.history.push("/login");
			getNotes(user?.uid).then((docs: any) => {
				setNoteCount(docs.length);
				setNotes(docs);
				console.log("notesLength", docs.length);
			});
		});
	}, [userId]);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
		} else {
			if (noteCount === 0) newNote("");
			else {
				var isExist = false;
				notes.map((note: any) => {
					if (location.pathname === "/notes/" + note._id)
						isExist = true;
				});
				if (!isExist || selectIndex) {
					props.history.push("/notes/" + notes[selectIndex]._id);
					console.log("page changed");
				}
			}
		}
	}, [notes]);
	const HandleOnclick = () => {
		newNote("");
	};

	const setSidebarDisplay = () => {
		setNonDisplay(!sidebar);
		setSidebar(!sidebar);
		console.log(sidebar);
	};

	const newNote = async (title: string) => {
		const content = { text: "", class: "divText" };
		const note = {
			title,
			body: content,
			userId: userId,
		};
		console.log("try newNote");
		await createNote(note).then((newNote: any) => {
			const newNotes = notes.slice(0, notes.length);
			newNotes.push(newNote);
			setSelectIndex(noteCount);
			setNoteCount(noteCount + 1);
			setNotes(newNotes);
			console.log("finish newNote");
		});
	};

	const updateEditor = async (_title: string, contents: any, id: string) => {
		console.log("try update");
		_updateEditor(_title, contents, id).then((note: any) => {
			console.log(note);
			const newNotes = notes.slice();
			newNotes[selectIndex].note.title = _title;
			newNotes[selectIndex].note.body = contents;
			setNotes(newNotes);
			console.log("finish update");
		});
	};

	const deleteNote = async (index: number) => {
		console.log("try delete");
		_deleteNote(notes[index]).then((note: any) => {
			console.log(note);
			console.log("finish delete");
		});
		const newNotes = notes.slice(0, notes.length);
		newNotes.splice(index, 1);
		setNoteCount(noteCount - 1);
		setSelectIndex(0);
		setNotes(newNotes);
	};
	const renameTitle = async (index: number, title: string) => {
		console.log("try rename");
		const note = notes[index];
		_updateEditor(title, note.note.body, note._id).then((note: any) => {
			const newNotes = notes.slice();
			newNotes[index].note.title = title;
			newNotes[index].note.body = note.note.body;
			setNotes(newNotes);
			console.log("finish rename");
		});
	};

	const duplicateNote = async (index: number) => {
		const note = notes[index];
		const duplicate = {
			title: note.note.title,
			body: note.note.body,
			userId: userId,
		};
		createNote(duplicate).then((duplicate: any) => {
			console.log("try create");
			const newNotes = notes.slice(0, notes.length);
			newNotes.push(duplicate);
			setSelectIndex(noteCount);
			setNoteCount(noteCount + 1);
			setNotes(newNotes);
			console.log("finish create");
		});
	};

	const select = (index: number) => {
		setSelectIndex(index);
		history.push("/notes/" + notes[index]._id);
		console.log("redirect");
	};

	return (
		<Fragment>
			<div className="home">
				{/* <header className="home-header">notion clone</header> */}
				<div className="home-main">
					<div
						className={"sidebar"}
						style={{ width: sidebar ? "240px" : "0px" }}
						onMouseEnter={() => setNonDisplay(false)}
						onMouseLeave={() => setNonDisplay(true)}
					>
						<div className="sidebar-flame">
							<div className="sidebar-before-list">
								<div className="hover-gray">
									<div
										className="logout"
										onClick={async (event) => {
											try {
												await auth.signOut();
												props.history.push("/login");
											} catch (error) {
												alert(error);
											}
										}}
										style={{
											marginTop: "0.5em",
											marginBottom: "0.5em",
										}}
									>
										<LogoutMenu />
									</div>
									<div
										className={
											sidebar_buttonClass + " hover-gray"
										}
										onClick={setSidebarDisplay}
									>
										<GrMenu />
									</div>
								</div>
								<div className="category">PRIVATE</div>
							</div>
							<div className="list-flame">
								<div className="list-filed">
									{notes.map((note, index) => (
										<>
											{
												<NoteList
													index={index}
													key={note._id}
													note={note}
													title={note.note.title}
													selectNote={select}
													deleteNote={deleteNote}
													duplicateNote={
														duplicateNote
													}
													renameTitle={renameTitle}
													url={location.pathname}
												/>
											}
										</>
									))}
									<div
										className="list-block add-a-page"
										onClick={HandleOnclick}
									>
										<BsPlusLg />
										<div className="list">Add a page</div>
									</div>
								</div>
							</div>
						</div>
						<div
							className="sidebar-bottom hover-gray"
							onClick={HandleOnclick}
						>
							<div className="sidebar-bottom-new-page hover-gray">
								<BsPlusLg />
								<div style={{ marginLeft: "15px" }}>
									New page
								</div>
							</div>
						</div>
					</div>
					<Switch>
						{notes.map((note, index) => (
							<Route exact path={"/notes/" + note._id}>
								<Editor
									index={index}
									key={note._id}
									note={note}
									noteUpdate={updateEditor}
									deleteNote={deleteNote}
									duplicateNote={duplicateNote}
									renameTitle={renameTitle}
									sidebar={sidebar}
								/>
							</Route>
						))}
					</Switch>
				</div>
			</div>
		</Fragment>
	);
};

export default Home;
