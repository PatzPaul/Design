import React from 'react';
import roastTurkey from './images/Roast-Turkey-Recipe.png';
import butterFish from './images/garlic-butter-fish.png';
import roastVeg from './images/roasted-veg.png';
import fryChick from './images/air-fryer-chicken.png';
import roastChick from './images/cayenne-chicken-skewers.png';

const CreateRecipePage = () => {
  return (
    <div className="create-recipe">
      <h1 className="heading">Some of Your Best Pics</h1>
      <div className="gallery">
        <img className="recipe-pic" src={roastChick} alt="Roasted Chicken Skewers" />
        <img className="recipe-pic" src={roastTurkey} alt="Roast Turkey Recipe" />
        <img className="recipe-pic" src={roastVeg} alt="Roasted Vegetable Recipe" />
        <img className="recipe-pic" src={fryChick} alt="Air Fryer Chicken Recipe" />
        <img className="recipe-pic" src={butterFish} alt="Garlic Butter Fish Recipe" />
      </div>
    </div>
  );
};

export default CreateRecipePage;
