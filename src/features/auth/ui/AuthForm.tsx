import React, { useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../../shared/api/firebase';
import {useNavigate} from "react-router-dom";

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
            }
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px', maxWidth: '400px' }}>
            <h2>{mode === 'signup' ? 'Регистрация' : 'Вход'}</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
            />

            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
            />

            <button
                type="submit"
                disabled={loading}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#1a73e8',
                    color: 'white',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    marginBottom: '10px'
                }}
            >
                {loading ? 'Загрузка...' : mode === 'signup' ? 'Зарегистрироваться' : 'Войти'}
            </button>

            <button
                type="button"
                onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                style={{
                    padding: '8px',
                    backgroundColor: '#f1f3f4',
                    border: '1px solid #dadce0',
                    cursor: 'pointer',
                    width: '100%'
                }}
            >
                {mode === 'signin' ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
            </button>
        </form>
    );
};