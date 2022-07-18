import * as React from "react";
import "./Sleep.css";

export default function Sleep(props) {
	const [isAddingSleep, setIsAddingSleep] = React.useState(false);

	function renderSleepCards() {
		if (!props.allSleep[0]) return null;

		return props.allSleep;
	}

	return (
		<div className="sleep">
			<div className="sleep-title">
				<h1>Sleep</h1>
			</div>

			<div className={isAddingSleep ? "sleep-body hidden" : "sleep-body"}>
				<div className="sleep-topbar">
					<h1>Overview</h1>
					<button
						className="btn-add-sleep btn-add water_button-sleep "
						onClick={() => setIsAddingSleep(true)}
					>
						Add Sleep
					</button>
				</div>

				<div className="sleep-content">
					{renderSleepCards() ? (
						renderSleepCards().map((e, i) => {
							return <SleepCard sleep={e} key={i} />;
						})
					) : (
						<div>No Sleep added yet</div>
					)}
				</div>
			</div>

			<div className={isAddingSleep ? "sleep-adding" : "sleep-adding hidden"}>
				<AddSleep
					addSleep={props.addSleep}
					setAllSleep={props.setAllSleep}
					setIsAddingSleep={setIsAddingSleep}
				/>
			</div>
		</div>
	);
}

export function AddSleep(props) {
	const [sleepStart, setSleepStart] = React.useState("");
	const [sleepEnd, setSleepEnd] = React.useState("");

	return (
		<div className="add-sleep-form form__group">
			<div className="sleep-start-form ">
				<span>Start Time</span>
				<input
					type="datetime-local"
					className="input-name form__field"
					placeholder="Sleep Start Time"
					value={sleepStart}
					onChange={(evt) => setSleepStart(evt.target.value)}
				/>
			</div>

			<div className="sleep-end-form">
				<span>End Time</span>
				<input
					type="datetime-local"
					className="input-name form__field"
					placeholder="Sleep End Time"
					value={sleepEnd}
					onChange={(evt) => setSleepEnd(evt.target.value)}
				/>
			</div>

			<div className="save-button-wrapper">
				<button
					className="btn-create-sleep water_button-sleep"
					onClick={() => {
						props.addSleep(sleepStart, sleepEnd);

						props.setIsAddingSleep(false);
					}}
				>
					Save
				</button>
			</div>
		</div>
	);
}

export function SleepCard({ sleep }) {
	return (
		<div className="sleep-card">
			<div className="sleep-start-title">
				{new Date(sleep.start_time).toDateString()}
			</div>

			<div className="sleep-start-end">
				<div className="sleep-start">
					<div className="sleep-start-date">
						{" "}
						{new Date(sleep.start_time).toLocaleDateString()}{" "}
					</div>
					<div className="sleep-start-hour">
						{new Date(sleep.start_time).toLocaleTimeString()}{" "}
					</div>
				</div>
				<div className="sleep-end">
					<div className="sleep-end-date">
						{" "}
						{new Date(sleep.end_time).toLocaleDateString()}{" "}
					</div>
					<div className="sleep-start-hour">
						{new Date(sleep.end_time).toLocaleTimeString()}
					</div>
				</div>
			</div>

			<div className="sleep-minutes">
				Minutes:{" "}
				{Math.round(
					(new Date(sleep.end_time) - new Date(sleep.start_time)) / 60000
				)}
			</div>
			<div className="sleep-hours">
				Hours:{" "}
				{Math.round(
					(new Date(sleep.end_time) - new Date(sleep.start_time)) / 3600000
				)}
			</div>
		</div>
	);
}
