import React from 'react';
import {Link} from "react-router-dom";
import {Meal} from "../../type";

interface Props {
  meal: Meal;
  onDelete: React.MouseEventHandler;
}

const CalBody: React.FC<Props> = ({meal, onDelete}) => {
  return (
    <div className="card mb-2">
      <div className="card-body d-flex gap-5 align-items-center justify-content-between">
        <div className="d-flex flex-column gap-2" style={{width: '200px'}}>
          <h5>{meal.category}</h5>
          <p>{meal.text}</p>
        </div>
        <span>{meal.kcal} Kcal</span>
        <div className="d-flex flex-column gap-2">
          <Link to={`/${meal.id}/edit`} className="btn btn-info me-3">Edit</Link>
          <button onClick={onDelete} className="btn btn-outline-danger">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default CalBody;