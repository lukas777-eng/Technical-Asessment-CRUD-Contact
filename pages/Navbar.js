import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link';

const Navbar = () => {
  return (
   <>
     <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
   
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 140, display: { xs: 'none', md: 'flex' } }}
          >
            <Link href="/Create"><a>Create Contact</a></Link>    
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
   </>
  )
}

export default Navbar
