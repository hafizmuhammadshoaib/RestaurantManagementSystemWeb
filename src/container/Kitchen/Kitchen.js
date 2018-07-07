import React, { Component } from "react";
import { connect } from "react-redux";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import KitchenActions from "../../Store/Actions/KitchenActions";
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from "@material-ui/core/Divider";
const tableStyle={
   
    textAlign:"center"
}

class Kitchen extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log(this.props.user)
        if (this.props.orders.length == 0)
            this.props.getOrders(this.props.user)
    }
   
    render() {

        return (this.props.isLoading) ? <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "87vh", alignItems: "center", }}><CircularProgress /></div> :
            <Grid container direction="row" spacing={16} justify="center" style={{ width: "98%" }} >
                {this.props.orders.map((value, index) => {

                    return <Grid item xs={10} md={9} key={index} justify="center"  >
                        <Paper elevation={1} style={{ padding: "10px", justifyContent: "center", backgroundColor: '#F8F9FA', overflowY: "hidden",textAlign:"center" }} >
                            <Typography component="h3" style={{ padding: "10px", backgroundColor: "#F0F1F2", }} >
                                Order No :{value.key}
                            </Typography>
                            <Divider />
                            <Typography component="p">
                                Time created
                            </Typography>
                            <Typography component="p">
                                {`${new Date(value.timeCreated).getHours()}: ${new Date(value.timeCreated).getMinutes()}: ${new Date(value.timeCreated).getSeconds()}`}
                            </Typography>
                            <Typography component="h4" style={{ backgroundColor: "" }} >
                                {value.status}
                            </Typography>
                            <div style={{}} >
                            <table style={{width:"100%"}} >
                                <thead>
                                    <tr>
                                        <th style={tableStyle} >
                                            Items
                                                </th>
                                        <th style={tableStyle}>
                                            Qty
                                                </th>
                                        <th style={tableStyle}>
                                            Status
                                                    </th>
                                    </tr>
                                    {value.items.map((value, index) => {
                                        console.log(value)
                                        return (

                                            <tr>
                                                <td style={tableStyle}>{value.item}</td>
                                                <td style={tableStyle}>{value.qty}</td>
                                                <td style={tableStyle}>{value.status}</td>
                                            </tr>




                                        )
                                    })
                                    }
                                </thead>
                            </table>
</div>

                        </Paper>
                    </Grid>
                })}
            </Grid>
    }
}
const mapStateToProps = state => {
    console.log(state);
    return {
        user: state.AuthReducer.user,
        isLoading: state.KitchenReducer.isLoading,
        isError: state.KitchenReducer.isError,
        errorMsg: state.KitchenReducer.errorMsg,
        orders: state.KitchenReducer.orders
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getOrders: (user) => dispatch(KitchenActions.getOrders(user))
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Kitchen);
