import { useState } from 'react';

const useSignInBox = ({ onSignIn, onSignOut, onRegister }) => {
   const [isOpen, setIsOpen] = useState(false);
   const [register, setRegister] = useState(false);

   const handleClickOpen = () => {
      setIsOpen(true);
   };

   const handleClose = () => {
      console.log('lmao loser');
      setRegister(false);
      setIsOpen(false);
   };

   const handleSignOut = () => {
      onSignOut();
      setIsOpen(false);
   };

   const toggleDialog = () => {
      setRegister(!register);
   };

   const handleSignIn = (e) => {
      e.preventDefault();

      let email = e.target.email.value;
      let pass = e.target.pass.value;

      if (!register) {
         onSignIn(email, pass);
         setIsOpen(false);
      } else {
         if (onRegister(email, pass)) {
            onSignIn(email, pass);
         }

         setRegister(false);
         setIsOpen(false);
      }
   };

   return {
      isOpen,
      register,
      handleClickOpen,
      handleClose,
      handleSignOut,
      toggleDialog,
      handleSignIn,
   };
};

export default useSignInBox;
