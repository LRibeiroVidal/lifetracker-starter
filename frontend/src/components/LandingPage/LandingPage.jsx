import * as React from "react";
import "./LandingPage.css";

export default function LandingPage() {
	return (
		<div className="landing-page">
			<div className="contents">
				<h1 className="title">Life Tracker</h1>
				<h2 className="desc">Helping you take back control of your world</h2>
			</div>

			<img
				src="http://codepath-lifetracker.surge.sh/static/media/smartwatch-screen-digital-device.e2983a85.svg"
				alt="hero img"
				width="600vw"
				className="img-landing"
			/>
		</div>
	);
}
