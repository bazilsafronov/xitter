import '../index.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from "react-redux";
import store from "../store";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import XitsList from "../entities/xit/ui/XitsList";
import XitPage from "../pages/xit/XitPage";
import {AuthForm} from "../features/auth/ui/AuthForm";
import NotFound from "../pages/404";
import {Layout} from "../shared/ui/Layout/Layout";
import FeedPage from "../pages/FeedPage";
import {ProfilePage} from "../pages/profile/ProfilePage";
import App from "./App";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path={'/login'} element={<AuthForm/>}/>
                    <Route element={<App />} >
                        <Route element={<Layout />}>
                            <Route index element={<FeedPage />}/>
                            <Route path='xit/:id' element={<XitPage/>}/>
                            <Route path="/me" element={<ProfilePage />} />
                            <Route path="/explore" element={<div>Explore</div>} />
                            <Route path="/notifications" element={<div>Notifications</div>} />
                            <Route path="/messages" element={<div>Messages</div>} />
                            <Route path="*" element={<NotFound/>}/>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </StrictMode>
);

