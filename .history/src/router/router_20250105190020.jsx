import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import SignIn from "../pages/SignIn/SignIn";
import Assignments from "../pages/Assignments/Assignments";
import PendingAssignments from "../pages/PendingAssignments/PendingAssignments";
import CreateAssignment from "../pages/CreateAssignment/CreateAssignment";
import MyAttemptedAssignment from "../pages/MyAttem/MyAttemptedAssignment";
import UpdateAssignment from "../pages/UpdateAssignment/UpdateAssignment";
import AssignmentDetails from "../pages/AssignmentDetails/AssignmentDetails";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <h2>404: Page not found</h2>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: 'register',
            element: <Register></Register>
        },
        {
          path: 'signIn',
          element: <SignIn></SignIn>
        },
        {
          path: 'Assignments',
          element: <Assignments></Assignments>
        },
        {
          path: 'PendingAssignments',
          element: <PendingAssignments></PendingAssignments>
        },
        {
          path: 'CreateAssignment',
          element: <CreateAssignment></CreateAssignment>
        },
        {
          path: 'MyAttemptedAssignment',
          element: <MyAttemptedAssignment></MyAttemptedAssignment>
        },
        {
          path: 'UpdateAssignment/:id',
          element: <UpdateAssignment></UpdateAssignment>
        },
        {
          path: 'assignment/:id',
          element: <AssignmentDetails></AssignmentDetails>
        }
      ]
    },
  ]);

  export default  router;