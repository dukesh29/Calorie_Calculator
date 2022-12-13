import React from 'react';
import {CATEGORIES} from "../../constants";
import {MealResponse} from "../../type";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props {
  existingMeal?: MealResponse;
  onSubmit: (meal: MealResponse) => void;
  isChanging?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  edit?: boolean;
}

const FormBody: React.FC<Props> = ({
                                     existingMeal, onSubmit, isChanging,
                                     onChange, edit
                                   }) => {

  let meal = existingMeal ? {
    ...existingMeal,
  } : {
    category: "",
    text: "",
    kcal: "",
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...meal,
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h4 className="mt-2">{edit ? 'Edit meal' : 'Add new meal'}</h4>
      <div className="form-group my-2">
        <label htmlFor="category" className="pb-1 fs-6 fw-bold">Category</label>
        <select name="category" id="category" value={meal.category} className="form-select w-25"
                onChange={onChange} required>
          <option value="" disabled>Choose your meal</option>
          {CATEGORIES.map(item => (
            <option key={item.id} value={item.title}>{item.title}</option>
          ))}
        </select>
      </div>
      <div className="form-group mb-2">
        <label htmlFor="text" className="pb-1 fs-6 fw-bold">Text</label>
        <input
          type="text"
          id="text"
          name="text"
          className="form-control w-50"
          value={meal.text}
          onChange={onChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="kcal" className="pb-1 fs-6 fw-bold">Calories</label>
        <input
          type="number"
          id="kcal"
          name="kcal"
          className="form-control w-50"
          value={meal.kcal}
          onChange={onChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-warning mt-3" disabled={isChanging}>
        {isChanging && <ButtonSpinner/>}
        {edit ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default FormBody;