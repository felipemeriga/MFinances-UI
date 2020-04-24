import React from "react";
import CustomizedTable from "../CustomizedTable/CustomizedTable";



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
