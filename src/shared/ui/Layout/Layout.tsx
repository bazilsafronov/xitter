import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "@/shared/ui/Layout/Header";
import { useState } from "react";
import AddXitForm from "@/features/xit/add-xit/ui/AddXitForm";
import { MobileMenu } from "@/shared/ui/MobileMenu/MobileMenu";
import { MobileBottomBar } from "@/shared/ui/MobileBottomBar/MobileBottomBar";
import { ThemeToggle } from "@/shared/ui/ThemeToggle/ThemeToggle";
import burgerMenu from "@/assets/burger-menu.svg";
import logoImg from "@/assets/polar-bear-256.svg";
import {DesktopSidebar} from "@/shared/ui/DesktopSidebar/DesktopSidebar";

export const Layout = ({ onComposeClick }) => {
    const [isOpenForm, setIsOpenForm] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            {/* Мобильная шапка */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
                <div className="px-4 py-3 flex items-center justify-between">
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <img src={burgerMenu} alt="Меню" className="h-6 w-6" />
                    </button>
                    <Link to={"/"} className="flex items-center">
                        <img src={logoImg} alt="Logo" className="w-10 h-10" />
                    </Link>
                    <ThemeToggle />
                </div>
            </div>

            {/* Десктопная шапка */}
            <div className="hidden lg:block bg-white  border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <Header />
                </div>
            </div>

            <div className="min-h-screen bg-white">
                <div className="flex">
                    {/* Сайдбар для десктопов */}
                    <div className="hidden md:block w-64 bg-white border-r border-gray-200 min-h-screen fixed left-0 top-0 bottom-0">
                        <DesktopSidebar />
                    </div>

                    {/* Основной контент */}
                    <main className="flex-1 md:ml-64 min-w-0 bg-white">
                        {/* Заголовок "Главная" для десктопа */}
                        <div className="hidden lg:block border-b border-gray-200">
                            <div className="max-w-2xl mx-auto px-4 py-4 bg-white">
                                <h2 className="text-xl font-bold text-gray-900">Главная</h2>
                            </div>
                        </div>

                        {/* Контент с правильным центрированием */}
                        <div className="pb-20 md:pb-6">
                            <div className="max-w-2xl mx-auto px-4">
                                <Outlet />
                            </div>
                        </div>
                    </main>

                    {/* Правая панель */}
                    <div className="hidden xl:block w-80 bg-white border-l border-gray-200">
                        <div className="sticky top-0 p-6 space-y-6">
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <h3 className="font-bold text-gray-900 mb-3 text-lg">
                                    Что нового
                                </h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    Присоединяйтесь к разговору!
                                </p>
                                <button
                                    onClick={() => setIsOpenForm(true)}
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                                >
                                    Написать пост
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
                <MobileBottomBar />
            </div>

            <AddXitForm isOpen={isOpenForm} onClose={() => setIsOpenForm(false)} />
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
};