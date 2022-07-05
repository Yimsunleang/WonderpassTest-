import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
const useStyles = makeStyles( theme =>({
    tool: {
        padding: 2,
    },
    selection: {
        padding: "20px 0 0 0",
    },
    border: {
        padding: "10px"
    },
    redcolor:{
        color:'red',
        padding:'2px'
    
      }
}));

export default function FormDialog(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleSubmit = () => {
        props.handleDelete();
        setOpen(false)
    }
    return (
        <div>
            <IconButton aria-label="delete" className={classes.redcolor} onClick={()=>{setOpen(true)}}>
                          <DeleteIcon />
                        
            </IconButton>
            <Dialog open={open} onClose={()=>{setOpen(false)}} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Are you sure, you want to delete it?</DialogTitle>
                <DialogActions className={classes.border}>
                    <Button color="secondary" onClick={()=>{setOpen(false)}} >
                        No
                    </Button>
                    <Button  color="secondary" onClick={handleSubmit} disabled={!open}>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}