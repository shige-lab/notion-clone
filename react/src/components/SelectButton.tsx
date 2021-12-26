import { useEffect, useState, useRef } from "react";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { DeleteMenu, RenameMenu, Duplicate } from "./MenuContent";

const SelectButton = (props: any) => {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef: any = useRef();

	useEffect(() => {
		isOpen && menuRef.current.focus();
	}, [isOpen]);

	const deleteNote = () => {
		setIsOpen(false);
		props.delete();
	};

	return (
		<div className={"hover-gray " + props.buttonClass}>
			<button
				className={"button button-sidebar"}
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
					<DeleteMenu delete={deleteNote} />
					<RenameMenu delete={props.delete} />
					<Duplicate duplicate={props.duplicate} />
				</div>
			)}
		</div>
	);
};

export default SelectButton;
