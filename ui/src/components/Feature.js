import React from 'react';
import { connect } from 'react-redux';
import { toggleFeature } from '../redux/actions';
import Grid from '@material-ui/core/Grid';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import NoPersonIcon from '@material-ui/icons/NotInterested';
import FilterListIcon from '@material-ui/icons/FilterList';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { ListItem } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import LinearProgress from '@material-ui/core/LinearProgress';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
    feature: {
        paddingTop: '5em',
        paddingBottom: '5em'
    },
    featureDescription: {
        color: "#9C9C9C",
    },
    featureFilterListItem: {
        margin: '.25em'
    }
});

const mapStateToProps = (state, s) => {
    return state
}

class Feature extends React.Component {
    handleToggle = (event) => {
        this.props.toggleFeature(this.props.row, event.target.checked)
    }

    render() {
        const { classes, feature } = this.props;

        return (<ListItem key={this.props.key} divider className={classes.feature}>
            <Grid container spacing={2} alignContent="center">
            <Grid item xs={2}>
                <FormGroup>
                <FormControlLabel control={
                    <Switch
                    key={this.props.key}
                    checked={feature.enabled}
                    onChange={this.handleToggle}
                    />
                } label={feature.enabled ? "ON" : "OFF"} />
                </FormGroup>
            </Grid>
            <Grid item xs={10}>
                <Grid container spacing={2}>
                <Grid item xs={8}><Typography component="div"><Box fontWeight="bold">{feature.key}</Box></Typography></Grid>
                <Grid item xs={4}><LinearProgress variant="determinate" value={feature.percentage} /></Grid>
                <Grid item xs={12}><Typography component="div"><Box className={classes.featureDescription}>{feature.description}</Box></Typography></Grid>
                </Grid>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={1}><FilterListIcon /></Grid>
            <Grid item xs={10}>
                <Box flexDirection="row">
                {feature.groups.map(g => <Chip icon={<GroupIcon />} key={g} color='primary' label={g} onDelete={console.log} className={classes.featureFilterListItem} />)}
                {feature.users.map(u => <Chip icon={u[0] === '-' ?<NoPersonIcon /> : <PersonIcon />} key={u} label={u.replace(/^-/,'')} onDelete={console.log} className={classes.featureFilterListItem} />)}
                </Box>
            </Grid>
            </Grid>
        </ListItem>);
    }
};

export default withStyles(styles)(connect(mapStateToProps, { toggleFeature })(Feature))
