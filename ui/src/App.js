import './App.css';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import FlagIcon from '@material-ui/icons/FlagOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { List, ListItem } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';

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
  featureList: {
    width: "40vmin",
  },
}));

const features = [
  {
    key: "pr.ui-designer-hint",
    description: "Users get hint notifications to tag UI desingers on PRs",
    enabled: true,
    users: [
      "cessien",
      "sma",
      "-flam"
    ],
    groups: [
      "early-adopters"
    ]
  },
]

export default function App() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FlagIcon />
        </Avatar>
        <Typography component="h3" variant="h3">
          Feature Flags
        </Typography>
        <List className={classes.featureList}>
          {features.map(l => {
          return <ListItem key={l}>
            <Grid container spacing={2}>
              <Grid item md={2}>
                <Switch
                  checked={state.checkedA}
                  onChange={handleChange}
                  name={state.checkedA ? "ON" : "DISABLED"}
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
              </Grid>
              <Grid item md={10}>
                things
              </Grid>
            </Grid>
          </ListItem>
          })}
        </List>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
        </Button>
      </div>
    </Container>
  );
};
