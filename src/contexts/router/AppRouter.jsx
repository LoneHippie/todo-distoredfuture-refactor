import React from 'react';
import { Route, Routes } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import { TasksView, DoneTasksView, UnauthenticatedView } from '../../views';

const AppRouter = () => {
   const { user, data, handleDone, handleDelete } = useAuth();
   return (
      <Routes>
         {user ? (
            <>
               <Route
                  path="/"
                  element={
                     <TasksView
                        data={data}
                        onDone={handleDone}
                        onDelete={handleDelete}
                     />
                  }
               />
               <Route
                  path="/doneTasks"
                  element={
                     <DoneTasksView
                        data={data}
                        onDone={handleDone}
                        onDelete={handleDelete}
                     />
                  }
               />
            </>
         ) : (
            <Route path="/" element={<UnauthenticatedView />} />
         )}
      </Routes>
   );
};

export default AppRouter;
