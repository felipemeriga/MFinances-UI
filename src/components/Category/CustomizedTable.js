import MaterialTable from 'material-table';
import { TablePagination } from '@material-ui/core';
import React from 'react';
import {PropTypes} from "prop-types";
import {ENDPOINTS} from "../../actions/types";

export default class CustomizedTable extends React.Component {

    constructor(props) {
        super(props);
    }

    UNSAFE_componentWillMount (): void {
        this.props.callApi({
            type: this.props.type,
            method: 'get',
            config: {
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
                data: data,
                headers:{},
                endpoint: ENDPOINTS[this.props.type],
                arguments: ''
            }
        });
    };

    render() {
        return (
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
                        onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
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
