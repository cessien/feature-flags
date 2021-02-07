import './App.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import FlagIcon from '@material-ui/icons/FlagOutlined';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import NoPersonIcon from '@material-ui/icons/NotInterested';
import FilterListIcon from '@material-ui/icons/FilterList';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { List, ListItem } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import LinearProgress from '@material-ui/core/LinearProgress';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
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
}));

const features = [
  {
    key: "pr.ui-designer-hint",
    description: "Users get hint notifications to tag UI designers on PRs",
    enabled: true,
    users: [
      "cessien",
      "sma",
      "-flam"
    ],
    groups: [
      "early-adopters"
    ],
    percentage: 75
  },
  {
    key: "app.some-feature",
    description: "Some feature we want to control",
    enabled: false,
    users: [
      "hermione",
      "sma",
      "-flam",
      "remi",
      "-scarface"
    ],
    groups: [
    ],
    percentage: 10
  },
]

const selectFeatures = state => state.features

export default function App() {
  const state = useState({features: []})
  const classes = useStyles()

  const feats = useSelector(selectFeatures)
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch({ type: 'flags/featureToggled', payload: event.target.checked })
  };

  return (
    <Container component="main" maxWidth="lg" alignLeft>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FlagIcon />
        </Avatar>
        <Typography component="h3" variant="h3" alignLeft>
          Feature Flags
        </Typography>
        <List className={classes.featureList}>
          {feats.map(l => {
          return <ListItem key={l} divider className={classes.feature}>
            <Grid container spacing={2} alignContent="center">
              <Grid item xs={2}>
                <FormGroup>
                  <FormControlLabel control={
                    <Switch
                      checked={l.enabled}
                      onChange={handleChange}
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
};
