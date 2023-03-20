import { useState } from 'react';
import styles from './Create.module.css';

export const Create = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [seats, setSeats] = useState('1');

    const onFromChange = (e) => {
        setFrom(e.target.value);
    };

    const onToChange = (e) => {
        setTo(e.target.value);
    };

    const onSeatsChange = (e) => {
        setSeats(e.target.value);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
    };

    return (
        <>
        <h2>Host a Commute</h2>
        <form class={styles.create} onSubmit={onSubmitHandler}>
            <div>
                <label htmlFor='from'>From</label>
                <input 
                type='text' 
                name='from' 
                id='from' 
                onChange={onFromChange}
                value={from}
                placeholder='Enter city of departure..'
                />
            </div>

            <div>
                <label htmlFor='to'>To</label>
                <input 
                type='text' 
                name='to' 
                id='to' 
                onChange={onToChange}
                value={to}
                placeholder='Enter city of arrival..'
                />
            </div>

            <div>
                <label htmlFor='seats'>Seats</label>
                <select name='seats' id='seats' value={seats} onChange={onSeatsChange}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                </select>
            </div>

            <div>
                <input type='submit' value='Host' />
            </div>
        </form>
        </>
    );
};