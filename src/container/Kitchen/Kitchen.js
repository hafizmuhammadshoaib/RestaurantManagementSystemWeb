import React, { Component } from "react";
import { connect } from "react-redux";
import AuthActions from "../../Store/Actions/AuthActions";
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
import History from '../../Component/History';

const styles = {
  signInForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '70vh',

  }
}


class Kitchen extends Component {
  constructor(props) {
    super(props);
    this.state = { emailInput: "", passInput: "", modalState: false };
    // console.log("window: " + window.location.replace("/home"));
  }
  
  render() {
    return (
      <div>
       <h1>Kitchen</h1>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    user: state.AuthReducer.user,
    isLoading: state.AuthReducer.isLoading,
    isError: state.AuthReducer.isError,
    errorMsg: state.AuthReducer.errorMsg
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signInUser: userPayload => {
      return dispatch(AuthActions.SignInUser(userPayload));
    },
    checkUser: () => {
      return dispatch(AuthActions.checkUser());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Kitchen);
