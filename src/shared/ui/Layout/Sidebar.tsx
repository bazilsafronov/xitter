import {Link, NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsAuthenticated} from "../../../entities/user";
import {AuthForm} from "../../../features/auth/ui/AuthForm";

interface SidebarProps {
    onComposeClick: () => void
}
export const Sidebar = ({ onComposeClick }: SidebarProps) => {
    const sidebarItems = [
        {name: 'Главная', icon: '🏠', path: '/'},
        {name: 'Что нового?', icon: '🔍', path: '/explore'},
        {name: 'Уведомления', icon: '🔔', path: '/notifications'},
        {name: 'Сообщения', icon: '✉️', path: '/messages'},
        {name: 'Профиль', icon: '👤', path: '/me'},
    ];

    const isAuth = useSelector(selectIsAuthenticated);
    return (
        <div className="p-4 h-full flex flex-col">
            <div className="text-2xl font-bold mb-8"><Link to={'/'}>Xitter</Link></div>
            {isAuth ? (<>
                <nav className="space-y-2">
                    {sidebarItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({isActive}) =>
                                `flex items-center space-x-3 w-full p-3 rounded-full ${
                                    isActive
                                        ? 'bg-black text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                } transition-colors`
                            }
                        >
                            <span>{item.icon}</span>
                            <span className="text-xl">{item.name}</span>
                        </NavLink>
                    ))}
                </nav>
                <button
                    onClick={onComposeClick}
                    className="cursor-pointer mt-8 w-full bg-black text-white py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">
                    Новый хит
                </button> </>)
            : (
                   <div className="flex-1">
                       <AuthForm />
                       <p className="mt-6 text-gray-500 text-sm">
                           © 2025 Xitter Corp.
                       </p>
                   </div>
                )}

        </div>
    )
}
export default Sidebar;