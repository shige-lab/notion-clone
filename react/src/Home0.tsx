import { divide } from "lodash";
import { useEffect } from "react";
const Home0 = (props: any) => {
	useEffect(() => {
		props.history.push("/notes");
	}, []);
	return <></>;
};
export default Home0;
