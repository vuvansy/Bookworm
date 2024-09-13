import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import ContactPage from "./contact";
import BookPage from "./book";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/Home";
import RegisterPage from "./pages/register";
import { callFetchAccount } from "./services/api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice";
import Loading from "./components/Loading";
import NotFound from "./components/NotFound";
import AdminPage from "./pages/admin";
import ProtectedRoute from "./components/ProtectedRoute";
import LayoutAdmin from "./components/Admin/LayoutAdmin";
import "./styles/reset.scss";

const Layout = () => {
    return (
        <div className="layout-app">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: "contact",
                element: <ContactPage />,
            },
            {
                path: "book",
                element: <BookPage />,
            },
        ],
    },

    {
        path: "/admin",
        element: <LayoutAdmin />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: (
                    <ProtectedRoute>
                        <AdminPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "user",
                element: <ContactPage />,
            },
            {
                path: "book",
                element: <BookPage />,
            },
        ],
    },

    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
]);

export default function App() {
    const dispatch = useDispatch();

    const isLoading = useSelector((state) => state.account.isLoading);

    const getAccount = async () => {
        if (
            window.location.pathname === "/login" ||
            window.location.pathname === "/register"
        )
            return; //Không gọi API

        const res = await callFetchAccount();
        if (res && res.data) {
            dispatch(doGetAccountAction(res.data));
        }
    };

    useEffect(() => {
        getAccount();
    }, []);

    return (
        <>
            {isLoading === true ||
            window.location.pathname === "/login" ||
            window.location.pathname === "/register" ||
            window.location.pathname === "/" ? (
                <RouterProvider router={router} />
            ) : (
                <Loading />
            )}
        </>
    );
}
