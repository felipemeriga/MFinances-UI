import React from "react";
import Detail from "../../containers/Detail";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as appActions from "../../actions";
import {PropTypes} from "prop-types";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import CashFlowTable from "./CashFlowTable";


class CashFlow extends React.Component {

    constructor(props) {
        super(props);
    }

    getMainContent (): React.ReactDOM {
        return (
            <>
                <Row className="mt-5 row-inside-tab">
                    <Col className="mb-5 mb-xl-0" xl="12">
                        <CashFlowTable
                            enableSearch={false}
                            type={'CASH_FLOW_TABLE'}
                            information={this.props.cashFlowTable}
                            callApi={this.props.callApi}
                            getAllWithFK={this.props.getAllWithFK}
                        />
                    </Col>
                </Row>
            </>
        );
    }

    render () {
        return (
            <Detail>
                {this.getMainContent()}
            </Detail>
        );
    }





}

function mapStateToProps(state) {
    return {
        cashFlowTable: state.cashFlowTable
    };
}

function mapDispatchToProps(dispatch) {
    return {
        callApi: bindActionCreators(appActions.actions.callAPI, dispatch),
        getAllWithFK: bindActionCreators(appActions.actions.getAllWithFK, dispatch),
    };
}

CashFlow.defaultProps = {
};

CashFlow.propTypes = {
    children: PropTypes.node,
    cashFlowTable: PropTypes.object,
    callApi: PropTypes.func,
    getAllWithFK: PropTypes.func
};


export default connect(mapStateToProps, mapDispatchToProps)(CashFlow);
