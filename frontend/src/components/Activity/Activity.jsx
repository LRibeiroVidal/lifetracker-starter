import * as React from "react";
import "./Activity.css";

export default function Activity(props) {
	React.useEffect(() => {
		console.log("update activity");
		props.getActivities();
	}, []);

	return (
		<div className="activity">
			<div className="activity-title">
				<h1>Activity</h1>
			</div>

			<div className="activity-description">
				<div className={true ? "activity-nothing" : "hidden"}>
					<ActivityCards
						value={
							props.activitiesArray.exercise?.rows[0]?.round
								? props.activitiesArray.exercise?.rows[0]?.round
								: ""
						}
						type="Exercise"
					/>

					<ActivityCards
						value={
							props.activitiesArray.nutrition?.rows[0]?.round
								? props.activitiesArray.nutrition?.rows[0]?.round
								: ""
						}
						type="Nutrition"
					/>

					<ActivityCards
						value={
							props.activitiesArray.sleep?.rows[0]?.count
								? props.activitiesArray.sleep?.rows[0]?.count
								: ""
						}
						type="Sleep"
					/>
				</div>
			</div>
		</div>
	);
}

export function ActivityCards(props) {
	let color = "";
	let counter = "";
	let grouping = "";
	switch (props.type) {
		case "Exercise":
			color = "goldenrod";
			counter = "Minutes";
			grouping = "Avg Duration";
			break;
		case "Nutrition":
			color = "#47d16c";
			counter = "Calories";
			grouping = "Avg Calories";
			break;
		case "Sleep":
			color = "#702963";
			counter = "Days";
			grouping = "Days Recorded";
			break;
	}

	return (
		<div className="card-act" style={{ backgroundColor: color }}>
			<div className="display-act-card">
				<h3>{props.type}</h3>
				<h4>{grouping}</h4>
				<div className="dur-int-val">
					{props.value} {counter}
				</div>
			</div>
		</div>
	);
}
