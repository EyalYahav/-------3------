import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
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

export default function Add() {
    const [description, setDescription] = useState("")
    const [destination, setDestination] = useState("")
    const [span, setSpan] = useState("")
    const [image, setImage] = useState("")
    const [fromDate, setFromDate] = useState("")
    const [untilDate, setUntilDate] = useState("")
    const [price, setPrice] = useState(0)
    const navigate = useNavigate()
    const classes = useStyles();

    const handlePost = async (type) => {
        const res = await fetch(`http://localhost:1000/vacations/vacation`, {
            method: "post",
            credentials: 'include',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ description, destination, image, fromDate, untilDate, price }),

        })
        const data = await res.json()
        if (data.err) {
            return setSpan(data.err)
        }
        navigate('/')

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
        {
            <>
                <span className={span ? 'spanShow': 'spanHide'}>{span}</span>
                <TextField className={classes.root} required id='outlined-required' label="Destination" onChange={(e) => { setDestination(e.target.value) }} /><br />
                <TextField className={classes.root} multiline required id='outlined-required' label="Description" sx={{ width: '300px' }} maxRows={5} inputProps={inputProps} onChange={(e) => { setDescription(e.target.value) }} /><br />
                <TextField className={classes.root} required id='outlined-required' label="Image URL" onChange={(e) => { setImage(e.target.value) }} /><br />
                <TextField className={classes.root} required type='date' variant='outlined' id='outlined-required' InputLabelProps={{ shrink: true }} label="From" onChange={(e) => { setFromDate(e.target.value) }} /><br />
                <TextField className={classes.root} required type='date' variant='outlined' id='outlined-required' InputLabelProps={{
                    shrink: true
                }} label="Until" onChange={(e) => { setUntilDate(e.target.value) }} /><br />
                <TextField className={classes.root} required type={'number'} id='outlined-required' label="Price" sx={{ maxWidth: '90px' }} onChange={(e) => { setPrice(e.target.value) }} /><br />
                <Button sx={{
                    backgroundColor: 'rgb(196, 117, 57)', "&.MuiButtonBase-root:hover": {
                        bgcolor: "rgb(218, 130, 63)"
                    }
                }} variant="contained" onClick={handlePost} endIcon={<SaveIcon />}>
                    Add
                </Button>


            </>
        }

    </Box>


}
