import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PersonIcon from '@mui/icons-material/Person';
import { IconButton } from '@mui/material';
import useSignInBox from "./useSignInBox";

const SignInBox = ({ onSignIn, onSignOut, onRegister }) => {
   const {
      isOpen,
      register,
      handleClickOpen,
      handleClose,
      handleSignOut,
      toggleDialog,
      handleSignIn,
   } = useSignInBox({ onSignIn, onSignOut, onRegister });

   return (
      <div>
         <IconButton
            onClick={handleClickOpen}
            style={{ color: 'white', padding: 2 }}
         >
            <PersonIcon fontSize="large" sx={{ mt: 3 }} />
         </IconButton>

         <Dialog open={isOpen} onClose={handleClose}>
            <form onSubmit={handleSignIn}>
               <DialogTitle>
                  {register ? 'Register here' : 'Papers, please'}
               </DialogTitle>
               <DialogContent>
                  <DialogContentText>
                     {register ? 'make an account' : 'sign in ya dummy'}
                  </DialogContentText>
                  <TextField
                     margin="dense"
                     id="email"
                     label="Email Address"
                     type="email"
                     fullWidth
                     variant="standard"
                  />

                  <TextField
                     margin="dense"
                     id="pass"
                     label="Password"
                     type="password"
                     fullWidth
                     variant="standard"
                  />
               </DialogContent>
               <DialogActions>
                  {register && (
                     <Button color="error" onClick={handleSignOut}>
                        sign out
                     </Button>
                  )}
                  <Button color="success" onClick={toggleDialog}>
                     {register ? 'login' : 'register'}
                  </Button>
                  <div style={{ flex: '1 0 0' }}></div>
                  <Button onClick={handleClose}>done</Button>
                  <Button type="submit">
                     {register ? 'Register' : 'Sign In'}
                  </Button>
               </DialogActions>
            </form>
         </Dialog>
      </div>
   );
};

export default SignInBox;
