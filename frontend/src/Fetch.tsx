import { StringLiteralType } from "typescript";


export const updateEditor = async (_title: string, text: string, id: StringLiteralType) => {
	const response = await fetch(`${process.env.REACT_APP_PUBLIC_API}/update`, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({title: _title, body: text, id : id})
	})
	// return response.json();
}

export const getNotes = async (userId: string | undefined) => {
	console.log("3")
const response = await fetch(
	`${process.env.REACT_APP_PUBLIC_API}/`,
	{
	  method: "POST",
	  credentials: "include",
	  // Forward the authentication cookie to the backend
	  headers: {
		"Content-Type": "application/json",
		// Cookie: req ? req.headers.cookie : undefined,
		// id: "61bf6a1996fda3d6d03a27bb",
	},
	body: JSON.stringify({userId: userId})
	}
  );
	return await response.json();
}

export const _deleteNote = async (SelectedNote: any) => {
	console.log(SelectedNote._id);
	await fetch(`${process.env.REACT_APP_PUBLIC_API}/delete`, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
	})
};

export const createNote = async (data : any) => {
	const response = await fetch(`${process.env.REACT_APP_PUBLIC_API}/new`, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		// body: JSON.stringify({user: data})
		body: JSON.stringify({note: data})
	  })
	return response.json();
}
