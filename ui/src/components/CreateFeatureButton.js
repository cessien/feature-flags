import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

class CreateFeatureButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            createMode: false,
            key: "",
            enabled: false,
            description: "",
        };
    }

    renderButton = () => {
        return (<Button
            color="primary"
            size="large"
            fullWidth={true}
            startIcon={<AddIcon />}
            onClick={() => { this.setState({ createMode: true, }) }}
          >
            Create Feature
          </Button>);
    }

    handleClose = () => {
        this.setState({
            createMode: false,
            key: "",
            enabled: false,
            description: "",
        });
    }

    handleCreate = () => {
        if (this.props.onCreate) {
            this.props.onCreate(this.state.key, this.state.enabled, this.state.description);
        }
        this.handleClose();
    }

    renderFeaturePrompt = () => {
        return (
        <Dialog open={this.state.createMode} onClose={this.handleClose} >
            <DialogTitle>Create Feature</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Create the feature key and description here. After creation you can edit the rollout progress, 
                    enablement, user and group inclusion lists.
                </DialogContentText>
                <FormControlLabel control={
                        <TextField value={this.state.key} onChange={(e) => { this.setState(s => ({ ...s, key: e.target.value})) }} />
                    } label="feature name" />
                <FormControlLabel control={
                        <TextField value={this.state.description} onChange={(e) => { this.setState(s => ({ ...s, description: e.target.value})) }} />
                    } label="feature description" />
                <FormControlLabel control={
                        <Switch
                            checked={this.state.enabled}
                            onChange={(e) => { this.setState(s => ({ ...s, enabled: e.target.checked})) }}
                        />
                    } label={"The feature will default to " + (this.state.enabled ? "ON" : "OFF")} />
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={this.handleCreate} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>)
    }

    render() {
        if (this.state.createMode === false) {
            return this.renderButton();
        } else {
            return this.renderFeaturePrompt();
        }
    }
};

export default withStyles(styles)(CreateFeatureButton);
