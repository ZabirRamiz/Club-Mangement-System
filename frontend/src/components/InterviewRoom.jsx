import { useCallback, useEffect, useState } from 'react';
import { useSocket } from '../context/SocketProvider';
import ReactPlayer from 'react-player';
import peer from '../service/peer';
import { useParams, useNavigate } from 'react-router';
import PendingMemberFeed from "../components/PendingMemberFeed.jsx"

const InterviewRoom = () => {
    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const userID  = parseInt(localStorage.getItem('Id'))
    const [joinedUserID, setJoinedUserID] = useState("")
    const [pending, setPending] = useState(false)
    const { board } = useParams()
    const [isCreator, setIsCreator] = useState(false)
    const [creatorID, setCreatorID] = useState(0)
    const [myStream, setMyStream] = useState();
    const [remoteStream, setRemoteStream] = useState();
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
    const [isAccepted, setIsAccepted] = useState(false)
    const [isStreaming, setIsStreaming] = useState(false)
    const [isCallEnded, setIsCallEnded] = useState(false)
    const [users, setUser] = useState(null)
    const [interview, setInterview] = useState(null)
    const navigate = useNavigate();



    const sendStreams = useCallback(() => {
        console.log("STREAM IS", myStream)
        for (const track of myStream.getTracks()) {
            peer.peer.addTrack(track, myStream);
            setIsStreaming(true)
        }
    }, [myStream]);

    const fetchUser = useCallback(async() =>{
        console.log("PENDING ASE")
        console.log(joinedUserID)
        console.log(`api/user/getSpecificUser/${joinedUserID}`)
        const response = await fetch(`/api/user/getSpecificUser/${joinedUserID}`)
        const json = await response.json()
        console.log(json)
        if(response.ok){
            if (json.designation === "Pending"){
                setPending(true)
            }
            setUser([json])
            console.log("USERS", [json])
        }
    }, [joinedUserID])

    useEffect(() => {
        const fetchData = async () => {
            console.log(board, userID)
            const response = await fetch(`/api/interview/getSingleInterviewSession/${board}`);
            const json = await response.json()
            
            if (response.ok) {
                if (interview == null){
                    setInterview(json)
                }
                    
                console.log("INTERVIEW ", json)
                setCreatorID(parseInt(json.creator))

                if (creatorID == userID) {
                    setIsCreator(true)
                    if (joinedUserID!= ""){
                        fetchUser()
                    }
                }
            }
        }
        fetchData()
    }, [board, fetchUser, userID, creatorID, isCreator, joinedUserID, isAccepted, remoteSocketId, interview]);

    const onCamera = ( async() =>{
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        });
        setMyStream(stream);
        setIsCameraOn(true)
    })


    const handleLeaveRoom = useCallback(async () => {
        console.log("Room left room")

        var participant = 0
        // participant = participant.splice(participant.indexOf(userID), 1)
        console.log(participant)

        const response = await fetch(`/api/interview/updateInterviewSession/${board}`, {
            method: 'PATCH',
            body: JSON.stringify({ participants: participant, remoteSocket: "" }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error('Failed to update interview session');
        }
        socket.emit('call:ended', { to: remoteSocketId });
        navigate(`/Interview`);

    }, [board, navigate, remoteSocketId, socket]);

    const handleDeleteRoom = async (e) => {
        e.preventDefault()

        const response = await fetch(`/api/interview/deleteInterviewSession/${board}`,{
            method: "DELETE",
            headers:{
              'Content-Type': 'application/json'
            }
          })
      
          const json = await response.json()
          console.log(json)
          if(response.ok){
            navigate(`/Interview`);
          }
          else{
            console.error("Hoynai delete")
          }

        

    };


    const handleUserJoined = useCallback(async({ studentID, id }) => {
        console.log(`StudentID: ${studentID} joined the board`);
        setJoinedUserID(studentID)
        setRemoteSocketId(id);
        console.log("RemoteSocket id in user joined: ", remoteSocketId);
        onCamera()
    }, [remoteSocketId]);

    const handleCallUser = useCallback(async () => {
        setMyStream()
        const offer = await peer.getOffer();
        console.log("Offer is ", offer);
        socket.emit("user:call", { to: remoteSocketId, offer });
        console.log("RemoteSocketId", remoteSocketId);
        // setIsAccepted(true)
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        });
        setMyStream(stream);
        if (remoteSocketId) {
            sendStreams()
        }
    }, [remoteSocketId, sendStreams, socket]);

    const handleIncomingCall = useCallback(async ({ from, offer }) => {
        console.log(`Incoming call from ${from} ${offer}`);
        setRemoteSocketId(from)

        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        });
        setMyStream(stream);
        const ans = await peer.getAnswer(offer);
        socket.emit("call:accepted", { to: from, ans });
        
        sendStreams()
    }, [socket, sendStreams]);



    const handleCallAccepted = useCallback(({ from, ans }) => {
        peer.setLocalDescription(ans);
        console.log("CAll acceppted, ans: ", ans);
        setIsAccepted(true)
        console.log("CALL ACCEPTED by ", from)
        sendStreams();
    }, [sendStreams]);

    const handleNegotiationNeeded = useCallback(async () => {
        console.log("Handle Negitiation: ");
        const offer = await peer.getOffer();
        socket.emit('peer:nego:needed', { offer, to: remoteSocketId });
    }, [remoteSocketId, socket]);

    const handleNegoNeedIncoming = useCallback(async ({ from, offer }) => {
        console.log("Handle Negitiation: need incoming (isStreaming)", isStreaming, from, offer);
        const ans = await peer.getAnswer(offer);
        socket.emit('peer:nego:done', { to: from, ans });

        sendStreams()
    }, [isStreaming, socket, sendStreams]);

    const handleNegoNeedFinal = useCallback(async ({ ans }) => {
        console.log("handle nego need finel, ans: ", ans);
        await peer.setLocalDescription(ans);
        console.log(isStreaming, isAccepted, remoteSocketId)
        
    }, [isAccepted, isStreaming, remoteSocketId]);

    // will be called in participant
    const handleEndCall = useCallback(async () => {
        console.log("CALL END FROM PARTICIPANT")
        setRemoteStream(null);
        setMyStream(null)
        setIsAccepted(false)
        setPending(false)
        setIsCallEnded(true)
        setIsStreaming(false)
        setInterview(null)
        socket.emit('call:end', { to: remoteSocketId });
        handleLeaveRoom()
    }, [remoteSocketId, handleLeaveRoom, socket]);

    // will be called in creator
    const handleCallEnded = useCallback(({ from }) => {
        console.log("call:ended recieved CREATOR")
        setIsCallEnded(true)
        setRemoteSocketId(null)
        setRemoteStream(null)
        setIsAccepted(false)
        setJoinedUserID("")
        setPending(false)
        setIsStreaming(false)
        setUser(null)
        console.log(`Call ended by user ${from}`);
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
        socket.on('call:ended', handleCallEnded);

        return () => {
            socket.off('user:joined', handleUserJoined);
            socket.off('incoming:call', handleIncomingCall);
            socket.off('call:accepted', handleCallAccepted);
            socket.off('peer:nego:needed', handleNegoNeedIncoming);
            socket.off('peer:nego:final', handleNegoNeedFinal);
            socket.off('call:ended', handleCallEnded);
        };
    }, [
        socket,
        handleUserJoined,
        handleIncomingCall,
        handleCallAccepted,
        handleNegoNeedIncoming,
        handleNegoNeedFinal,
        handleCallEnded,
    ]);

    const toggleCamera = () => {
        setIsCameraOn(prevState => !prevState);
        myStream.getVideoTracks().forEach(track => track.enabled = !track.enabled);
    };

    const toggleMicrophone = () => {
        setIsMicrophoneOn(prevState => !prevState);
        myStream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
    };

    return (
        <div className="max-w-5xl mx-auto my-8 relative">
            <h1 className="text-3xl font-bold mb-4">Room Page {isCreator && ("Creator")}</h1>
            <h4 className="text-lg mb-4">
                {isCreator
                    ? remoteSocketId
                        ? `${joinedUserID} Entered the room`
                        : "No One in room"
                    : remoteSocketId
                        ? "Joined room"
                        : "Waiting for creator to accept"}
            </h4>
            
            <div className="flex justify-between items-start">
                {/* Stream Section */}
                <div className="flex flex-col items-end" style={{ flex: '0 0 65%' }}>
                    {isCreator && (
                        <div>
                            <button className="bg-red-500 text-white px-4 py-2 rounded-md mb-4" onClick={handleDeleteRoom}>
                                Delete Room
                            </button>
                        </div>
                    )}
                    
                    {remoteSocketId && !isAccepted && isCreator && (
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4" onClick={handleCallUser}>
                            Accept
                        </button>
                    )}
    
                    {/* My Stream */}
                    {myStream && (
                        <div className="bg-gray-200 rounded-md overflow-hidden mb-4 absolute bottom-0">
                            <ReactPlayer
                                playing
                                muted
                                height="150px" // Adjust height as needed
                                width="200px" // Adjust width as needed
                                url={myStream}
                            />
                        </div>
                    )}
    
                    {/* Remote Stream */}
                    {remoteStream && !isCallEnded && (
                        <div className="bg-gray-200 rounded-md overflow-hidden mb-4 w-full">
                            <ReactPlayer
                                playing
                                muted
                                height="500px" // Adjust height as needed
                                width="700px" // Adjust width as needed
                                url={remoteStream}
                            />
                            <div className="absolute bottom-5 left-5 right-0 p-2">
                                <div className="flex justify-start">
                                    <button className={`bg-${isCameraOn ? 'red' : 'green'}-500 text-white px-4 py-2 rounded-md mr-4`} onClick={toggleCamera}>
                                        {isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
                                    </button>
                                    <button className={`bg-${isMicrophoneOn ? 'red' : 'green'}-500 text-white px-4 py-2 rounded-md mr-4`} onClick={toggleMicrophone}>
                                        {isMicrophoneOn ? 'Mute' : 'Unmute'}
                                    </button>
                                    {!isCallEnded && !isCreator && <button className="bg-red-500 text-white px-4 py-2 rounded-md mr-4" onClick={handleEndCall}>End Call</button>}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Pending Member Feed */}
                {pending && (
                    <div className="bg-white rounded-none shadow-md p-4 mb-4" style={{ flex: '0 0 30%' }}>
                        {users && users.map((user) => (
                            <PendingMemberFeed key={user.sid} user={user} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
    
};

export default InterviewRoom;

    



    


