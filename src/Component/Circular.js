import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import React from 'react';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

function Circular(props) {
  const { classes } = props;
  return (
    <div>
      <CircularProgress style={props.style} className={classes.progress} size={50} />
    </div>
  );
}

Circular.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Circular);
