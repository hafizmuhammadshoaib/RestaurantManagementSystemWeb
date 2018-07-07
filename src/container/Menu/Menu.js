import React, { Component } from "react";
import { connect } from "react-redux";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import KitchenActions from "../../Store/Actions/KitchenActions";
import MenuActions from "../../Store/Actions/MenuActions";
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from "@material-ui/core/Divider";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Circular from '../../Component/Circular';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: '360px',
        backgroundColor: theme.palette.background.paper,
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

const tableStyle = {
    textAlign: "center"
}

class Menu extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.loadMenu(this.props.user);
    }
    render() {
        const { classes } = this.props;
        return (
            <div >
                {
                    this.props.isLoading ?
                        <div style={style.circularStyle}>
                            <Circular />
                        </div>
                        :
                        <Grid container direction="row" justify="center">
                            <Grid item xs={10} md={8}>
                                {
                                    this.props.menuArray.map((data, i) => {
                                        return (
                                            <List key={i} component="nav">
                                                <ListItem style={{ backgroundColor: 'lightgray', borderRadius: '25px' }}>
                                                    <Typography variant="headline" component="h2" style={{ width: '100%', textAlign: 'center' }}>
                                                        {data.menuSection}
                                                    </Typography>
                                                </ListItem>
                                                {
                                                    data.items.map((data, i) => {
                                                        return (
                                                            <ListItem key={i} style={{ display: "flex", justifyContent: "space-between" }}>
                                                                <Typography variant="subheading" component="h4">
                                                                    {data.name}
                                                                </Typography>
                                                                <Typography variant="subheading" component="h4">
                                                                    {data.price}
                                                                </Typography>

                                                            </ListItem>
                                                        )
                                                    })
                                                }
                                            </List>


                                        )
                                    })
                                }
                            </Grid>
                        </Grid>
                }
            </div>
        )
    }
}

Menu.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
    console.log(state);
    return {
        user: state.AuthReducer.user,
        isLoading: state.MenuReducer.isLoading,
        isError: state.MenuReducer.isError,
        errorMsg: state.MenuReducer.errorMsg,
        menuArray: state.MenuReducer.menuArray,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        loadMenu: (user) => dispatch(MenuActions.loadMenu(user)),
    }
};
export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu));