import React, { useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../../shared/api/firebase';
import { useNavigate } from "react-router-dom";

type AuthMode = 'signin' | 'signup';

export const AuthForm = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState<AuthMode>('signin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (mode === 'signup') {
                await createUserWithEmailAndPassword(auth, email, password);
                navigate('/');
                setMode('signin');
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                navigate('/');
            }
        } catch (err: any) {
            console.error(err);
            let message = 'Ошибка авторизации';
            if (err.code === 'auth/user-not-found') {
                message = 'Пользователь не найден';
            } else if (err.code === 'auth/wrong-password') {
                message = 'Неверный пароль';
            } else if (err.code === 'auth/email-already-in-use') {
                message = 'Email уже используется';
            } else if (err.code === 'auth/invalid-email') {
                message = 'Неверный формат email';
            } else if (err.code === 'auth/weak-password') {
                message = 'Пароль должен содержать минимум 6 символов';
            }
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                            {mode === 'signup' ? 'Создать аккаунт' : 'Войти в аккаунт'}
                        </h1>

                    </div>

                    {/* Сообщение об ошибке */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700 text-sm text-center">{error}</p>
                        </div>
                    )}

                    {/* Форма */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Поле Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400"
                                disabled={loading}
                            />
                        </div>

                        {/* Поле Пароль */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Пароль
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Введите пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400"
                                disabled={loading}
                            />
                        </div>

                        {/* Основная кнопка */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full cursor-pointer bg-gray-900 hover:bg-gray-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Загрузка...
                                </span>
                            ) : mode === 'signup' ? (
                                'Зарегистрироваться'
                            ) : (
                                'Войти'
                            )}
                        </button>

                        {/* Кнопка переключения режима */}
                        <button
                            type="button"
                            onClick={() => {
                                setMode(mode === 'signin' ? 'signup' : 'signin');
                                setError(null);
                            }}
                            disabled={loading}
                            className="w-full cursor-pointer bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg border border-gray-300 transition-colors duration-200"
                        >
                            {mode === 'signin' ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
                        </button>
                    </form>

                    {/* Дополнительная информация */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-500">
                            {mode === 'signup'
                                ? 'Регистрируясь, вы соглашаетесь с нашими условиями использования'
                                : 'Забыли пароль? Свяжитесь с поддержкой'
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};