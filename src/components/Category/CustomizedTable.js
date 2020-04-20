import MaterialTable from 'material-table';
import { TablePagination } from '@material-ui/core';
import React from 'react';
import {PropTypes} from "prop-types";
import {ENDPOINTS} from "../../actions/types";

export default class CustomizedTable extends React.Component {

    constructor(props) {
        super(props);
        console.log(ENDPOINTS[this.props.type]);
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
        console.log(page);
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

    render() {
        return (
            <MaterialTable
                isLoading={this.props.information.loading}
                onChangeRowsPerPage={pageSize => this.handleChangeRowPerPage(pageSize)}
                columns={this.props.columns}
                data={this.props.information.data.content}
                options={{
                    emptyRowsWhenPaging: false,
                    showTitle: false,
                    sorting: true
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
