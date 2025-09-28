import {useDispatch, useSelector} from "react-redux";
import {selectLikesByXitId, toggleLike} from "../model/slice";
import {useState} from "react";
import {selectIsAuthenticated} from "../../../../entities/user";
import {ModalNotAuth} from "../../../../shared/ui/ModalNotAuth";
import React from "react";

interface LikeButtonProps {
    xitId: string;
}
export const LikeButton = ({ xitId } : LikeButtonProps) => {
    const dispatch = useDispatch();
    const likes = useSelector(selectLikesByXitId(xitId));
    const isAuth = useSelector(selectIsAuthenticated);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleLikeClick = () => {
        if(!isAuth){
            setShowLoginModal(true);
            return;
        }
        dispatch(toggleLike(xitId))
    }
    return (
        <>
            <button onClick={handleLikeClick}>
                ❤️ {likes}
            </button>

            <ModalNotAuth isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
        </>
    )
}