export const _updateEditor = async (
	_title: string,
	text: string,
	id: string
) => {
	fetch(`${process.env.REACT_APP_PUBLIC_API}/update`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ title: _title, body: text, id: id }),
	});
	// return response.json();
};

export const getNotes = async (userId: string | undefined) => {
	const response = await fetch(`${process.env.REACT_APP_PUBLIC_API}/`, {
		method: "POST",
		credentials: "include",
		// Forward the authentication cookie to the backend
		headers: {
			"Content-Type": "application/json",
			// Cookie: req ? req.headers.cookie : undefined,
			// id: "61bf6a1996fda3d6d03a27bb",
		},
		body: JSON.stringify({ userId: userId }),
	});
	console.log("use getNotes");
	return response.json();
};

export const _deleteNote = async (SelectedNote: any) => {
	const response = await fetch(`${process.env.REACT_APP_PUBLIC_API}/delete`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ note: SelectedNote }),
	});
	return response.json();
};

export const createNote = async (newNote: any) => {
	console.log(newNote);
	const response = await fetch(`${process.env.REACT_APP_PUBLIC_API}/new`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		// body: JSON.stringify({user: newNote})
		body: JSON.stringify({ note: newNote }),
	});
	console.log("create note");
	return response.json();
};

// export const _duplicateNote = async (duplicate: any) => {
// 	console.log(duplicate);
// 	const response = await fetch(
// 		`${process.env.REACT_APP_PUBLIC_API}/duplicate`,
// 		{
// 			method: "POST",
// 			headers: { "Content-Type": "application/json" },
// 			// body: JSON.stringify({user: data})
// 			body: JSON.stringify({ note: duplicate }),
// 		}
// 	);
// 	console.log("duplicate note");
// 	return response.json();
// };
