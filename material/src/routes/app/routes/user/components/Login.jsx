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

const styles = {
  submit: {
    cursor: 'pointer',
    color: 'rgb(78, 169, 243)',
    backgroundColor: 'unset',
    border: 'none',
    fontSize: '18px',
  }
}

class Login extends Component {

    constructor (props) {
        super(props)

        this.state = {};
    }

    handleSubmit = e => {

        e.preventDefault();

        const { username, password } = this.state;
        const { login } = this.props;

        login(username, password);
    }

    setParam = e => this.setState({ [e.target.name]: e.target.value});

    render () {

        return (
            <div className="container-fluid no-breadcrumbs page-dashboard">
                <div className="body-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="card" style={{ width: '50%', backgroundColor: 'rgba(0,0,0,0.21)', borderRadius: '5px', border: '1px solid rgb(46, 110, 115)' }}>
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                          <div className="card-content">
                              <section className="logo text-center">
                                  <h4 style={{ color: '#5db7b4' }}>EHMLC Login</h4>
                              </section>
                              <fieldset>
                                  <div className="form-group">
                                      <TextField
                                          name="username"
                                          onChange={this.setParam}
                                          floatingLabelText="Username"
                                          floatingLabelFixed="true"
                                          fullWidth
                                      />
                                  </div>
                                  <div className="form-group">
                                      <TextField
                                          name="password"
                                          onChange={this.setParam}
                                          floatingLabelText="Password"
                                          floatingLabelFixed="true"
                                          type="password"
                                          fullWidth
                                      />
                                  </div>
                              </fieldset>
                          </div>
                          <div className="card-action no-border text-right">
                              <button type="submit" className="color-primary" style={styles.submit}>Login</button>
                          </div>
                        </form>
                    </div>
                    {/* <div className="additional-info">
                        <a href="#/app/register">Register</a>
                        <span className="divider-h" style={{ padding: '10px' }}> | </span>
                        <a href="#/forgot-password">Password Reset</a>
                    </div> */}
                </div>
            </div>
        );
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Login));
