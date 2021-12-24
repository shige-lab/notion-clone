import { useEffect, useState, useRef } from "react";
import SplitButton from "react-bootstrap/SplitButton";
import { DeleteMenu, TurnIntoMenu } from "./MenuContent";
import { IoApps } from "react-icons/io5";

const ContentSideButton = (props: any) => {
	// 	const deleteNote = props.delete;

	const [isOpen, setIsOpen] = useState(false);
	const menuRef: any = useRef();

	useEffect(() => {
		isOpen && menuRef.current.focus();
	}, [isOpen]);

	return (
		<div className={"menuBlock " + props.className}>
			{/* <SplitButton
				key="t"
				title="t"
				id="aa"
				// toggleLabel=""
				onClick={() => setIsOpen(isOpen ? false : true)}
			> */}
			{/* <button
				className={"button buttonSideBar"}
				onClick={() => setIsOpen(isOpen ? false : true)}
			></button> */}
			<div
				className={"button buttonSideBar"}
				onClick={() => setIsOpen(isOpen ? false : true)}
			>
				<IoApps />
			</div>
			{isOpen && (
				<div
					className={"menu " + props.menuClass}
					onBlur={() => setTimeout(() => setIsOpen(false), 100)}
					ref={menuRef}
					tabIndex={1}
				>
					<DeleteMenu delete={props.deleteText} />
					<TurnIntoMenu toHeader={props.toHeader} />
				</div>
			)}
			{/* </SplitButton> */}
		</div>
	);
};

export default ContentSideButton;
