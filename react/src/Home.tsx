import { Fragment, useEffect, useState } from "react";
import { auth } from "./auth/firebase";
import "./style/Home.css";
import Content from "./Content";
import Editor from "./Editor";
import CreateNote from "./CreateNote";
import {
	getNotes,
	_updateEditor,
	_deleteNote,
	createNote,
} from "./fetch/Fetch";

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
				if (docs.length == 1 || location.pathname == "/notes/")
					props.history.push("/notes/" + docs[0]._id);
				else if (selectIndex == docs.length - 1)
					props.history.push("/notes/" + docs[docs.length - 1]._id);
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
		const newNotes = notes;
		newNotes[selectIndex].note.title = _title;
		newNotes[selectIndex].note.body = contents;
		props.history.push("/notes/" + notes[selectIndex]._id);
		console.log("try update");
		setNotes(newNotes);
		console.log("finish update");
	};

	const deleteNote = async (index: number) => {
		console.log("try delete");
		_deleteNote(notes[index]);
		if (noteCount == 1) {
			newNote("Untitled");
		} else {
			const newNotes = notes;
			newNotes.splice(index, 1);
			await setNotes(newNotes);
			setSelectIndex(0);
		}
		console.log("finish delete");
		// setListUpdate(!listUpdate);
	};

	const select = (index: number) => {
		console.log("redirect");
		setSelectIndex(index);
		history.push("/notes/" + notes[index]._id);
		// window.location.href = "/notes/" + notes[selectIndex]._id;
		// history.push("/notes/" + notes[index]._id);
		// setListUpdate(!listUpdate);
		// window.location.reload();
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
											title={note.note.title}
											selectNote={select}
											deleteNote={deleteNote}
										/>
									}
								</>
							))}
							{<CreateNote newNote={newNote} />}
						</div>
						<button
							className="sidebar-bottom-new-page hover-gray"
							onClick={HandleOnclick}
						>
							+ New page
						</button>
					</div>
					<Switch>
						{notes.map((array, index) => (
							<Route exact path={"/notes/" + array._id}>
								<Editor
									index={index}
									key={index}
									note={array}
									noteUpdate={updateEditor}
									deleteNote={deleteNote}
								/>
							</Route>
						))}
						{/* <Route>{props.history.push("/a")}</Route> */}
					</Switch>
				</div>
			</div>
		</Fragment>
	);
};

export default Home;
