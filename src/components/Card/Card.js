import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function RoomCard() {
  return (
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
  {Array.from({ length: 4 }).map((_, i) => (
    <div key={i} className="card w-96 bg-base-100 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">Oda ismi</h2>
        <h3>oda numarası</h3>
        <p>kimlerin oldukları</p>
        <div className="justify-end card-actions">
          <button className="btn btn-primary">Taskları gör</button>
        </div>
      </div>
    </div>
  ))}
</div>
  );
}