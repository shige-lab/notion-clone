import { Fragment, useEffect, useState } from "react";


import { auth } from "./firebase";
import './Home.css';

const Home = (props: any) => {
  const [currentUser, setCurrentUser] = useState<null | object>(null);

  useEffect(() => {
    // if not logged in, redirect to login page
    auth.onAuthStateChanged(user => {
      user ? setCurrentUser(user) : props.history.push("/login");
    });
  }, []);

  return (
    <Fragment>
      <div className="Home">
        <header className="Home_header">notion clone</header>
        <button
          className="Heme_logout"
          onClick={async event => {
            try {
              await auth.signOut();
              props.history.push("/login");
            } catch (error) {
              alert(error);
            }
          }}
          style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
        >
          Logout
        </button>
        <div className="Home_main">
          <div className='list'>
            list
          </div>
          <div className='contents'>
            contents
          </div>
        </div>
        <button className="Home_newpage">
           + New Page
        </button>
    </div>
    </Fragment>
  );
};

export default Home;