import React, { Component } from "react";
import {connect} from 'react-redux';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/Inbox";
import Person from "@material-ui/icons/Person";
import Divider from "@material-ui/core/Divider";
import AuthActions from "../Store/Actions/AuthActions";
import Firebase from '../Store/Firebase/firebaseConfig';

class NavBar extends Component {
  constructor(props){
    super(props);
    this.state= {
      openDrawer: false,
    };
  }
  toggleDrawer = () =>{
    this.setState({openDrawer: !this.state.openDrawer});
  }
  signOut = () =>{
    this.props.signOut();
  }
  render() {
    return (
      <div>
        <AppBar position="static" style={{ backgroundColor: "#1f1f1f" }}>
          <Toolbar>
            <IconButton
             
              style={{
                marginLeft: -12,
                marginRight: 20
              }}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" style={{ flex: 1 }}>
              Restaurent Managment System
            </Typography>
              {
                (this.props.user)?(
                  <Button
                    style={{ float: "right" }}
                    color="inherit"
                    onClick={this.signOut}
                  >
                    SignOut
                  </Button>
                ):
                null
              }
            
          </Toolbar>
        </AppBar>

        <Drawer open={this.state.openDrawer} onClose={this.toggleDrawer}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer}
            onKeyDown={this.toggleDrawer}
          >
            <List component="nav">
              <ListItem>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <Typography variant="title" gutterBottom>
                  {this.props.userName}
                </Typography>
              </ListItem>
            </List>
            <Divider />
            {["Home", "Donate Blood", "Need Donor"].map((value, i) => {
              return (
                <ListItem key={i}
                  onClick={() => {
                    this.props.listHandler(value);
                  }}
                >
                  <ListItemText primary={value} />
                </ListItem>
              );
            })}
          </div>
        </Drawer>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    user: state.AuthReducer.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signOut : () => dispatch(AuthActions.signOut())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);

