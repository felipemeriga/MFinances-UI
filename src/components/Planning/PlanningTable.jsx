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
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button";

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
            selectedMonth: new Date(moment()),
            categoryAlreadyExistsDialog: false,
        };
    }

    handleCreateRow = (data) => {
        // This is a little workaround, because the mbrn-material-table don't send a proper selected data
        // from the dropdown, if basically don't click on it
        if(data.category === undefined) {
            data['category'] = this.props.information.categoriesFk[0];
        }
        // Validation to make sure the value is casted to Float, and all commas converted to dots.
        data.value = parseFloat(data.value.replace(",", "."));

        this.props.validateCategoryAlreadyExistsInMonth({
            method: 'get',
            data: data,
            config: {
                data: {},
                headers:{},
                endpoint: `${ENDPOINTS[this.props.type]}/validate/${data.category.id}`,
                arguments: `date=${this.formatStateToDate(this.state.selectedMonth)}`
            }
        });

        // this.props.callApi({
        //     type: this.props.type,
        //     method: 'post',
        //     config: {
        //         reFetch: true,
        //         data: data,
        //         headers:{},
        //         endpoint: ENDPOINTS[this.props.type],
        //         arguments: ''
        //     }
        // });

    };

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if(!prevProps.information.categoryAlreadyExists && this.props.information.categoryAlreadyExists) {
            this.setState({
                ...this.state,
                categoryAlreadyExistsDialog: true,
            });
        }
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

    handleSameMonthExistenceCategoryOnCancelClicked = () => {
        this.setState({
            ...this.state,
            categoryAlreadyExistsDialog: false
        });
    };

    handleSameMonthExistenceCategoryOnConfirmClicked = () => {
        let updatePlanning = this.props.information.alreadyExistingWithinMonth;
        updatePlanning.value = updatePlanning.value + this.props.information.selected.value ;

        this.setState({
            ...this.state,
            categoryAlreadyExistsDialog: false
        });

        this.props.callApi({
            type: this.props.type,
            method: 'put',
            config: {
                reFetch: true,
                data: updatePlanning,
                headers:{},
                endpoint: `${ENDPOINTS[this.props.type]}/${updatePlanning.id}`,
                arguments: ''
            }
        });

    };

    handleSameMonthExistenceCategory = () => {
        if(this.state.categoryAlreadyExistsDialog) {
            return (
                <Dialog
                    open={this.state.categoryAlreadyExistsDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Add to the existing one?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            It seems that you are trying to create a new planning with the category
                            <br></br>
                            <b>{this.props.information.alreadyExistingWithinMonth.category.name}</b>,
                            <br></br>
                            but there is already a planning of
                            that category within this month, do you want us to add the value to the already created
                            one?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleSameMonthExistenceCategoryOnCancelClicked} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSameMonthExistenceCategoryOnConfirmClicked} color="primary"
                                autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            );
        }
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
                {this.handleSameMonthExistenceCategory()}
            </div>
        );
    };

}
