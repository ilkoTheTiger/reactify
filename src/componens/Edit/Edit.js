import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { useService } from "../../hooks/useService";
import { useForm } from '../../hooks/useForm';
import { commuteServiceFactory } from "../../services/commuteService";
import { useCommuteContext } from '../../contexts/CommuteContext';
import { currentDateTime, maxDate } from '../../utils/dateUtils';
import { checkForErrors, hasEmptyProperty } from '../../utils/validators';

import styles from './Edit.module.css';


export const Edit = () => {
    const {onEditCommuteSubmit} = useCommuteContext();
    const { commuteId } = useParams();
    const commuteService = useService(commuteServiceFactory);
    const now = currentDateTime();
    const max = maxDate();

    const {values, changeHandler, onSubmit, changeValues} = useForm({
        _id: '',
        from: '',
        to: '',
        seats: '',
        phone: '',
        time: ''
    }, onEditCommuteSubmit);

    const [formErrors, setFormErrors] = useState({
        from: '',
        to: '',
        seats: '',
        phone: '',
        time: ''
    });

    useEffect(() => {
        commuteService.getOne(commuteId)
            .then(result => {
                changeValues(result);
            });
            // eslint-disable-next-line
    }, [commuteId]);

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

        if (target === 'phone' && !(/^0[1-9]{1}[0-9]{8}$/.test(value))) {
            errors.phone = 'Phone number must start with 0 followed by 9 digits!';
        } else if (target === 'phone' && (value.length !== 10)) {
            errors.phone = 'Phone number must be 10 digits!';
        } else if (target === 'phone' && value.length === 10) {
            errors.phone = '';
        };

        if (target === 'time' && (value <= now)) {
            errors.time = 'Scheduled date must be in the future!';
        } else if (target === 'time' && (value > max)) {
            errors.time = 'Scheduled date must be in the near future!';
        } else if (target === 'time' && value) {
            errors.time = '';
        };

        setFormErrors(errors);
    };

    return (
        <section className={styles.editContainer}>
            <h2>Edit a Commute</h2>
            <form className={styles.edit} onSubmit={onSubmit}>
                <div className={styles.formRow}>
                    <label htmlFor='from'>Departing From</label>
                    <div className={styles.formInput}>
                        <span style={formErrors.from ? { borderColor: 'red' } : (values.from.length > 2 && !/\d/.test(values.from)) ? { borderColor: 'green' } : {}}><i className='fa fa-circle-dot'></i></span>
                        <input
                            type='text'
                            name='from'
                            id='from'
                            value={values.from}
                            onChange={changeHandler}
                            onBlur={formValidate}
                            placeholder='Enter city of departure..'
                            style={formErrors.from ? { borderColor: 'red' } : (values.from.length > 2 && !/\d/.test(values.from)) ? { borderColor: 'green' } : {}}
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
                        <span style={formErrors.to ? { borderColor: 'red' } : (values.to.length > 2 && !/\d/.test(values.to)) ? { borderColor: 'green' } : {}}><i className="fa-solid fa-location-dot"></i></span>
                        <input
                            type='text'
                            name='to'
                            id='to'
                            value={values.to}
                            onChange={changeHandler}
                            onBlur={formValidate}
                            placeholder='Enter city of arrival..'
                            style={formErrors.to ? { borderColor: 'red' } : (values.to.length > 2 && !/\d/.test(values.to)) ? { borderColor: 'green' } : {}}
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
                        <span style={(formErrors.seats || values.seats.length > 1) ? { borderColor: 'red' } : (values.seats.length === 1 && !isNaN(values.seats)) ? { borderColor: 'green' } : {}}><i className="fa-solid fa-person"></i></span>
                        <input
                            type='text'
                            name='seats'
                            id='seats'
                            value={values.seats}
                            onChange={changeHandler}
                            onBlur={formValidate}
                            placeholder='Enter available seats..'
                            style={(formErrors.seats || values.seats.length > 1) ? { borderColor: 'red' } : (values.seats.length === 1 && !isNaN(values.seats)) ? { borderColor: 'green' } : {}}
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
                        <span style={formErrors.phone ? { borderColor: 'red' } : (values.phone.length === 10) ? { borderColor: 'green' } : {}}><i className="fa-solid fa-phone"></i></span>
                        <input
                            type='text'
                            name='phone'
                            id='phone'
                            value={values.phone}
                            onChange={changeHandler}
                            onBlur={formValidate}
                            placeholder='Enter phone number..'
                            style={formErrors.phone ? { borderColor: 'red' } : (values.phone.length === 10) ? { borderColor: 'green' } : {}}
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
                        <span style={formErrors.time ? { borderColor: 'red' } : values.time ? { borderColor: 'green' } : {}}><i className="fa-solid fa-clock"></i></span>
                        <input
                            type='datetime-local'
                            name='time'
                            min={now}
                            max={max}
                            id='time'
                            value={values.time}
                            onChange={changeHandler}
                            onBlur={formValidate}
                            style={formErrors.time ? { borderColor: 'red' } : values.time ? { borderColor: 'green' } : {}}
                        />
                    </div>
                    {formErrors.time &&
                        <p className={styles.formError}>
                            {formErrors.time}
                        </p>
                    }
                </div>

                <div >
                    <input className={styles.inputSubmit} type='submit' style={checkForErrors(formErrors) ? { border: '3px solid red' } : hasEmptyProperty(values) ? {} : { border: '2px solid green' }} disabled={checkForErrors(formErrors)} value='Save Changes' />
                </div>
            </form>
        </section>
    );
};