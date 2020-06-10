import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import { getJWT } from 'actions';


const mapDispatchToProps = dispatch => ({
    login: (username, password) => {
        dispatch(getJWT(username, password));
    }
});

class Login extends Component {

    handleSubmit = () => {

        const { username, password } = this.state;
        const { login } = this.props;

        login(username, password);
    }

    setParam = e => {

        this.setState({ [e.target.name]: e.target.value})
    }

    render () {

        return (
            <div className="container-fluid no-breadcrumbs page-dashboard">
                <div className="body-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="card" style={{ width: '50%', backgroundColor: 'rgba(0,0,0,0.21)', borderRadius: '5px', border: '1px solid rgb(46, 110, 115)' }}>
                        <div className="card-content">
                            <section className="logo text-center">
                                <h4 style={{ color: '#5db7b4' }}>EHMLC Login</h4>
                            </section>
                            <form className="form-horizontal">
                                <fieldset>
                                    <div className="form-group">
                                        <TextField
                                            name="username"
                                            onBlur={this.setParam}
                                            floatingLabelText="Username"
                                            floatingLabelFixed="true"
                                            fullWidth
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            name="password"
                                            onBlur={this.setParam}
                                            floatingLabelText="Password"
                                            floatingLabelFixed="true"
                                            type="password"
                                            fullWidth
                                        />
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                        <div className="card-action no-border text-right">
                            <a onClick={this.handleSubmit} className="color-primary" style={{ cursor: 'pointer', color: '#4ea9f3' }}>Login</a>
                        </div>
                    </div>
                    <div className="additional-info">
                        <a href="#/app/register">Register</a>
                        <span className="divider-h" style={{ padding: '10px' }}> | </span>
                        <a href="#/forgot-password">Password Reset</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Login));
