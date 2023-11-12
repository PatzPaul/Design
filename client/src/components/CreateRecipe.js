import React,{useState} from "react";
import {Form, Button} from "react-bootstrap";
import {useForm} from "react-hook-form";
import roastTurkey from "./images/Roast-Turkey-Recipe.png";
import butterFish from "./images/garlic-butter-fish.png";
import roastVeg from "./images/roasted-veg.png";
import fryChick from "./images/air-fryer-chicken.png";
import roastChick from "./images/cayenne-chicken-skewers.png";

const CreateRecipePage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);

  const createRecipe = (data) => {
    console.log(data);

    const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
    console.log(token);

    const requestOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
      body: JSON.stringify(data),
    };

    fetch("/recipe/recipes", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        reset();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <h1 className="heading">Some of Your Best Pics</h1>
      <div className="gallery">
        <img
          className="recipe-pic"
          src={roastChick}
          alt="Roasted Chicken Skewers"
        />
        <img
          className="recipe-pic"
          src={roastTurkey}
          alt="Roast Turkey Recipe"
        />
        <img
          className="recipe-pic"
          src={roastVeg}
          alt="Roasted Vegetable Recipe"
        />
        <img
          className="recipe-pic"
          src={fryChick}
          alt="Air Fryer Chicken Recipe"
        />
        <img
          className="recipe-pic"
          src={butterFish}
          alt="Garlic Butter Fish Recipe"
        />
      </div>
      <h1>Create A Recipe</h1>
      <form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            {...register("title", { required: true, maxLength: 25 })}
          />
        </Form.Group>
        {errors.title && (
          <p style={{ color: "red" }}>
            <small>Title is required</small>
          </p>
        )}
        {errors.title?.type === "maxLength" && (
          <p style={{ color: "red" }}>
            <small>Title should be less than 25 characters</small>
          </p>
        )}
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            {...register("description", { required: true, maxLength: 255 })}
          />
        </Form.Group>
        {errors.description && (
          <p style={{ color: "red" }}>
            <small>Description is required</small>
          </p>
        )}
        {errors.description?.type === "maxLength" && (
          <p style={{ color: "red" }}>
            <small>Description should be less than 255 characters</small>
          </p>
        )}
        <br></br>
        <Form.Group>
          <Button variant="primary" onClick={handleSubmit(createRecipe)}>
            Save
          </Button>
        </Form.Group>
      </form>
    </div>
  );
};

export default CreateRecipePage;
