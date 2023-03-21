import { useState } from 'react';
import styles from './Host.module.css';
import { currentDateTime } from '../../utils/dateUtils';

export const Host = () => {
    const now = currentDateTime();

    console.log(now)
    const [values, setValues] = useState({
        from: '',
        to: '',
        seats: '',
        phone: '',
        time: ''
    });

    const [formErrors, setFormErrors] = useState({
        from: '',
        to: '',
        seats: '',
        phone: '',
        time: ''
    });

    const onChangeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }))
    };

    const formValidate = (e) => {
        const value = e.target.value;
        const target = e.target.name;
        const errors = { ...formErrors }

        if (target === 'from' && (value.length < 3 || value.length > 14)) {
            errors.from = 'City of Departure must be between 3 and 14 letters!';
        } else if (target === 'from' && (/\d/.test(value))) {
            errors.from = 'City of Departure must be letters only!';
        } else if (target === 'from' && value === values.to) {
            errors.from = 'City of Departure must be different than City of Arrival!';
        } else if (target === 'from' && !(value.length < 3 || value.length > 14)) {
            errors.from = ''
        }

        if (target === 'to' && (value.length < 3 || value.length > 14)) {
            errors.to = 'City of Arrival must be between 3 and 14 letters!';
        } else if (target === 'to' && (/\d/.test(value))) {
            errors.to = 'City of Arrival must be letters only!';
        } else if (target === 'to' && value === values.from) {
            errors.to = 'City of Arrival must be different than City of Departure!';
        } else if (target === 'to' && !(value.length < 3 || value.length > 14)) {
            errors.to = ''
        }

        if (target === 'seats' && (Number(value) < 1 || Number(value) > 4 || isNaN(value))) {
            errors.seats = 'Available seats must a number be between 0 and 4!';
        } else if (target === 'seats' && !(Number(value) < 1 || Number(value) > 4)) {
            errors.seats = ''
        }

        if (target === 'phone' && (value.length != 10)) {
            errors.phone = 'Phone number must be 10 digits!';
        } else if (target === 'phone' && value.length == 10) {
            errors.phone = ''
        }

        if (target === 'time' && (value <= now)) {
            errors.time = 'Scheduled date must be in the future!';
        } else if (target === 'time' && value) {
            errors.time = ''
        }

        setFormErrors(errors)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
    };

    return (
        <div className={styles.hostContainer}>
            <h2>Host a Commute</h2>
            <form className={styles.host} onSubmit={onSubmitHandler}>
                <div className={styles.formRow}>
                    <label htmlFor='from'>Departing From</label>
                    <div className={styles.formInput}>
                        <span style={formErrors.from ? { borderColor: 'red' } : (values.from.length > 2 && !/\d/.test(values.from)) ? {borderColor: 'green'} : {}}><i className='fa fa-circle-dot'></i></span>
                        <input
                            type='text'
                            name='from'
                            id='from'
                            value={values.from}
                            onChange={onChangeHandler}
                            onBlur={formValidate}
                            placeholder='Enter city of departure..'
                            style={formErrors.from ? { borderColor: 'red' } : (values.from.length > 2 && !/\d/.test(values.from)) ? {borderColor: 'green'} : {}}
                        />
                    </div>
                    {formErrors.from &&
                        <p className={styles.formError}>
                            {formErrors.from}
                        </p>
                    }
                </div>

                <div className={styles.formRow}>
                    <label htmlFor='to'>Travelling To</label>
                    <div className={styles.formInput}>
                        <span style={formErrors.to ? { borderColor: 'red' } : (values.to.length > 2 && !/\d/.test(values.to)) ? {borderColor: 'green'} : {}}><i className="fa-solid fa-location-dot"></i></span>
                        <input
                            type='text'
                            name='to'
                            id='to'
                            value={values.to}
                            onChange={onChangeHandler}
                            onBlur={formValidate}
                            placeholder='Enter city of arrival..'
                            style={formErrors.to ? { borderColor: 'red' } : (values.to.length > 2 && !/\d/.test(values.to)) ? {borderColor: 'green'} : {}}
                        />
                    </div>
                    {formErrors.to &&
                        <p className={styles.formError}>
                            {formErrors.to}
                        </p>
                    }
                </div>

                <div className={styles.formRow}>
                    <label htmlFor='seats'>Available Seats</label>
                    <div className={styles.formInput}>
                        <span style={(formErrors.seats || values.seats.length > 1) ? { borderColor: 'red' } : (values.seats.length == 1 && !isNaN(values.seats)) ? {borderColor: 'green'} : {}}><i className="fa-solid fa-person"></i></span>
                        <input
                            type='text'
                            name='seats'
                            id='seats'
                            value={values.seats}
                            onChange={onChangeHandler}
                            onBlur={formValidate}
                            placeholder='Enter available seats..'
                            style={(formErrors.seats || values.seats.length > 1) ? { borderColor: 'red' } : (values.seats.length == 1 && !isNaN(values.seats)) ? {borderColor: 'green'} : {}}
                        />
                    </div>
                    {formErrors.seats &&
                        <p className={styles.formError}>
                            {formErrors.seats}
                        </p>
                    }
                </div>

                <div className={styles.formRow}>
                    <label htmlFor='phone'>Phone Number</label>
                    <div className={styles.formInput}>
                        <span style={formErrors.phone ? { borderColor: 'red' } : (values.phone.length == 10) ? {borderColor: 'green'} : {}}><i className="fa-solid fa-phone"></i></span>
                        <input
                            type='text'
                            name='phone'
                            id='phone'
                            value={values.phone}
                            onChange={onChangeHandler}
                            onBlur={formValidate}
                            placeholder='Enter phone number..'
                            style={formErrors.phone ? { borderColor: 'red' } : (values.phone.length == 10) ? {borderColor: 'green'} : {}}
                        />
                    </div>
                    {formErrors.phone &&
                        <p className={styles.formError}>
                            {formErrors.phone}
                        </p>
                    }
                </div>

                <div className={styles.formRow}>
                    <label htmlFor='time'>Scheduled for</label>
                    <div className={styles.formInput}>
                        <span style={formErrors.time ? { borderColor: 'red' } : values.time ? {borderColor: 'green'} : {}}><i className="fa-solid fa-clock"></i></span>
                        <input
                            type='datetime-local'
                            name='time'
                            min={now}
                            id='time'
                            value={values.time}
                            onChange={onChangeHandler}
                            onBlur={formValidate}
                            placeholder='Enter time number..'
                            style={formErrors.time ? { borderColor: 'red' } : values.time ? {borderColor: 'green'} : {}}
                        />
                    </div>
                    {formErrors.time &&
                        <p className={styles.formError}>
                            {formErrors.time}
                        </p>
                    }
                </div>

                <div>
                    <input type='submit' value='Host' />
                </div>
            </form>
        </div>
    );
};