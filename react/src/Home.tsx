import { Fragment, useEffect, useState } from "react";
import { auth } from "./auth/firebase";
import "./style/Home.css";
import Content from "./Content";
import Editor from "./Editor";
import List from "./CreateNote";
import { getNotes, _updateEditor, _deleteNote, createNote } from "./Fetch";

import { GrLogout, GrMenu } from "react-icons/gr";
import { TextButton } from "./components/TextButton";
import { LogoutMenu } from "./components/MenuContent";

import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
var classNames = require("classnames");

const Home = (props: any) => {
	const [userId, setUserId] = useState<string | undefined>("");
	const [notes, setNotes] = useState([
		{
			_id: "",
			note: { title: "", body: [{ text: "", class: "divText" }] },
		},
	]);
	// const [note, setNote] = useState({
	// 	_id: "",
	// 	note: { title: "", body: "" },
	// });
	const [sidebar, setSidebar] = useState(true);
	const [nonDisplay, setNonDisplay] = useState(true);
	const [selectIndex, setSelectIndex] = useState(0);
	const [noteCount, setNoteCount] = useState(0);
	const [listUpdate, setListUpdate] = useState(false);
	const history = useHistory();
	const location = useLocation();
	const sidebarButtonClass = classNames({
		sidebarButton: true,
		nonDisplay: nonDisplay && sidebar,
		sidebarButtonOpen: sidebar,
		sidebarButtonClose: !sidebar,
	});

	useEffect(() => {
		console.log("home useEffect");
		auth.onAuthStateChanged((user) => {
			user ? setUserId(user?.uid) : props.history.push("/login");
			// setUserId(user?.uid);
			getNotes(user?.uid).then((docs: any) => {
				setNotes(docs);
				setNoteCount(docs.length);
				console.log("notesLength", docs.length);
				if (docs.length == 0) newNote("Untitled");
				else if (location.pathname == "/notes") {
					console.log(location.pathname);
					history.push("/notes/" + docs[0]._id);
					window.location.reload();
				}
			});
		});
	}, [listUpdate]);

	const HandleOnclick = () => {
		newNote("Untitled");
	};

	const setSidebarDisplay = () => {
		setNonDisplay(!sidebar);
		setSidebar(!sidebar);
		console.log(sidebar);
	};

	const newNote = async (title: string) => {
		const note = {
			title,
			body: [{ text: "", class: "divText" }],
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

	const updateEditor = async (_title: string, contents: any, id: string) => {
		await _updateEditor(_title, contents, id);
		if (notes[selectIndex].note.title != _title) {
			const newNotes = notes;
			newNotes[selectIndex].note.title = _title;
			newNotes[selectIndex].note.body = contents;
			console.log("try update");
			await setNotes(newNotes);
			console.log("finish update");

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

	const deleteNote = async (index: number) => {
		// setNote({ _id: "", note: { title: "", body: "" } });
		console.log("try delete");
		console.log(index);
		// console.log(notes[index].note.title);
		_deleteNote(notes[index]);
		const newNotes = notes;
		newNotes.splice(index, 1);
		await setNotes(newNotes);
		console.log("finish delete");
		// setListUpdate(!listUpdate);
	};

	const select = (index: number) => {
		console.log("redirect");
		history.push("/notes/" + notes[index]._id);
		window.location.reload();
		// return <Redirect to={"/notes/" + notes[index]._id} />;
		// window.location.href={"/notes/" + notes[index]._id};
	};

	return (
		<Fragment>
			<div className="home">
				{/* <header className="HomeHeader">notion clone</header> */}
				<div className="home-main">
					<div
						className={"sidebar " + sidebar}
						onMouseEnter={() => setNonDisplay(false)}
						onMouseLeave={() => setNonDisplay(true)}
					>
						<div className="sidebar-flame">
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
										sidebarButtonClass + " hover-gray"
									}
									onClick={setSidebarDisplay}
								>
									<GrMenu />
								</div>
							</div>
							<div className="category">PRIVATE</div>
							{notes.map((note, index) => (
								<>
									{
										<Content
											index={index}
											note={note}
											selectNote={select}
											deleteNote={deleteNote}
										/>
									}
								</>
							))}
							{<List newNote={newNote} />}
						</div>
						<button
							className="sidebar-bottom-new-page hover-gray"
							onClick={HandleOnclick}
						>
							+ New page
						</button>
					</div>
					<Router>
						<Switch>
							{notes.map((array, index) => (
								<Route exact path={"/notes/" + array._id}>
									<Editor
										index={index}
										note={array}
										noteUpdate={updateEditor}
										deleteNote={deleteNote}
									/>
								</Route>
							))}
							{/* <Route>{props.history.push("/a")}</Route> */}
						</Switch>
					</Router>
				</div>
			</div>
		</Fragment>
	);
};

export default Home;
