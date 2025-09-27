import { useSelector } from 'react-redux';
import { selectCurrentUser} from "../../entities/user";
import LogoutButton from "../../features/auth/ui/LogoutButton";


export const ProfilePage = () => {
    const user = useSelector(selectCurrentUser);

    if (!user) return <div>Загрузка...</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Профиль</h1>
            <p>Привет, {user.email}</p>
            <LogoutButton />
        </div>
    );
};