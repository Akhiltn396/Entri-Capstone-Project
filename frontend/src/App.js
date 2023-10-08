import logo from "./logo.svg";
import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Feature from "./pages/Feature/Feature";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "react-query";

function App() {
  const queryClient = new QueryClient();


  const Layout = () => {

    return (
      <div className="app">

        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>

      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/feature",
          element: <Feature />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    // {
    //   path:"*",
    //   element: <Login/>
    // }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
