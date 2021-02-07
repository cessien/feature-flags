import './App.css';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getFeatures, toggleFeature } from './redux/actions';
import { getAllFeatures } from './redux/selectors';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import FlagIcon from '@material-ui/icons/FlagOutlined';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import NoPersonIcon from '@material-ui/icons/NotInterested';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { List, ListItem } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import LinearProgress from '@material-ui/core/LinearProgress';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  feature: {
    paddingTop: '5em',
    paddingBottom: '5em'
  },
  featureList: {
    width: "100vmin",
  },
  featureDescription: {
    color: "#9C9C9C",
  },
  featureFilterListItem: {
    margin: '.25em'
  }
});

const mapStateToProps = state => {
  const features = getAllFeatures(state);
  return { features }
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getFeatures();
  }

  handleToggle(i, feature) {
    return (event) => {
      this.props.toggleFeature({
        row: i,
        enabled: event.target.checked,
      })
    };
  }

  render() {
    const { classes, features } = this.props;

    return (
      <Container component="main" maxWidth="lg" >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <FlagIcon />
          </Avatar>
          <Typography component="h3" variant="h3" >
            Feature Flags
          </Typography>
          <List className={classes.featureList}>
            <ListItem key="add-feature">
              <Button
                color="primary"
                size="large"
                fullWidth={true}
                startIcon={<AddIcon />}
              >
                Add Feature
              </Button>
            </ListItem>
            {features.features && features.features.map((l,i) => {
            return <ListItem key={i} divider className={classes.feature}>
              <Grid container spacing={2} alignContent="center">
                <Grid item xs={2}>
                  <FormGroup>
                    <FormControlLabel control={
                      <Switch
                        checked={l.enabled}
                        onChange={this.handleToggle(i, l)}
                      />
                    } label={l.enabled ? "ON" : "OFF"} />
                  </FormGroup>
                </Grid>
                <Grid item xs={10}>
                  <Grid container spacing={2}>
                    <Grid item xs={8}><Typography component="div"><Box fontWeight="bold">{l.key}</Box></Typography></Grid>
                    <Grid item xs={4}><LinearProgress variant="determinate" value={l.percentage} /></Grid>
                    <Grid item xs={12}><Typography component="div"><Box className={classes.featureDescription}>{l.description}</Box></Typography></Grid>
                  </Grid>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={1}><FilterListIcon /></Grid>
                <Grid item xs={10}>
                  <Box flexDirection="row">
                    {l.groups.map(g => <Chip icon={<GroupIcon />} color='primary' label={g} onDelete={console.log} className={classes.featureFilterListItem} />)}
                    {l.users.map(u => <Chip icon={u[0] === '-' ?<NoPersonIcon /> : <PersonIcon />} label={u.replace(/^-/,'')} onDelete={console.log} className={classes.featureFilterListItem} />)}
                  </Box>
                </Grid>
              </Grid>
            </ListItem>
            })}
          </List>
        </div>
      </Container>
    );
  }
};

export default withStyles(styles)(connect(mapStateToProps, { getFeatures, toggleFeature })(App))
