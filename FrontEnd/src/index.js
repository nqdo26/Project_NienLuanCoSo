import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './components/GlobalStyles';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import User from '~/pages/User';
import { AuthWrapper } from './components/Context/auth.context';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },

            {
                path: 'user',
                element: <User />,
            },
        ],
    },
    {
        path: 'register',
        element: <Register />,
    },
    {
        path: 'login',
        element: <Login />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyles>
            <AuthWrapper>
                <RouterProvider router={router} />
            </AuthWrapper>
        </GlobalStyles>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
