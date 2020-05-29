import React, {Component} from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { getJWT } from 'actions';


const mapStateToProps = state => ({
    user: get(state, 'user.jwt'),
});

const mapDispatchToProps = dispatch => ({
    login: (username, password) => {
        dispatch(getJWT(username, password));
    }
});

class Login extends Component {

    render () {
        const { user } = this.props;
        const expiration = user && user.exp && moment.unix(user.exp).format('dddd, MMMM Do, YYYY h:mm:ss A');
        const iat = user && user.iat && moment.unix(user.iat).format('dddd, MMMM Do, YYYY h:mm:ss A');

        return (
            <div className="container-fluid no-breadcrumbs page-dashboard">
                { user ?
                    <div className="body-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div className="card" style={{ width: '50%', backgroundColor: 'rgba(0,0,0,0.21)', borderRadius: '5px', border: '1px solid rgb(46, 110, 115)' }}>
                            <div className="card-content">
                                <section className="logo text-center">
                                    <h3 style={{ color: '#5db7b4' }}>{user.id}</h3>
                                </section>
                                <section className="logo">
                                    <h4><span style={{ color: '#5db7b4' }}>Email:</span> {user.email}</h4>
                                    <h4><span style={{ color: '#5db7b4' }}>Team:</span> {user.team}</h4>
                                    <h4><span style={{ color: '#5db7b4' }}>Role:</span> {user.role}</h4>
                                    <h4><span style={{ color: '#5db7b4' }}>Token Creation:</span> {iat}</h4>
                                    <h4><span style={{ color: '#5db7b4' }}>Token Expiration:</span> {expiration}</h4>
                                </section>
                            </div>
                        </div>
                    </div>
                :
                    <div>Not logged in.</div>
                }
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
