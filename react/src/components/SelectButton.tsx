import { useEffect, useState, useRef } from "react";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { DeleteMenu, RenameMenu, Duplicate, CopyUrl } from "./MenuContent";

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
				<div className={props.isMouseOver}>
					<IoEllipsisHorizontalSharp />
				</div>
			</button>
			{isOpen && (
				<div
					className={"menu " + props.menuClass}
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
