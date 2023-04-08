import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { commuteServiceFactory } from '../services/commuteService';

export const CommuteContext = createContext();

export const CommuteProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [commutes, setCommutes] = useState([]);
    const [latest, setLatest] = useState([]);
    const commuteService = commuteServiceFactory();

    useEffect(() => {
        commuteService.getAll()
            .then(result => {
                setCommutes(result);
            });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        commuteService.getLatest()
            .then(result => {
                setLatest(result);
            }).catch(
                setLatest([])
            )
        // eslint-disable-next-line
    }, [commutes]);

    const onHostCommuteSubmit = async (data) => {
        const createdCommute = await commuteService.create(data);
        setCommutes(state => [...state, createdCommute]);

        navigate('/commutes');
    };

    const onEditCommuteSubmit = async (values) => {
        const result = await commuteService.edit(values._id, values);

        setCommutes(state => state.map(x => x._id === values._id ? result : x));

        navigate(`/commutes/${values._id}`);
    };

    const deleteCommute = (commuteId) => {
        setCommutes(state => state.filter(commute => commute._id !== commuteId));
    };

    const getCommute = (commuteId) => {
        return commutes.find(commute => commute._id === commuteId);
    };

    const contextValues = {
        commutes,
        latest,
        onHostCommuteSubmit,
        onEditCommuteSubmit,
        deleteCommute,
        getCommute,
    }

    return (
        <CommuteContext.Provider value={contextValues}>
            {children}
        </CommuteContext.Provider>
    );
};

export const useCommuteContext = () => {
    const context = useContext(CommuteContext);

    return context;
}