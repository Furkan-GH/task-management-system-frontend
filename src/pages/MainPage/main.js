
import Navbar from './../../components/Navbar/Navbar';
import Card from './../../components/Card/Card'
import { useState } from 'react';
import CreateRoom from './../../components/CreateRoom/CreateRoom';
import JoinRoom from '../../components/JoinRoom/JoinRoom';

function MainPage() {

    const [view,setView] = useState("home");

    return(
        <>
        <Navbar setView= {setView} />
        {
            view === "home" && <Card />
        }
        {
            view === "createRoom" && <CreateRoom />
        }
        {
            view === "joinRoom" && <JoinRoom />
        }
        
        </>
    )
}
export default MainPage;