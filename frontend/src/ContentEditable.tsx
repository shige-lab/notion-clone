import React, { useState, useEffect, useCallback } from "react";
import { useRef } from "react";

const ContentEditable = (props: any) => {
	// const text = props.value;
	// console.log(props.value);
	// const ref = useRef(props.value);
	// useEffect(() => {
	// 	console.log(props.value);
	// 	console.log(ref.current);
	// 	ref.current = props.value;
	// }, [props.id]);

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.onChange(e.target.innerHTML);
	};

	return (
		<div
			contentEditable
			className="test"
			onInput={handleInput}
			dangerouslySetInnerHTML={{ __html: props.value }}
		/>
	);
};

export default ContentEditable;
