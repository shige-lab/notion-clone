import { useEffect, useState, useRef } from "react";
import {
	IoEllipsisHorizontalSharp,
	IoTrashOutline,
	IoPencilSharp,
} from "react-icons/io5";
import { GrLogout } from "react-icons/gr";
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

	const test = () => {
		console.log("test");
		props.toHeader();
	};

	return (
		<>
			<div
				className="menuContent"
				onMouseEnter={() => setNonDisplay(false)}
				onMouseLeave={() => setNonDisplay(true)}
			>
				<IoPencilSharp className="menuContentIcon" />
				<div className="menuContentText">turn into</div>
				<div className={"menu " + turnIntoClass}>
					<div className="menuContent" onClick={test}>
						<IoPencilSharp className="menuContentIcon" />
						<div className="menuContentText">header</div>
					</div>
					<div className="menuContent" onClick={props.toTodo}>
						<IoPencilSharp className="menuContentIcon" />
						<div className="menuContentText">todo</div>
					</div>
				</div>
			</div>
		</>
	);
};
