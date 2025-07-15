import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import  Button  from '@mui/material/Button';

function CreateRoom (){
    const [roomName,setRoomName] = React.useState("");
      const [msg, setMsg] = React.useState('');
    const handleCreate = () => {
        axios
            .post('http://localhost:8080/api/', { roomName })
            .then(res => {
                setMsg("Oda başarıyla oluşturuldu!");
      })
      .catch((err) => setMsg('Hata: ' + err.message));
    };
    return(
        <>
        <div className="flex justify-center">
            <h1>Oda Kur!</h1>
        </div>
        <div className='flex justify-center'> 
            <TextField 
                id="standard-basic" 
                label="Oda ismi" 
                variant="standard"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)} />
        </div>
        <div className='flex justify-center'>
            <Button variant="contained" onClick={handleCreate}>KUR</Button>
        </div>
        {msg && (
        <div className="flex justify-center mt-4 text-red-500">
          {msg}
        </div>
      )}
        </>
    )
}
export default CreateRoom;