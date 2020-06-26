import React from "react";
import moment from "moment";
import {Card, CardBody, CardHeader, Col, Nav, NavItem, NavLink, Row, Table} from "reactstrap";
import classnames from "classnames";
import Select from "@material-ui/core/Select/Select";
import {Line} from "react-chartjs-2";
import {chartExample1} from "../../variables/charts";
import {bindActionCreators} from "redux";
import * as appActions from "../../actions";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import {ENDPOINTS} from "../../actions/types";
import ReactLoading from "react-loading";


class AverageExpenses extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            activeNav: 1,
            chartExample1Data: "data1",
            numberOfMonths: 2,
        };
    }

    UNSAFE_componentWillMount(): void {
        this.props.callApi({
            type: 'AVERAGE_EXPENSES',
            method: 'get',
            config: {
                data: {},
                headers: {},
                endpoint: `${ENDPOINTS['AVERAGE_EXPENSES']}/${this.state.numberOfMonths}`,
                arguments: ``
            }
        });
    }

    onChangeNumberOfMonths = (e) => {
        this.props.callApi({
            type: 'AVERAGE_EXPENSES',
            method: 'get',
            config: {
                data: {},
                headers: {},
                endpoint: `${ENDPOINTS['AVERAGE_EXPENSES']}/${e.target.value}`,
                arguments: ``
            }
        });

        this.setState({
            ...this.state,
            numberOfMonths: e.target.value
        });
    };

    renderContent = () => {
        if(this.props.averageExpenses.loading) {
            return (
                <div className={'container-flex'}>
                    <ReactLoading color={'#afdae3'} type={'spinningBubbles'} height={'15%'} width={'15%'} />
                </div>
            );
        } else {
            return (
                <CardBody>


                    <Table className="align-items-center table-dark table-flush card-max-height" responsive>
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">Category Name</th>
                            <th scope="col">Average</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            Object.keys(this.props.averageExpenses.data).map((item, index) => (
                                <tr key={index}>
                                    <th scope="row">{this.props.averageExpenses.data[item].name}</th>
                                    <td>{this.props.averageExpenses.data[item].average.toPrecision(5)}</td>
                                </tr>

                            ))
                        }
                        </tbody>
                    </Table>
                </CardBody>
            );
        }
    };

    render() {
        return (
            <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                        <div className="col">
                            <h6 className="text-uppercase text-light ls-1 mb-1">
                                Average
                            </h6>
                            <h2 className="text-white mb-0">Categories Expenses Through Months</h2>
                        </div>
                        <div className="col">
                            <Nav className="justify-content-end" pills>
                                <NavItem>
                                    <NavLink
                                        className={classnames("py-2 px-3", {
                                            active: true
                                        })}
                                        data-toggle="tab"
                                        href="#pablo"
                                    >
                                        <span className="py-2 px-3">Number of Months</span>
                                        <Select
                                            native
                                            value={this.state.numberOfMonths}
                                            onChange={(e) => this.onChangeNumberOfMonths(e)}
                                        >
                                            <option value={6}>6 </option>
                                            <option value={5}>5 </option>
                                            <option value={4}>4 </option>
                                            <option value={3}>3 </option>
                                            <option value={2}>2 </option>
                                            <option value={1}>1 </option>

                                        </Select>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                    </Row>
                </CardHeader>
                {this.renderContent()}
            </Card>
        );
    }

}

function mapStateToProps(state) {
    return {
        averageExpenses: state.averageExpenses
    };
}

function mapDispatchToProps(dispatch) {
    return {
        callApi: bindActionCreators(appActions.actions.callAPI, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AverageExpenses);

AverageExpenses.defaultProps = {
};

AverageExpenses.propTypes = {
    averageExpenses: PropTypes.object,
    actions: PropTypes.object,
    callApi: PropTypes.func,
};
