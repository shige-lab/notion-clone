import {
	IoEllipsisHorizontalSharp,
	IoTrashOutline,
	IoPencilSharp,
} from "react-icons/io5";

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
	return (
		<div className="menuContent">
			<IoPencilSharp className="menuContentIcon" />
			<div className="menuContentText">turn into</div>
		</div>
	);
};
