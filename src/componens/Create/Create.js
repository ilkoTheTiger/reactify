import { useState } from 'react';
import styles from './Create.module.css';

export const Create = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const onFromChange = (e) => {
        setFrom(e.target.value);
    };

    const onToChange = (e) => {
        setTo(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
    };

    return (
        <>
        <h2>Host a Commute</h2>
        <form class={styles.create} onSubmit={submitHandler}>
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
                <input type='submit' value='Host' />
            </div>
        </form>
        </>
    );
};