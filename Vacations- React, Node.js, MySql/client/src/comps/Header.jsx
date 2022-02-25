import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import AssessmentIcon from '@mui/icons-material/Assessment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import Popover from '@mui/material/Popover';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function Header({ setUpdate, setSearchInp }) {
    const navigate = useNavigate()
    const location = useLocation()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const [anchorEl3, setAnchorEl3] = React.useState(null);
    const [anchorEl4, setAnchorEl4] = React.useState(null);
    const open = Boolean(anchorEl);
    const open2 = Boolean(anchorEl2);
    const open3 = Boolean(anchorEl3);
    const open4 = Boolean(anchorEl4);
    
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handlePopoverOpen2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };
    const handlePopoverOpen3 = (event) => {
        setAnchorEl3(event.currentTarget);
    };
    const handlePopoverOpen4 = (event) => {
        setAnchorEl4(event.currentTarget);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
        setAnchorEl2(null);
        setAnchorEl3(null);
        setAnchorEl4(null);
    };
    const handleSearch = (e) => {
        setUpdate(up => !up)
        setSearchInp(e)
    }
    const handleLogout = async () => {
        const res = await fetch('http://localhost:1000/users/logout', {
            method: "post",
            credentials: 'include'
        })
        const data = await res.json()
        if (data.err) {
            alert(data.err)
        } else {
            localStorage.removeItem('username')
            localStorage.removeItem('role')
            setAnchorEl(null)
            setAnchorEl2(null)
            setAnchorEl3(null)
            setAnchorEl4(null)
            navigate('/login')
        }
    }
    return <Box sx={{ flexGrow: 1 }} className='header'>
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between' , alignItems: 'center', background: '#ee8a42' }}>
                <Box sx={{alignItems: 'center',width: '500px',display: { xs: 'flex', md: 'flex' } }}>
                    <Typography
                        variant="h5"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                        onClick={() => navigate("/")}
                        >
                        Best Vacations
                    </Typography>
                    {
                        localStorage.role &&
                        <Search sx={{display: location.pathname == "/" || location.pathname == "/favorites" ? { xs: 'none', md: 'inline' } :"none" }} onChange={(e) => handleSearch(e.target.value)}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                />
                        </Search>
                }
                </Box>
                
                    
                <Box sx={{alignItems: 'center', display: { xs: 'flex', md: 'flex' } }}>
                    <Typography
                        variant="h6"
                        sx={{  display: { xs: 'none', sm: 'block' }}}
                    > 
                    {location.pathname ==='/register' && "Register"}
                    {location.pathname ==='/login' && "Login"}
                    {location.pathname ==='/favorites' && "My Favorites"}
                    {location.pathname ==='/reports' && "Reports"}
                    {location.pathname ==='/add' && "Add Vacation"}
                    {location.state && location.pathname ===`/edit/${location.state.vacation_id}` && "Edit Vacation"}
                    </Typography>
                </Box>

                   
                <Box sx={{alignItems: 'center', justifyContent: 'right', width: '500px', display: { xs: 'flex', md: 'flex' } }}>
                    {
                        localStorage.role &&
                        <Typography
                            variant="p"
                                sx={{ pr: 2, display: { xs: 'none', sm: 'block' }}}
                            > 
                                {"Hello " + localStorage.username}
                            </Typography>
                    }
                    {
                        localStorage.role === "admin" &&
                        <>
                            <IconButton
                                aria-owns={open3 ? 'mouse-over-popover' : undefined}
                                aria-haspopup="true"
                                onMouseEnter={(e) => handlePopoverOpen3(e)}
                                onMouseLeave={(e) => handlePopoverClose(e)}
                                size="large"
                                aria-label="add"
                                color="inherit"
                                onClick={() => navigate("/add")}
                            >
                                <AddIcon />
                            </IconButton>
                            <Popover
                                id="mouse-over-popover"
                                sx={{
                                    pointerEvents: 'none',
                                }}
                                open={open3}
                                anchorEl={anchorEl3}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                onClose={handlePopoverClose}
                                disableRestoreFocus
                            >
                                <Typography sx={{ p: 1 }}>Add</Typography>
                            </Popover>
                            <IconButton
                                aria-owns={open4 ? 'mouse-over-popover' : undefined}
                                aria-haspopup="true"
                                onMouseEnter={(e) => handlePopoverOpen4(e)}
                                onMouseLeave={(e) => handlePopoverClose(e)}
                                size="large"
                                aria-label="reports"
                                color="inherit"
                                onClick={() => navigate("/reports")}
                            >
                                <AssessmentIcon />
                            </IconButton>
                            <Popover
                                id="mouse-over-popover"
                                sx={{
                                    pointerEvents: 'none',
                                }}
                                open={open4}
                                anchorEl={anchorEl4}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                onClose={handlePopoverClose}
                                disableRestoreFocus
                            >
                                <Typography sx={{ p: 1 }}>Reports</Typography>
                            </Popover>
                        </>
                    }
                    {
                        localStorage.role === "user" &&
                        <>
                            <IconButton
                                aria-owns={open ? 'mouse-over-popover' : undefined}
                                aria-haspopup="true"
                                onMouseEnter={(e) => handlePopoverOpen(e)}
                                onMouseLeave={(e) => handlePopoverClose(e)}
                                size="large"
                                color="inherit"
                                onClick={() => {
                                    location.pathname === "/favorites" ?
                                        navigate("/")
                                        : navigate("/favorites")
                                }}
                            >
                                <FavoriteIcon />
                            </IconButton>
                            <Popover
                                id="mouse-over-popover"
                                sx={{
                                    pointerEvents: 'none',
                                }}
                                open={open}
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                onClose={handlePopoverClose}
                                disableRestoreFocus
                            >
                                <Typography sx={{ p: 1 }}>{
                                    location.pathname === "/favorites" ?
                                        "All vacations"
                                        : "Favorites"}
                                </Typography>
                            </Popover>

                        </>
                    }
                    {
                        localStorage.role &&
                        <>
                            
                            <IconButton
                                aria-owns={open2 ? 'mouse-over-popover' : undefined}
                                aria-haspopup="true"
                                onMouseEnter={(e) => handlePopoverOpen2(e)}
                                onMouseLeave={(e) => handlePopoverClose(e)}
                                size="large"
                                edge="end"
                                color="inherit"
                                onClick={handleLogout}
                            >
                                <LogoutIcon />
                            </IconButton>
                            <Popover
                                id="mouse-over-popover"
                                sx={{
                                    pointerEvents: 'none',
                                }}
                                open={open2}
                                anchorEl={anchorEl2}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                onClose={handlePopoverClose}
                                disableRestoreFocus
                            >
                                <Typography sx={{ p: 1 }}>Logout</Typography>
                            </Popover>
                           
                        </>
                    }
                </Box>
            </Toolbar>
        </AppBar>
    </Box>
}

