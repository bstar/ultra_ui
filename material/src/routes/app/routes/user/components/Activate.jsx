import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';


class Activate extends Component {

    render () {
        return (
            <div className="container-fluid no-breadcrumbs page-dashboard">
                <div className="body-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h5>Your account has not been activated yet.  Once you have been assigned a team, it will unlock.</h5>
                </div>
            </div>
        );
    }
}

export default withRouter(Activate);
