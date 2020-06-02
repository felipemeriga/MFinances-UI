import React from "react";
import Detail from "../../containers/Detail";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import CategoryTable from "../Category/CategoryTable";
import PlanningTable from "../Planning/PlanningTable";
import {bindActionCreators} from "redux";
import * as appActions from "../../actions";
import {PropTypes} from "prop-types";
import {connect} from "react-redux";


class Planning extends React.Component {

    constructor(props) {
        super(props);
    }

    UNSAFE_componentWillMount (): void {
    }

    componentDidMount (): void {
    }

    getMainContent (): React.ReactDOM {
        return (
            <>
                <Row className="mt-5 row-inside-tab">
                    <Col className="mb-5 mb-xl-0" xl="12">
                        <PlanningTable
                            enableSearch={false}
                            type={'PLANNING_TABLE'}
                            information={this.props.planningTable}
                            callApi={this.props.callApi}
                            getAllWithFK={this.props.getAllWithFK}
                            validateCategoryAlreadyExistsInMonth={this.props.validateCategoryAlreadyExistsInMonth}
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
        planningTable: state.planningTable
    };
}

function mapDispatchToProps(dispatch) {
    return {
        callApi: bindActionCreators(appActions.actions.callAPI, dispatch),
        getAllWithFK: bindActionCreators(appActions.actions.getAllWithFK, dispatch),
        validateCategoryAlreadyExistsInMonth: bindActionCreators(appActions.actions.validateCategoryAlreadyExistsInMonth, dispatch)
    };
}

Planning.defaultProps = {
};

Planning.propTypes = {
    children: PropTypes.node,
    planningTable: PropTypes.object,
    callApi: PropTypes.func,
    getAllWithFK: PropTypes.func,
    validateCategoryAlreadyExistsInMonth: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Planning);
