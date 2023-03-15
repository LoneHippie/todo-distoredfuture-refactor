import React from 'react';
import useAuth from '../contexts/auth/useAuth';
import Task from '../components/Task';
import { Grid } from '@mui/material';
import Layout from '../components/Layout';

const TasksView = () => {
   const { data, handleDone, handleDelete } = useAuth();
   return (
      <Layout>
         <div className="App">
            <>
               <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  spacing={0}
                  justifyContent={'space-between'}
                  style={{ minHeight: '100vh', padding: 150 }}
               >
                  {data?.map((task) => {
                     return (
                        !task.complete && (
                           <div key={task.id}>
                              <Grid
                                 item
                                 xs={4}
                                 sx={{
                                    maxWidth: 400,
                                    minWidth: 300,
                                    padding: 4,
                                 }}
                              >
                                 <Task
                                    task={task}
                                    onUpdate={() => handleDone(task)}
                                    onDelete={() => handleDelete(task)}
                                 />
                              </Grid>
                           </div>
                        )
                     );
                  })}
               </Grid>
            </>
         </div>
      </Layout>
   );
};

export default TasksView;
