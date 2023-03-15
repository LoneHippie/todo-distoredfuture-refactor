import React from 'react';
import { Typography } from '@mui/material';
import Layout from '../components/Layout';

const UnauthenticatedView = () => {
   return (
      <Layout>
         <Typography variant="h1" sx={{ m: 4 }}>
            Not signed In
         </Typography>
         <Typography variant="p1" sx={{ m: 4 }}>
            sucks to be you...
         </Typography>
      </Layout>
   );
};

export default UnauthenticatedView;
