import React from 'react'
import { Grid, Container, Button, Typography } from '@mui/material'
import { TextField } from '@material-ui/core'

export const SignUp = () => {
    return (
        <Grid
        container
        justify="center"
        alignItems="center"
        style={{
          minHeight: '100vh',
          display: 'flex',
        }}
      >
           <Container maxWidth="xs">
               <h1 style={{ textAlign: "center", marginBottom: "100px" }}>Sign Up to Discussify!</h1>
               <TextField style={{ marginBottom: "30px" }} fullWidth placeholder="Email" />
               <TextField style={{ marginBottom: "30px" }} fullWidth placeholder="Password"/>
               <TextField style={{ marginBottom: "30px" }} fullWidth placeholder="Confirm Password"/>
               <Button style={{ marginBottom: "30px" }} variant="contained" fullWidth>Sign Up</Button>
               <Typography>Already have an account? Sign in</Typography>
           </Container>
      </Grid>
    )
}
