import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import db from '../api/firebase';
import {useState , useEffect } from 'react';
import {collection, getDocs, addDoc, updateDoc, doc , deleteDoc} from 'firebase/firestore/lite';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Adduser from "./adduser";
import {useNavigate} from "react-router-dom";
import Edituser from './edituser' ;
import Deleteuser from './deletelist';


const drawerWidth = '100%';
const columns = [
  { id: 'profile', label: 'Profile', },
  { id: 'name', label: 'Name' },
  { id: 'sex', label: 'Sex' },
  { id: 'phonenumber', label: 'PhoneNumber' },
  { id: 'type', label: 'Type' },
  { id: 'action', label: 'Action' },

];
const height = window.innerHeight - 275;
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: height,
  },
  marign: {
    margin: '100px',
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    },
    backgroundColor: 'white'
  },
  typography: {
    color: "#616161"
  },
  typography1: {
    color: "black"
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    color: '#000'
  },
  button: {
    color: '#C1002E',
    textTransform:'none',
    '&:hover':{
      backgroundColor:'#fff',
      borderColor:'#fff'
    }
  },
  button2: {
    color: '#C1002E',
    marginLeft: theme.spacing(1),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: ' #ff7961',
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  // searchIcon: {
  //   padding: theme.spacing(0, 2),
  //   height: "100%",
  //   position: "absolute",
  //   pointerEvents: "none",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch"
      }
    }
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color : ' red ',
  },
  appbar01: {
    backgroundColor : 'white' ,
  },
  tool:{
    color:'#42a5f5',
    padding: '2px'
  },
  redcolor:{
    color:'red',
    padding:'2px'

  },
  listpagedisplay:{
    color:'black',
  },
  alignlistpageheader:{
    display:'flex',
    justifyContent:"space-between",
    
  }
}));

// for this table i take it from material ui and customize it .
export default function StickyHeadTable() {
  
  const navigate = useNavigate()    
  const [listpage, setListpage] = useState([]);
// db , listpage = get data from listpage in firebase   
  const usersCollectionRef = collection(db, "listpage");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
// loop in data base to collect data       
      setListpage(data.docs.map(function(doc) {
        let doc_data = {...doc.data()}
        doc_data['id'] = doc.id
        return doc_data
      }));
// console.log(data.docs.map(function(doc) {
//   let doc_data = {...doc.data()}
//    doc_data['id'] = doc.id
//   return doc_data
// }));
    };
    getUsers();
  }, []);
// console.log(window.innerHeight);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleSave = async (e, workertype) => {
      await addDoc(collection(db, 'listpage'),{
        ...workertype
      });
      setListpage([...listpage, workertype]);
  };
  const handleUpdate = async (e, selected) => {
    const selectedrow = doc(db , 'listpage',selected.id);
    await updateDoc(selectedrow , selected);
    let updateData = listpage.map(function(item) {
      if(item.id === selected.id) {
        item = selected;
      }
      return item;
    });
    setListpage(updateData);
  };
  const handleDelete = async (row) =>  {
    await deleteDoc(doc(db, 'listpage' , row.id));
    let item = listpage.filter(data=>data.id!==row.id);
    setListpage(item)
  }
  return (
    <div className={classes.marign}>
      <div>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>  
            <Typography variant='h5' noWrap className={classes.typography}>
             <b>Overview</b> 
          </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Button 
              onClick={()=>navigate('/')}
              className={classes.button}>  
                <span
                >Logout</span>
                <ExitToAppIcon className={classes.button2}/>
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>     
          <div className={classes.root}>
            <AppBar className={classes.appbar01} position="static">
                <Toolbar>
                    <Typography variant='h6' noWrap className={classes.typography1}>
                        <b>List Type</b> 
                    </Typography>
                    <div className={classes.grow}/>
                    <div className={classes.addbutton}>  
                    <Adduser handleSave={handleSave}/>
                    </div> 
                      {/* <div className={classes.search}>
                        <div className={classes.searchIcon}>
                          <SearchIcon />
                        </div>
                        <InputBase
                          placeholder="Search…"
                          classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                          }}
                          inputProps={{ 'aria-label': 'search' }}
                        />
                      </div> */}
                  </Toolbar>
              </AppBar>
            </div>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>))}
              </TableRow>
            </TableHead>
            <TableBody>
              {listpage.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell  component="th" scope="row">
                        <Avatar alt="Remy Sharp" src={row.profile} className={classes.large} />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.sex}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.phonenumber}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.type}
                    </TableCell>
                    <TableCell>
                      <Grid container>
                        {/* <IconButton  aria-label="edit" className={classes.tool} >
                          <EditIcon />
                        </IconButton> */}
                        <Edituser selected={row} handleSave={handleUpdate}/>
                        {/* <IconButton aria-label="delete" className={classes.redcolor} >
                          <DeleteIcon /> 
                        </IconButton> */}
                        <Deleteuser handleDelete={()=>handleDelete(row)}/>
                      </Grid>
                    </TableCell>
                  </TableRow>
                  );
              })}
              </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={listpage.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}