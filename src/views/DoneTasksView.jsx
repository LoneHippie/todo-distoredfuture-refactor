import React from 'react';
import Task from '../components/Task';
import { Grid } from '@mui/material';
import Layout from '../components/Layout';

const DoneTasksView = ({ data, onDone, onDelete }) => {
   return (
      <Layout>
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
                  task.complete && (
                     <div key={task.id}>
                        <Grid
                           item
                           xs={4}
                           sx={{ maxWidth: 400, minWidth: 300, padding: 4 }}
                        >
                           <Task
                              task={task}
                              onUpdate={() => onDone(task)}
                              onDelete={() => onDelete(task)}
                           />
                        </Grid>
                     </div>
                  )
               );
            })}
         </Grid>
      </Layout>
   );
};

export default DoneTasksView;
