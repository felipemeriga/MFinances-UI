/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import {connect} from "react-redux";
import * as appActions from "../../actions";
import { bindActionCreators } from 'redux';
import {PropTypes} from 'prop-types';
import {HeaderLoading} from "./HeaderLoading";
import {ENDPOINTS} from "../../actions/types";

class HeaderStatistics extends React.Component {


    constructor(props) {
        super(props);
        this.icons = ['fas fa-chart-bar', 'fas fa-chart-pie', 'fas fa-users','fas fa-percent'];
    }

    UNSAFE_componentWillMount(): void {
        this.props.callApi({
            type: 'HEADER_STATISTICS',
            method: 'get',
            config: {
                data: {},
                headers: {},
                endpoint: `${ENDPOINTS['HEADER_STATISTICS']}`,
                arguments: ''
            }
        });
    }

    gettingCards = () => {
        return (
            Object.keys(this.props.headerStatistics.data).map((item, index) => (
                <Col lg="6" xl="3" key={index}>
                    <Card className="card-stats mb-4 mb-xl-0">
                        <CardBody>
                            <Row>
                                <div className="col">
                                    <CardTitle
                                        tag="h5"
                                        className="text-uppercase text-muted mb-0"
                                    >
                                        {this.props.headerStatistics.data[item].categoryName}
                                    </CardTitle>
                                    <span className="h2 font-weight-bold mb-0">
                                 $ {this.props.headerStatistics.data[item].plannedValue}
                              </span>
                                </div>
                                <Col className="col-auto">
                                    <div className="icon icon-shape bg-blue text-white rounded-circle shadow">
                                        <i className={this.icons[index]} />
                                    </div>
                                </Col>
                            </Row>
                            <p className="mt-3 mb-0 text-muted text-sm">

                                {
                                    this.props.headerStatistics.data[item].plannedPercentageReached < 100 ?
                                        (
                                            <span className="text-success mr-2">
                                                 <i className="fa fa-arrow-up" />
                                                {this.props.headerStatistics.data[item].plannedPercentageReached.toPrecision(4)}
                                            </span>

                                        ) :
                                        (
                                            <span className="text-warning mr-2">
                                                 <i className="fa fa-arrow-down" />
                                                {this.props.headerStatistics.data[item].plannedPercentageReached.toPrecision(4)}
                                            </span>
                                        )
                                }
                            </p>
                        </CardBody>
                    </Card>
                </Col>

            ))
        );
    };

  renderContent = () => {
      if(this.props.headerStatistics.loading) {
          return (
              <Col lg="6" xl="12">
                  <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody>
                          <HeaderLoading/>
                      </CardBody>
                  </Card>
              </Col>
          );
      } else {
          return (
            <>
                {this.gettingCards()}
            </>
        );
      }
  };

  render() {
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                  {this.renderContent()}
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }

}


function mapStateToProps(state) {
  return {
      headerStatistics: state.headerStatistics
  };
}

function mapDispatchToProps(dispatch) {
  return {
      callApi: bindActionCreators(appActions.actions.callAPI, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderStatistics);

HeaderStatistics.defaultProps = {
};

HeaderStatistics.propTypes = {
    headerStatistics: PropTypes.object,
  actions: PropTypes.object,
    callApi: PropTypes.func,
};
