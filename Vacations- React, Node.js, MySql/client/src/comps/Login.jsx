import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { Visibility } from '@mui/icons-material'
import { VisibilityOff } from '@mui/icons-material'
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';


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

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [span, setSpan] = useState("")
    const navigate = useNavigate()
    const classes = useStyles();
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClick = async () => {
        const res = await fetch('http://localhost:1000/users/login', {
            method: "post",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        })
        const data = await res.json()
        if (data.err) {
            setSpan(data.err)
        } else {
            localStorage.username = data.username
            localStorage.role = data.role
            navigate('/')
        }
    }
    return <div className='login'>
        <Box
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
                    <TextField className={classes.root} required label="Username" onChange={(e) => { setUsername(e.target.value) }} /><br />
                    <FormControl className={classes.root} required onChange={(e) => { setPassword(e.target.value) }} sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment
                                    position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onMouseDown={handleClickShowPassword}
                                        onMouseUp={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <span>Don't have an account yet? <Link to="/register">Register now </Link></span><br />
                    <Button sx={{
                        backgroundColor: 'rgb(196, 117, 57)', "&.MuiButtonBase-root:hover": {
                            bgcolor: "rgb(218, 130, 63)"
                        }
                    }} variant="contained" onClick={handleClick}>
                        Login
                    </Button>


                </>
            }

        </Box>
    </div>;
}
