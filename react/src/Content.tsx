import SelectButton from "./components/SelectButton";
import { useState, useRef, useEffect } from "react";
import { GrNotes } from "react-icons/gr";
import { useDebounce } from "use-debounce";
var classNames = require("classnames");

const Content = (props: any) => {
	const title = props.title;
	const [_title, setTitle] = useState(title);
	const [nonDisplay, setNonDisplay] = useState(true);
	const isFirstRender = useRef(false);
	const [update] = useDebounce(_title, 1000);
	const [input, setInput] = useState(false);
	const buttonClass = classNames({
		menu_block: true,
		nonDisplay: nonDisplay,
	});

	useEffect(() => {
		isFirstRender.current = true;
	}, []);

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

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			setInput(false);
		}
	};
	return (
		<div
			className="list-block"
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
				buttonClass={buttonClass}
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
