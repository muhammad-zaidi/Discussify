import React, { useState } from 'react'
import { Grid, Container, Button, Typography, Card } from '@mui/material'
import { makeStyles } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'


const useStyles = makeStyles({
  card: {
    padding: '15px',
  },
})

export const SignUp = () => {
  const classes = useStyles()
  const { signUp, currentUser } = useAuth()
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignUp = async (e) => {
    e.preventDefault()
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return setError('Missing fields')
    }
    if (password !== confirmPassword) {
      return setError('Passwords do not match')
    }

    try {
      console.log(JSON.stringify(currentUser))
      setLoading(true)
      setError('')
      await signUp(email, password)
      const { data } = await axios.post('/register-user', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      })
      history.push('/')
    } catch (error) {
      setError('Missing email or password')
      console.log('ERROR: ', error)
    }
    setLoading(false)
  }

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
           <Card variant='outlined' className={classes.card}>
              <h1 style={{ textAlign: "center", marginBottom: "100px" }}>Sign Up to Discussify!</h1>
              {error}
              {/* {currentUser.email} */}
              <TextField style={{ marginBottom: "30px" }} fullWidth placeholder="First Name" value={firstName} onChange={(e) => {setFirstName(e.target.value)}} />
              <TextField style={{ marginBottom: "30px" }} fullWidth placeholder="Last Name" value={lastName} onChange={(e) => {setLastName(e.target.value)}} />
              <TextField style={{ marginBottom: "30px" }} fullWidth placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
              <TextField style={{ marginBottom: "30px" }} fullWidth placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
              <TextField style={{ marginBottom: "30px" }} fullWidth placeholder="Confirm Password" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}}/>
              <Button style={{ marginBottom: "30px" }} variant="contained" fullWidth disabled={loading} onClick={handleSignUp}>Sign Up</Button>
              <Typography>Already have an account? <Link to='/login'>Login here!</Link></Typography>
                </Card>
           </Container>
      </Grid>
    )
}
