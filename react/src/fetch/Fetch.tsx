export const _updateEditor = async (_title: string, text: any, id: string) => {
	const response = await fetch(`${process.env.REACT_APP_PUBLIC_API}/update`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ title: _title, body: text, id: id }),
	});
	return response.json();
};

export const getNotes = async (userId: string | undefined) => {
	const response = await fetch(`${process.env.REACT_APP_PUBLIC_API}/`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			// Cookie: req ? req.headers.cookie : undefined,
		},
		body: JSON.stringify({ userId: userId }),
	});
	return response.json();
};

export const _deleteNote = async (SelectedNote: any) => {
	const response = await fetch(`${process.env.REACT_APP_PUBLIC_API}/delete`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ id: SelectedNote._id }),
	});
	return response.json();
};

export const createNote = async (newNote: any) => {
	const response = await fetch(`${process.env.REACT_APP_PUBLIC_API}/new`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ note: newNote }),
	});
	return response.json();
};
