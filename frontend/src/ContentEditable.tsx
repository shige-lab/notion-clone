import { PinDropSharp } from "@material-ui/icons";
import React, { useState, useEffect, useCallback } from "react";
import { useRef } from "react";

const ContentEditable = (props: any) => {
	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.onChange(e.target.innerHTML);
	};

	const createUser = async (data : React.ChangeEvent<HTMLInputElement>) => {
		const response = await fetch(`${process.env.REACT_APP_PUBLIC_API}/pages`, {
			method: 'POST',
			// headers: {'Content-Type': 'application/json'},
			// body: JSON.stringify({user: data})
			// body: JSON.stringify({user: data})
		  })
		return await response.json();
	}

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

		<input type="text" onChange={createUser}/>
		<button type="button" onClick= {(e) => createUser} className="btn btn-danger">Create</button>
			{/* </form> */}
			</div>
	);
};

export default ContentEditable;
