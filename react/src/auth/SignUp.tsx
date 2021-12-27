import React, { Fragment, useEffect, useState } from "react";

import {
	Button,
	Container,
	FormControl,
	Grid,
	Link,
	TextField,
	Typography,
} from "@material-ui/core";

// authサービスをインポート
import { auth } from "./firebase";

const SignUp = (props: any) => {
	// ここではuseStateというHooksの機能を利用している
	// フォームに入力された値を保持する変数を宣言する形
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	// useEffectもHooksの機能。ここではページがロードされたタイミングで
	// ログイン状態かどうかを判定するイベントを発動する
	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			// ログインしている場合、ホームへリダイレクト
			user && props.history.push("/notes");
		});
	}, [props.history]);

	const toNext = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			const toNext = document.getElementById("password");
			if (toNext) toNext.focus();
		}
	};

	const submit = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			pushForm();
		}
	};

	const pushForm = async () => {
		try {
			await auth.signInWithEmailAndPassword(email, password);
			props.history.push("/notes");
		} catch (error) {
			alert(error);
		}
	};

	return (
		<Fragment>
			<Container>
				<Grid container>
					<Grid item md={4}></Grid>
					<Grid item md={4}>
						<FormControl margin="normal" fullWidth>
							<TextField
								style={{
									marginTop: "0.5em",
									marginBottom: "0.5em",
								}}
								name="email"
								id="email"
								label="E-mail"
								fullWidth
								variant="outlined"
								value={email}
								onKeyDown={(
									e: React.KeyboardEvent<HTMLInputElement>
								) => toNext(e)}
								onChange={(
									event: React.ChangeEvent<HTMLInputElement>
								) => {
									setEmail(event.target.value);
								}}
							/>
						</FormControl>
						<FormControl fullWidth>
							<TextField
								style={{
									marginTop: "0.5em",
									marginBottom: "0.5em",
								}}
								name="password"
								label="Password"
								id="password"
								fullWidth
								variant="outlined"
								type="password"
								value={password}
								onKeyDown={(
									e: React.KeyboardEvent<HTMLInputElement>
								) => submit(e)}
								onChange={(
									event: React.ChangeEvent<HTMLInputElement>
								) => {
									setPassword(event.target.value);
								}}
							/>
						</FormControl>
						<FormControl fullWidth>
							<Button
								fullWidth
								onClick={pushForm}
								style={{
									marginTop: "0.5em",
									marginBottom: "0.5em",
								}}
							>
								Sign up
							</Button>
							<Typography align="center">
								<Link href="/login">to login</Link>
							</Typography>
						</FormControl>
					</Grid>
					<Grid item md={4}></Grid>
				</Grid>
			</Container>
		</Fragment>
	);
};

export default SignUp;
