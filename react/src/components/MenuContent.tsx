import { useEffect, useState, useRef } from "react";
import {
	IoEllipsisHorizontalSharp,
	IoTrashOutline,
	IoPencilSharp,
} from "react-icons/io5";
import { GrLogout, GrPowerCycle } from "react-icons/gr";
import { FaHeading } from "react-icons/fa";
import { BiText, BiHeading } from "react-icons/bi";
import { FcTodoList } from "react-icons/fc";
var classNames = require("classnames");

export const LogoutMenu = () => {
	return (
		<div className="logout-style">
			<GrLogout className="menuContentIcon" />
			<div className="menuContentText">logout</div>
		</div>
	);
};

export const DeleteMenu = (props: any) => {
	return (
		<div className="menuContent" onClick={props.delete}>
			<IoTrashOutline className="menuContentIcon" />
			<div className="menuContentText">delete</div>
		</div>
	);
};
export const RenameMenu = (props: any) => {
	return (
		<div className="menuContent">
			<IoPencilSharp className="menuContentIcon" />
			<div className="menuContentText">rename</div>
		</div>
	);
};

export const TurnIntoMenu = (props: any) => {
	const [nonDisplay, setNonDisplay] = useState(true);
	const turnIntoClass = classNames({
		turnInto: true,
		nonDisplay: nonDisplay,
	});

	return (
		<>
			<div
				className="menuContent"
				onMouseEnter={() => setNonDisplay(false)}
				onMouseLeave={() => setNonDisplay(true)}
			>
				<GrPowerCycle className="menuContentIcon" />
				<div className="menuContentText">turn into</div>
				<div className={"menu " + turnIntoClass}>
					<div className="menuContent" onClick={props.toText}>
						<BiText className="menuContentIcon" />
						<div className="menuContentText">Text</div>
					</div>
					<div className="menuContent" onClick={props.toHeader1}>
						<BiHeading className="menuContentIcon" />
						<div className="menuContentText">Heading 1</div>
					</div>
					<div className="menuContent" onClick={props.toHeader2}>
						<BiHeading className="menuContentIcon" />
						<div className="menuContentText">Heading 2</div>
					</div>
					<div className="menuContent" onClick={props.toHeader3}>
						<BiHeading className="menuContentIcon" />
						<div className="menuContentText">Heading 3</div>
					</div>
					<div className="menuContent" onClick={props.toTodo}>
						<FcTodoList className="menuContentIcon" />
						<div className="menuContentText">To-do list</div>
					</div>
				</div>
			</div>
		</>
	);
};
