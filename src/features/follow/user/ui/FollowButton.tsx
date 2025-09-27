import {useDispatch, useSelector} from "react-redux";
import {selectIsFollowing, toggleFollow} from "../model/slice";


export const FollowButton = ( { userId }: { userId: string }) => {
    const dispatch = useDispatch();
    const isFollowing = useSelector(selectIsFollowing(userId));

    return(
        <button onClick={() => dispatch(toggleFollow(userId))}>
            {isFollowing ? "Отписаться" : "Подписаться"}
        </button>
    )
}