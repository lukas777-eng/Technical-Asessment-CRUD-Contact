import React, { useState } from 'react'
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form';

const Create = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()
  
  const router = useRouter()

      const onSubmit = async e => {
        console.log(e)
        await axios.post(`https://bkbnchallenge.herokuapp.com/contacts`, e)
          router.push('/contacts')
      }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
     
    <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '10rem',
            '& .MuiTextField-root': { width: '100ch', height: '15ch' },
                }}
       >
          <Typography variant="h2" gutterBottom component="div">
                      Create a new Contact
          </Typography>
          <TextField 
              id="demo-helper-text-aligned"
              label="Name"
              margin="none"
              type='text' 
              name='firstName' 
              { ...register('firstName', { required: { value: true, message: 'required field' }, pattern: { value: /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/, message: 'formato incorrecto'}})}
          />
          {
            errors.firstName && <span>{errors.firstName.message}</span>
          }
          <TextField
              helperText="Please enter your lastname"
              id="demo-helper-text-aligned-no-helper"
              label="LastName"
              type='text' 
              name='lastName'
              { ...register('lastName', { required: { value: true, message: 'required field' }, pattern: { value: /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/, message: 'formato incorrecto'}})}
          />
          {
            errors.lastName && <span>{errors.lastName.message}</span>
          }
          <TextField
              helperText="Please enter your email"
              id="demo-helper-text-aligned"
              label="Email"
              type='email' 
              name='email' 
              { ...register('email', { required: { value: true, message: 'required field' }, pattern: { value: /^\w+@(\w+\.)+\w{2,4}$/, message: 'formato incorrecto'}})}

          />
          {
            errors.email && <span>{errors.email.message}</span>
          }
          <TextField
              helperText="Please enter your number phone"
              id="demo-helper-text-aligned-no-helper"
              label="Phone"
              type='number' 
              name='phone' 
              { ...register('phone', { required: { value: true, message: 'required field' }, pattern: { value: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/
              , message: 'formato incorrecto'}})}
          />
          {
            errors.phone && <span>{errors.phone.message}</span>
          }
          <Button variant="outlined" color="success" type='submit' >Add Contact</Button>
       </Box>
    </form>
  )
}

export default Create
