import React, {useCallback, useEffect, useState} from 'react'
import { useSocket } from '../context/SocketProvider'
import ReactPlayer from 'react-player'
import peer from '../service/peer'

const InterviewRoom = () => {
    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMyStream] = useState();
    const [remoteStream, setRemoteStream] = useState();
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);

    const handleUserJoined = useCallback(({ studentID, id }) => {
        console.log(`StudentID: ${studentID} joined the board`);
        setRemoteSocketId(id);
        console.log("RemoteSocket id in user joined: ", remoteSocketId);
    }, []);

    const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        });
        const offer = await peer.getOffer();
        console.log("Offer is ", offer);
        socket.emit("user:call", { to: remoteSocketId, offer });
        console.log("RemoteSocketId", remoteSocketId);
        setMyStream(stream);
    }, [remoteSocketId, socket]);

    const handleIncomingCall = useCallback(async ({ from, offer }) => {
        console.log(`Incoming call from ${from} ${offer}`);
        setRemoteSocketId(from);
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        });
        setMyStream(stream);
        const ans = await peer.getAnswer(offer);
        socket.emit("call:accepted", { to: from, ans });

    }, [socket]);

    const sendStreams = useCallback(() => {
        for (const track of myStream.getTracks()) {
            peer.peer.addTrack(track, myStream);
        }
    }, [myStream]);

    const handleCallAccepted = useCallback(({ from, ans }) => {
        peer.setLocalDescription(ans);
        console.log("CAll acceppted, ans: ", ans);
        sendStreams();
    }, [sendStreams]);

    const handleNegotiationNeeded = useCallback(async () => {
        console.log("Handle Negitiation: ");
        const offer = await peer.getOffer();
        socket.emit('peer:nego:needed', { offer, to: remoteSocketId });
    }, [remoteSocketId, socket]);

    const handleNegoNeedIncoming = useCallback(async ({ from, offer }) => {
        console.log("Handle Negitiation: need incoming ", from, offer);
        const ans = await peer.getAnswer(offer);
        socket.emit('peer:nego:done', { to: from, ans });
    }, [socket]);

    const handleNegoNeedFinal = useCallback(async ({ ans }) => {
        console.log("handle nego need finel, ans: ", ans);
        await peer.setLocalDescription(ans);
    }, []);

    useEffect(() => {
        peer.peer.addEventListener('track', async (ev) => {
            const remoteStream = ev.streams;
            console.log("Tracks here");
            setRemoteStream(remoteStream[0]);
        });
    }, []);

    useEffect(() => {
        peer.peer.addEventListener('negotiationneeded', handleNegotiationNeeded);
        return () => {
            peer.peer.removeEventListener('negotiationneeded', handleNegotiationNeeded);
        };
    }, [handleNegotiationNeeded]);

    useEffect(() => {
        socket.on('user:joined', handleUserJoined);
        socket.on('incoming:call', handleIncomingCall);
        socket.on('call:accepted', handleCallAccepted);
        socket.on('peer:nego:needed', handleNegoNeedIncoming);
        socket.on('peer:nego:final', handleNegoNeedFinal);

        return () => {
            socket.off('user:joined', handleUserJoined);
            socket.off('incoming:call', handleIncomingCall);
            socket.off('call:accepted', handleCallAccepted);
            socket.off('peer:nego:needed', handleNegoNeedIncoming);
            socket.off('peer:nego:final', handleNegoNeedFinal);
        };
    }, [
        socket,
        handleUserJoined,
        handleIncomingCall,
        handleCallAccepted,
        handleNegoNeedIncoming,
        handleNegoNeedFinal
    ]);

    const toggleCamera = () => {
        setIsCameraOn(prevState => !prevState);
        myStream.getVideoTracks().forEach(track => track.enabled = !track.enabled);
    };

    const toggleMicrophone = () => {
        setIsMicrophoneOn(prevState => !prevState);
        myStream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
    };

    const endCall = () => {
        setMyStream(null);
        setRemoteStream(null);
        socket.emit('call:end', { to: remoteSocketId });
    };

    return (
        <div className="max-w-lg mx-auto my-8">
            <h1 className="text-3xl font-bold mb-4">Room Page</h1>
            <h4 className="text-lg mb-4">{remoteSocketId ? `${remoteSocketId} Entered the room` : "No One in room"}</h4>
            {remoteSocketId && <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4" onClick={handleCallUser}>Accept</button>}
            {myStream && <button className="bg-green-500 text-white px-4 py-2 rounded-md mr-4" onClick={sendStreams}>Send Stream</button>}
            {myStream &&
                <>
                    <h1 className="text-2xl font-semibold mb-2">My Stream</h1>
                    <div className="bg-gray-200 rounded-md overflow-hidden mb-4">
                        <ReactPlayer
                            playing
                            muted
                            height="300px"
                            width="100%"
                            url={myStream}
                        />
                    </div>
                </>
            }
            {remoteStream &&
                <>
                    <h1 className="text-2xl font-semibold mb-2">Remote Stream</h1>
                    <div className="bg-gray-200 rounded-md overflow-hidden mb-4">
                        <ReactPlayer
                            playing
                            muted
                            height="300px"
                            width="100%"
                            url={remoteStream}
                        />
                    </div>
                </>
            }
            <div>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md mr-4" onClick={endCall}>End Call</button>
                <button className={`bg-${isCameraOn ? 'green' : 'red'}-500 text-white px-4 py-2 rounded-md mr-4`} onClick={toggleCamera}>{isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}</button>
                <button className={`bg-${isMicrophoneOn ? 'green' : 'red'}-500 text-white px-4 py-2 rounded-md`} onClick={toggleMicrophone}>{isMicrophoneOn ? 'Mute' : 'Unmute'}</button>
            </div>
        </div>
    );
};

export default InterviewRoom;
