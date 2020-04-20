import React from 'react';
import { Container, Nav, NavItem, NavLink, TabContent, TabPane, Card} from 'reactstrap';
import { PropTypes } from 'prop-types';
import Row from 'reactstrap/es/Row';
import './detail.scss';
import Col from 'reactstrap/es/Col';

class Detail extends React.Component {

    constructor(props) {
        super(props);
    }

    UNSAFE_componentWillMount (): void {
    }

    componentDidMount (): void {
    }


    render () {
        const children = this.props.children;
        return (
            <>
                <div className="header bg-gradient-info pb-8">
                </div>
                <Container className="mt--7 extend-main-content" fluid>
                        <Row className="mt-5">
                            <Col className="mb-5 mb-xl-0" xl="12">
                                <Card className="shadow padding-on-tab tab-background">
                                    {children}
                                </Card>
                            </Col>
                        </Row>
                </Container>
            </>
        );
    }
}

Detail.propTypes = {
    children: PropTypes.node,
};

export default Detail;
