import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import logoImg from '../../../assets/polar-bear-256.svg'
import React from 'react';
import {selectIsAuthenticated} from "../../../entities/user";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex">
            {/* Затемнение фона */}
            <div
                className="absolute inset-0 bg-gray-100 bg-opacity-50 "
                onClick={onClose}
            />

            {/* Боковое меню */}
            <div className="relative w-64 bg-white  text-gray-900 dark:text-white h-full shadow-lg">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="text-2xl font-bold flex items-center space-x-2">
                        <img src={logoImg} alt="Logo" className="w-8 h-8" />
                        <span>Xitter</span>
                    </div>

                    {!isAuthenticated ? (
                        <div className="mt-4 space-y-2">
                            <button
                                onClick={() => {
                                    navigate('/login');
                                    onClose();
                                }}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-full font-bold transition-colors"
                            >
                                Регистрация
                            </button>
                            <button
                                onClick={() => {
                                    navigate('/login');
                                    onClose();
                                }}
                                className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 rounded-full font-bold transition-colors"
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
                    <Link
                        to="/"
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        onClick={onClose}
                    >
                        <span className="text-gray-700 dark:text-gray-300">🏠</span>
                        <span>Главная</span>
                    </Link>
                    <Link
                        to="/explore"
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        onClick={onClose}
                    >
                        <span className="text-gray-700 dark:text-gray-300">🔍</span>
                        <span>Ленты</span>
                    </Link>
                    <Link
                        to="/"
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        onClick={onClose}
                    >
                        <span className="text-gray-700 dark:text-gray-300">🔎</span>
                        <span>Обзор</span>
                    </Link>
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
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
                </div>
            </div>
        </div>
    );
};