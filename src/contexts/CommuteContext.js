import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { commuteServiceFactory } from '../services/commuteService';

export const GameContext = createContext();

export const GameProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [commutes, setCommutes] = useState([]);
    const [deletedCommute, setDeletedCommute] = useState({});
    const commuteService = commuteServiceFactory();

    useEffect(() => {
        commuteService.getAll()
            .then(result => {
                setCommutes(result);
            });
    }, [deletedCommute]);

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

    const contextValues = {
        commutes,
        onHostCommuteSubmit,
        onEditCommuteSubmit,
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