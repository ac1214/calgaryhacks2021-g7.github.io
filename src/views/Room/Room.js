import React, {useEffect, useRef, useState} from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Peer from "simple-peer";
import io from "socket.io-client";
import Button from "@material-ui/core/Button";
import {CodeEditor} from "../../components/CodeEditor/CodeEditor";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";

export default function Room() {
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
        socket.current = io("https://video-chat-dot-operating-land-304706.wm.r.appspot.com", {
            withCredentials: true
        });
        console.log(socket.current)
        navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(stream => {
            setStream(stream);
            if(userVideo.current){
                userVideo.current.srcObject = stream;
            }
        })

        socket.current.on("yourID", (id) => {
            setYourID(id);
        })

        socket.current.on("allUsers", (users) => {
            setUsers(users);
        })

        socket.current.on("hey", (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setCallerSignal(data.signal);
        })
    }, [])
    const callPeer = id => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        })

        peer.on("signal", data => {
            socket.current.emit("callUser", {userToCall: id, signalData: data, from: yourID})
        })

        peer.on("stream", stream => {
            if (partnerVideo.current){
                partnerVideo.current.srcObject = stream;
            }
        });

        socket.current.on("callAccepted", signal => {
            setCallAccepted(true);
            peer.signal(signal);
        })
    }
    const acceptCall = () => {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        });
        peer.on("signal", data => {
            socket.current.emit("acceptCall", {signal: data, to: caller})
        })

        peer.on("stream", stream => {
            partnerVideo.current.srcObject = stream;
        })

        peer.signal(callerSignal);
        incomingCall = <div></div>;
    }

    let UserVideo;
    if(stream){
        UserVideo = (
            <video ref={userVideo} autoPlay={true} />
        )
    }

    let PartnerVideo;
    if(callAccepted){
        PartnerVideo = (
            <video ref={partnerVideo} autoPlay={true}/>
        );
    }

    let incomingCall;
    if(receivingCall){
        incomingCall = (
            <div>
                <h1>{caller} is calling you</h1>
                <button onClick={acceptCall}>Accept</button>
            </div>
        )
    }

    return (
        <div>
            <Grid container direction={"row"}>
                <GridItem xs={6} sm={6} md={6}>

                    <Typography variant={"h5"} component={"h1"} >Prompt Goes here</Typography>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Eaque enim et reprehenderit voluptatum? Amet, cupiditate
                    dolorum ea exercitationem expedita id iste minus officia
                    officiis quibusdam saepe sed tempore, temporibus tenetur.
                </GridItem>
                <GridItem xs={6} sm={6} md={6}>
                    <GridItem xs={12} sm={12} md={12}>
                        <h1>Code Editor</h1>
                        <CodeEditor />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        {PartnerVideo}
                        {UserVideo}
                    </GridItem>
                </GridItem>
                {
                    Object.keys(users).map(key => {
                        if(key === yourID){
                            return null;
                        }
                        return (
                            <GridItem>
                                <Button variant={"outlined"} color={"primary"} onClick={() => callPeer(key)}>Call {key}</Button>
                            </GridItem>
                        );
                    })
                }
                <GridItem xs={12} sm={12} md={6}>
                    {incomingCall}
                </GridItem>
            </Grid>
        </div>
    );
}
