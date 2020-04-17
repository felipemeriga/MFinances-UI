import React from "react";
import {Card, Container} from "reactstrap";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import Description from "../../containers/Description";
import {PropTypes} from "prop-types";
import Detail from "../../containers/Detail";


class Category extends React.Component {

    constructor(props) {
        super(props);
    }

    UNSAFE_componentWillMount (): void {
    }

    componentDidMount (): void {
    }

    getMainContent (): React.ReactDOM {
        const columns = ['ID', 'Name'];
        return (
            <>
                <Row className="mt-5 row-inside-tab">
                    <Col className="mb-5 mb-xl-0" xl="12">
                        <Description columns={columns} className="align-items-center table-flush" responsive/>
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

Category.propTypes = {
    children: PropTypes.node,
};

export default Category;
