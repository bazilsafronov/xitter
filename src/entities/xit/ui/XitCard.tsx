import type {Xit} from "../model/types";
import  {useState} from "react";
import {LikeButton} from "../../../features/xit/like-hit";
import {FollowButton} from "../../../features/follow/user";
import {useSelector} from "react-redux";
import {selectIsAuthenticated} from "../../user";
import {ModalNotAuth} from "../../../shared/ui/ModalNotAuth";

interface XitCardProps {
    xit: Xit
}

export default function XitCard ({ xit }): XitCardProps {
    const { id, authorId, text, createdAt } = xit;
    const isAuth = useSelector(selectIsAuthenticated)
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {
        if(!isAuth)
            setShowModal(true)
    }

    return (
        <>
            <div className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors">
                <div className="flex space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 font-medium text-sm">
              {authorId.charAt(0).toUpperCase()}
            </span>
                    </div>
                    <div className="min-w-0 flex-1">
                        {/* Имя и ник */}
                        <div className="flex flex-wrap items-baseline gap-x-1 gap-y-0.5">
                            <h3 className="font-bold text-gray-900 truncate">{authorId}</h3>
                            <span className="text-gray-500">@{authorId}</span>
                            <span className="text-gray-400">·</span>
                            <span className="text-gray-400 text-sm">{createdAt}</span>
                        </div>


                        {/* Текст xit'а */}
                        <p className="mt-1 text-gray-800 leading-relaxed whitespace-pre-wrap">
                            {text}
                        </p>
                        {/* Кнопки действий */}
                        <div className="mt-3 flex items-center justify-between max-w-md">
                            <button className="flex items-center text-gray-500 hover:text-blue-500 group">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5 group-hover:fill-blue-500"
                                >
                                    <path
                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                                <span className="ml-1.5 text-sm font-medium md:inline hidden">
                                                 Ответить
                                </span>
                            </button>

                            <button className="flex items-center text-gray-500 hover:text-green-500 group">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5 group-hover:fill-green-500"
                                >
                                    <path
                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                                </svg>
                                <span className="ml-1.5 text-sm font-medium md:inline hidden">
            Репост
          </span>
                            </button>


                            <div>
                                <LikeButton xitId={id}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Модалка авторизации */}
            <ModalNotAuth
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </>
    )
}