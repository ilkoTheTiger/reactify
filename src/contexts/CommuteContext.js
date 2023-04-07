import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { commuteServiceFactory } from '../services/commuteService';

export const CommuteContext = createContext();

export const CommuteProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [commutes, setCommutes] = useState([]);
    const commuteService = commuteServiceFactory();

    useEffect(() => {
        commuteService.getAll()
            .then(result => {
                setCommutes(result);
            });
    }, [commuteService]);

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
        setGames(state => state.filter(commute => commute._id !== commuteId));
    };

    const contextValues = {
        commutes,
        onHostCommuteSubmit,
        onEditCommuteSubmit,
        deleteCommute,
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