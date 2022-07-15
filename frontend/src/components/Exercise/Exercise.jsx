import * as React from "react";
import "./Exercise.css";

export default function Exercise(props) {
	const [isAddingExercise, setIsAddingExercise] = React.useState(false);

	function renderExerciseCards() {
		if (!props.allExercises[0]) return null;

		return props.allExercises;
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

				<div className="exercise-content">
					{renderExerciseCards() ? (
						renderExerciseCards().map((e, i) => {
							return <ExerciseCard exercise={e} key={i} />;
						})
					) : (
						<div>No Exercises added yet</div>
					)}
				</div>
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
		<div className="add-exercise-form form__group">
			<div className="exercise-name-form ">
				<input
					type="text"
					className="input-name form__field"
					placeholder="Exercise Name"
					value={exerciseName}
					onChange={(evt) => setExerciseName(evt.target.value)}
				/>
			</div>

			<div className="exercise-category-form">
				<input
					type="text"
					className="input-name form__field"
					placeholder="Exercise Category"
					value={exerciseCategory}
					onChange={(evt) => setExerciseCategory(evt.target.value)}
				/>
			</div>

			<div className="exercise-duration-intensity">
				{/*TODO: Make this a flexbox*/}
				<div className="exercise-duration-form">
					<input
						type="number"
						className="input-name form__field"
						placeholder="Duration (min)"
						value={exerciseDuration}
						onChange={(evt) => {
							if (evt.target.value > 0) setExerciseDuration(evt.target.value);
							else setExerciseDuration(1);
						}}
					/>
				</div>

				<div className="exercise-intensity-form">
					<input
						type="number"
						className="input-name form__field"
						placeholder="Intensity (1-10)"
						value={exerciseIntensity}
						onChange={(evt) => {
							if (evt.target.value > 0 && evt.target.value < 11)
								setExerciseIntensity(evt.target.value);
							else setExerciseIntensity(1);
						}}
					/>
				</div>
			</div>
			<div className="save-button-wrapper">
				<button
					className="btn-create-exercise water_button"
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
		</div>
	);
}

export function ExerciseCard({ exercise }) {
	return (
		<div className="exercise-card">
			<div className="exercise-name">{exercise.name.toUpperCase()}</div>

			<div className="exercise-duration-intensity">
				<div className="dur-int">
					<div>Duration</div>
					<div className="dur-int-val">{exercise.duration}</div>
				</div>

				<div className="dur-int">
					<div>Intensity</div>
					<div className="dur-int-val">{exercise.intensity}</div>
				</div>
			</div>
			<div className="exercise-category">{exercise.category}</div>
		</div>
	);
}
