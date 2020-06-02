import CustomizedTable from "../CustomizedTable/CustomizedTable";
import moment from "moment";


export default class CashFlowTable extends CustomizedTable {

    constructor(props) {
        super(props);
        this.columns=[
            { title: 'ID', field: 'id', editable: 'never' },
            { title: 'Name', field: 'name'},
            { title: 'Value', field: 'value', type: 'currency', initialEditValue: 0,  cellStyle: { textAlign: 'left' }}
        ];


        this.state = {
            ...this.state,
            selectedMonth: new Date(moment()),
        };

    }
}
