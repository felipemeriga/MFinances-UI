import React from 'react';
import { CardHeader, Card, Row, Col, Table} from 'reactstrap/';
import { PropTypes } from 'prop-types';


class Description extends React.Component {


    getHeader (): React.ReactDOM {
        if(this.props.header) {
            return (
                <CardHeader className="bg-transparent border-0">
                    <h3 className="text-white mb-0">{this.props.header}</h3>
                </CardHeader>
            );
        }
    }

    getColumns (): React.ReactDOM {
        return (
            this.props.columns.map((value, index) => {
            return (
                <th scope="col" key={index}>{value}</th>
            );
        }));
    }

    returnData (): React.ReactDOM {
        return (
            <>
                {
                    this.props.data.map((value, index) => {


                    })
                }
            </>
        );
    }

  render () {
    return (
        <>
            <Card className="bg-default shadow card-max-height">
                {this.getHeader()}
                <Table className="align-items-center table-dark table-flush card-max-height" responsive>
                    <thead className="thead-dark">
                    <tr>
                        {this.getColumns()}
                        <th scope="col" />
                    </tr>
                    </thead>
                    <tbody>
                    {/*{this.retrieveColumns()}*/}
                    </tbody>
                </Table>
            </Card>
        </>
    );
  }
}

Description.propTypes = {
    description: PropTypes.string,
    header: PropTypes.string,
    columns: PropTypes.arrayOf(String),
    data: PropTypes.arrayOf(object)
};

export default Description;
