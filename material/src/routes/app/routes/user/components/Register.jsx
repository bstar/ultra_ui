import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import { getJWT, loadMessage, registerUser } from 'actions';
import { checkUserName } from 'api/user';


const mapDispatchToProps = dispatch => ({
    login: (username, password) => {
        dispatch(getJWT(username, password));
    },
    nameCheck: name => {
        dispatch(checkUserName(name));
    },
    showMessage: message => {
        dispatch(loadMessage(message));
    },
    register: user => {
        dispatch(registerUser(user));
    }
});

const Error = ({ message, show }) => {

    const display = show ? 'inline' : 'none';    

    return (<span style={{ display, paddingLeft: '20px', color: 'red' }}>{message}</span>);
}


class Register extends Component {

    constructor (props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this);
    
        this.state = { messageOpen: false };
    }

    async validUser (name) {

        const userResponse = await checkUserName(name);
        const exists = userResponse.json.exists;

        if (name && name.length > 2 && !exists) {
            this.setState({ nameValidation: false });
            return false;
        } else {
            this.setState({ nameValidation: true });
            return true;
        }
    }

    validPassword = (password, confirm) => {

        if (!password || password !== confirm) {
            this.setState({ passwordValidation: true });
            return true;
        } else {
            this.setState({ passwordValidation: false });
            return false;
        }
    }

    validEmail = email => {

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const emailValidation = !re.test(String(email).toLowerCase());

        this.setState({ emailValidation });
        return emailValidation;
    }

    async handleSubmit () {

        const { name, password, email, confirm } = this.state;
        const { register } = this.props;
        const userPass = await this.validUser(name);
        const emailPass = this.validEmail(email);
        const passwordPass = this.validPassword(password, confirm);

        if (!userPass && !emailPass && !passwordPass) {
            register({ name, email, password });
        }
    }

    setParam = e => {

        this.setState({ [e.target.name]: e.target.value});
    }

    render () {

        const { nameValidation, emailValidation, passwordValidation } = this.state;

        return (
            <div className="container-fluid no-breadcrumbs page-dashboard">
                <div className="body-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="card" style={{ width: '50%', backgroundColor: 'rgba(0,0,0,0.21)', borderRadius: '5px', border: '1px solid rgb(46, 110, 115)' }}>
                        <div className="card-content">
                            <section className="logo text-center">
                                <h4 style={{ color: '#5db7b4' }}>EHMLC Registration</h4>
                            </section>
                            <form className="form-horizontal">
                                <fieldset>
                                    <div className="form-group">
                                        <TextField
                                            name="name"
                                            onBlur={this.setParam}
                                            floatingLabelText="Username"
                                            floatingLabelFixed="true"
                                        />{ nameValidation && <Error show message="Invalid Username or already in use" /> }
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            name="email"
                                            onBlur={this.setParam}
                                            floatingLabelText="Email"
                                            floatingLabelFixed="true"
                                        />{ emailValidation && <Error show message="Not a valid email" /> }
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            name="password"
                                            onBlur={this.setParam}
                                            floatingLabelText="Password"
                                            floatingLabelFixed="true"
                                            type="password"
                                        />{ passwordValidation && <Error show message="Password invalid or does not match" /> }
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            name="confirm"
                                            onBlur={this.setParam}
                                            floatingLabelText="Password Confirm"
                                            floatingLabelFixed="true"
                                            type="password"
                                        />
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                        <div className="card-action no-border text-right">
                            <a onClick={this.handleSubmit} className="color-primary" style={{ cursor: 'pointer', color: '#4ea9f3' }}>Register</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Register));
