import MaterialTable from 'material-table';
import { TablePagination } from '@material-ui/core';
import React from 'react';
import {PropTypes} from "prop-types";
import {ENDPOINTS} from "../../actions/types";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


export default class CustomizedTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedData: [],
            dialogOpen: false
        };
    }

    UNSAFE_componentWillMount (): void {
        this.props.callApi({
            type: this.props.type,
            method: 'get',
            config: {
                reFetch: false,
                data: {},
                headers:{},
                endpoint: ENDPOINTS[this.props.type],
                arguments: 'size=5&page=0'
            }
        });
    }

    handleChangePage = (e,page) => {
        this.props.callApi({
            type: this.props.type,
            method: 'get',
            config: {
                reFetch: false,
                data: {},
                headers:{},
                endpoint: ENDPOINTS[this.props.type],
                arguments: `size=${this.props.information.data.size}&page=${page}`
            }
        });
    };

    handleChangeRowPerPage = (numberOfElementsPerPage) => {
        this.props.callApi({
            type: this.props.type,
            method: 'get',
            config: {
                reFetch: false,
                data: {},
                headers:{},
                endpoint: ENDPOINTS[this.props.type],
                arguments: `size=${numberOfElementsPerPage}&page=${this.props.information.data.number}`
            }
        });
    };

    handleUpdateRow = (data) => {
        this.props.callApi({
            type: this.props.type,
            method: 'put',
            config: {
                reFetch: false,
                data: data,
                headers:{},
                endpoint: `${ENDPOINTS[this.props.type]}/${data.id}`,
                arguments: ''
            }
        });
    };

    handleCreateRow = (data) => {
        this.props.callApi({
            type: this.props.type,
            method: 'post',
            config: {
                reFetch: true,
                data: data,
                headers:{},
                endpoint: ENDPOINTS[this.props.type],
                arguments: ''
            }
        });
    };

    handleDeleteRow = (data) => {
        this.props.callApi({
            type: this.props.type,
            method: 'delete',
            config: {
                reFetch: true,
                data: data,
                headers:{},
                endpoint: `${ENDPOINTS[this.props.type]}/${data.id}`,
                arguments: ''
            }
        });
    };

    handleDeleteRows = () => {
        let ids = '';
        this.state.selectedData.filter(obj=>{
            ids = `${ids},${obj.id}`;
        });
        ids = ids.substring(1);
        this.props.callApi({
            type: this.props.type,
            method: 'delete',
            config: {
                reFetch: true,
                data: {},
                headers:{},
                endpoint: `${ENDPOINTS[this.props.type]}/delete/${ids}`,
                arguments: ''
            }
        });
        this.setState({
            selectedData: {},
            dialogOpen: false
        });
    };

    onCancelClicked = () => {
        this.setState({
            selectedData: {},
            dialogOpen: false
        });
    };

    render() {
        return (
            <>
            <MaterialTable
                isLoading={this.props.information.loading}
                onChangeRowsPerPage={pageSize => this.handleChangeRowPerPage(pageSize)}
                columns={this.props.columns}
                data={this.props.information.data.content}
                options={{
                    actionsColumnIndex: -1,
                    emptyRowsWhenPaging: false,
                    showTitle: false,
                    sorting: true,
                    selection: true
                }}
                actions={[
                    {
                        tooltip: 'Remove All Selected Categories',
                        icon: 'delete',
                        onClick: (evt, data) => {
                            this.setState({
                                selectedData: data,
                                dialogOpen: true
                            });
                        }
                    }
                ]}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    this.handleCreateRow(newData);
                                }
                                resolve();
                            }, 1000);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    this.handleUpdateRow(newData);
                                }
                                resolve();
                            }, 1000);
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    this.handleDeleteRow(oldData);
                                }
                                resolve();
                            }, 1000);
                        }),
                }}
                components={{
                    Pagination: props => (
                        <TablePagination
                            {...props}
                            rowsPerPageOptions={[5, 10, 20, 30]}
                            rowsPerPage={this.props.information.data.size}
                            count={this.props.information.data.totalElements}
                            page={this.props.information.data.number}
                            onChangePage={(e, page) =>
                                this.handleChangePage(e, page)
                            }
                        />
                    ),
                }}
            />
                <Dialog
                    open={this.state.dialogOpen}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Delete selected items?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            All the selected items from the table will be deleted, remember that once deleted you can not
                            get them again.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onCancelClicked} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleDeleteRows} color="primary" autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

CustomizedTable.defaultProps = {
};

CustomizedTable.propTypes = {
    information: PropTypes.object,
    callApi: PropTypes.func,
    columns: PropTypes.arrayOf(PropTypes.object),
    type: PropTypes.string
};
