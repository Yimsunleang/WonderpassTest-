import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import React from "react";
import { TextField } from '@material-ui/core';
import { Formik } from 'formik';
import * as yup from 'yup';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../api/firebase";
import {useNavigate} from "react-router-dom";
import {useState } from 'react';

// we dont use useHistory anymore we use useNavigate.
// we use yup for validation (require validation) .

const loginvalidation = yup.object({
  email: yup
    .string()
    .matches(/^[0-9a-zA-Z `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]+$/,'input a valid email')
    .required('required'),
  password: yup
    .string()
// .matches(/^[0-9a-zA-Z `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+$/,'input a valid email')
// .matches("?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$",'input a valid password')
// .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
//or.matches(""^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"")
    .required('required'),
})
const useStyles = makeStyles(theme => ({
  height: {
    height: '100vh',
    justifyContent:'center',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

  },
  paper: {
    // marginTop: theme.spacing(30),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius:"10px"
          },
  submit: {
    margin: theme.spacing(7, 0, 3), 
          },
  login:{
    marginTop: theme.spacing(3)
        },
  passwordcolor:{
    color:'red'
  }
}));
export default function SignIn() {
  const [error, setError] = useState(false);

  const navitage = useNavigate()
  // const handleClickShowPassword = () => {
  //   setValues({ ...values, showPassword: !values.showPassword });
  // };
  const classes = useStyles();
  return (
    <React.Fragment>
       <Container className={classes.height} maxWidth="xs">
        <Card className={classes.paper}>
          <Typography className={classes.login} component="h2" variant="h5">
              <b>Login</b>
          </Typography>
            <CardContent>
{/* const [user, setUser] = useState({
    username: localStorage.getItem('username')?localStorage.getItem('username'):"",
    password: localStorage.getItem('password')?localStorage.getItem('password'):"",
  }); */}
{/* => we also can use this kind of react hook  */}

    {/* const value = e.target.value;
      setUser({
      ...user,
      [e.target.name]: value
    }); */} 
{/* we use formik for validation. we also can use handleChange . */}
          <Formik
            initialValues={{email:'',password:''}}
            validationSchema={loginvalidation}
            onSubmit={(values,actions)=>{
            signInWithEmailAndPassword(auth,values.email,values.password)
            .then((userCredential) =>{
              // const user = userCredential.user;
              navitage("/listpage")
            })
            .catch((error)=>{
            setError(true);
            })
            }}
          >
            {(props)=>(
              <div>
                  <TextField
                    error={props.touched.email && !!props.errors.email}
                    helperText={props.touched.email?props.errors.email:''}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    onBlur={props.handleBlur('email')}
                    autoComplete="email"
                    color="primary"
                    value = {props.values.email}
                    onChange={props.handleChange('email')}
                    // onChange={handleChange}
                  />
                  <TextField
                    error={props.errors.password && !!props.touched.password}
                    helperText={props.touched.password?props.errors.password:''}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="password"
                    type="password"
                    onBlur={props.handleBlur('password')}
                    id="password"
                    color="primary"
                    value = {props.values.password}
                    autoComplete="current-password"
                    onChange={props.handleChange('password')}
                    // endAdornment={
                    //   <InputAdornment position="end">
                    //     <IconButton
                    //       aria-label="toggle password visibility"
                    //       onClick={handleClickShowPassword}
                    //       onMouseDown={handleMouseDownPassword}
                    //     >
                    //       {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    //     </IconButton>
                    //   </InputAdornment>
                    // }
                  
                       
                  />
                  {error && <span className={classes.passwordcolor}>Wrong email or password! </span>}

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"                    
                    className={classes.submit}
                    onClick={props.handleSubmit}
                    >Sign In
                  </Button>
              </div>
                    )}  
          </Formik> 
            </CardContent> 
        </Card>
      </Container>
  </React.Fragment>
  );
}
