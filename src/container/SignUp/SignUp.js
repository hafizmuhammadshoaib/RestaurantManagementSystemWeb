import React, { Component } from "react";
import AuthActions from "../../Store/Actions/AuthActions";
import { connect } from "react-redux";
import { AuthEpic } from "../../Store/Epics/AuthEpic";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
const styles = {
  signInForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '70vh',

  }
}

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { emailInput: "", passInput: "", nameInput: "" ,registerButtonDisable:false};
  }
  componentDidMount() {
    //  this.props.createUser({name:"shoaib",email:"shoaibsilat9@gmail.com",pass:"shoaib123"})
    this.props.checkUser();
  }
  componentWillReceiveProps(nextProps){
      if(nextProps.user){
          // this.props.history.replace('/home');
          console.log("auth completed")
      }
      else{

      }
  }
  inputHandler=(event)=> {
    this.setState({ [event.target.name]: event.target.value });
  }
  registerHandler=()=> {
    let userInfo = {
      name: this.state.nameInput,
      email: this.state.emailInput,
      pass: this.state.passInput
    };
    console.log(userInfo);
    this.props.createUser(userInfo)
    // this.setState({ emailInput: "", passInput: "", nameInput: "",registerButtonDisable:true });
  }
  render(){
    // console.log(this.props.user);
    return (
      <div style= {styles.signInForm}>         
          <Grid container  direction="row" justify="center" >
          <Grid  item xs={10} md={6} >
            <TextField
              required
              fullWidth
              id="name"
              label="Name"
              className="nameInput"
              onChange={this.inputHandler}
              name="nameInput"
              margin="normal"
              value={this.state.nameInput}
              disabled={this.props.isLoading}
            />
          </Grid>
          </Grid>
       
       
         
           <Grid container  direction="row" justify="center" >
          <Grid  item xs={10} md={6} >
            <TextField
              required
              fullWidth
              id="email"
              label="Email"
              className="emailInput"
              onChange={this.inputHandler}
              name="emailInput"
              margin="normal"
              value={this.state.emailInput}
              disabled={this.props.isLoading}
            />
          </Grid>
          </Grid>
          
        
        
          
          <Grid container  direction="row" justify="center" >
          <Grid item xs={10} md={6}>
            <TextField
              required
              fullWidth
              id="password-input"
              label="Password"
              className="passInput"
              type="password"
              autoComplete="current-password"
              margin="normal"
              name="passInput"
              onChange={this.inputHandler}
              value={this.state.passInput}
              disabled={this.props.isLoading}
            />
          </Grid>
          </Grid>
        
        
          
          <Grid container  direction="row" justify="center" >
          <Grid >
            <Button
              variant="outlined"
              color="secondary"
              onClick={this.registerHandler}
              className="signUpBtn"
              disabled={this.props.isLoading}
            >
              SignUp
            </Button>
          </Grid>
          </Grid>


          <Grid container  direction="row" justify="center" >
          <a onClick={(this.props.isLoading)?()=>{}:
              () => {
              this.props.history.replace("/");
            }}  >
          <Typography variant="body1"  align="center" style={{color:"red",padding:"20px"}} >
        <span style={{cursor: "pointer"}}>
          Already have an account? SignIn here
        </span>
      </Typography>

          
          
          </a>
          </Grid>

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
    createUser: userObj => {
      return dispatch(AuthActions.signUpUser(userObj));
    },
    checkUser:()=>{return dispatch(AuthActions.checkUser())}
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
