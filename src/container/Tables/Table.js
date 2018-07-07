import React, { Component } from "react";
import { connect } from "react-redux";
import AuthActions from "../../Store/Actions/AuthActions";
import TableActions from "../../Store/Actions/TableActions";
import KitchenActions from "../../Store/Actions/KitchenActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import LinearProgress from "@material-ui/core/LinearProgress";
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Firebase from '../../Store/Firebase/firebaseConfig';
import { withStyles } from '@material-ui/core/styles';
import Circular from '../../Component/Circular';
import EventSeat from '@material-ui/icons/EventSeat';
import Timer from '@material-ui/icons/Timer';
import Divider from "@material-ui/core/Divider";



const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },

});
const style = {
  seatsDivWrapper: {
    display: "flex",
    justifyContent: "space-around"
  },
  seatWrapper: {
    display: "flex",
    alignItems: "center",
  },
  circularStyle: {
    height: '87vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}



class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = { emailInput: "", passInput: "", modalState: false };
    // console.log("window: " + window.location.replace("/home"));
  }
  componentDidMount() {
    if (this.props.tablesData.length === 0) {
      this.props.loadTables(this.props.user);
      this.props.getOrders(this.props.user);
    }
    // Firebase.database().ref(`/Restaurants/OcPCTJHEU3MZKu619Ry8OdhhaVg2/Tables`).once("value", (snapshot)=>{
    //   console.log(snapshot.val(), snapshot.key);
    //   // res()
    // })
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {
          this.props.isLoading ?
            <div style={style.circularStyle}>
              <Circular />
            </div>
            :
            <Grid container direction="row" style={{ display: "flex", justifyContent: "space-around" }} >
              {
                this.props.tablesData.map((data, i) => {
                  return (
                    <Grid item xs={10} md={3} key={i}>
                      <Paper style={{ margin: "10px" }} className={classes.root} elevation={1}>
                        <Typography style={{ textAlign: 'center', fontWeight: "bold" }} component="span">
                          {data.status}
                        </Typography>
                        <Typography style={{ textAlign: 'center' }} variant="headline" component="h1">
                          {data.key}
                        </Typography>
                        <br />
                        <Divider style={{ marginBottom: "5px" }} />
                        <br />
                        <div style={style.seatsDivWrapper}>
                          <div style={style.seatWrapper}>
                            <EventSeat style={{ fontSize: 40 }} />
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <Typography variant="caption" component="h5">
                              Total
                        </Typography>
                            <Typography variant="title" component="h5">
                              {`Seats ${data.seats}`}
                            </Typography>
                          </div>
                        </div>
                        <br />
                        <div style={style.seatsDivWrapper}>
                          <div style={style.seatWrapper}>
                            <Timer style={{ fontSize: 40 }} />
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <Typography variant="caption" component="h5">
                              Free Since
                        </Typography>
                            <Typography variant="title" component="h5">
                              time
                        </Typography>
                          </div>
                        </div>
                      </Paper>
                    </Grid>
                  )
                })
              }
            </Grid>
        }
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    user: state.AuthReducer.user,
    isLoading: state.TableReducer.isLoading,
    isError: state.AuthReducer.isError,
    errorMsg: state.AuthReducer.errorMsg,
    tablesData: state.TableReducer.tablesData
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signInUser: userPayload => {
      return dispatch(AuthActions.SignInUser(userPayload));
    },
    checkUser: () => {
      return dispatch(AuthActions.checkUser());
    },
    loadTables: (user) => dispatch(TableActions.loadTables(user)),
    getOrders: (user) => dispatch(KitchenActions.getOrders(user))
  };
};
export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(Tables));