import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
      width: theme.spacing(60),
      height: theme.spacing(40),
    },
  });

class Header extends React.Component {
  render() {
    const { classes } = this.props;

    return (
        <div>
            <Avatar alt="gopher logo" className={classes.avatar} variant="rounded" src="/logo512.png" />
            <Typography component="h2" variant="h2" align="center" >Feature Flags</Typography>
        </div>
    );
  }
};

export default withStyles(styles)(Header);
