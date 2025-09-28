import {Link, NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsAuthenticated} from "../../../entities/user";
import {AuthForm} from "../../../features/auth/ui/AuthForm";
import React from 'react';
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
         (
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