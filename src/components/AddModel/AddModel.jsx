import React from 'react';
import {
   IconButton,
   Switch,
   Typography,
   Button,
   TextField,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
} from '@mui/material';
import { Box } from '@mui/system';
import { Add } from '@mui/icons-material';
import useAddModel from './useAddModel';

const AddModel = () => {
   const {
      isOpen,
      isUrgent,
      handleClickOpen,
      handleClose,
      toggleUrgent,
      handleSubmit,
   } = useAddModel();

   return (
      <div>
         <IconButton onClick={handleClickOpen} style={{ color: 'white' }}>
            <Add />
         </IconButton>

         <Dialog open={isOpen} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
               <DialogTitle>Add A Task</DialogTitle>
               <DialogContent>
                  <Box sx={{ mb: 5, mt: 5 }} direction="col">
                     <TextField
                        xs={3}
                        label="Title"
                        variant="outlined"
                        name="title"
                     />
                     <TextField
                        xs={6}
                        multiline
                        variant="outlined"
                        label="Info"
                        name="text"
                     />
                  </Box>

                  <Box direction="row">
                     <TextField
                        id="date"
                        name="date"
                        label="Due Date"
                        type="date"
                        sx={{ width: 220, p: 2 }}
                        size={'small'}
                        InputLabelProps={{
                           shrink: true,
                        }}
                     />
                     <Box>
                        <Switch
                           autoFocus
                           checked={isUrgent}
                           onChange={(_, checked) => {
                              toggleUrgent(checked);
                           }}
                        >
                           urgent
                        </Switch>
                        <Typography>
                           This Task Is {isUrgent ? 'Urgent' : 'Not Urgent'}{' '}
                        </Typography>
                     </Box>
                  </Box>
               </DialogContent>
               <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button color="success" type="submit">
                     Add
                  </Button>
               </DialogActions>
            </form>
         </Dialog>
      </div>
   );
};

export default AddModel;
