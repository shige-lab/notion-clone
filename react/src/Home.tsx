import "./style/Home.css";
import { Fragment, useEffect, useState, useRef } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { auth } from "./auth/firebase";
import Content from "./Content";
import Editor from "./Editor";
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
	}, []);

	useEffect(() => {
		console.log("1");
		if (isFirstRender.current) {
			isFirstRender.current = false;
		} else {
			if (noteCount === 0) newNote("");
			else {
				var isExist = false;
				notes.map((note: any) => {
					if (location.pathname == "/notes/" + note._id)
						isExist = true;
				});
				if (!isExist) {
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
		// const newBody = new Array(20).fill(text);
		const note = {
			title,
			body: content,
			userId: userId,
		};
		console.log("try newNote");
		console.log(note);
		await createNote(note).then((newNote: any) => {
			const newNotes = notes.slice(0, notes.length);
			newNotes.push(newNote);
			setSelectIndex(noteCount);
			// history.push("/notes/" + notes[0]._id);
			setNoteCount(noteCount + 1);
			setNotes(newNotes);
		});
		console.log("finish newNote");
		// setSelectIndex(selectIndex + 1);
		// setListUpdate(!listUpdate);
		// getNotes(userId).then((docs: any) => {
		// 	const last = docs.slice(-1)[0];
		// 	console.log(last);
		// 	setNote(last);
		// });
	};

	const updateEditor = async (_title: string, contents: any, id: string) => {
		await _updateEditor(_title, contents, id);
		const newNotes = notes.slice();
		newNotes[selectIndex].note.title = _title;
		newNotes[selectIndex].note.body = contents;
		console.log("try update");
		setNotes(newNotes);
		console.log("finish update");
	};

	const deleteNote = async (index: number) => {
		console.log("try delete");
		_deleteNote(notes[index]).then((note: any) => {
			console.log(note);
		});
		const newNotes = notes.slice(0, notes.length);
		newNotes.splice(index, 1);
		setNoteCount(noteCount - 1);
		setSelectIndex(0);
		setNotes(newNotes);
		console.log("finish delete");

		// setListUpdate(!listUpdate);
	};
	const renameTitle = async (index: number, title: string) => {
		const note = notes[index];
		console.log("rename");
		await _updateEditor(title, note.note.body, note._id);
		const newNotes = notes.slice();
		newNotes[index].note.title = title;
		newNotes[index].note.body = note.note.body;
		console.log("try rename");
		setNotes(newNotes);
		console.log("finish rename");
	};

	const duplicateNote = async (index: number) => {
		const note = notes[index];
		const duplicate = {
			title: note.note.title,
			body: note.note.body,
			userId: userId,
		};
		await createNote(duplicate).then((duplicate: any) => {
			const newNotes = notes.slice(0, notes.length);
			newNotes.push(duplicate);
			setSelectIndex(noteCount);
			setNoteCount(noteCount + 1);
			setNotes(newNotes);
		});
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
				{/* <header className="home-header">notion clone</header> */}
				<div className="home-main">
					<div
						className={"sidebar"}
						style={{ width: sidebar ? "240px" : "0px" }}
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
										sidebar_buttonClass + " hover-gray"
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
											key={index}
											title={note.note.title}
											selectNote={select}
											deleteNote={deleteNote}
											duplicateNote={duplicateNote}
											renameTitle={renameTitle}
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
						{notes.map((array, index) => (
							<Route exact path={"/notes/" + array._id}>
								<Editor
									index={index}
									key={index}
									note={array}
									noteUpdate={updateEditor}
									deleteNote={deleteNote}
									duplicateNote={duplicateNote}
									renameTitle={renameTitle}
									sidebar={sidebar}
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
