import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import { makeStyles } from '@mui/styles';

const inputProps = {
    maxLength: "180",
}
const useStyles = makeStyles({
    root: {
        // input label when focused
        "& label.Mui-focused": {
            color: "orange"
        },
        // focused color for input with variant='standard'
        "& .MuiInput-underline:after": {
            borderBottomColor: "orange"
        },
        // focused color for input with variant='filled'
        "& .MuiFilledInput-underline:after": {
            borderBottomColor: "orange"
        },
        // focused color for input with variant='outlined'
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "orange"
            }
        }
    }
})
export default function Edit({ setUpdate }) {
    const { id } = useParams()
    const {  state } = useLocation()
    const [description, setDescription] = useState("")
    const [destination, setDestination] = useState()
    const [image, setImage] = useState("")
    const [fromDate, setFromDate] = useState("")
    const [untilDate, setUntilDate] = useState("")
    const [price, setPrice] = useState("")
    const navigate = useNavigate()
    const classes = useStyles();

    useEffect(() => {
        setDescription(state.description)
        setDestination(state.destination)
        setImage(state.image)
        setFromDate(state.fromDate)
        setUntilDate(state.untilDate)
        setPrice(state.price)
    }, [])

    const handleSave = async (type) => {
        const res = await fetch(`http://localhost:1000/vacations/vacation`, {
            method: "post",
            credentials: 'include',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ id, description, destination, image, fromDate, untilDate, price }),

        })
        const data = await res.json()
        if (data.err) {
            navigate('/login')

        }
        navigate('/')
        setUpdate(up => !up)


    }

    return <Box
        component="form"
        sx={{
            marginTop: '20px',
            '& .MuiTextField-root': { mt: "1px" },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}
        noValidate
        autoComplete="off"
    >
        {price &&
            <>
                <TextField className={classes.root} required id='outlined-required' label="Destination" defaultValue={destination} onChange={(e) => setDestination(e.target.value) } /><br />
                <TextField className={classes.root} multiline required id='outlined-required' label="Description" sx={{ width: '300px' }} maxRows={5} inputProps={inputProps} defaultValue={description} onChange={(e) => setDescription(e.target.value) } /><br />
                <TextField className={classes.root} required id='outlined-required' label="Image URL" defaultValue={image} onChange={(e) =>  setImage(e.target.value) } /><br />
                <TextField className={classes.root} required type='date' id='outlined-required' label="From" defaultValue={fromDate.split("T")[0]} onChange={(e) =>  setFromDate(e.target.value) } /><br />
                <TextField className={classes.root} required type='date' id='outlined-required' label="Until" defaultValue={untilDate.split("T")[0]} onChange={(e) =>  setUntilDate(e.target.value) } /><br />
                <TextField className={classes.root} required type={'number'} id='outlined-required' label="Price" sx={{ maxWidth: '90px' }} defaultValue={price} onChange={(e) =>  setPrice(e.target.value) } /><br />
                <Button sx={{
                    backgroundColor: 'rgb(196, 117, 57)', "&.MuiButtonBase-root:hover": {
                        bgcolor: "rgb(218, 130, 63)"
                    }
                }} variant="contained" onClick={handleSave} endIcon={<SaveIcon />}>
                    Save
                </Button>
             
            </>
        }

    </Box>

}
