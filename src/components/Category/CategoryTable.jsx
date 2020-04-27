import React from "react";
import CustomizedTable from "../CustomizedTable/CustomizedTable";
import MaterialTable, {MTableToolbar} from "material-table";
import {TextField} from "@material-ui/core";



export default class CategoryTable extends CustomizedTable {
    constructor(props) {
        super(props);
        this.columns=[
            { title: 'ID', field: 'id', editable: 'never' },
            { title: 'Name', field: 'name'},
            { title: 'Last Updated', field: 'updatedWhen', type: 'datetime', editable: 'never'}
        ];
    }

}
