import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import FlagIcon from '@material-ui/icons/FlagOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
  });

class Header extends React.Component {
  render() {
    const { classes } = this.props;

    return (
        <div>
            <Avatar className={classes.avatar}>
                <FlagIcon />
            </Avatar>
            <Typography component="h3" variant="h3" >Feature Flags</Typography>
        </div>
    );
  }
};

export default withStyles(styles)(Header);
