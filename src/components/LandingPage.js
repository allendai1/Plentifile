import React, { useEffect, useState } from "react";
import "../App.css";
import Signup from "./Signup";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import sample from "../static/sample.mp4";
import sample2 from "../static/sample2.mp4";
import upload_png from "../static/upload.png";
import Login from "./Login";
import AOS from "aos";
import "aos/dist/aos.css";

export default function LandingPage(props) {
	let history = useHistory();

	const { currentUser } = useAuth();
	const [pressed, setPressed] = useState(0);
	const [loginCard, setLoginCard] = useState(true); // true==login

	if (currentUser) history.push("/home");

	useEffect(() => {
		AOS.init({
			// initialise with other settings
			duration: 750,
			once: true,
		});

		document.getElementById("App").classList.remove("openMargin");
		document.getElementById("App").classList.remove("closeMargin");
	}, []);

	console.log("render");
	function routeToUpload() {
		setPressed(1);
		setTimeout(() => {
			history.push("/upload");
		}, 800);
	}

	const renderTooltip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
			Sign up or Login to access these features
		</Tooltip>
	);

	return (
		<div className="bgimage">
			{/* <NavigationBar/> */}

			{!currentUser && (
				<header id="introduction">
					<div className="container1">
						<div id="left-title">
							<h1>File sharing</h1>
							<h1>Made easy.</h1>
							<p>The quickiest and easiest way to share and download files</p>

							<button id="getStarted" onClick={() => history.push("/upload")}>
								Get started
							</button>
						</div>
						<div id="right-container">
							<div className="home-login-card">
								{loginCard && <Login login={setLoginCard} />}
								{!loginCard && <Signup login={setLoginCard} />}
							</div>
						</div>
					</div>
				</header>
			)}

			<div className="header section-2">
				<div className="description-header">
					<div className="description-header-title" data-aos="fade-up">
						<h1>Select</h1>
						<p>Choose any files you want to share from your computer</p>
					</div>
					<div className="icon" data-aos="fade-up" data-aos-delay="300">
						<video autoPlay muted loop>
							<source src={sample} type="video/mp4" />
						</video>
					</div>
				</div>
			</div>
			<div className="header section-3">
				<div className="description-header">
					<div className="icon" data-aos="fade-up" data-aos-delay="300">
						<video autoPlay muted loop>
							<source src={sample2} type="video/mp4" />
						</video>
					</div>
					<div className="description-header-title" data-aos="fade-up">
						<h1>Upload</h1>

						<p>
							Add more info such as a description or{" "}
							<OverlayTrigger placement="right" overlay={renderTooltip}>
								<span>password</span>
							</OverlayTrigger>
						</p>

						{/* <Button variant="success">Hover me to see</Button> */}
					</div>
				</div>
			</div>
			<div className="header section-4">
				<div className="description-header right">
					<div className="description-header-title " data-aos="fade-up">
						<h1>Share</h1>
						<p>Copy and send the link to others for easy access</p>
					</div>
					<div className="icon" data-aos="fade-up" data-aos-delay="300">
						<img src={upload_png} alt="upload.png"></img>
					</div>
				</div>
			</div>
			<div className="upload-header">
				<button
					className="start-uploading-button"
					pressed={pressed}
					onClick={routeToUpload}
				>
					Start Uploading!
				</button>
			</div>
		</div>
	);
}
