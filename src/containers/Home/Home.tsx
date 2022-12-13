import React, {useCallback, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Meal, MealList} from "../../type";
import axiosApi from "../../axiosApi";
import CalBody from "../../components/CalBody/CalBody";
import Spinner from "../../components/Spinner/Spinner";

const Home = () => {

  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMeals = useCallback(async () => {
    try {
      setLoading(true);
      const mealsResponse = await axiosApi.get<MealList | null>('/meals.json');

      const mealsArr = mealsResponse.data;

      if (!mealsArr) {
        return setMeals([]);
      }

      const newMeals = Object.keys(mealsArr).map(id => ({
        ...mealsArr[id],
        id,
      }));

      setMeals(newMeals);

    } finally {
      setLoading(false);
    }

  }, []);

  const totalKcal = meals.reduce((acc, meal) => {
    return acc + parseFloat(meal.kcal);
  }, 0);

  const deleteMeal = async (id: string) => {
    await axiosApi.delete('/meals/' + id + '.json');
    setMeals(prev => prev.filter(meal => meal.id !== id));
  };

  useEffect(() => {
    void fetchMeals();
  }, [fetchMeals]);

  const mealsEl = meals.map(meal => (
    <CalBody key={meal.id} meal={meal} onDelete={() => deleteMeal(meal.id)}/>
  ));

  return (
    <>
      {loading ? <Spinner/> : (
        <>
          <div className="d-flex justify-content-between py-3 gap-2">
            <h4>Total calories: <strong>{totalKcal}</strong></h4>
            <Link to='/new' className="btn btn-info text-white mb-2">Add meal</Link>
          </div>
          {mealsEl}</>
      )}
    </>
  );
};

export default Home;