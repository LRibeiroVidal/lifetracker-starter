import * as React from "react";
import "./Nutrition.css";

export default function Nutrition(props) {
	const [isAddingNutrition, setIsAddingNutrition] = React.useState(false);

	function renderNutritionCards() {
		if (!props.allNutrition[0]) return null;

		return props.allNutrition;
	}

	return (
		<div className="nutrition">
			<div className="nutrition-title">
				<h1>Nutrition</h1>
			</div>

			<div
				className={
					isAddingNutrition ? "nutrition-body hidden" : "nutrition-body"
				}
			>
				<div className="nutrition-topbar">
					<h1>Overview</h1>
					<button
						className="btn-add-nutrition btn-add water_button-nutrition"
						onClick={() => setIsAddingNutrition(true)}
					>
						Add nutrition
					</button>
				</div>

				<div className="nutrition-content">
					{renderNutritionCards() ? (
						renderNutritionCards().map((e, i) => {
							return <NutritionCard food={e} key={i} />;
						})
					) : (
						<div>No Nutritional Data added yet</div>
					)}
				</div>
			</div>

			<div
				className={
					isAddingNutrition ? "nutrition-adding" : "nutrition-adding hidden"
				}
			>
				<AddNutrition
					addNutrition={props.addNutrition}
					setAllNutrition={props.setAllNutrition}
					setIsAddingNutrition={setIsAddingNutrition}
				/>
			</div>
		</div>
	);
}

export function AddNutrition(props) {
	const [nutritionName, setNutritionName] = React.useState("");
	const [nutritionCategory, setNutritionCategory] = React.useState("");
	const [nutritionQuantities, setNutritionQuantities] = React.useState("");
	const [nutritionCalories, setNutritionCalories] = React.useState("");
	const [nutritionImage, setNutritionImage] = React.useState("");

	return (
		<div className="add-nutrition-form form__group">
			<div className="nutrition-name-form ">
				<input
					type="text"
					className="input-name form__field"
					placeholder="Food Name"
					value={nutritionName}
					onChange={(evt) => setNutritionName(evt.target.value)}
				/>
			</div>

			<div className="nutrition-category-form">
				<input
					type="text"
					className="input-name form__field"
					placeholder="Food Category"
					value={nutritionCategory}
					onChange={(evt) => setNutritionCategory(evt.target.value)}
				/>
			</div>

			<div className="nutrition-quantity-calories">
				<div className="nutrition-quantity-form">
					<input
						type="number"
						className="input-name form__field"
						placeholder="Quantity"
						value={nutritionQuantities}
						onChange={(evt) => {
							if (evt.target.value >= 0)
								setNutritionQuantities(evt.target.value);
							else setNutritionQuantities(1);
						}}
					/>
				</div>

				<div className="nutrition-calories-form">
					<input
						type="number"
						className="input-name form__field"
						placeholder="Calories (each)"
						value={nutritionCalories}
						onChange={(evt) => {
							if (evt.target.value >= 0) setNutritionCalories(evt.target.value);
							else setNutritionCalories(1);
						}}
					/>
				</div>
			</div>

			<div className="nutrition-image-form">
				<input
					type="text"
					className="input-name form__field"
					placeholder="Image URL (Optional)"
					value={nutritionImage}
					onChange={(evt) => {
						setNutritionImage(evt.target.value);
					}}
				/>
			</div>

			<div className="save-button-wrapper">
				<button
					className="btn-create-nutrition water_button-nutrition"
					onClick={() => {
						props.addNutrition(
							nutritionName,
							nutritionCategory,
							Math.round(nutritionQuantities),
							Math.round(nutritionCalories * nutritionQuantities),
							nutritionImage
						);

						props.setIsAddingNutrition(false);
					}}
				>
					Save
				</button>
			</div>
		</div>
	);
}

export function NutritionCard({ food }) {
	let foodURL =
		"https://www.shareicon.net/download/2016/10/26/848014_food_512x512.png";

	if (food.image_url != "") foodURL = food.image_url;
	return (
		<div className="nutrition-card">
			<div className="title-image-nutrition">
				{food.img != "" ? (
					<img
						src={foodURL}
						width="50vw"
						height="50vw"
						style={{ borderRadius: "5vw" }}
					/>
				) : (
					""
				)}

				<div className="nutrition-name">{food.name.toUpperCase()}</div>
			</div>
			<div className="nutrition-quantity-calories">
				<div className="dur-int">
					<div>Quantity</div>
					<div className="dur-int-val">{food.quantity}</div>
				</div>

				<div className="dur-int">
					<div>Total Calories</div>
					<div className="dur-int-val">{food.calories}</div>
				</div>
			</div>
			<div className="nutrition-category">{food.category}</div>
		</div>
	);
}
