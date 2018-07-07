import React, { Component } from "react";
import AuthActions from "../../Store/Actions/BillActions";
import { connect } from "react-redux";
import Divider from "@material-ui/core/Divider/Divider";
import Typography from "@material-ui/core/Typography/Typography";
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import KitchenActions from "../../Store/Actions/KitchenActions";
import CircularProgress from '@material-ui/core/CircularProgress';
// import Divider from "@material-ui/core/Divider";


const tableStyle = {

    textAlign: "center"
}
let orderTotal = 0;
class Bill extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }
    render() {
        return (this.props.isLoading) ? <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "87vh", alignItems: "center", }}><CircularProgress /></div> :
            <Grid container direction="row" spacing={16} justify="center" style={{ width: "98%" }} >
                {this.props.orders.map((value, index) => {

                    return <Grid item xs={10} md={9} key={index} >
                        <Paper elevation={1} style={{ padding: "10px", justifyContent: "center", backgroundColor: '#F8F9FA', overflowY: "hidden", textAlign: "center" }} >
                            <Typography component="h3" style={{ padding: "10px", backgroundColor: "#F0F1F2", }} >
                                Order No :{value.key}
                            </Typography>
                            <Divider />

                            <div  >
                                <table style={{ width: "100%" }} >
                                    <thead>
                                        <tr>
                                            <th style={tableStyle} >
                                                Items
                                                </th>
                                            <th style={tableStyle}>
                                                Qty
                                                </th>
                                            <th style={tableStyle}>
                                                Rate
                                                    </th>
                                            <th style={tableStyle}>
                                                Total
                                                    </th>
                                        </tr>

                                        {value.items.map((value, index) => {
                                            orderTotal += (value.qty * value.price)
                                            return (

                                                <tr key={index}>
                                                    <td style={tableStyle}>{value.item}</td>
                                                    <td style={tableStyle}>{value.qty}</td>
                                                    <td style={tableStyle}>{value.price}</td>
                                                    <td style={tableStyle} > {(value.qty * value.price)} </td>
                                                    {/* <td style={{display:"none"}} >{orderTotal=0}</td> */}
                                                </tr>




                                            )

                                        })

                                        }

                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td style={tableStyle} >Total</td>
                                            <td style={{ textAlign: "center", borderTop: "2px solid" }}> {orderTotal} </td>
                                            <td style={{ display: "none" }} >{orderTotal = 0}</td>

                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <Divider />
                            <Typography component="h2" >
                                {`Bill Status: ${(value.status !== "paid") ? "Unpaid" : "Paid"}`}
                            </Typography>
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

    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bill);
