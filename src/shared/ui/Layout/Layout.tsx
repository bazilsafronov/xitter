import {Outlet} from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import {useState} from "react";
import AddXitForm from "../../../features/xit/add-xit/ui/AddXitForm";

export const Layout = ({onComposeClick}) => {
    const [isOpenForm, setIsOpenForm] = useState(false);
    return(
        <>
            <div className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto flex">
                    <div className="w-64 fixed h-full border-r border-gray-100">
                        <Sidebar onComposeClick={() => setIsOpenForm(true)} />
                    </div>
                    <main className="flex-1 ml-64">
                        <Header />
                        <div className="border-b border-gray-200">
                            <div className="max-w-2xl mx-auto">
                                <Outlet />
                            </div>
                        </div>
                    </main>
                    <div className="w-80 hidden xl:block">
                        <div className="sticky top-0 p-4">
                            <div className="bg-gray-50 rounded-xl p-4">
                                <h3 className="font-bold text-gray-900 mb-3">Что нового?</h3>
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