import React, { useEffect, useRef, useState } from "react";
import GridItem from "components/Grid/GridItem.js";
import Peer from "simple-peer";
import io from "socket.io-client";
import Button from "@material-ui/core/Button";
import { CodeEditor } from "../../components/CodeEditor/CodeEditor";
import Grid from "@material-ui/core/Grid";
import { Paper, Typography } from "@material-ui/core";
import Doc from "components/Doc/Doc";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactMarkdown from 'react-markdown'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: "auto",
        padding: 10
    },
    whiteboard: {
        height: "auto",
        padding: 10,
        minHeight: 100
    },
    codeEditor: {
        height: "auto",
        padding: 10,
        minHeight: 250
    },
    console: {
        height: "auto",
        padding: 10,
        minHeight: 50,
        marginBottom: 10
    }
}));

export default function Room() {
    const classes = useStyles();

    const [yourID, setYourID] = useState("");
    const [users, setUsers] = useState({});
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [open, setOpen] = React.useState(true);
    const [roomcode, setRoomCode] = React.useState("");
    const [questionprompt, setQuestionPropmpt] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        console.log(roomcode)
        // setOpen(false);
    };


    const handleEnter = () => {
        console.log(roomcode)
        setQuestionPropmpt("## Question 1  \n**Prompt:**  \nGiven a non-negative integer num, return the number of steps to reduce it to zero.\n If the current number is even, you have to divide it by 2, otherwise, you have to subtract 1 from it.\n\n``` \nExample 1:\nInput: num = 14\nOutput: 6\nExplanation: \nStep 1) 14 is even; divide by 2 and obtain 7. \nStep 2) 7 is odd; subtract 1 and obtain 6.\nStep 3) 6 is even; divide by 2 and obtain 3. \nStep 4) 3 is odd; subtract 1 and obtain 2. \nStep 5) 2 is even; divide by 2 and obtain 1. \nStep 6) 1 is odd; subtract 1 and obtain 0.\n```\n\n```\nExample 2:\nInput: num = 8\nOutput: 4\nExplanation: \nStep 1) 8 is even; divide by 2 and obtain 4. \nStep 2) 4 is even; divide by 2 and obtain 2. \nStep 3) 2 is even; divide by 2 and obtain 1. \nStep 4) 1 is odd; subtract 1 and obtain 0.\n```\n\n```\nExample 3:\nInput: num = 123\nOutput: 12\n```  \n\n**Answer:**  \n```python\ndef numberOfSteps (self, num):\n    steps = 0 # We need to keep track of how many steps this takes.\n    while num > 0: # Remember, we're taking steps until num is 0.\n        if num % 2 == 0: # Modulus operator tells us num is *even*.\n            num = num // 2 # So we divide num by 2.\n        else: # Otherwise, num must be *odd*.\n            num = num - 1 # So we subtract 1 from num.\n        steps = steps + 1 # We *always* increment steps by 1.\n    return steps # And at the end, the answer is in steps so we return it.\n```  \n***\n## Question 2  \n**Prompt:**  \nGiven an array of integers ```nums``` and an integer ```target```, return indices \nof the two numbers such that they add up to ```target```.\n\nYou may assume that each input would have **exactly one solution**, and you \nmay not use the same element twice.\n\nYou can return the answer in any order.\n\nExample 1:\n```\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nOutput: Because nums[0] + nums[1] == 9, we return [0, 1].\n```\n\nExample 2: \n```\nInput: nums = [3,2,4], target = 6\nOutput: [1,2]\n```\n\nExample 3:\n```\nInput: nums = [3,3], target = 6\nOutput: [0,1]\n```  \n\n**Answer:**  \n```java\npublic int[] twoSum(int[] nums, int target) {\n    Map<Integer, Integer> map = new HashMap<>();\n    for (int i = 0; i < nums.length; i++) {\n        int complement = target - nums[i];\n        if (map.containsKey(complement)) {\n            return new int[] { map.get(complement), i };\n        }\n        map.put(nums[i], i);\n    }\n    throw new IllegalArgumentException(\"No two sum solution\");\n}\n```  \n***\n## Question 3  \n**Prompt:**  \nGiven a non-negative integer num, return the number of steps to reduce it to zero.\n If the current number is even, you have to divide it by 2, otherwise, you have to subtract 1 from it.\n\n``` \nExample 1:\nInput: num = 14\nOutput: 6\nExplanation: \nStep 1) 14 is even; divide by 2 and obtain 7. \nStep 2) 7 is odd; subtract 1 and obtain 6.\nStep 3) 6 is even; divide by 2 and obtain 3. \nStep 4) 3 is odd; subtract 1 and obtain 2. \nStep 5) 2 is even; divide by 2 and obtain 1. \nStep 6) 1 is odd; subtract 1 and obtain 0.\n```\n\n```\nExample 2:\nInput: num = 8\nOutput: 4\nExplanation: \nStep 1) 8 is even; divide by 2 and obtain 4. \nStep 2) 4 is even; divide by 2 and obtain 2. \nStep 3) 2 is even; divide by 2 and obtain 1. \nStep 4) 1 is odd; subtract 1 and obtain 0.\n```\n\n```\nExample 3:\nInput: num = 123\nOutput: 12\n```  \n\n**Answer:**  \n```python\ndef numberOfSteps (self, num):\n    steps = 0 # We need to keep track of how many steps this takes.\n    while num > 0: # Remember, we're taking steps until num is 0.\n        if num % 2 == 0: # Modulus operator tells us num is *even*.\n            num = num // 2 # So we divide num by 2.\n        else: # Otherwise, num must be *odd*.\n            num = num - 1 # So we subtract 1 from num.\n        steps = steps + 1 # We *always* increment steps by 1.\n    return steps # And at the end, the answer is in steps so we return it.\n```  \n")
        setOpen(false);
    };

    const userVideo = useRef();
    const partnerVideo = useRef();
    const socket = useRef();

    useEffect(() => {
        socket.current = io(
            "https://video-chat-dot-operating-land-304706.wm.r.appspot.com",
            {
                withCredentials: true,
            }
        );
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: false })
            .then((stream) => {
                setStream(stream);
                if (userVideo.current) {
                    userVideo.current.srcObject = stream;
                }
            });

        socket.current.on("yourID", (id) => {
            setYourID(id);
        });

        socket.current.on("allUsers", (users) => {
            setUsers(users);
        });

        socket.current.on("hey", (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setCallerSignal(data.signal);
        });
    }, []);

    const callPeer = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        });

        peer.on("signal", (data) => {
            socket.current.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: yourID,
            });
        });

        peer.on("stream", (stream) => {
            if (partnerVideo.current) {
                partnerVideo.current.srcObject = stream;
            }
        });

        socket.current.on("callAccepted", (signal) => {
            setCallAccepted(true);
            setReceivingCall(false);
            peer.signal(signal);
        });
    };
    const acceptCall = () => {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        });
        peer.on("signal", (data) => {
            socket.current.emit("acceptCall", { signal: data, to: caller });
        });

        peer.on("stream", (stream) => {
            partnerVideo.current.srcObject = stream;
        });

        peer.signal(callerSignal);
        incomingCall = null;
        setReceivingCall(false);
    };

    let UserVideo;
    if (stream) {
        UserVideo = <video ref={userVideo} autoPlay={true} height={150} />;
    }

    let PartnerVideo;
    if (callAccepted) {
        PartnerVideo = <video ref={partnerVideo} autoPlay={true} height={300} />;
    }

    let incomingCall;
    if (receivingCall) {
        incomingCall = (
            <>
                <GridItem xs={12} sm={12} md={5}><Typography component={"h3"}>{caller} is asking to join
                    you.</Typography></GridItem>
                <GridItem xs={12} sm={12} md={5}>
                    <button onClick={acceptCall}>Accept</button>
                </GridItem>
            </>
        );
    }

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12} md={5}>
                <Grid container justify="center" spacing={2}>
                    <Grid item>
                        <Typography variant={"h5"} component={"h1"}>
                            Prompt
                        </Typography>
                        <Paper variant="outlined" style={{ maxWidth: "600px" }} className={classes.paper}>
                            <ReactMarkdown source={questionprompt} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>

                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        {incomingCall}
                    </Grid>
                    {Object.keys(users).map((key) => {
                        if (key === yourID) {
                            return null;
                        }
                        return (
                            <Button
                                variant={"outlined"}
                                color={"primary"}
                                onClick={() => callPeer(key)}
                            >
                                JOIN {key}
                            </Button>
                        );
                    })}
                </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
                <Grid container direction={"column"}>
                    <Grid item>
                        <Typography variant={"h5"} component={"h3"}>
                            Code Editor
                        </Typography>
                        <Paper variant="outlined" className={classes.codeEditor}>
                            <CodeEditor />
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Typography variant={"h5"} component={"h1"}>Console</Typography>
                        <Paper variant="outlined" className={classes.console}></Paper>
                        <Typography variant={"h5"} component={"h1"}>Whiteboard</Typography>
                        <Paper variant="outlined" className={classes.whiteboard}>
                            <Doc />
                        </Paper>
                    </Grid>
                    <Grid item>
                        {PartnerVideo}
                        {UserVideo}
                    </Grid>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Enter Session Code</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter session code to start learning with classmates!
          </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="sess"
                        label="Session Code"
                        fullWidth
                        onChange={event => {
                            const { value } = event.target;
                            setRoomCode(value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        <a style={{ display: "table-cell", color: "#3f51b5" }} href="./table" >Cancel</a>
                    </Button>
                    <Button onClick={handleEnter} color="primary">
                        Enter
          </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}
