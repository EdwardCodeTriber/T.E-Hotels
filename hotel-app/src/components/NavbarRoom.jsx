import React from 'react'
import { AppBar, Toolbar, IconButton} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const NavbarRoom = () => {
  return (
    <div>
        <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="back" onClick={navBack}>
                        <ArrowBackIcon  />
                    </IconButton>
                    {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Closed Area Room
                    </Typography> */}
                    <IconButton color="inherit" aria-label="favorite">
                        <FavoriteBorderIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
    </div>
  )
}

export default NavbarRoom