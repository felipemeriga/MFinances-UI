import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CustomizedTable from "./CustomizedTable";
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
            <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert severity='success'>AEEEEE</Alert>
            </Snackbar>
        );
    }

}


CustomSnackbars.defaultProps = {
};

CustomSnackbars.propTypes = {
    open: PropTypes.bool,
};
