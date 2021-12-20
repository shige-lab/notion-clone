import { StringLiteralType } from "typescript";


export const updateEditor = async (_title: string, text: string, id: StringLiteralType) => {
	const response = await fetch(`${process.env.REACT_APP_PUBLIC_API}/update`, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({title: _title, body: text, id : id})
	})
	// return response.json();
}

const getNotes = async () => {
	console.log("3")
const response = await fetch(
	`${process.env.REACT_APP_PUBLIC_API}/`,
	{
	  method: "GET",
	  credentials: "include",
	  // Forward the authentication cookie to the backend
	  headers: {
		"Content-Type": "application/json",
		// Cookie: req ? req.headers.cookie : undefined,
		// id: "61bf6a1996fda3d6d03a27bb",
	  },
	}
  );
  const Test = await response.json();
//   await setTests(Test);
//   console.log(tests[0].note.title)
  console.log(Test[0].note.title)
//   setTest(Test.note);
//   setTest({...test, _id: Test._id});
//   console.log(Test);
//   console.log(tests);
//   console.log(Test.note);
//   console.log(Test.note.title);
//   console.log(Test.note.body);


// try{
	// const response = await fetch(`${process.env.REACT_APP_PUBLIC_API}/`);
	// return await response.json();
// }catch(error) {
//     return [];
// }
}
