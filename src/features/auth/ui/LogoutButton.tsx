
import { auth} from "../../../shared/api/firebase";
import {clearUser} from "../../../entities/user";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await auth.signOut();
            dispatch(clearUser())
            navigate('/')
        } catch (error) {
            console.error('Ошибка выхода:', error);
        }
    }
    return (
        <button
            onClick={handleLogout}
            className="cursor-pointer text-red-500 hover:text-red-700 font-medium"
        >
            Выйти
        </button>
    )
}
export default LogoutButton
