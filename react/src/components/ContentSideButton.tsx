import { useEffect, useState, useRef } from "react";
import { DeleteMenu, DuplicateMenu, TurnIntoMenu } from "./MenuContent";
import { IoApps } from "react-icons/io5";

const ContentSideButton = (props: any) => {
	const [isOpen, setIsOpen] = useState(false);
	const [topPosition, setTopPosition] = useState(0);
	const menuRef: any = useRef();

	useEffect(() => {
		isOpen && menuRef.current.focus();
	}, [isOpen]);

	useEffect(() => {
		setIsOpen(false);
	}, []);

	const handleOnClick = (e: any) => {
		if (e.target.getBoundingClientRect().top + 130 > window.innerHeight)
			setTopPosition(e.target.getBoundingClientRect().top - 130);
		else setTopPosition(e.target.getBoundingClientRect().top - 65);
		setIsOpen(isOpen ? false : true);
	};

	const deleteText = () => {
		setIsOpen(false);
		props.deleteText();
	};

	const duplicateText = () => {
		setIsOpen(false);
		props.duplicateText();
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
	const toBullet = () => {
		setIsOpen(false);
		props.toBullet();
	};

	return (
		<>
			<div
				className={props.className + " menu-for-" + props.textClass}
				onClick={(e) => handleOnClick(e)}
			>
				<IoApps />
			</div>
			{isOpen && (
				<div
					className={"menu content-side-menu"}
					style={{ top: topPosition }}
					onBlur={() => setTimeout(() => setIsOpen(false), 100)}
					ref={menuRef}
					tabIndex={1}
				>
					<DeleteMenu delete={deleteText} />
					<TurnIntoMenu
						toText={toText}
						toHeader1={toHeader1}
						toHeader2={toHeader2}
						toHeader3={toHeader3}
						toBullet={toBullet}
						toTodo={toTodo}
					/>
					<DuplicateMenu duplicateText={duplicateText} />
				</div>
			)}
		</>
	);
};

export default ContentSideButton;
