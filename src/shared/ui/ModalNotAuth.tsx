import {useSelector} from "react-redux";
import {selectIsAuthenticated} from "../../entities/user";
import {useEffect, useState} from "react";
import {AuthForm} from "../../features/auth/ui/AuthForm";


export interface ModalNotAuthProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ModalNotAuth = ( { isOpen, onClose }: ModalNotAuthProps ) => {
    const isAuth = useSelector(selectIsAuthenticated);

    useEffect(() => {
        if(isAuth && isOpen) {
            onClose();
        }
    }, [isAuth, isOpen, onClose]);

    if(!isOpen) return null;

    return(
        <div>
            <h3>Войдите или создайте свою учётную запись, чтобы создавать хиты!</h3>
            <AuthForm />
            <button onClick={() => onClose()}>❌</button>
        </div>
    )
}