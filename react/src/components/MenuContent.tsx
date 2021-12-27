import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { GrLogout, GrPowerCycle } from "react-icons/gr";
import { BiText, BiHeading } from "react-icons/bi";
import { FcTodoList } from "react-icons/fc";
import { MdPlayArrow } from "react-icons/md";
import { FaRegClone } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
var classNames = require("classnames");

export const LogoutMenu = () => {
	return (
		<div className="logout-style">
			<GrLogout className="menu-content-icon" />
			<div className="menu-content-text">logout</div>
		</div>
	);
};

export const DeleteMenu = (props: any) => {
	return (
		<div className="menu-content hover-gray" onClick={props.delete}>
			<IoTrashOutline className="menu-content-icon" />
			<div className="menu-content-text">Delete</div>
		</div>
	);
};
export const RenameMenu = (props: any) => {
	return (
		<>
			<div
				className="menu-content hover-gray"
				onClick={() => props.renameTitle(true)}
			>
				<HiPencilAlt className="menu-content-icon" />
				<div className="menu-content-text">Rename</div>
			</div>
		</>
	);
};

export const Duplicate = (props: any) => {
	return (
		<div className="menu-content hover-gray" onClick={props.duplicate}>
			<FaRegClone className="menu-content-icon" />
			<div className="menu-content-text">Duplicate</div>
		</div>
	);
};

export const TurnIntoMenu = (props: any) => {
	const [nonDisplay, setNonDisplay] = useState(true);
	const turnIntoClass = classNames({
		turn_into: true,
		nonDisplay: nonDisplay,
	});

	return (
		<>
			<div
				className="menu-content hover-gray"
				onMouseEnter={() => setNonDisplay(false)}
				onMouseLeave={() => setNonDisplay(true)}
			>
				<GrPowerCycle className="menu-content-icon" />
				<div className="menu-content-text">Turn into</div>
				<MdPlayArrow style={{ color: "rgba(55, 53, 47, 0.6)" }} />
				<div className={"menu " + turnIntoClass}>
					<div
						className="menu-content hover-gray"
						onClick={props.toText}
					>
						<BiText className="menu-content-icon" />
						<div className="menu-content-text">Text</div>
					</div>
					<div
						className="menu-content hover-gray"
						onClick={props.toHeader1}
					>
						<BiHeading className="menu-content-icon" />
						<div className="menu-content-text">Heading 1</div>
					</div>
					<div
						className="menu-content hover-gray"
						onClick={props.toHeader2}
					>
						<BiHeading className="menu-content-icon" />
						<div className="menu-content-text">Heading 2</div>
					</div>
					<div
						className="menu-content hover-gray"
						onClick={props.toHeader3}
					>
						<BiHeading className="menu-content-icon" />
						<div className="menu-content-text">Heading 3</div>
					</div>
					<div
						className="menu-content hover-gray"
						onClick={props.toTodo}
					>
						<FcTodoList className="menu-content-icon" />
						<div className="menu-content-text">To-do list</div>
					</div>
				</div>
			</div>
		</>
	);
};

export const TurnInto = (props: any) => {
	const [nonDisplay, setNonDisplay] = useState(!props.isOpen);
	const turnIntoClass = classNames({
		turn_into: true,
		nonDisplay: nonDisplay,
	});

	return (
		<div
			className={"menu " + turnIntoClass}
			onFocus={() => setNonDisplay(false)}
			onBlur={() => setNonDisplay(true)}
		>
			<div className="menu-content hover-gray" onClick={props.toText}>
				<BiText className="menu-content-icon" />
				<div className="menu-content-text">Text</div>
			</div>
			<div className="menu-content hover-gray" onClick={props.toHeader1}>
				<BiHeading className="menu-content-icon" />
				<div className="menu-content-text">Heading 1</div>
			</div>
			<div className="menu-content hover-gray" onClick={props.toHeader2}>
				<BiHeading className="menu-content-icon" />
				<div className="menu-content-text">Heading 2</div>
			</div>
			<div className="menu-content hover-gray" onClick={props.toHeader3}>
				<BiHeading className="menu-content-icon" />
				<div className="menu-content-text">Heading 3</div>
			</div>
			<div className="menu-content hover-gray" onClick={props.toTodo}>
				<FcTodoList className="menu-content-icon" />
				<div className="menu-content-text">To-do list</div>
			</div>
		</div>
	);
};
