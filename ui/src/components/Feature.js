import React from 'react';
import { connect } from 'react-redux';
import { toggleFeature, updateFeatureGroups, updateFeatureUsers, updateFeaturePercentage } from '../redux/actions';
import Api from '../redux/async';
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
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';

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

const asyncUpdateFeatureUsers = (feature) => {
    return function (dispatch) {
        return Api.updateFeature(feature).then(
            resp => {
                resp.json().then(f => {
                    dispatch(updateFeatureUsers(feature.key, feature.users));
                })
            },
            e => console.log(e)
        );
    }
}

const asyncToggleFeature = (feature) => {
    return function (dispatch) {
        return Api.updateFeature(feature).then(
            resp => {
                resp.json().then(f => {
                    dispatch(toggleFeature(feature.key, feature.enabled));
                })
            },
            e => console.log(e)
        );
    }
}

const asyncUpdateFeaturePercentage = (feature) => {
    return function (dispatch) {
        return Api.updateFeature(feature).then(
            resp => {
                resp.json().then(f => {
                    dispatch(updateFeaturePercentage(feature.key, feature.percentage));
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
            percentage: props.feature.percentage,
        };
    }

    handleToggle = (event) => {
        const f = {
            ...this.props.feature,
            enabled: event.target.checked,
        }
        this.props.asyncToggleFeature(f);
    }

    handleAddGroup = (group) => {
        const { feature } = this.props;

        if (!feature.groups.includes(group)) {
            feature.groups = feature.groups.concat([group]);
        }

        this.props.asyncUpdateFeatureGroups(feature);
    }

    handleRemoveGroup = (group) => (event) => {
        const { feature } = this.props;

        feature.groups.splice(feature.groups.indexOf(group),1);

        this.props.asyncUpdateFeatureGroups(feature);
    }

    handleAddUser = (user) => {
        const { feature } = this.props;

        const alernativeUserCandidate = user[0] !== '-' ? `-${user}` : user.slice(1);

        if (!feature.users.includes(user) && !feature.users.includes(alernativeUserCandidate)) {
            feature.users = feature.users.concat([user]);
        }

        this.props.asyncUpdateFeatureUsers(feature);
    }

    handleRemoveUser = (user) => (event) => {
        const { feature } = this.props;

        feature.users.splice(feature.users.indexOf(user),1);

        this.props.asyncUpdateFeatureUsers(feature);
    }

    handleUpdatePercentage = (event, value) => {
        const f = {
            ...this.props.feature,
            percentage: value,
        }
        this.props.asyncUpdateFeaturePercentage(f);
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
                } label={feature.enabled ? "MAX ON" : "PARTIAL"} />
                </FormGroup>
            </Grid>
            <Grid item xs={10}>
                <Grid container spacing={2}>
                    <Grid item xs={7}><Typography component="div"><Box fontWeight="bold">{feature.key}</Box></Typography></Grid>
                    <Grid item xs={5}>
                        <Slider
                            defaultValue={feature.percentage}
                            value={this.state.percentage}
                            valueLabelDisplay="auto"
                            step={10}
                            marks
                            min={0}
                            max={100}
                            onChange={(e,v) => this.setState({percentage: v})}
                            onChangeCommitted={this.handleUpdatePercentage}
                        />
                    </Grid>
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
                    {feature.groups.map(g => <Chip icon={<GroupIcon />} key={g} color='primary' label={g} onDelete={this.handleRemoveGroup(g)} className={classes.featureFilterListItem} />)}
                    {feature.users.map(u => <Chip icon={u[0] === '-' ?<NoPersonIcon /> : <PersonIcon />} key={u} label={u.replace(/^-/,'')} onDelete={this.handleRemoveUser(u)} className={classes.featureFilterListItem} />)}
                    <AddBadge type="group" className={classes.featureFilterListItem} onCreate={this.handleAddGroup} />
                    <AddBadge type="user" className={classes.featureFilterListItem} onCreate={this.handleAddUser}/>
                </Box>
            </Grid>
            </Grid>
        </ListItem>);
    }
};

export default withStyles(styles)(connect(mapStateToProps, {
    asyncUpdateFeatureGroups, 
    asyncUpdateFeatureUsers, 
    asyncToggleFeature,
    asyncUpdateFeaturePercentage,
})(Feature));
