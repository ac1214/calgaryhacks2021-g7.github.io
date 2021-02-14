import React from "react";
import {Button} from "@material-ui/core";

export default function SubjectOptions({currDate, handleCloseModal}){
    return (
        <div style={{
            width: "500px",
            height: "500px"
        }}>
            <Button className="confirm-button" variant="contained" color="primary" onClick={()=>handleCloseModal()}>
                {"CONFIRM & SCHEDULE:  " + currDate.dateString}
            </Button>
        </div>
    )
}