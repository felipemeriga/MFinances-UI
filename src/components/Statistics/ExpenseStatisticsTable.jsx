import React from "react";
import {bindActionCreators} from "redux";
import * as appActions from "../../actions";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import {Card, CardHeader, Col, Row, Table} from "reactstrap";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ReactLoading from "react-loading";
import './expenseStatistics.scss';
import expenseStatistics from "../../reducers/expenseStatistics";
import {ENDPOINTS} from "../../actions/types";
import moment from "moment";


class ExpenseStatisticsTable extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            selectedMonth: new Date(moment()),
        };

    }

    UNSAFE_componentWillMount(): void {
        this.props.callApi({
            type: 'EXPENSE_STATISTICS',
            method: 'get',
            config: {
                data: {},
                headers: {},
                endpoint: `${ENDPOINTS['EXPENSE_STATISTICS']}`,
                arguments: `date=${this.formatStateToDate(this.state.selectedMonth)}`
            }
        });
    }

    handleMonthChange = (date) => {
        this.props.callApi({
            type: 'EXPENSE_STATISTICS',
            method: 'get',
            config: {
                data: {},
                headers: {},
                endpoint: `${ENDPOINTS['EXPENSE_STATISTICS']}`,
                arguments: `date=${this.formatStateToDate(date)}`
            }
        });

        this.setState({
            ...this.state,
            selectedMonth: date
        });
    };

    formatStateToDate = (date) => {
        let formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        return formattedDate;
    };

    renderTableRow = () => {
        return (
            <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                <tr>
                    <th scope="col">Category Name</th>
                    <th scope="col">Planned Value</th>
                    <th scope="col">Amount Spent</th>
                    <th scope="col">Remaining Value</th>
                </tr>
                </thead>
                <tbody>
                {
                    Object.keys(this.props.expenseStatistics.data).map((item, index) => (
                        <tr key={index}>
                            <th scope="row">{this.props.expenseStatistics.data[item].categoryName}</th>
                            <td>{this.props.expenseStatistics.data[item].plannedValue}</td>
                            <td>{this.props.expenseStatistics.data[item].amountSpent}</td>
                            <td>{this.props.expenseStatistics.data[item].remainingValue}</td>
                        </tr>

                    ))
                }

                </tbody>
            </Table>
        );
    };

    renderContent = () => {
        if(this.props.expenseStatistics.loading) {
            return (
                <div className={'container-flex'}>
                    <ReactLoading color={'#afdae3'} type={'spinningBubbles'} height={'15%'} width={'15%'} />
                </div>
            );
        } else {
            return (
                this.renderTableRow()
            );
        }
    };

    render() {
        return (
            <Card className="shadow">
                <CardHeader className="border-0">
                    <Row className="align-items-center">
                        <Col lg="6" xl="8">
                            <h3 className="mb-0">Planning x Spent</h3>
                        </Col>
                        <Col lg="6" xl="4">
                            <div style={{ padding: "0px 10px", textAlign: "left" }}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                        variant="inline"
                                        openTo="year"
                                        views={["year", "month"]}
                                        label="Year and Month"
                                        helperText="Select a month for checking expenses"
                                        value={this.state.selectedMonth}
                                        onChange={this.handleMonthChange}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                        </Col>
                    </Row>
                </CardHeader>
                {this.renderContent()}
            </Card>
        );

    }




}


function mapStateToProps(state) {
    return {
        expenseStatistics: state.expenseStatistics
    };
}

function mapDispatchToProps(dispatch) {
    return {
        callApi: bindActionCreators(appActions.actions.callAPI, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseStatisticsTable);

ExpenseStatisticsTable.defaultProps = {
};

ExpenseStatisticsTable.propTypes = {
    expenseStatistics: PropTypes.object,
    actions: PropTypes.object,
    callApi: PropTypes.func,
};
