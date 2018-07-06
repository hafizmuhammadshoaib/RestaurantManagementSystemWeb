import React, { Component } from "react";
import { connect } from "react-redux";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import KitchenActions from "../../Store/Actions/KitchenActions";
import CircularProgress from '@material-ui/core/CircularProgress';

class Kitchen extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log(this.props.user)
        this.props.getOrders(this.props.user)
    }
    render() {
        
        return (this.props.isLoading) ? <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "87vh", alignItems: "center", flex: 1 }}><CircularProgress /></div> :
            <Grid container direction="row" spacing={24} justify="center" >
                {this.props.orders.map((value, index) => {

                 return   <Grid item xs={10} md={3} key={index}  >
                        <Paper elevation={1} style={{padding:"10px",height:"25vh",justifyContent:"center"}} >
                            <Typography  component="h3" >
                                Order No :{value.key}
                            </Typography>
                            <Typography component="p">
                                 Time created  
                            </Typography>
                            <Typography component="p">
                            {`${new Date(value.timeCreated).getHours()}: ${new Date(value.timeCreated).getMinutes()  }: ${new Date(value.timeCreated).getSeconds()}` }
                            </Typography>
                            <Typography component="h4" style={{backgroundColor:""}} >
                                  {value.status}
                            </Typography>
                            <Typography component="h4" style={{backgroundColor:""}} >
                                  Items
                            </Typography>
                            {   
                                value.items.map((value,index)=>{
                                    console.log(value)
                                    return(
                                    <Typography component="h5" >
                                    {`${value.item} ${value.qty} ${value.status}`}
                                    </Typography>)
                                })
                            }
                            
                            
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
