import React, { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';

export default function Update({ info }){

  const router = useRouter()
const id  = info._id

  const [ contact, setContact ] = useState({
    firstName: info.firstName,
    lastName: info.lastName,
    email: info.email,
    phone: info.phone,
}); 

const { firstName, lastName, email, phone} = contact;

const handleChange = e => {
  setContact({...contact,[e.target.name] : e.target.value} )
}

const onSubmit = async e => {
  e.preventDefault();
  await axios.put(`https://bkbnchallenge.herokuapp.com/contacts/${id}`, contact)
    router.push('/contacts')
}

const handleDelete = (e) => {
  axios.delete(`https://bkbnchallenge.herokuapp.com/contacts/${id}`)
  router.push('/contacts')
}


  return (
    <form onSubmit={e => onSubmit(e)}>

      <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '10rem',
            '& .MuiTextField-root': { width: '100ch', height: '15ch' },
                }}
      >
           <Typography variant="h2" gutterBottom component="div">Edit Contact</Typography>
           <TextField hiddenLabel id="filled-hidden-label-normal" defaultValue="Normal" variant="filled" type='text' name='firstName' value={contact.firstName} onChange={e => handleChange(e)} />
           <TextField hiddenLabel id="filled-hidden-label-normal" defaultValue="Normal" variant="filled" type='text' name='lastName' value={contact.lastName} onChange={e => handleChange(e)} />
           <TextField hiddenLabel id="filled-hidden-label-normal" defaultValue="Normal" variant="filled" type='email' name='email' value={contact.email} onChange={e => handleChange(e)} />
           <TextField hiddenLabel id="filled-hidden-label-normal" defaultValue="Normal" variant="filled" type='number' name='phone' value={contact.phone} onChange={e => handleChange(e)} />
             <div sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '10rem',
             }}>
            <Button variant="outlined" color="success" onClick={e => onSubmit(e)}>Update User</Button>
            <Button variant="outlined" color="error" onClick={e => handleDelete(e)}>Delete User</Button>
            </div>
      </Box>
    </form>
  )
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`https://bkbnchallenge.herokuapp.com/contacts/${params.id}`)
  const info = await res.json();
  return {
    props: {
      info
    }
  }
}
