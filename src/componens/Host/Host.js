import { useState } from 'react';
import styles from './Host.module.css';

export const Host = () => {
    const [values, setValues] = useState({
        from: '',
        to: '',
        seats: '1',
        description: ''
    });

    const onChangeHandler = (e) => {
        setValues(state => ({...state, [e.target.name]: e.target.value}))
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
    };

    return (
        <>
        <h2>Host a Commute</h2>
        <form className={styles.host} onSubmit={onSubmitHandler}>
            <div>
                <label htmlFor='from'>From</label>
                <input 
                type='text' 
                name='from' 
                id='from' 
                value={values.from}
                onChange={onChangeHandler}
                placeholder='Enter city of departure..'
                />
            </div>

            <div>
                <label htmlFor='to'>To</label>
                <input 
                type='text' 
                name='to' 
                id='to' 
                value={values.to}
                onChange={onChangeHandler}
                placeholder='Enter city of arrival..'
                />
            </div>

            <div>
                <label htmlFor='seats'>Seats</label>
                <select name='seats' id='seats' value={values.seats} onChange={onChangeHandler}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                </select>
            </div>

            <div>
                <label htmlFor='description'>Description</label>
                <textarea 
                name='description' 
                id='description' 
                cols='30' 
                rows='10' 
                value={values.description}
                onChange={onChangeHandler}
                placeholder='Enter description'
                ></textarea>
            </div>

            <div>
                <input type='submit' value='Host' />
            </div>
        </form>
        </>
    );
};