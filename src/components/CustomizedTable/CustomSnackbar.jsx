import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {PropTypes} from "prop-types";

export default class CustomSnackbars extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open
        };
    }



    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            open: false
        });
    };


    render() {
        return (
            <Snackbar open={this.state.open} autoHideDuration={4000} onClose={this.handleClose}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert severity={this.props.severity}>{this.props.message}</Alert>
            </Snackbar>
        );
    }

}


CustomSnackbars.defaultProps = {
};

CustomSnackbars.propTypes = {
    open: PropTypes.bool,
    message: PropTypes.string,
    severity: PropTypes.string
};
