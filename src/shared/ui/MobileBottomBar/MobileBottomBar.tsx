import React from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsAuthenticated} from "../../../entities/user";

export const MobileBottomBar = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (isAuthenticated) return null;

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-between">
            <Link to="/login" className="bg-gray-900 cursor-pointer text-white px-4 py-2 rounded-full font-bold">
                Регистрация
            </Link>
            <Link to="/login" className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full font-bold">
                Войти
            </Link>
        </div>
    );
};