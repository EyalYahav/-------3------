import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';


export default function VacationCard({ vacation, setUpdate, vacationsArr }) {
  const navigate = useNavigate()
  const handleFavorite = async () => {
    const res = await fetch('http://localhost:1000/vacations/handlefollow', {
      method: "put",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ vacation_id: vacation.vacation_id }),
      credentials: 'include'
    })
    const data = await res.json()
    if (data.err) {
      return alert(data.err)
    }
    setUpdate(up => !up)
  }
  const handleDelete = async () => {
    const res = await fetch('http://localhost:1000/vacations', {
      method: "delete",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id: vacation.vacation_id }),
      credentials: 'include'
    })
    const data = await res.json()
    if (data.err) {
      return alert(data.err)
    }
    setUpdate(up => !up)
  }
  return <div className='card'>
    <Card sx={{ width: 345, height: 400 }}>
      <CardMedia
        component="img"
        alt={vacation.destination}
        height="170"
        image={vacation.image}
      />
      <CardContent sx={{height: '170px'}}>
        <Typography sx={{height: '30px'}} gutterBottom variant="h5" component="div">
          {vacation.destination}
        </Typography>
        <Typography sx={{height: '85px'}} variant="body2" color="text.secondary">
          {vacation.description}
        </Typography>
        <Typography sx={{height: '55px'}} variant="h6" component="div">
          {vacation.fromDate.split("T")[0].split("-").reverse().join("/")} - {
            vacation.untilDate.split("T")[0].split("-").reverse().join("/")}

        </Typography>
      </CardContent>
      <CardActions sx={{ height: '60px' ,display: 'flex', justifyContent: 'end'}}>
        <Typography sx={{ color: '#bb5207', flexGrow: '1', paddingLeft: '10px' }} variant="h5" component="div">
          ${vacation.price}
        </Typography>
        {

          localStorage.role == "user" && <button onClick={handleFavorite} className='fBTN'>
            <FavoriteIcon className='fIcon' sx={vacationsArr.find(v => v.isFollowed == 1 && v.vacation_id == vacation.vacation_id) ? { color: 'red' } : { color: 'lightgray' }}></FavoriteIcon>
          </button>
        }

        {
          localStorage.role == "admin" &&
          <>
            <button onClick={() => navigate(`/edit/${vacation.vacation_id}`, { state: vacation })} className='fBTN'>
              <EditIcon className='fIcon' sx={{ color: 'black' }}></EditIcon>
            </button>
            <button onClick={handleDelete} className='fBTN'>
              <ClearIcon className='fIcon' sx={{ color: 'black' }}></ClearIcon>
            </button>
          </>
        }

      </CardActions>
    </Card>
  </div>;
}
