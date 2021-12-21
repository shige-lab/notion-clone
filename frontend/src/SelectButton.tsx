import { useEffect, useState, useRef } from "react";
import SplitButton from "react-bootstrap/SplitButton";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";

const SelectButton = (props: any) => {
	// 	const deleteNote = props.delete;

	// 	return (
	// 		<div className="selectButton">
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
		<div className="selectButton">
			{/* <SplitButton
				key="t"
				title="t"
				id="aa"
				// toggleLabel=""
				onClick={() => setIsOpen(isOpen ? false : true)}
			> */}
			<button
				className="button"
				onClick={() => setIsOpen(isOpen ? false : true)}
			>
				<IoEllipsisHorizontalSharp />
			</button>
			{isOpen && (
				<ul
					className="menu"
					onBlur={() => setTimeout(() => setIsOpen(false), 100)}
					ref={menuRef}
					tabIndex={1}
				>
					<li onClick={props.delete}>delete</li>
					<li>rename</li>
				</ul>
			)}
			{/* </SplitButton> */}
		</div>
	);
};

export default SelectButton;
