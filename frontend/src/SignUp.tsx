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
			user && props.history.push("/");
		});
	}, []);

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
								label="E-mail"
								fullWidth
								variant="outlined"
								value={email}
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
								fullWidth
								variant="outlined"
								type="password"
								value={password}
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
								onClick={async () => {
									try {
										// Firebaseにユーザーを作成する
										await auth.createUserWithEmailAndPassword(
											email,
											password
										);
										// sendSignInLinkToEmail() を利用すると、メールアドレス認証のためのメールを送信することも可能
										props.history.push("/");
									} catch (error) {
										// ユーザー作成が失敗するとその内容をアラート表示
										alert(error);
									}
								}}
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
