import React, { useEffect, useState,useRef } from "react";
import "../App.css";
import Signup from "./Signup";
import { OverlayTrigger, Tooltip,Form,Button,Overlay } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory, } from "react-router-dom";
import sample from "../static/sample.mp4";
import sample2 from "../static/sample2.mp4";
import upload_png from "../static/upload.png";
import Login from "./Login";
import AOS from "aos";
import "aos/dist/aos.css";
import Typed from 'typed.js';
import QRCode from "qrcode.react";

export default function LandingPage(props) {
	let history = useHistory();
	const { currentUser } = useAuth();
	const [pressed, setPressed] = useState(0);
	const [loginCard, setLoginCard] = useState(true); // true==login
	const el = React.useRef(null);
	const el2 = React.useRef(null);
	const [show, setShow] = useState(false);
	const target = useRef(null);
	

	const [passwordVisible, setPasswordVisible] = useState(false);


	if (currentUser) history.push("/home");

	useEffect(() => {
		AOS.init({
			// initialise with other settings
			duration: 750,
			once: true,
		});
		el.current.value = "First file ever!"
		el2.current.value = "This is the first file ever uploaded. like ever."

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

				<div className="description-header second">
					<div className="description-header-title" data-aos="fade-up">
						<h1>Select</h1>
						<p>Choose all the files you want, regardless of file ending</p>
					</div>
					<div className="icon" data-aos="fade-up">
						<div className="upload-example-label first"  data-aos-delay="200" data-aos="fade-right">
						<svg
												
							xmlns="http://www.w3.org/2000/svg"
							width="2.5rem"
							className="ionicon"
							viewBox="35 60 400 400"
						>
							<path
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="32"
								d="M368 368L144 144M368 144L144 368"
							/>
						</svg>
						smile.png
						</div>
						<div className="upload-example-label second" data-aos-delay="400" data-aos="fade-right">
						<svg
												
							xmlns="http://www.w3.org/2000/svg"
							width="2.5rem"
							className="ionicon"
							viewBox="35 60 400 400"
						>
							<path
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="32"
								d="M368 368L144 144M368 144L144 368"
							/>
						</svg>
						README.txt
						</div>
						<div className="upload-example-label third" data-aos-delay="600" data-aos="fade-right">
						<svg
												
							xmlns="http://www.w3.org/2000/svg"
							width="2.5rem"
							className="ionicon"
							viewBox="35 60 400 400"
						>
							<path
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="32"
								d="M368 368L144 144M368 144L144 368"
							/>
						</svg>
						main.java
						</div>
						<div className="upload-example-label fourth" data-aos-delay="800" data-aos="fade-right">
						<svg
												
							xmlns="http://www.w3.org/2000/svg"
							width="2.5rem"
							className="ionicon"
							viewBox="35 60 400 400"
						>
							<path
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="32"
								d="M368 368L144 144M368 144L144 368"
							/>
						</svg>
						icon.svg
						</div>
						<div className="upload-example-label fifth" data-aos-delay="1000" data-aos="fade-right">
						<svg
												
							xmlns="http://www.w3.org/2000/svg"
							width="2.5rem"
							className="ionicon"
							viewBox="35 60 400 400"
						>
							<path
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="32"
								d="M368 368L144 144M368 144L144 368"
							/>
						</svg>
						Screenshot_1.jpeg
						</div>
						
					</div>
				</div>
			</div>
			<div className="header section-3">
				<div className="description-header third">
					<div  data-aos="fade-up" data-aos-delay="300">
					<form className="form-example">
							<div>
								<span>Name:</span>
								<Form.Control
									type="text"
									ref={el}
									disabled
									
								/>
							</div>
							<div>
								<span>Password:</span>
								<Form.Control
									type={!passwordVisible ? "password" : "text"}
									placeholder="Optional"
									disabled
								/>

							</div>

							<div>
								<span>Description: </span>
								<Form.Control
									type="text"
									ref={el2}
									placeholder="Description"
									disabled
									as="textarea"
									style={{resize:"none"}}
								/>
							</div>
						</form>
					</div>
					<div className="description-header-title" data-aos="fade-up">
						<h1>Upload</h1>

						<p>
							Add more info such as a description or a{" "}
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
					<div className="share">
								<div className="d-flex align-items-center">
									<a href="/"><span>{`${window.location.host}/12345678`}</span></a>
									<svg
										className="svg-copy"
										viewBox="0 0 20 20"
										ref={target}
										onClick={() => {
											setShow(true)
											setTimeout(()=>{
												setShow(false);
											},3000)
										}}
									>
										<path d="M17.391,2.406H7.266c-0.232,0-0.422,0.19-0.422,0.422v3.797H3.047c-0.232,0-0.422,0.19-0.422,0.422v10.125c0,0.232,0.19,0.422,0.422,0.422h10.125c0.231,0,0.422-0.189,0.422-0.422v-3.797h3.797c0.232,0,0.422-0.19,0.422-0.422V2.828C17.812,2.596,17.623,2.406,17.391,2.406 M12.749,16.75h-9.28V7.469h3.375v5.484c0,0.231,0.19,0.422,0.422,0.422h5.483V16.75zM16.969,12.531H7.688V3.25h9.281V12.531z"></path>
									</svg>
									<Overlay target={target.current} show={show} placement="right">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            Copied to Clipboard
          </Tooltip>
        )}
      </Overlay>
								</div>

								<QRCode
									className="m-5"
									level="H"
									size="256"
									value={`${window.location.host}/12345678`}
								/>
								<Button size="lg" >
									Upload more
								</Button>
							</div>
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
