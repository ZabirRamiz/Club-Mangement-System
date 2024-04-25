import React, { useCallback } from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSocket } from '../context/SocketProvider';

const LobbyScreen = () =>{
    const [studentID, setStudentID] = useState(parseInt(localStorage.getItem('Id')))
    const [board, setBoard] = useState(1)
    const [boardStatus, setBoardStatus] = useState(true)
    const [creator, setCreator] = useState(null)
    const socket = useSocket()
    const navigate = useNavigate();
    //console.log(socket)



    useEffect( () => {
        setBoard(1)
    }, [])
    useEffect(() =>{
        const fetchData = async() =>{
            const response = await fetch(`api/interview/getSingleInterviewSession/${board}`)
            const json = await response.json()
            if(response.ok){
                setBoardStatus(true)
                console.log("This board exists", board, boardStatus)
                setCreator(json.creator)
                
            }
            else{
                setBoardStatus(false)
                console.log("This board does not exist", board, boardStatus)
                
            }
        }

        fetchData()
    }, [board, boardStatus])

    const handleJoin = useCallback((e) => {
        e.preventDefault()
        console.log(boardStatus)
        if(boardStatus){
            socket.emit('board:join', {studentID, board})
        }
        else{
            socket.emit('board:create', {studentID, board})
        }
        
    }, [studentID, board, socket, boardStatus])



    const handleCreateRoom = useCallback(async (data) =>{
        const {studentID, board } = data
        console.log(data)
        console.log("Creating room")
        const response = await fetch('/api/interview/createInterviewSession',{
            method: 'POST',
            body: JSON.stringify({
                board: board,
                creator: studentID
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        if (response.ok){
            navigate(`/InterviewRoom/${board}`)
        }
        else{
            console.log("Room create hoynai")
        }
        
    }, [navigate])

    const handleJoinRoom = useCallback(async (data) =>{
        const { studentID, board } = data;
        console.log(data);
        console.log("Joining room")
        try {
            const res = await fetch(`/api/interview/getSingleInterviewSession/${board}`);
            const js = await res.json();
    
            if (!res.ok) {
                throw new Error('Failed to fetch interview session');
            }
    
            const participantArray = [...js.participants, studentID];
            console.log(participantArray)
    
            const response = await fetch(`/api/interview/updateInterviewSession/${board}`, {
                method: 'PATCH',
                body: JSON.stringify({ participants: participantArray }),
                headers: { 'Content-Type': 'application/json' }
            });
    
            if (!response.ok) {
                throw new Error('Failed to update interview session');
            }
    
            navigate(`/InterviewRoom/${board}`);
        } catch (error) {
            console.error('Error joining room:', error);
        }
    }, [navigate]);
    


    useEffect(() =>{
        socket.on('board:join', handleJoinRoom)
        socket.on('board:create', handleCreateRoom)
        return () =>{
            socket.off('board:join', handleJoinRoom)
            socket.off('board:create', handleCreateRoom)
        }
    }, [socket, handleJoinRoom, handleCreateRoom])

    return(
        <>
        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Lobby</h1>

            <form>
                <div className="mb-4">
                    <label htmlFor="studentid" className="block text-gray-700">Student ID:</label>
                    <input 
                        type="number" 
                        id="studentid" 
                        value={studentID}
                        disabled
                        onChange={(e) => setStudentID(e.target.value)}
                        className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:shadow-md"
                    />
                </div>
                
                <div className="mb-4">
                    <label htmlFor="board" className="block text-gray-700">Board:</label>
                    <select
                        id="board"
                        value={board}
                        onChange={(e) => setBoard(e.target.value)}
                        className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:shadow-md"
                    >
                        <option value={1}>1</option>
                        {[2, 3, 4, 5].map((value) => (
                            <option key={value} value={value}>{value}</option>
                        ))}
                    </select>
                </div>

                
                <button 
                    onClick={handleJoin} 
                    className="w-full py-2 px-4 mt-4 bg-blue-500 text-white rounded-md focus:outline-none focus:bg-blue-600"
                >
                    {boardStatus ? 'Join' : 'Create'}
                </button>
                {boardStatus && 
                <>
                <b>Created By: </b>{creator}
                </>
                    
                }
            </form>
        </div>

        </>
    );
};

export default LobbyScreen;