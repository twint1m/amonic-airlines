// import { createBrowserRouter } from "react-router-dom";
// import AddUser from "../components/pages/AddUser";
// import EditUser from "../components/pages/EditUser";
// import UserActivity from "../components/pages/UserActivity";
// import UsersInfo from "../components/pages/UsersInfo";
// import Register from '../components/pages/Register'
// import App from "../App";
//
// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <App />,
//         children: [
//             {
//                 path: "users",
//                 element: <App/>,
//                 children: [
//                     {
//                         path: "add",
//                         element: <AddUser />,
//                     },
//                     {
//                         // path: "edit/:id",
//                         path: "edit",
//                         element: <EditUser />,
//                     },
//                     {
//                         path: "activity",
//                         element: <UserActivity />,
//                     },
//                     {
//                         path: "info",
//                         element: <UsersInfo />,
//                     },
//                 ],
//             },
//             {
//                 path: "register",
//                 element: <Register />,
//             },
//         ],
//     },
// ]);
//
// export default router;



import { createBrowserRouter } from "react-router-dom";
import AddUser from "../components/pages/AddUser";
import EditUser from "../components/pages/EditUser";
import UserActivity from "../components/pages/UserActivity";
import UsersInfo from "../components/pages/UsersInfo";
import Register from '../components/pages/Register'
import App from "../App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "users",
                children: [
                    {
                        path: "add",
                        element: <AddUser />,
                    },
                    {
                        // path: "edit/:id",
                        path: "edit",
                        element: <EditUser />,
                    },
                    {
                        path: "activity",
                        element: <UserActivity />,
                    },
                    {
                        path: "info",
                        element: <UsersInfo />,
                    },
                ],
            },
            {
                path: "register",
                element: <Register />,
            },
        ],
    },
]);

export default router;
