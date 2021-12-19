import { PinDropSharp } from "@material-ui/icons";
import React, { useState, useEffect, useCallback } from "react";
import { useRef } from "react";

const ContentEditable = (props: any) => {


	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.onChange(e.target.innerHTML);
	};


	return (
		<div>
		<div
			// id="test"
			contentEditable
			className="test"
			// ref={props.ref2}
			// ref="refs"
			onInput={handleInput}
			dangerouslySetInnerHTML={{ __html: props.value }}
			/>
			{/* <form action=""> */}

		{/* <input type="text" value={text} onChange={ (e) => createUser(e.target.value)}/>
		<button type="button" onClick= {(e) => createUser} className="btn btn-danger">Create</button> */}
			{/* </form> */}
			</div>
	);
};

export default ContentEditable;
