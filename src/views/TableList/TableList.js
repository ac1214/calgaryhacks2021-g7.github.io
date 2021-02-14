import React, { useState, useEffect, useContext } from "react";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import RegularButton from 'components/CustomButton/Button';
import Button from '@material-ui/core/Button';

// import Modal from '@material-ui/core/Modal';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ReactMarkdown from 'react-markdown'
import { AuthContext } from "../../context/auth-context";
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

const styles = {
  
  backdrop: {
    color: '#fff',
  }
};


const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


const useStyles = makeStyles((theme) => ({
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


export default function TableList() {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [questionData, setQuestionData] = React.useState("");
  const [table, setTableData] = useState(null);
  const [openload, setOpenload] = React.useState(false);
  const [users, setUsers] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

  const sendDataToParent = (session_id) => { // the callback. Use a better name
    var res = session_id.split(",");
    if(res[1] == 'view') {
      setQuestionData(table[res[0]].formatted_questions);
      // console.log(table[session_id].formatted_questions);
      handleClickOpen();
    }
    if(res[1] == 'cancel') {
      cancelSession(res[0]);
    }
  };

  const cancelSession = (session_id) => { // the callback. Use a better name\
    setOpenload(true);
    async function fetchMyAPI() {
      let response = await fetch("https://operating-land-304706.wm.r.appspot.com/cancel_session", {
        method: 'DELETE',
        redirect: 'follow',
        body: JSON.stringify({
          "user_id": user.uid,
          "session_id": session_id
        })
      })
      response = await response.json()
      setOpenload(false);
      setTableData(response)

    }
    fetchMyAPI()

  };

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  useEffect(() => {
    setOpenload(true);

    async function fetchMyAPI() {
      if (user === null) {
        return;
      }

      let response = await fetch("https://operating-land-304706.wm.r.appspot.com/get_all_sessions?user_id=" + user.uid, requestOptions)
      response = await response.json()
      setOpenload(false);
      setTableData(response)
    }

    async function fetchUsers() {
      let response = await fetch("https://operating-land-304706.wm.r.appspot.com/get_all_users", {
        method: 'GET',
        redirect: 'follow',
      })
      response = await response.json()
      setUsers(response)
    }

    fetchMyAPI()
    fetchUsers()
  }, [user]);

  function formatDate(date) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    var date = new Date(date)
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + "  " + strTime;
  }


  // Split table into before and past
  var upcoming = [];
  var past = [];
  if (table != null) {
    for(const key in table) {
      var visited = false;
      var date = Date.parse(table[key].meeting_time);
      // Previous time
      if(date < Date.now()) {
        const view = <RegularButton variant="outlined" button_type="view"  color="primary" session_id={table[key].id}
        senddatatoparent={sendDataToParent}>View Feedback</RegularButton>
        const add = <RegularButton color="primary">Add Friend</RegularButton>
        if(table[key].user_two == "") {
          table[key].user_two = "unassigned"
        }

        past.push([formatDate(date), table[key].course, table[key].user_one, add, view]);
        visited = true;
      }
      if (!visited) {
        const view = <RegularButton variant="outlined" button_type="view"  color="primary" session_id={table[key].id}
        senddatatoparent={sendDataToParent}>View</RegularButton>
        const cancel = <RegularButton variant="outlined" color="secondary" button_type="cancel" session_id={table[key].id}
          senddatatoparent={sendDataToParent}>Cancel</RegularButton>
          if(table[key].user_two == "") {
            table[key].user_two = "unassigned"
          }

        upcoming.push([formatDate(date), table[key].course, table[key].user_one, view, cancel])
      }
    }
  }


  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite} style={{fontSize: "20px", fontWeight: "bold"}}>Upcoming Practice Sessions</h4>
            <p className={classes.cardCategoryWhite} style={{fontSize: "15px"}}>
              View your upcoming practice sessions
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["When", "Class", "Partner", "Questions You'll Ask", "Action"]}
              tableData={upcoming}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}  style={{fontSize: "20px", fontWeight: "bold"}}>Past Practice Interviews</h4>
            <p className={classes.cardCategoryWhite} style={{fontSize: "15px"}}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Date", "Class", "Questions", "Connect", "Peer Feedback"]}
              tableData={past}
            />
          </CardBody>
        </Card>
      </GridItem>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Modal title
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <ReactMarkdown source={questionData} />
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop className={classes.backdrop} open={openload} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </GridContainer>
  );
}
