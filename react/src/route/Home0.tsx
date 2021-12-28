import { useEffect } from "react";
const Home0 = (props: any) => {
	useEffect(() => {
		props.history.push("/notes");
	}, [props.history]);
	return <></>;
};
export default Home0;
