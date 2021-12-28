import SelectButton from "./components/SelectButton";
import { useState, useRef, useEffect } from "react";
import { GrNotes } from "react-icons/gr";
import { useDebounce } from "use-debounce";
var classNames = require("classnames");

const Content = (props: any) => {
	const title = props.title;
	const [_title, setTitle] = useState(title);
	const [nonDisplay, setNonDisplay] = useState(true);
	const [isSelect, setIsSelect] = useState(false);
	const isFirstRender = useRef(false);
	const [update] = useDebounce(_title, 1000);
	const [input, setInput] = useState(false);
	const notesURL = "http://localhost:3000/notes/";
	const isMouseOver = classNames({
		nonDisplay: nonDisplay,
	});
	const selectedClass = classNames({
		selected: isSelect,
	});

	useEffect(() => {
		isFirstRender.current = true;
	}, []);

	useEffect(() => {
		if (props.note._id && props.url.includes(props.note._id)) {
			setIsSelect(props.url);
			setIsSelect(true);
		} else setIsSelect(false);
	}, [props.url, props.note._id]);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
		} else {
			renameTitle(update);
		}
	}, [update]);

	const Handle_test = () => {
		console.log("select from content");
		props.selectNote(props.index);
	};

	const deleteNote = () => {
		props.deleteNote(props.index);
	};

	const renameTitle = (title: string) => {
		props.renameTitle(props.index, title);
	};

	const openInput = (open: boolean) => {
		setTitle(title);
		setInput(open);
	};

	const duplicateNote = () => {
		props.duplicateNote(props.index);
	};

	const copyUrl = () => {
		const element = document.createElement("input");
		element.value = notesURL + props.note._id;
		document.body.appendChild(element);
		element.select();
		document.execCommand("copy");
		document.body.removeChild(element);
	};
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			setInput(false);
		}
	};

	return (
		<div
			className={"list-block " + selectedClass}
			onMouseEnter={() => setNonDisplay(false)}
			onMouseLeave={() => setNonDisplay(true)}
		>
			<div>
				<GrNotes />
			</div>
			<div className="list" onClick={Handle_test}>
				{title ? title : "Untitled"}
			</div>
			<SelectButton
				delete={deleteNote}
				duplicate={duplicateNote}
				renameTitle={openInput}
				copyUrl={copyUrl}
				buttonClass="menu_block"
				isMouseOver={isMouseOver}
				// buttonClass={buttonClass}
				isRename={true}
				menuClass="menu-sidebar"
			/>
			{input && (
				<input
					className="rename"
					autoFocus
					value={_title}
					onBlur={() => setInput(false)}
					onChange={(e) => setTitle(e.target.value)}
					onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
						handleKeyDown(e)
					}
				/>
			)}
		</div>
	);
};

export default Content;
