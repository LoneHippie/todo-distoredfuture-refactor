import { Radio,Chip, Card,Grid, Box, CssBaseline, Typography, AppBar, Toolbar, TextField, Button, Avatar, ToggleButton, ToggleButtonGroup} from "@mui/material";
import Stack from '@mui/material/Stack';
import tasks from "./tasks.json";
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Form } from "react-router-dom";
import { useEffect, useState } from "react";
import {app} from "./firebaseconfig";
import { getFirestore } from "@firebase/firestore";
import { collection, doc, setDoc } from "@firebase/firestore"; 

/*

TODO add news tasks to firestore

*/ 


let isUrgent = false;

const db = getFirestore(app);



const getDate = () => {
    let current = new Date();

    return(current.getDate());
}

async function addToTasks(_title, _text, _due)
{
    let tasks = collection(db, "tasks");

    await setDoc( doc(tasks, _title), {
        title: _title, complete : false, urgent : false, body : _text, due : _due
    } );

}


export default function ToDo ( {title, text} ) {

    const [date, setDate] = useState(null);

    const handleToggleUrgent = (e) => {
        isUrgent = !isUrgent;
        e.target.color = (isUrgent)? "secondary" : "primary";
        console.log(e.target.color)
    }
    const addTaskFromForm = (e) => {
        console.log("working...");
        e.preventDefault();
        let title = e.target.elements.title.value;
        let text = e.target.elements.text.value;
        let date= e.target.elements.date.value;
        console.log(date);
        addToTasks(title, text, date)
    }
    useEffect( () =>{
        let d = getDate();
        setDate(d);
    }, [] );

    
    return(

        <form  onSubmit={addTaskFromForm}>
        <Card variant="outlined" sx={{ p:2 }}>

        <Stack direction="row" spacing={3}  >
            <TextField xs={3} label="Title" variant="outlined" name="title" />
            <TextField i xs={6} d={title} multiline variant="outlined" label={title} name="text" />


                <TextField
                    id="date"
                    name ="date"
                    label="Due Date"
                    type="date"
                    defaultValue = {date}
                    sx={{ width: 220, p:2}}
                    size={"small"}
                    InputLabelProps={{
                    shrink: true,
                }}  />

            <ToggleButtonGroup exclusive>
            <ToggleButton  >
                <ScheduleIcon color="primary"  onClick={handleToggleUrgent}/>
            </ToggleButton>

            </ToggleButtonGroup>

                <Button variant="outlined contained" type="submit"  >Add Task</Button>
                
           </Stack>
        </Card>

        </form>


    );
}

