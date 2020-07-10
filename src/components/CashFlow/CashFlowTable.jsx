import CustomizedTable from "../CustomizedTable/CustomizedTable";
import moment from "moment";
import {ENDPOINTS} from "../../actions/types";
import {MTableToolbar} from "material-table";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import React from "react";
import Select from "@material-ui/core/Select/Select";


export default class CashFlowTable extends CustomizedTable {

    constructor(props) {
        super(props);
        this.columns=[
            { title: 'Name', field: 'name'},
            { title: 'Date', field: 'date', type: 'date'},
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

            },
            {title: 'Flow', field: 'flow', lookup: {
                    'INBOUND': 'INBOUND',
                    'OUTBOUND': 'OUTBOUND'
                }
            }
        ];


        this.state = {
            ...this.state,
            selectedMonth: new Date(moment()),
        };

    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        console.log(this.props.information.data.content);

    }


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

    handleCreateRow = (data) => {

        // This is a little workaround, because the mbrn-material-table don't send a proper selected data
        // from the dropdown, if basically don't click on it
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

    formatStateToDate = (date) => {
        let formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        return formattedDate;
    };

    handleMonthChange = (date) => {
        this.props.callApi({
            selectedMonth: date,
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
                            helperText="Select the Cash Flow Month"
                            value={this.props.information.selectedMonth}
                            onChange={this.handleMonthChange}
                        />
                    </MuiPickersUtilsProvider>
                </div>
            </div>
        );
    };
}
