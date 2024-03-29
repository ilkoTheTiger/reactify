import { useState } from 'react';
import { hasEmptyProperty } from '../utils/validators';

export const useForm = (initialValues, onSubmitHandler) => {
    const [values, setValues] = useState(initialValues);

    const changeHandler = (e) => {
        setValues(state => ({...state, [e.target.name]: e.target.value}))
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (hasEmptyProperty(values)) {
            return alert('All fields are required!');
        };

        onSubmitHandler(values);
        
        setValues(initialValues);
    };

    const changeValues = (newValues) => {
        setValues(newValues);
    };

    return {
        values,
        changeHandler,
        onSubmit,
        changeValues,
    };
}