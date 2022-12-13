import React, {useCallback, useEffect, useState} from 'react';
import {MealResponse} from "../../type";
import {useNavigate, useParams} from "react-router-dom";
import axiosApi from "../../axiosApi";
import FormBody from "../../components/FormBody/FormBody";
import Spinner from "../../components/Spinner/Spinner";

interface Props {
  edit?: boolean;
}

const Form: React.FC<Props> = ({edit}) => {

  const navigate = useNavigate();
  const {id} = useParams();

  const [loading, setLoading] = useState(false);
  const [changing, setChanging] = useState(false);

  const [meal, setMeal] = useState<MealResponse>({category: '', kcal: '', text: ''});

  const fetchSelectedMeal = useCallback(async () => {
    try {
      setLoading(true);
      const mealResponse = await axiosApi.get<MealResponse>("meals/" + id + '.json');
      const meal = mealResponse.data;
      setMeal(meal);

    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (edit) {
      void fetchSelectedMeal();
    }
  }, [id, fetchSelectedMeal, edit]);


  const updateMeal = async (meal: MealResponse) => {
    try {
      setChanging(true);
      await axiosApi.put("meals/" + id + '.json', meal);
    } finally {
      setChanging(false);
    }
  };


  const createMeal = async (meal: MealResponse) => {
    try {
      setChanging(true);
      await axiosApi.post('/meals.json', meal);
      navigate('/');
    } finally {
      setChanging(false);
    }
  };

  const onMealChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setMeal(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = () => {
    return edit ? updateMeal : createMeal;
  };

  return loading ? (
    <Spinner/>
  ) : (
    <FormBody edit={edit} onSubmit={onSubmit()} isChanging={changing} existingMeal={meal} onChange={onMealChange}/>
  )
};

export default Form;