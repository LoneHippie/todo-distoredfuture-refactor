import {useState} from 'react';
import useAuth from '../../contexts/auth/useAuth';

const useAddModel = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [isUrgent, setUrgent] = useState(!false);

   const { addToTasks, handleResetData } = useAuth();

   const handleClickOpen = () => {
      setIsOpen(true);
   };

   const handleClose = () => {
      setIsOpen(false);
   };

   const toggleUrgent = (newValue) => {
      setUrgent(newValue);
      console.log(newValue);
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      let title = e.target.elements.title.value;
      let text = e.target.elements.text.value;
      let date = e.target.elements.date.value;
      console.log(date);
      addToTasks(title, text, date, isUrgent);

      e.target.elements.title.value = '';
      e.target.elements.text.value = '';

      handleResetData();
      handleClose();
   };

   return {
      isOpen,
      isUrgent,
      handleClickOpen,
      handleClose,
      toggleUrgent,
      handleSubmit,
   };
};

export default useAddModel;
