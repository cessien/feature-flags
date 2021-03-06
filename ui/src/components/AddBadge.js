import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import PersonIcon from '@material-ui/icons/Person';
import NoPersonIcon from '@material-ui/icons/NotInterested';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Close';
import GroupIcon from '@material-ui/icons/Group';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
    container: {
        display: 'inline-flex', 
        paddingRight: '.5em',
    },
    doneIcon: {
        marginTop: '16px',
        color: theme.palette.primary.light,
    },
    cancelIcon: {
        marginTop: '16px',
        color: theme.palette.secondary.light,
    },
});

class Addbadge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'chip',
            exclusion: false,
            text: "",
        };
    }

    enterEdit = (event) => {
        this.setState({
            mode: 'edit',
        })
    }

    cancelEdit = (event) => {
        this.setState({
            mode: 'chip',
            text: '',
        })
    }

    create = () => {
        if (this.props.onCreate) {
            this.props.onCreate(this.state.text)
            this.cancelEdit()
        }
    }

    getIcon = (type, exclude) => {
        if (type === "group") {
            return <GroupIcon />
        }

        return exclude ? <NoPersonIcon /> : <PersonIcon />
    }

    handleTextChange = (event) => {
        this.setState({
            text: event.target.value,
        })
    }

    handleSubmit = (event) => {
        switch(event.key) {
            case 'Enter':
                this.create();
                break;
            case 'Escape':
                this.cancelEdit();
                break;
            default:
        }
    }

    renderEditableGroup = (classes) => (
        <Box 
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            maxWidth='14em'
            className={classes.container}
        >
            <TextField label={this.props.type + " name"} value={this.state.text} focused autoFocus onKeyUp={this.handleSubmit} onChange={this.handleTextChange} />
            <IconButton size='small' edge='start' onClick={this.cancelEdit}>
                <CancelIcon className={classes.cancelIcon} />
            </IconButton>
            <IconButton size='small' edge='end' onClick={this.create}>
                <DoneIcon className={classes.doneIcon} />
            </IconButton>
        </Box>
    );

    renderGroup = (classes) => (
        <Chip 
            icon={this.getIcon(this.props.type, this.state.exclusion)} 
            label={"add " + this.props.type}
            variant="outlined"
            color={this.props.type==='group' ? 'primary' : 'secondary'}
            clickable
            deleteIcon={<AddIcon />} 
            onDelete={this.enterEdit}
            onClick={this.enterEdit} />
    )

    render() {
        const { classes } = this.props;

        switch(this.state.mode) {
            case 'edit':
                return this.renderEditableGroup(classes);
            case 'chip':
            default:
                return this.renderGroup(classes);
        }
    }

}

export default withStyles(styles)(Addbadge);