import {useSelector} from "react-redux";
import {selectCurrentUser, selectIsAuthenticated} from "../../../entities/user";
import { Link } from "react-router-dom";
import React from "react";

export const Header = () => {
    const user = useSelector(selectCurrentUser);
    const isAuthenticated = useSelector(selectIsAuthenticated)
    return (
        <div className="sticky top-0 bg-white z-10 ">
            <div className="px-4 py-3 flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-900">{}</h1>
                {isAuthenticated && user ? (
                    <Link to="/me" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-600 font-medium">
              {user.displayName?.charAt(0).toUpperCase() ||
                  user.email?.charAt(0).toUpperCase() ||
                  '?'}
            </span>
                    </Link>
                ) : null}
            </div>
        </div>
    );
}
export default Header;