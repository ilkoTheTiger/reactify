import { useState } from 'react';
import styles from './Create.module.css';

export const Create = () => {
    const [from, setFrom] = useState();

    return (
        <>
        <h2>Host a Commute</h2>
        <form class={styles.create}>
            <div>
                <label htmlFor='From'>From</label>
                <input type='text' name='from' id='from' placeholder='Enter city of departure..'/>
            </div>

            <div>
                <input type='submit' value='Host' />
            </div>
        </form>
        </>
    );
};