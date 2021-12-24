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
	const [isOpen, setIsOpen] = useState(false);
	const menuRef: any = useRef();
	const [nonDisplay, setNonDisplay] = useState(true);
	const turnIntoClass = classNames({
		turnInto: true,
		nonDisplay: nonDisplay,
	});
	useEffect(() => {
		isOpen && menuRef.current.focus();
	}, [isOpen]);

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
				{/* <div className={"menuBlock " + turnIntoClass}> */}
				<div
					className={"menu " + turnIntoClass}
					onBlur={() => setTimeout(() => setIsOpen(false), 100)}
					ref={menuRef}
					tabIndex={1}
				>
					<div className="menuContent" onClick={test}>
						<IoPencilSharp className="menuContentIcon" />
						<div className="menuContentText">header</div>
					</div>
				</div>
			</div>
			{/* </div> */}
		</>
	);
};
