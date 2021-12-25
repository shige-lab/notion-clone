import { useEffect, useState, useRef } from "react";
import { DeleteMenu, TurnIntoMenu } from "./MenuContent";
import { IoApps } from "react-icons/io5";

const ContentSideButton = (props: any) => {
	// 	const deleteNote = props.delete;

	const [isOpen, setIsOpen] = useState(false);
	const menuRef: any = useRef();

	useEffect(() => {
		isOpen && menuRef.current.focus();
	}, [isOpen]);

	useEffect(() => {
		setIsOpen(false);
	}, []);

	const deleteText = () => {
		setIsOpen(false);
		props.deleteText();
	};

	const toText = () => {
		setIsOpen(false);
		props.toText();
	};
	const toHeader1 = () => {
		setIsOpen(false);
		props.toHeader1();
	};
	const toHeader2 = () => {
		setIsOpen(false);
		props.toHeader2();
	};
	const toHeader3 = () => {
		setIsOpen(false);
		props.toHeader3();
	};

	const toTodo = () => {
		setIsOpen(false);
		props.toTodo();
	};

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
					className={"menu content-side-menu"}
					onBlur={() => setTimeout(() => setIsOpen(false), 100)}
					ref={menuRef}
					tabIndex={1}
				>
					<DeleteMenu
						// change={handleChange}
						delete={deleteText}
					/>
					<TurnIntoMenu
						// change={handleChange}
						toText={toText}
						toHeader1={toHeader1}
						toHeader2={toHeader2}
						toHeader3={toHeader3}
						toTodo={toTodo}
					/>
				</div>
			)}
			{/* </SplitButton> */}
		</>
	);
};

export default ContentSideButton;
