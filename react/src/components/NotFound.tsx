const NotFound = (props: any) => {
	const backHome = () => {
		props.history.push("/notes");
	};
	return (
		<div className="not-found">
			<div>This content does not exist</div>
			<button
				onClick={backHome}
				style={{
					width: "200px",
					height: "50px",
					marginTop: "30px",
					backgroundColor: "rgb(46, 170, 220)",
					color: "white",
					fontSize: "15px",
					fontWeight: "bold",
					borderRadius: "10px",
				}}
			>
				Back to my content
			</button>
		</div>
	);
};

export default NotFound;
