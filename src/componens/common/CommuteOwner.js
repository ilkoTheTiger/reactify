import { Navigate, Outlet, useParams } from "react-router-dom";

import { useCommuteContext } from "../../contexts/CommuteContext";
import { useAuthContext } from "../../contexts/AuthContext";

export const CommuteOwner = ({
    children,
}) => {
    const { commuteId } = useParams();
    const { getCommute } = useCommuteContext();
    const { userId } = useAuthContext();

    const currentCommute = getCommute(commuteId);

    if (currentCommute && currentCommute._ownerId !== userId) {
        return <Navigate to={`/commutes/${commuteId}`} replace />
    };

    return children ? children : <Outlet />
};