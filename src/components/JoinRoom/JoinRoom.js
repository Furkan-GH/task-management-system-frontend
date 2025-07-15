import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import  Button  from '@mui/material/Button';

function JoinRoom (){
    const [roomNumber,setRoomNumber] = React.useState("");
      const [msg, setMsg] = React.useState('');
    const handleCreate = () => {
        axios
            .post('http://localhost:8080/api/', { roomNumber })
            .then(res => {
                setMsg("Oda başarıyla oluşturuldu!");
      })
      .catch((err) => setMsg('Hata: ' + err.message));
    };
    return(
        <>
        <div className="flex justify-center">
            <h1>Odaya Katıl!</h1>
        </div>
        <div className='flex justify-center'> 
            <TextField 
                id="standard-basic" 
                label="Oda numarası" 
                variant="standard"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)} />
        </div>
        <div className='flex justify-center'>
            <Button variant="contained" onClick={handleCreate}>KATIL</Button>
        </div>
        {msg && (
        <div className="flex justify-center mt-4 text-red-500">
          {msg}
        </div>
      )}
        </>
    )
}
export default JoinRoom;