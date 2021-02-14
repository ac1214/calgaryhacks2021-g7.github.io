import React, { useState } from "react";
import { Button } from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import "./SubjectOptions.css";

const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export default function SubjectOptions({ currDate, subhandlemodalclose }) {
    const classes = useStyles();
    const [subject, setSubject] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
        setSubject(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    return (
        <div className="subject-options">
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Subject</InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={subject}
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"MCAT"}>MCAT</MenuItem>
                    <MenuItem value={"LSAT"}>LSAT</MenuItem>
                    <MenuItem value={"Datastructures and Algorithms"}>Datastructures and Algorithms</MenuItem>
                    <MenuItem value={"Anime"}>Anime</MenuItem>
                </Select>
            </FormControl>
            <Button className="confirm-button" variant="contained" color="primary" onClick={() => {
                                                                                                    subhandlemodalclose(subject)}}>
                {"CONFIRM & SCHEDULE:  " + currDate}
            </Button>
        </div>
    )
}
