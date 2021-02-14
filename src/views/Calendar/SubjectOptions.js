import React, {useState} from "react";
import {Button} from "@material-ui/core";
import "./SubjectOptions.css";

export default function SubjectOptions({currDate, handleCloseModal}){
    const [chosenSubject, setChosenSubject] = useState("");

    return (
        <div className="subject-options">
            <div style={{height: "70%", width: "80%", display: "flex", flexWrap: "wrap", alignContent: "center",
                justifyContent: "center"}}>
                <div className="course" name="LEETCODE">
                    <h1>Datastructures and Algorithms</h1>
                </div>
                <div className="course" name="LSAT">
                    <h1>LSAT</h1>
                </div>
                <div className="course" name="MCAT">
                    <h1>MCAT</h1>
                </div>
                <div className="course" name="ANIME">
                    <h1>Anime</h1>
                </div>
            </div>
            <Button className="confirm-button" variant="contained" color="primary" onClick={()=>handleCloseModal()}>
                {"CONFIRM & SCHEDULE:  " + currDate.dateString}
            </Button>
        </div>
    )
}
