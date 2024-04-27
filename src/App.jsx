import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootNavigation from "./pages/layouts/RootNavigation.jsx";
import WrongRoute from "./pages/Errors/WrongRoute.jsx";
import BuildLayout from "./pages/layouts/BuildLayout.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import UserResumes from "./pages/UserResumes.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "react-toastify/dist/ReactToastify.css";
import MainSpinner from "./components/MainSpinner.jsx";
import Information from "./pages/Information.jsx";
import Protected from "./components/Protected.jsx";
import ResumeContextProvider from "./store/ResumeContext.jsx";
import RenderForms from "./components/RenderForms.jsx";
import Sample from './components/templates/Sample.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootNavigation />,
    errorElement: <WrongRoute />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "templates",
        element: <BuildLayout />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "templates/:templateId/:resumeId/:resumeName/build/:detail",
        element: (
          <Protected>
            <Information />
          </Protected>
        ),
        children:[
          {
            path:'',
            element:<RenderForms/>
          }
        ]
      },
      {
        path: "/:templateId/:resumeId/preview",
        element: (
          <Protected>
            <Sample/>
          </Protected>
        ),
      },
      {
        path: "/myResumeCollection",
        element: (
          <Protected>
            <UserResumes />
          </Protected>
        ),
      },
    ],
  },
]);
const Client = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={Client}>
      <Suspense fallback={<MainSpinner />}>
        <ResumeContextProvider>
          <RouterProvider router={router} />
        </ResumeContextProvider>
      </Suspense>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
