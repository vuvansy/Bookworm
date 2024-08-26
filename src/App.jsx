import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import ContactPage from "./contact";
import BookPage from "./book";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/Home";
import RegisterPage from "./pages/register";

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
        errorElement: <div>404 Trang không tồn tại</div>,
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
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
]);

export default function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}
