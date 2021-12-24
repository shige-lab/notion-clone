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
		<>
			<div
				className={props.className + " menu-for-" + props.textClass}
				onClick={() => setIsOpen(isOpen ? false : true)}
			>
				<IoApps />
			</div>
			{isOpen && (
				<div
					className={"menu contentSideMenu"}
					onBlur={() => setTimeout(() => setIsOpen(false), 100)}
					ref={menuRef}
					tabIndex={1}
				>
					<DeleteMenu delete={props.deleteText} />
					<TurnIntoMenu toHeader={props.toHeader} />
				</div>
			)}
			{/* </SplitButton> */}
		</>
	);
};

export default ContentSideButton;
