import React from 'react';
import moment from 'moment';
import {
   Card,
   Typography,
   CardActions,
   CardContent,
   Stack,
   Button,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Task = ({ task, onUpdate, onDelete }) => {
   const daysTilDue = (date) => {
      let current = new Date();

      let today = moment(current, 'YYYY-MM-DD');
      let due = moment(date, 'YYYY-MM-DD');

      let result = due.diff(today, 'days');

      return result;
   };

   return task.complete ? (
      <Card>
         <CardContent>
            <Stack direction="row" justifyContent={'center'}>
               <Typography variant="h5" sx={{ color: 'blue' }} gutterBottom>
                  {task.title}
               </Typography>
            </Stack>

            <Typography variant="subtitle" gutterBottom sx={{ p: 1, mb: 1 }}>
               {task.body}
            </Typography>
            <br></br>
            <Typography
               variant="subtitle2"
               sx={{ mt: 3, mb: 0, textAlign: 'center' }}
            >
               due in {daysTilDue(task.due)} days
            </Typography>
         </CardContent>

         <CardActions>
            <Button
               variant="outlined"
               size="small"
               color="success"
               onClick={onUpdate}
            >
               done
            </Button>
            <Button
               variant="outlined"
               size="small"
               color="error"
               onClick={onDelete}
            >
               delete
            </Button>

            {task.urgent ? (
               <ErrorOutlineIcon sx={{ m: 1 }} color="primary" />
            ) : (
               ''
            )}
         </CardActions>
      </Card>
   ) : (
      <Card>
         <CardContent>
            <Typography
               variant="h5"
               sx={{ textDecoration: 'underline' }}
               gutterBottom
            >
               {task.title}
            </Typography>
            <br></br>
         </CardContent>
         <CardActions>
            <Button variant="outlined" color="error" onClick={onDelete}>
               delete
            </Button>
            <Button variant="outlined" color="success" onClick={onUpdate}>
               undone
            </Button>
         </CardActions>
      </Card>
   );
};

export default Task;
