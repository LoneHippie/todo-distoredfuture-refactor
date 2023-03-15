import { useState, useEffect } from 'react';
import { db, auth } from '../../firebaseconfig';
import {
   collection,
   getDocs,
   setDoc,
   doc,
   deleteDoc,
   updateDoc,
   addDoc,
} from '@firebase/firestore';
import {
   signInWithEmailAndPassword,
   createUserWithEmailAndPassword,
   signOut,
} from '@firebase/auth';

const useAuth = () => {
   const [data, setData] = useState([]);
   const [user, setUser] = useState(null);
   const [route, setRoute] = useState(null);
   const [collectionRef, setRef] = useState(null);

   const handleResetData = async () => {
      let newData = await getDocs(collectionRef);
      setData(newData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log('reset data in app');
   };

   const handleDone = async (todo) => {
      const task = doc(db, route, todo.id);
      await updateDoc(task, {
         complete: !todo.complete,
      });
      handleResetData();
   };

   const handleSignOut = () => {
      if (user) {
         console.log('good bye ' + user.email);

         signOut(auth);
         setUser(null);
         setRef(null);
         setRoute(null);
         setData(null);
      } else {
         console.log('nobody is signed in');
      }
   };

   const handleDelete = async (todo) => {
      const task = doc(db, route, todo.id);
      await deleteDoc(task);

      handleResetData();
   };

   const handleSignIn = async (email, pass) => {
      if (user) {
         console.log('signed out ', user.email);
         signOut(auth);
      }

      signInWithEmailAndPassword(auth, email, pass)
         .then((userCreds) => {
            setUser(userCreds.user);

            let r = `users/${userCreds.user.uid}/tasks`;

            if (userCreds.user.email === 'simchal97@gmail.com') r = 'tasks';

            setRoute(r);

            let ref = collection(db, r);
            setRef(ref);
         })
         .catch(() => {
            console.log('get a real account asshole');
         })
         .finally(handleResetData);
   };

   const registerUser = (email, pass) => {
      let res;
      createUserWithEmailAndPassword(auth, email, pass)
         .then((userCreds) => {
            addCollection(userCreds.user);
            res = true;
         })
         .catch((err) => {
            console.log('fucked up making an account');
            console.log(err);
            res = false;
         });
      return res;
   };

   const addCollection = async (_user) => {
      let helloBox = {
         title: `hello ${_user.email}`,
         body: 'add tasks to get started',
         urgent: true,
         complete: false,
         due: '',
      };

      const usersRef = collection(db, 'users');

      await addDoc(usersRef, {
         id: _user.uid,
         email: _user.email,
      });

      const tasksRef = collection(db, `users/${_user.uid}/tasks`);

      await addDoc(tasksRef, {
         data: helloBox,
      });
   };

   const addToTasks = async (_title, _text, _due, _urgent) => {
      let tasks = collection(db, route);

      await setDoc(doc(tasks, _title), {
         title: _title,
         complete: false,
         urgent: _urgent,
         body: _text,
         due: _due,
      });
   };

   useEffect(() => {
      auth.onAuthStateChanged((_user) => {
         setUser(_user);
         if (_user) {
            let r = `users/${_user.uid}/tasks`;
            if (_user.email === 'simchal97@gmail.com') r = 'tasks';

            setRoute(r);

            let ref = collection(db, r);
            setRef(ref);
         }
      });
      console.log(auth);

      handleResetData();
   }, []);

   useEffect(() => {
      if (user) {
         console.log('signed in ', user.email);
         setRoute(`users/${user.uid}/tasks`);
         if (user.email === 'simchal97@gmail.com') setRoute(`tasks`);
         handleResetData();
         console.log(auth);
      }
   }, [user]);

   return {
      user,
      data,
      route,
      collectionRef,
      handleDone,
      handleDelete,
      handleResetData,
      handleSignOut,
      handleSignIn,
      registerUser,
      addCollection,
      addToTasks,
   };
};

export default useAuth;
