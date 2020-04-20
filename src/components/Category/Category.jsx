import React from "react";
import {Card, Container} from "reactstrap";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import {PropTypes} from "prop-types";
import Detail from "../../containers/Detail";
import CustomizedTable from "./CustomizedTable";
import {bindActionCreators} from "redux";
import * as appActions from "../../actions";
import {connect} from "react-redux";


class Category extends React.Component {

    constructor(props) {
        super(props);
    }

    UNSAFE_componentWillMount (): void {
    }

    componentDidMount (): void {
    }

    getMainContent (): React.ReactDOM {
        const columns=[
            { title: 'ID', field: 'id' },
            { title: 'Name', field: 'name' },
            { title: 'Created Date', field: 'createdWhen' }
        ];
        return (
            <>
                <Row className="mt-5 row-inside-tab">
                    <Col className="mb-5 mb-xl-0" xl="12">
                        <CustomizedTable columns={columns}
                                         type={'CATEGORY'}
                                         information={this.props.categories}
                                         callApi={this.props.callApi}/>
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
        categories: state.categories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        callApi: bindActionCreators(appActions.actions.callAPI, dispatch)
    };
}


Category.defaultProps = {
};

Category.propTypes = {
    children: PropTypes.node,
    categories: PropTypes.object,
    callApi: PropTypes.func
};



export default connect(mapStateToProps, mapDispatchToProps)(Category);
