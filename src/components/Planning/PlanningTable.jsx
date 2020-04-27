import CustomizedTable from "../CustomizedTable/CustomizedTable";
import {MTableToolbar} from "material-table";
import {TextField} from "@material-ui/core";
import React, { Fragment } from "react";
import { DatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib


export default class PlanningTable extends CustomizedTable {

    constructor(props) {
        super(props);
        this.columns=[
            { title: 'Value', field: 'value', type: 'currency'},
            { title: 'Date', field: 'date', type: 'date'},
            { title: 'Category', field: 'categoryId'}
        ];
    }

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
                            // value={selectedDate}
                            // onChange={handleDateChange}
                        />
                    </MuiPickersUtilsProvider>
                </div>
            </div>
        );
    };

}
