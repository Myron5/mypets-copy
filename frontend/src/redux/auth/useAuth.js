import { useSelector } from 'react-redux';
import { userSelector, authSelector, errorSelector } from 'redux/auth/selectors';

export const useAuth = () => {
    const token = useSelector(authSelector);
    const error = useSelector(errorSelector);
    const user = useSelector(userSelector);

    return {
        token,
        error,
        user,
    };
};
