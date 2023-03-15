import React from 'react';
import SignInBox from '../SignInBox';
import AddModel from '../AddModel';
import useAuth from '../../contexts/auth/useAuth';
import {
   Button,
   Box,
   CssBaseline,
   AppBar,
   Toolbar,
   Stack,
} from '@mui/material';
import { Link } from 'react-router-dom';

const TopBar = () => {
   const { handleSignOut, handleSignIn, registerUser } = useAuth();
   return (
      <Box sx={{ flexGrow: 1 }}>
         <CssBaseline />
         <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
         >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
               <Stack direction="row">
                  <SignInBox
                     onSignIn={handleSignIn}
                     onSignOut={handleSignOut}
                     onRegister={registerUser}
                  />

                  <Link to="./" style={{ textDecoration: 'none' }}>
                     <Button variant="contained" sx={{ p: 2, m: 2 }}>
                        See Tasks
                     </Button>
                  </Link>
                  <Link to="./doneTasks" style={{ textDecoration: 'none' }}>
                     <Button variant="contained" sx={{ p: 2, m: 2 }}>
                        Completed Tasks
                     </Button>
                  </Link>
               </Stack>
               <AddModel />
            </Toolbar>
         </AppBar>
         <Box sx={{ flexGrow: 1 }}>
            <Toolbar />
         </Box>
      </Box>
   );
};

export default TopBar;
