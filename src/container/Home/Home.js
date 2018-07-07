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
import Kitchen from '../Kitchen/Kitchen';
import Table from '../Tables/Table';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/LocalDining';
import DraftsIcon from '@material-ui/icons/Tab';
// import Kitchen from '../Kitchen/Kitchen'
import Circular from "../../Component/Circular";
import Menu from '../Menu/Menu';
import SpaceBar from '@material-ui/icons/SpaceBar';

const styles = {
  listText: {
    fontSize: '17px',
    fontFamily: 'sans-serif',
    paddingLeft: '15px',
    color: 'white',
    fontWeight: 'bold'
  },
  circularStyle: {
    height: '87vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      component: 'table',
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log("user", nextProps.user);
    if (nextProps.user === null) {
      console.log("user", nextProps.user);
      this.props.history.replace('/');
    }
  }

  clicked = (flag) => {
    this.setState({ component: flag });
  }

  render() {
    return (
      <div>
        <Grid container direction="row"  >
          <Grid style={{ border: "2px solid", backgroundColor: "#3d3d3d" }} item xs={4} md={3} >
            <List component="nav" >
              <ListItem button onClick={() => this.clicked("kitchen")}>
                <ListItemIcon>
                  <InboxIcon style={{ marginRight: "0px", color: "#8e908e" }} />
                </ListItemIcon>
                <p style={styles.listText}>Kitchen</p>
              </ListItem>
              <Divider />
              <ListItem button onClick={() => this.clicked("table")}>
                <ListItemIcon>
                  <DraftsIcon style={{ marginRight: "0px", color: "#8e908e" }} />
                </ListItemIcon>
                <p style={styles.listText}>Tables</p>
              </ListItem>
              <Divider />              
              <ListItem button onClick={() => this.clicked("menu")}>
                <ListItemIcon>
                  <SpaceBar style={{ marginRight: "0px", color: "#8e908e" }} />
                </ListItemIcon>
                <p style={styles.listText}>Menu</p>
              </ListItem>
              <Divider />
            </List>
          </Grid>
          <Grid item xs={8} md={9} style={{ border: "2px solid", overflowY: "scroll", height: "90vh" }}>
            {
              this.state.component === "menu" ?
                <Menu />
                :
                this.state.component === "table" ?
                  <Table />
                  :
                  <Kitchen />
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
    isLoading: state.TableReducer.isLoading,
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
