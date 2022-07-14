import * as React from "react";
import "./Exercise.css";

export default function Exercise(props) {
	const [isAddingExercise, setIsAddingExercise] = React.useState(false);

	function renderExerciseCards() {
		if (!props.allExercises[0]) return <div>No Exercises added yet</div>;

		console.log(props.thisUser);
		props.setAllExercises(props.getExercises(props.thisUser.id));

		props.allExercises.map((e, idx) => {
			return <ExerciseCard exercise={e} key={idx} />;
		});
	}

	return (
		<div className="exercise">
			<div className="exercise-title">
				<h1>Exercise</h1>
			</div>

			<div
				className={isAddingExercise ? "exercise-body hidden" : "exercise-body"}
			>
				<div className="exercise-topbar">
					<h1>Overview</h1>
					<button
						className="btn-add-exercise btn-add"
						onClick={() => setIsAddingExercise(true)}
					>
						Add Exercise
					</button>
				</div>

				<div className="exercise-content">{renderExerciseCards()}</div>
			</div>

			<div
				className={
					isAddingExercise ? "exercise-adding" : "exercise-adding hidden"
				}
			>
				<AddExercise
					addExercise={props.addExercise}
					setAllExercises={props.setAllExercises}
					setIsAddingExercise={setIsAddingExercise}
				/>
			</div>
		</div>
	);
}

export function AddExercise(props) {
	const [exerciseName, setExerciseName] = React.useState("");
	const [exerciseCategory, setExerciseCategory] = React.useState("");
	const [exerciseDuration, setExerciseDuration] = React.useState("");
	const [exerciseIntensity, setExerciseIntensity] = React.useState("");

	return (
		<div className="addExercise">
			<div className="exercise-name">
				<div className="param-title">Name</div>
				<input
					type="text"
					className="input-name"
					placeholder="Exercise Name"
					value={exerciseName}
					onChange={(evt) => setExerciseName(evt.target.value)}
				/>
			</div>

			<div className="exercise-category">
				<div className="param-title">Category</div>
				<input
					type="text"
					className="input-name"
					placeholder="Exercise Category"
					value={exerciseCategory}
					onChange={(evt) => setExerciseCategory(evt.target.value)}
				/>
			</div>

			<div className="exercise-duration-intensity">
				{/*TODO: Make this a flexbox*/}
				<div className="exercise-duration">
					<div className="param-title">Duration (min)</div>
					<input
						type="number"
						className="input-name"
						placeholder="Minutes"
						value={exerciseDuration}
						onChange={(evt) => {
							if (evt.target.value > 0) setExerciseDuration(evt.target.value);
							else setExerciseDuration(1);
						}}
					/>
				</div>

				<div className="exercise-intensity">
					<div className="param-title">Intensity (1-10)</div>
					<input
						type="number"
						className="input-name"
						placeholder="1-10"
						value={exerciseIntensity}
						onChange={(evt) => {
							if (evt.target.value > 0 && evt.target.value < 11)
								setExerciseIntensity(evt.target.value);
							else setExerciseIntensity(1);
						}}
					/>
				</div>
			</div>

			<button
				className="btn-create-exercise"
				onClick={() => {
					props.addExercise(
						exerciseName,
						exerciseCategory,
						exerciseDuration,
						exerciseIntensity
					);

					props.setIsAddingExercise(false);
				}}
			>
				Save
			</button>
		</div>
	);
}

export function ExerciseCard({ exercise }) {
	return (
		<div className="exercise-card">
			<div>{exercise.name}</div>
			<div className="dur-int">
				<div>Duration</div>
				<div>{exercise.duration}</div>
			</div>

			<div className="dur-int">
				<div>Intensity</div>
				<div>{exercise.intensity}</div>
			</div>
			<div>{exercise.category}</div>
		</div>
	);
}
