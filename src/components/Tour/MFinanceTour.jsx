import React from "react";
import Tour from "reactour";
import {PropTypes} from "prop-types";
import {bindActionCreators} from "redux";
import * as appActions from "../../actions";
import {connect} from "react-redux";
import {ENDPOINTS} from "../../actions/types";
import Cookies from 'universal-cookie';


class MFinanceTour extends React.Component {
    cookies = new Cookies();

    constructor(props) {
        super(props);
        // Use this for testing purposes
        // this.cookies.remove('tour', { path: '/' });

        const tour = this.cookies.get('tour');
        let isEnabled = false;
        if(tour !== 'true') {
            isEnabled = true;
        }
        this.state = {
            isEnabled: isEnabled
        };


    }

    onRequestClose = () => {
        this.setState( {
            isEnabled: false
        });
        this.cookies.set('tour', 'true', { path: '/' });

    };

    render() {
        const steps = [
            {
                position: 'left',
                selector: '.first-step',
                content: 'Hello, looks like it\'s your first time here, let\'s have an overview',

            },
            {
                selector: '.second-step',
                content: 'First of all, you need to create categories, which classifies our expenses in a ' +
                    'common group',
            },
            {
                selector: '.third-step',
                content: 'Having categories, you need to create a planning, which means how much I\'m planning to' +
                    ' spend in this category in a period of one month',
            },
            {
                selector: '.fourth-step',
                content: 'Now you just have to put your expenses in Cash-Flow',
            },
            {
                selector: '.fifth-step',
                content: 'Finally, this is the dashboard, where you can get insights from your finances',
            },
        ];
        return (
            <>
                <Tour
                    steps={steps}
                    isOpen={this.state.isEnabled}
                    onRequestClose={this.onRequestClose}
                />
            </>
        );
    }

}

export default MFinanceTour;

MFinanceTour.defaultProps = {
};

MFinanceTour.propTypes = {
};
