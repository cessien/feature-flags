import './App.css';
import React from 'react';
import { connect } from 'react-redux';
import { getFeatures, addFeature, removeFeature } from './redux/actions';
import { getAllFeatures } from './redux/selectors';
import Api from './redux/async';
import Header from './components/Header';
import Feature from './components/Feature';
import CssBaseline from '@material-ui/core/CssBaseline';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { List, ListItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  featureList: {
    width: "100vmin",
    paddingTop: '5em',
  },
});

const mapStateToProps = state => {
  return { ...getAllFeatures(state) };
}

const asyncAddFeature = (feature) => {
  return function (dispatch) {
    return Api.addFeature(feature).then(
      resp => {
        resp.json().then(f => {
          dispatch(addFeature(f));
        })
      },
      e => console.log(e)
    );
  }
}

const asyncRemoveFeature = (feature) => {
  return function (dispatch) {
    return Api.removeFeature(feature).then(
      resp => {
        resp.json().then(f => {
          dispatch(removeFeature(f));
        })
      },
      e => console.log(e)
    );
  }
}

class App extends React.Component {
  componentDidMount() {
    this.props.getFeatures();
  }

  handleAddFeature = (event) => {
    this.props.asyncAddFeature({
      key: "app_some_other_feature_" + Math.floor(Math.random() * 10000),
      description: "Some other feature we want to control",
      enabled: true,
      users: [
      ],
      groups: [
        "beta-testers",
        "experimental2"
      ],
      percentage: 10
    });
  }

  render() {
    const { classes, features } = this.props;

    return (
      <Container component="main" maxWidth="lg" >
        <CssBaseline />
        <div className={classes.paper}>
          <Header />
          <List className={classes.featureList}>
            <ListItem key={"add-feature"}>
              <Button
                color="primary"
                size="large"
                fullWidth={true}
                startIcon={<AddIcon />}
                onClick={this.handleAddFeature}
              >
                Create Feature
              </Button>
            </ListItem>
            {features && Object.keys(features).map((l,i) => <Feature key={l} row={l} feature={features[l]} />)}
          </List>
        </div>
      </Container>
    );
  }
};

export default withStyles(styles)(connect(mapStateToProps, { getFeatures, asyncAddFeature })(App))
