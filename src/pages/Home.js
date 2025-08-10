import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');

    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
        toast.success('Created a new room');
    };

    const joinRoom = () => {
        if (!roomId || !username) {
            toast.error('ROOM ID & Username are required');
            return;
        }

        navigate(`/editor/${roomId}`, {
            state: { username },
        });
    };

    const copyRoomId = () => {
        navigator.clipboard.writeText(roomId);
        toast.success('Room ID copied!');
    };

    return (
        <div className="homePageWrapper">
            <div className="formWrapper">
                <center>
                    <h4 className="mainLabel">Create or Join a Room</h4>
                </center>
                <div className="inputGroup">
                    {/* Room ID input (only for joining an existing room) */}
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="Enter Room ID or create a new one"
                        onChange={(e) => setRoomId(e.target.value)}
                        value={roomId}
                    />

                    {/* Username input */}
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="USERNAME"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />

                    {/* Show generated Room ID with copy button */}
                    {roomId && (
                        <div className="roomInfo">
                            <strong>Room ID:</strong> {roomId} &nbsp;
                            <center>
                            <button className="btn copyBtn1" onClick={copyRoomId}>Copy</button></center>
                        </div>
                    )}

                    <center>
                        <button className="btn createRoomBtn" onClick={createNewRoom}>
                            New Room
                        </button>
                        <button className="btn joinBtn" onClick={joinRoom} disabled={!roomId}>
                            Join
                        </button>
                    </center>
                </div>
            </div>
            <footer>
                <h4>A realtime collaborative project by Udit :D</h4>
            </footer>
        </div>
    );
};

export default Home;
