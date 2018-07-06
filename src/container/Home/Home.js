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
import Firebase from '../../Store/Firebase/firebaseConfig';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/LocalDining';
import DraftsIcon from '@material-ui/icons/Tab';

const styles={
  listText:{
    fontSize: '17px',
    fontFamily: 'sans-serif',
    paddingLeft: '15px',
    color: 'white',
    fontWeight: 'bold'
  }
}

class Home extends Component {
  constructor(props) {
    super(props);

  }
  componentWillReceiveProps(nextProps) {
    console.log("user", nextProps.user);
    if (nextProps.user === null) {
      console.log("user", nextProps.user);
      this.props.history.replace('/');
    }
  }

  render() {
    return (
      <div>
        <Grid container direction="row" style={{}} >
          <Grid style={{ border: "2px solid", height: "90vh",backgroundColor:"#3d3d3d" }} item xs={4} md={3} >
            <List component="nav" >
              <ListItem button >
                <ListItemIcon>
                  <InboxIcon style={{marginRight:"0px", color:"#8e908e"}}/>
                </ListItemIcon>
                {/* <ListItemText primary="Kitchen" textDense="#8e908e" style={{color:"#8e908e"}}/> */}
                <p style={styles.listText}>Kitchen</p>
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemIcon>
                  <DraftsIcon style={{marginRight:"0px", color:"#8e908e"}} />
                </ListItemIcon>
                <p style={styles.listText}>Tables</p>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={8} md={9} style={{ border: "2px solid"}}>
            {
              this.props.children
            }
          </Grid>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    user: state.AuthReducer.user,
  };
};
const mapDispatchToProps = dispatch => {
  return {
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
