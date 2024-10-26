import { Fragment, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from '~/components/Layout';
import axios from './utils/axios.custiomize';
import { useContext } from 'react';
import { AuthContext } from '~/components/Context/auth.context';
import { Spin } from 'antd';

function App() {
    const { setAuth, appLoading, setAppLoading } = useContext(AuthContext);

    useEffect(() => {
        const fetchAccount = async () => {
            setAppLoading(true);
            const res = await axios.get(`/v1/api/account`);
            if (res && !res.message) {
                setAuth({
                    isAuthenticated: true,
                    user: {
                        email: res.email,
                        name: res.name,
                        role: res.role,
                    },
                });
            }
            setAppLoading(false);
        };

        fetchAccount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="App">
            {appLoading === true ? (
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <Spin size='large'/>
                </div>
            ) : (
                <>
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <>
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        </>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </>
            )}
        </div>
    );
}

export default App;
