import React, {useContext, useEffect, useRef, useState} from "react";
import GridItem from "components/Grid/GridItem.js";
import Peer from "simple-peer";
import io from "socket.io-client";
import Button from "@material-ui/core/Button";
import {CodeEditor} from "../../components/CodeEditor/CodeEditor";
import Grid from "@material-ui/core/Grid";
import {Box, FormLabel, Paper, RadioGroup, Typography} from "@material-ui/core";
import Doc from "components/Doc/Doc";
import makeStyles from "@material-ui/core/styles/makeStyles";

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
        minHeight: 150
    },
    codeEditor: {
        height: "auto",
        padding: 10,
        minHeight: 400
    },
    console: {
        height: "auto",
        padding: 10,
        minHeight: 100,
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
            .getUserMedia({video: true, audio: false})
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
            socket.current.emit("acceptCall", {signal: data, to: caller});
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
        UserVideo = <video ref={userVideo} autoPlay={true} height={150}/>;
    }

    let PartnerVideo;
    if (callAccepted) {
        PartnerVideo = <video ref={partnerVideo} autoPlay={true} height={300}/>;
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
        <Box>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12} md={5}>
                    <Grid container justify="center" spacing={2}>
                        <Grid item>
                            <Typography variant={"h5"} component={"h1"}>
                                Question 759
                            </Typography>
                            <Paper className={classes.paper}>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque enim
                                    et reprehenderit voluptatum? Amet, cupiditate dolorum ea
                                    exercitationem expedita id iste minus officia officiis quibusdam
                                    saepe sed tempore, temporibus tenetur.
                                    <br/>
                                    <br/>
                                    <br/>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque enim
                                    et reprehenderit voluptatum? Amet, cupiditate dolorum ea
                                    exercitationem expedita id iste minus officia officiis quibusdam
                                    saepe sed tempore, temporibus tenetur. Lorem ipsum dolor sit amet,
                                    consectetur adipisicing elit. Eaque enim et reprehenderit
                                    voluptatum? Amet, cupiditate dolorum ea exercitationem expedita id
                                    iste minus officia officiis quibusdam saepe sed tempore, temporibus
                                    tenetur.
                                </p>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <Typography variant={"h5"} component={"h1"}>Whiteboard</Typography>
                            <Paper className={classes.whiteboard}>
                                <Doc/>
                            </Paper>
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
                            <Paper className={classes.codeEditor}>
                                <CodeEditor/>
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Typography variant={"h5"} component={"h1"}>Console</Typography>
                            <Paper className={classes.console}></Paper>
                        </Grid>
                        <Grid item>
                            {PartnerVideo}
                            {UserVideo}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
