import {Outlet} from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import {useState} from "react";
import AddXitForm from "../../../features/xit/add-xit/ui/AddXitForm";

export const Layout = ({onComposeClick}) => {
    const [isOpenForm, setIsOpenForm] = useState(false);
    return(
        <>
            <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-white border-b border-gray-200">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="text-xl font-bold">𝕏</div>
                    <button
                        onClick={() => setIsOpenForm(true)}
                        className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center"
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="min-h-screen bg-white pt-16 md:pt-0">
                <div className="max-w-7xl mx-auto flex">
                    {/* Сайдбар: только на десктопе (md и выше) */}
                    <div className="hidden md:block w-64 fixed h-full border-r border-gray-200">
                        <Sidebar onComposeClick={() => setIsOpenForm(true)} />
                    </div>

                    {/* Основной контент */}
                    <main className="flex-1 md:ml-64">
                        {/* Десктопная шапка */}
                        <div className="hidden md:block">
                            <Header />
                            <div className="border-b border-gray-200">
                                <div className="px-4 py-3 bg-gray-50">
                                    <h2 className="text-xl font-bold text-gray-900">Главная</h2>
                                </div>
                            </div>
                        </div>

                        <div className="max-w-2xl mx-auto pb-20 md:pb-0">
                            <Outlet />
                        </div>
                    </main>

                    {/* Правая панель: только на больших экранах (xl и выше) */}
                    <div className="hidden xl:block w-80">
                        <div className="sticky top-0 p-4">
                            <div className="bg-gray-50 rounded-xl p-4">
                                <h3 className="font-bold text-gray-900 mb-3">Что нового</h3>
                                <p className="text-gray-600 text-sm">
                                    Присоединяйтесь к разговору!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddXitForm isOpen={isOpenForm} onClose={() => setIsOpenForm(false)} />
        </>
    )
}