import { useEffect, useState, useRef } from "react";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { DeleteMenu, RenameMenu, Duplicate, CopyUrl } from "./MenuContent";

const SelectButton = (props: any) => {
	const [isOpen, setIsOpen] = useState(false);
	const [topPosition, setTopPosition] = useState(0);
	const menuRef: any = useRef();

	useEffect(() => {
		isOpen && menuRef.current.focus();
	}, [isOpen]);

	const deleteNote = () => {
		setIsOpen(false);
		props.delete();
	};

	const handleOnClick = (e: any) => {
		if (e.target.getBoundingClientRect().top + 170 > window.innerHeight)
			setTopPosition(e.target.getBoundingClientRect().top - 150);
		else setTopPosition(e.target.getBoundingClientRect().top + 20);
		setIsOpen(isOpen ? false : true);
	};

	return (
		<div className={"hover-gray " + props.buttonClass}>
			<button
				className={"button button-sidebar"}
				onClick={(e) => handleOnClick(e)}
			>
				<div className={props.isMouseOver}>
					<IoEllipsisHorizontalSharp />
				</div>
			</button>
			{isOpen && (
				<div
					className={"menu " + props.menuClass}
					style={{ top: topPosition }}
					onBlur={() => setTimeout(() => setIsOpen(false), 100)}
					ref={menuRef}
					tabIndex={1}
				>
					<DeleteMenu delete={deleteNote} />
					<Duplicate duplicate={props.duplicate} />
					<CopyUrl copyUrl={props.copyUrl} />
					{props.isRename && (
						<RenameMenu renameTitle={props.renameTitle} />
					)}
				</div>
			)}
		</div>
	);
};

export default SelectButton;
