import React from 'react';
import { connect } from 'react-redux';
import { toggleFeature, updateFeatureGroups, updateFeatureUsers } from '../redux/actions';
import AddBadge from './AddBadge';
import Grid from '@material-ui/core/Grid';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import NoPersonIcon from '@material-ui/icons/NotInterested';
import FilterListIcon from '@material-ui/icons/FlashOn';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { ListItem } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import LinearProgress from '@material-ui/core/LinearProgress';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Api from '../redux/async';

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

const asyncUpdateFeatureGroups = (feature) => {
    return function (dispatch) {
        return Api.updateFeature(feature).then(
            resp => {
                resp.json().then(f => {
                    dispatch(updateFeatureGroups(feature.key, feature.groups));
                })
            },
            e => console.log(e)
        );
    }
}

class Feature extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addUserActive: false,
            addGroupActive: false
        };
    }

    handleToggle = (event) => {
        this.props.toggleFeature(this.props.feature.key, event.target.checked)
    }

    handleAddGroup = (group) => {
        const { feature } = this.props;

        if (!feature.groups.includes(group)) {
            feature.groups = feature.groups.concat([group]);
        }

        this.props.asyncUpdateFeatureGroups(feature);
    }

    handleRemoveGroup = (group) => {
        const { feature } = this.props;

        if (feature.groups.includes(group)) {
            feature.groups = feature.groups.splice(0,1,group);
        }

        this.props.asyncUpdateFeatureGroups(feature);
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
                    <Grid item xs={11}><Typography component="div"><Box className={classes.featureDescription}>{feature.description}</Box></Typography></Grid>
                    <Grid item xs={1}>
                        <IconButton size='medium' onClick={this.props.onDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={1}><FilterListIcon /></Grid>
            <Grid item xs={10}>
                <Box flexDirection="row">
                    {feature.groups.map(g => <Chip icon={<GroupIcon />} key={g} color='primary' label={g} onDelete={console.log} className={classes.featureFilterListItem} />)}
                    {feature.users.map(u => <Chip icon={u[0] === '-' ?<NoPersonIcon /> : <PersonIcon />} key={u} label={u.replace(/^-/,'')} onDelete={console.log} className={classes.featureFilterListItem} />)}
                    <AddBadge type="group" className={classes.featureFilterListItem} onCreate={this.handleAddGroup} />
                    <AddBadge type="user" className={classes.featureFilterListItem} />
                </Box>
            </Grid>
            </Grid>
        </ListItem>);
    }
};

export default withStyles(styles)(connect(mapStateToProps, { toggleFeature, asyncUpdateFeatureGroups })(Feature));
