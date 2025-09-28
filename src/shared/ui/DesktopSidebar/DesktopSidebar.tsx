import React from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/entities/user';
import logoImg from '@/assets/polar-bear-256.svg';


const sidebarItems = [
    {name: 'Главная', icon: '🏠', path: '/'},
    {name: 'Что нового?', icon: '🔍', path: '/explore'},
    {name: 'Уведомления', icon: '🔔', path: '/notifications'},
    {name: 'Сообщения', icon: '✉️', path: '/messages'},
    {name: 'Профиль', icon: '👤', path: '/me'},
];
export const DesktopSidebar = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const navigate = useNavigate();

    return (
        <div className="w-64 fixed h-full border-r border-gray-200 bg-white ">
            <Link to={'/'}><img src={logoImg} alt="Logo" className="w-14 h-14" /></Link>
            <div className="p-4  border-gray-200 ">
                <div className="text-2xl font-bold flex items-center space-x-2">
                    <div>Присоединиться к сообществу</div>
                </div>

                {!isAuthenticated ? (
                    <div className="flex mt-4 space-y-1">
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-gray-900 cursor-pointer text-white px-6 py-2 rounded-full font-bold"
                        >
                            Регистрация
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-gray-200 cursor-pointer text-gray-800 px-4 py-2 rounded-full font-bold"
                        >
                            Войти
                        </button>
                    </div>
                ) : (
                    <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                        Добро пожаловать!
                    </div>
                )}
            </div>

            <nav className="p-4 space-y-1">
                {isAuthenticated ? (<>
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

                            className="cursor-pointer mt-8 w-full bg-black text-white py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">
                            Новый хит
                        </button> </>)
                    : ( <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            Условия использования · Политика конфиденциальности
                        </div>
                        <div className="flex space-x-2">
                            <button className="text-xs bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full transition-colors">
                                Обратная связь
                            </button>
                            <button className="text-xs bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full transition-colors">
                                Справка
                            </button>
                        </div>
                    </div>)
                }
            </nav>
        </div>
    );
};