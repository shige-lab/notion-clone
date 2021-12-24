import { useEffect, useState, useRef } from "react";
import SplitButton from "react-bootstrap/SplitButton";
import {
	IoEllipsisHorizontalSharp,
	IoTrashOutline,
	IoPencilSharp,
} from "react-icons/io5";

const ContentSideButton = (props: any) => {
	// 	const deleteNote = props.delete;

	// 	return (
	// 		<div className="ContentSideButoon">
	// 			<div onClick={deleteNote}>delete</div>
	// 			<div>rename</div>
	// 		</div>
	// 	);
	// };
	const [isOpen, setIsOpen] = useState(false);
	const menuRef: any = useRef();

	useEffect(() => {
		isOpen && menuRef.current.focus();
	}, [isOpen]);

	return (
		<div className={"menuBlock " + props.buttonClass}>
			{/* <SplitButton
				key="t"
				title="t"
				id="aa"
				// toggleLabel=""
				onClick={() => setIsOpen(isOpen ? false : true)}
			> */}
			<button
				className={"button buttonSideBar"}
				onClick={() => setIsOpen(isOpen ? false : true)}
			>
				<IoEllipsisHorizontalSharp />
			</button>
			{isOpen && (
				<div
					className={"menu " + props.menuClass}
					onBlur={() => setTimeout(() => setIsOpen(false), 100)}
					ref={menuRef}
					tabIndex={1}
				>
					<div className="menuContent" onClick={props.delete}>
						<IoTrashOutline className="menuContentIcon" />
						<div className="menuContentText">delete</div>
					</div>
					<div className="menuContent">
						<IoPencilSharp className="menuContentIcon" />
						<div className="menuContentText">rename</div>
					</div>
					<div className="menuContent">
						<IoPencilSharp className="menuContentIcon" />
						<div className="menuContentText">turn into</div>
					</div>
				</div>
			)}
			{/* </SplitButton> */}
		</div>
	);
};

export default ContentSideButton;
