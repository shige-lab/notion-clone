
import {
	Button,
	Container,
	FormControl,
	Grid,
	Link,
	TextField,
	Typography
  } from "@material-ui/core";
  

const Content = () => {
	return (
		<div>
			<TextField
				className="header"
				fullWidth
                // style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
				margin="normal"
                name="header"
                label="Header"
				size ="medium"
                // fullWidth
                // value={email}
                // onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                //   setEmail(event.target.value);
                // }}
				/>
		</div>
	)
}

export default Content;