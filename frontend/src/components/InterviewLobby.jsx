import React, { useCallback } from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSocket } from '../context/SocketProvider';

const LobbyScreen = () =>{
    const [studentID, setStudentID] = useState("")
    const [board, setBoard] = useState("")
    const socket = useSocket()
    const navigate = useNavigate();
    //console.log(socket)

    const handleJoin = useCallback((e) => {
        e.preventDefault()
        
        socket.emit('board:join', {studentID, board})
        //'board:join' is event name, can be anything. {...} is data sent to the event
    }, [studentID, board, socket])

    const handleCreate = useCallback((e) => {
        e.preventDefault()
        
        socket.emit('board:create', {studentID, board})
        //'board:join' is event name, can be anything. {...} is data sent to the event
    }, [studentID, board, socket])

    const handleJoinRoom = useCallback((data) =>{
        const {studentID, board } = data
        console.log(data)
        navigate(`/InterviewRoom/${board}`)
    }, [navigate])

    useEffect(() =>{
        socket.on('board:join', handleJoinRoom)
        return () =>{
            socket.off('board:join', handleJoinRoom)
        }
    }, [socket, handleJoinRoom])

    return(
        <>
        <div>
            <h1>Lobby</h1>

            <form>
                <label htmlFor="studentid">Student ID:</label>
                <input 
                type = "number" 
                id = "studentid" 
                value = {studentID}
                onChange = {(e) => setStudentID(e.target.value)}></input>
                <br></br>
                <label htmlFor="board">Board:</label>
                <input 
                type = "number" 
                id = "board"
                value = {board}
                onChange = {(e)  => setBoard(e.target.value)}></input>
                <br></br>
                <button onClick={handleJoin}>Join</button>
            </form>


        </div>
        </>
    );
};

export default LobbyScreen;