import CreateForm from "../pages/CreateForm";
import FormList from "../pages/FormList";
import Login from "../pages/Login";
import SubmitForm from "../pages/SubmitForm";
import NotFound from "../pages/NotFound";


export const routesData = [
  {
    path: "/",
    element: <FormList/>,
    isPrivate: true,
  },
  {
    path: "/admin/create/form",
    element: <CreateForm />,
    isPrivate: true,
  },
  {
    path: "/admin/update/form/:slug",
    element: <CreateForm />,
    isPrivate: true,
  },
  {
    path: "/user/form/:slug",
    element: <SubmitForm />,
    isPrivate: false,
  },
  {
    path: "/login",
    element: <Login />,
    isPrivate: false,
    hide: true
  },
  {
    path: "*",
    element: <NotFound />,
    isPrivate: false,
  },
];
