import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import SignIn from "../pages/SignIn/SignIn";
import Assignments from "../pages/Assignments/Assignments";
import PendingAssignments from "../pages/PendingAssignments/PendingAssignments";
import CreateAssignment from "../pages/CreateAssignment/CreateAssignment";

import UpdateAssignment from "../pages/UpdateAssignment/UpdateAssignment";
import AssignmentDetails from "../pages/AssignmentDetails/AssignmentDetails";
import GiveMark from "../pages/GiveMark";
import MyAttemptedAssignments from "../pages/MyAttem/MyAttemptedAssignments";
import PrivateRoute from "./PrivateRoute";



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
          element:(
            <PrivateRoute element ={ <PendingAssignments></PendingAssignments>} />
          )
        },
        {
          path: 'CreateAssignment',
          element: <CreateAssignment></CreateAssignment>
        },
        {
          path: 'MyAttemptedAssignments',
          element: <MyAttemptedAssignments></MyAttemptedAssignments>
        },
        {
          path: 'UpdateAssignment/:id',
          element: <UpdateAssignment></UpdateAssignment>
        },
        {
          path: 'assignment/:id',
          element: <AssignmentDetails></AssignmentDetails>
        },        
        {
          path: 'give-mark/:submissionId',
          element: <GiveMark></GiveMark>
        }        
      ]
    },
  ]);

  export default  router;