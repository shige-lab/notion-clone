import { useState } from "react";
import { IoTrashOutline, IoPencilSharp } from "react-icons/io5";
import { GrLogout, GrPowerCycle } from "react-icons/gr";
import { BiText, BiHeading } from "react-icons/bi";
import { FcTodoList } from "react-icons/fc";
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
		<div className="menu-content" onClick={props.delete}>
			<IoTrashOutline className="menu-content-icon" />
			<div className="menu-content-text">delete</div>
		</div>
	);
};
export const RenameMenu = (props: any) => {
	return (
		<div className="menu-content">
			<IoPencilSharp className="menu-content-icon" />
			<div className="menu-content-text">rename</div>
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
				className="menu-content"
				onMouseEnter={() => setNonDisplay(false)}
				onMouseLeave={() => setNonDisplay(true)}
			>
				<GrPowerCycle className="menu-content-icon" />
				<div className="menu-content-text">turn into</div>
				<div className={"menu " + turnIntoClass}>
					<div className="menu-content" onClick={props.toText}>
						<BiText className="menu-content-icon" />
						<div className="menu-content-text">Text</div>
					</div>
					<div className="menu-content" onClick={props.toHeader1}>
						<BiHeading className="menu-content-icon" />
						<div className="menu-content-text">Heading 1</div>
					</div>
					<div className="menu-content" onClick={props.toHeader2}>
						<BiHeading className="menu-content-icon" />
						<div className="menu-content-text">Heading 2</div>
					</div>
					<div className="menu-content" onClick={props.toHeader3}>
						<BiHeading className="menu-content-icon" />
						<div className="menu-content-text">Heading 3</div>
					</div>
					<div className="menu-content" onClick={props.toTodo}>
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
			<div className="menu-content" onClick={props.toText}>
				<BiText className="menu-content-icon" />
				<div className="menu-content-text">Text</div>
			</div>
			<div className="menu-content" onClick={props.toHeader1}>
				<BiHeading className="menu-content-icon" />
				<div className="menu-content-text">Heading 1</div>
			</div>
			<div className="menu-content" onClick={props.toHeader2}>
				<BiHeading className="menu-content-icon" />
				<div className="menu-content-text">Heading 2</div>
			</div>
			<div className="menu-content" onClick={props.toHeader3}>
				<BiHeading className="menu-content-icon" />
				<div className="menu-content-text">Heading 3</div>
			</div>
			<div className="menu-content" onClick={props.toTodo}>
				<FcTodoList className="menu-content-icon" />
				<div className="menu-content-text">To-do list</div>
			</div>
		</div>
	);
};
