import CustomizedTable from "../CustomizedTable/CustomizedTable";
import {MTableToolbar} from "material-table";
import {TextField} from "@material-ui/core";
import React, { Fragment } from "react";
import { DatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from "moment";
import {ENDPOINTS} from "../../actions/types"; // choose your lib
import Select from '@material-ui/core/Select';

export default class PlanningTable extends CustomizedTable {

    constructor(props) {
        super(props);
        this.columns=[
            { title: 'Value', field: 'value', type: 'currency', initialEditValue: 0,  cellStyle: { textAlign: 'left' }},
            {
                title: 'Category', field: 'category.id',
                render: rowData => (
                    <>
                        <Select
                            native
                            value={rowData.category.id}>
                            {
                                this.props.information.categoriesFk.map((prop, key) => {
                                    return (
                                        <option value={prop.id} key={key} disabled={true}>{prop.name}</option>
                                    );
                                })
                            }
                        </Select>
                    </>
                ),
                editComponent: props => (
                    <>
                        <Select
                            native
                            value={props.value}
                            onChange={(e) => props.onChange(e.target.value)}
                        >
                            {
                                this.props.information.categoriesFk.map((prop, key) => {
                                    return (
                                        <option value={prop.id} key={key}>{prop.name}</option>
                                    );
                                })
                            }
                        </Select>
                    </>
                ),
                customFilterAndSearch: (value, rowData) => {
                    return rowData.category.name.includes(value) === true ? rowData : null;
                }

            }

        ];
        this.state = {
            ...this.state,
            selectedMonth: new Date(moment())
        };
    }

    handleCreateRow = (data) => {
        if(data.category === undefined) {
            data['category'] = this.props.information.categoriesFk[0];
        }

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

    firstComponentFetch = () => {
            this.props.getAllWithFK({
                type: this.props.type,
                method: 'get',
                fkEndpoints: ['CATEGORY'],
                config: {
                    reFetch: false,
                    data: {},
                    headers:{},
                    endpoint: `${ENDPOINTS[this.props.type]}/monthly`,
                    arguments: `size=5&page=0&date=${this.formatStateToDate(this.state.selectedMonth)}`
                }
            });
    };

    formatStateToDate = (date) => {
        let formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        return formattedDate;
    };

    handleMonthChange = (date) => {
        this.setState({
            ...this.state,
            selectedMonth: date
        });
        this.props.callApi({
            type: this.props.type,
            method: 'get',
            fkEndpoints: [ENDPOINTS['CATEGORY']],
            config: {
                reFetch: false,
                data: {},
                headers:{},
                endpoint: `${ENDPOINTS[this.props.type]}/monthly`,
                arguments: `size=${this.props.information.data.size}&page=${this.props.information.data.number}&date=${this.formatStateToDate(date)}`
            }
        });
    };

    returnCustomToolbar = (props) => {
        return (
            <div>
                <MTableToolbar {...props} />
                <div style={{ padding: "0px 10px", textAlign: "left" }}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            variant="inline"
                            openTo="year"
                            views={["year", "month"]}
                            label="Year and Month"
                            helperText="Select the Planning Month"
                            value={this.state.selectedMonth}
                            onChange={this.handleMonthChange}
                        />
                    </MuiPickersUtilsProvider>
                </div>
            </div>
        );
    };

}
