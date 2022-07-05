import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputAdornment from '@material-ui/core/InputAdornment';
import { storage } from "../api/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const useStyles = makeStyles(theme => ({
  add: {
    width: "36px",
    height: "20px",
    borderRadius: "20px",
    boxShadow: "0 20px 20px 0",
  },
  selection: {
    padding: "20px 0 0 0",
  },
  border: {
    padding: "10px"
  },
  uploadBtn: {
    width: 'inherit',
    padding: "0 10px",
    color: 'black'
  },
  adduserbutton: {
    color: 'white',
    borderRadius: '20px',
    textTransform: 'none',
    backgroundColor: ' #ff7961',
  }, 
}));
export default function FormDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  // react hook  that we use is usesState and useEffect 
  const [workertype, setWorkerType] = React.useState({
    profilename:'',
    profile: "",
    name: "",
    sex: "",
    phonenumber: "",
    type: ""
  });
  const [error, setError] = useState({
    profilename:'',
    profile: "",
    name: "",
    sex: "",
    phonenumber: "",
    type: ""
  });
  //   setDisable for change or update 
  const [disable, setDisable] = useState(true);
  // i use this useEffect for true or false to access save button
  useEffect(() => {
    if (workertype.name !== "" && workertype.phonenumber !== "" && workertype.sex !== "" && workertype.type !== "" && workertype.profile !== "" && error.name === "" && error.profile === "" && error.sex === "" && error.phonenumber === "" && error.type === "") {
      setDisable(false);
      // console.log(disable);
    }
  }, [workertype, error]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleFile = (e) => {
    const file = e.target.files[0]
    setWorkerType((prev) => ({ ...prev, profilename: file.name }));
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setWorkerType((prev) => ({ ...prev, profile: downloadURL }));
        });
      }
    );
  };
  const handleClose = () => {
    setWorkerType({
      profilename:'',
      profile: '',
      name: "",
      sex: "",
      phonenumber: "",
      type: ""
    });
    setError({});
    setDisable(true);
    setOpen(false);
  };
  // const handleSave = (e) => {

  // };
  const handleChange = (e) => {
    let value = e.target.value;
    setWorkerType({
      ...workertype,
      [e.target.name]: value
    });
  };
  const handleSubmit = (e) => {
      e.preventDefault();
      props.handleSave(e, workertype)
      setWorkerType({
        profilename:'',
        profile: '',
        name: "",
        sex: "",
        phonenumber: "",
        type: ""
      });
      setError({
        profilename:'',
        profile: "",
        name: "",
        sex: "",
        phonenumber: "",
        type: ""
      });
      setDisable(true);
      setOpen(false);
    }
  const handleTouch = (e) => {
    if (e.target.name === "name") {
      if (!e.target.value) {
        setError(prevState => ({ ...prevState, name: "required*" }));
        setDisable(true);
      }
      else {
        setError(prevState => ({ ...prevState, name: "" }));
      }
    }
    if (e.target.name === "phonenumber") {
      if (!e.target.value) {
        setError(prevState => ({ ...prevState, phonenumber: "required*" }));
        setDisable(true);
      }
      else {
        setError(prevState => ({ ...prevState, phonenumber: "" }));
      }
    }
    if (e.target.name === "sex") {
      if (!e.target.value) {
        setError(prevState => ({ ...prevState, sex: "required*" }));
        setDisable(true);
      }
      else {
        setError(prevState => ({ ...prevState, sex: "" }));
      }
    }
    if (e.target.name === "type") {
      if (!e.target.value) {
        setError(prevState => ({ ...prevState, type: "required*" }));
        setDisable(true);
      }
      else {
        setError(prevState => ({ ...prevState, type: "" }));
      }
    }
  };
  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        className={classes.adduserbutton}
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >Add User
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create User</DialogTitle>
        <DialogContent>
          {/* <TextField error={!!error.name} helperText={error.name} fullWidth required name="profile" label="Profile image (URL)" type="url" color="primary" value={workertype.name1}  onBlur={handleTouch} onChange={handleChange}/> */}
          {/* upload image */}
          <TextField error={!!error.json_file} className={classes.selection} fullWidth disabled={true} placeholder={workertype.profilename || "Profile"} name="json_file"
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <Button variant="outlined" color="primary" component="label" className={classes.uploadBtn}>
                  Upload Profile
                   <input type="file"
                    name="profile"
                    accept=".png, .jpg, .jpeg"
                    style={{ display: "none" }}
                    onChange={handleFile}
                  />
                </Button>
              </InputAdornment>,
            }}
          />
          <TextField error={!!error.name} helperText={error.name} fullWidth required name="name" label="Username" type="text" color="primary" value={workertype.name} onBlur={handleTouch} onChange={handleChange} />
          <FormControl className={classes.formControl} fullWidth onBlur={handleTouch} error={!!error.sex}>
            <InputLabel id="demo-simple-select-label">Sex *</InputLabel>
            <Select
              name="sex"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={workertype.sex}
              color="primary"
              required
              onChange={handleChange}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
            <FormHelperText>{error.sex}</FormHelperText>
          </FormControl>
          <TextField error={!!error.phonenumber} helperText={error.phonenumber} fullWidth required name="phonenumber" label="Phone Number" type="text" color="primary" value={workertype.phonenumber} onBlur={handleTouch} onChange={handleChange} />
          <FormControl className={classes.formControl} fullWidth onBlur={handleTouch} error={!!error.type}>
            <InputLabel id="select-type">Type *</InputLabel>
            <Select
              name="type"
              labelId="select-type"
              id="selecttype"
              value={workertype.type}
              color="primary"
              required
              onBlur={handleTouch}
              onChange={handleChange}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="User">User</MenuItem>
            </Select>
            <FormHelperText>{error.type}</FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions className={classes.border}>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button disabled={disable} onClick={handleSubmit} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
// (e)=>props.handleSave(e, workertype)


