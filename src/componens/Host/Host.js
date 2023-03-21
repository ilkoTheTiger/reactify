import { useState } from 'react';
import styles from './Host.module.css';

export const Host = () => {
    const [values, setValues] = useState({
        from: '',
        to: '',
        seats: '1',
        description: ''
    });

    const [formErrors, setFormErrors] = useState({
        from: '',
        to: '',
        seats: '1',
        description: ''
    });

    const onChangeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }))
    };

    const formValidate = (e) => {
        const value = e.target.value;
        const target = e.target.name;
        const errors = { ...formErrors }

        if (target === 'from' && (value.length < 3 || value.length > 14)) {
            errors.from = 'City of Departure must be between 3 and 14 characters';
        } else if (target === 'from' && !(value.length < 3 || value.length > 14)) {
            errors.from = ''
        }

        if (target === 'to' && (value.length < 3 || value.length > 14)) {
            errors.to = 'City of Arrival must be between 3 and 14 characters';
        } else if (target === 'to' && !(value.length < 3 || value.length > 14)) {
            errors.to = ''
        }

        setFormErrors(errors)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <h2>Host a Commute</h2>
            <form className={styles.host} onSubmit={onSubmitHandler}>
                <div className={styles.formRow}>
                    <label htmlFor='from'>From</label>
                    <div className={styles.formInput}>
                        <span style={formErrors.from ? { borderColor: 'red' } : {}}><i className='fa fa-circle-dot'></i></span>
                        <input
                            type='text'
                            name='from'
                            id='from'
                            value={values.from}
                            onChange={onChangeHandler}
                            onBlur={formValidate}
                            placeholder='Enter city of departure..'
                            style={formErrors.from ? { borderColor: 'red' } : {}}
                        />
                    </div>
                    {formErrors.from &&
                        <p className={styles.formError}>
                            {formErrors.from}
                        </p>
                    }
                </div>

                <div className={styles.formRow}>
                    <label htmlFor='to'>To</label>
                    <div className={styles.formInput}>
                        <span style={formErrors.to ? { borderColor: 'red' } : {}}><i className="fa-solid fa-location-dot"></i></span>
                        <input
                            type='text'
                            name='to'
                            id='to'
                            value={values.to}
                            onChange={onChangeHandler}
                            onBlur={formValidate}
                            placeholder='Enter city of arrival..'
                            style={formErrors.to ? { borderColor: 'red' } : {}}
                        />
                    </div>
                    {formErrors.to &&
                        <p className={styles.formError}>
                            {formErrors.to}
                        </p>
                    }
                </div>

                <div className={styles.formRow}>
                    <label htmlFor='seats'>Seats</label>
                    <div className={styles.formInput}>
                        <span><i className="fa-solid fa-person"></i></span>
                        <select name='seats' id='seats' value={values.seats} onChange={onChangeHandler}>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                        </select>
                    </div>
                </div>

                <div className={styles.formRow}>
                    <label htmlFor='description'>Description</label>
                    <div className={styles.formInput}>
                        <span><i className="fa-solid fa-circle-info"></i></span>
                        <textarea
                            name='description'
                            id='description'
                            value={values.description}
                            onChange={onChangeHandler}
                            placeholder='Enter description'
                        ></textarea>
                    </div>
                </div>

                <div>
                    <input type='submit' value='Host' />
                </div>
            </form>
        </>
    );
};