import React, { useState } from 'react'
import { Grid, Container, Button, Typography, Card } from '@mui/material'
import { makeStyles } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  card: {
    padding: '15px',
  },
})

export const Login = () => {
  const classes = useStyles()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError('')
      await login(email, password)
    } catch (error) {
      setError('Failed to login due to: ', error)
      console.log('ERROR: ', error)
    }
    setLoading(false)
  }
  console.log(email, password)
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
              <h1 style={{ textAlign: "center", marginBottom: "100px" }}>Login to Discussify!</h1>
              {error}
              <TextField style={{ marginBottom: "30px" }} fullWidth placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
              <TextField style={{ marginBottom: "30px" }} fullWidth placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
              <Button style={{ marginBottom: "30px" }} variant="contained" fullWidth disabled={loading} onClick={handleLogin}>Login</Button>
              <Typography>Don't have an account? <Link to='/signup'>Sign up here!</Link></Typography>
                </Card>
           </Container>
      </Grid>
    )
}
