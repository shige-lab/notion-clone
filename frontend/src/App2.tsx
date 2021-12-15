import React, {useState} from "react";
import firebase from "firebase";
import { render } from "@testing-library/react";

const App2 = () => {

	// const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
	// const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState<firebase.firestore.DocumentData[]>([]);
  
  
  React.useEffect (() => {
	  firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
		  const notes = serverUpdate.docs.map(doc => {
			  const data = doc.data();
			  
			  data['id'] = doc.id;
			  
			  return data;
			});
			
			setNotes(notes);
			console.log(notes);
		});
	}, []);

	return (
		<div>
			aaaaaa
			{/* {notes} */}
		</div>
	);
}

export default App2;