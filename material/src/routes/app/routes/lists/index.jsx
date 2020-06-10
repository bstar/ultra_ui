import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import get from 'lodash.get';
import { getLists, createList, loadMessage } from 'actions';

import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ListItems from './components/listItems';
import Boids from './components/boids';


const mapStateToProps = state => ({
  userToken: get(state, 'user.data.token'),
  lists: get(state, 'list.lists'),
  activeList: get(state, 'list.activeList'),
});

const mapDispatchToProps = dispatch => ({
  getLists: () => {
    dispatch(getLists());
  },
  createPlayerList: list => {
    dispatch(createList(list));
  },
  showMessage: message => {
    dispatch(loadMessage(message));
  },
});

class Lists extends Component {

  constructor (props) {

    super(props)

    this.state = {
      openCreateListModal: false,
      formListData: {},
    };
  }

  componentDidMount () {

    const { getLists } = this.props;

    getLists();
  }

  setModal (type) {

    this.setState({ ...type });
  }

  setParam = (e, isInputChecked) => {

    const { formListData } = this.state;
    const data = (typeof isInputChecked === 'boolean') ? { [e.target.name]: isInputChecked } : { [e.target.name]: e.target.value };

    this.setState({ formListData: { ...formListData, ...data }});
  }

  createListBody () {

    return (
      <div>
        <div style={{ paddingBottom: '15px', fontWeight: 300 }}><i>Personal lists are protected and only viewable by you.</i></div>
        <div className="form-group">
            <TextField
                name="name"
                style={{ width: '60%' }}
                onBlur={this.setParam}
                floatingLabelText={<span><b style={{ color: '#aaa', fontSize: '18px' }}>Name</b> (List's name, used for default ordering)</span>}
                floatingLabelFixed="true"
            />
        </div>
        <div className="form-group">
            <TextField
                name="description"
                style={{ width: '60%' }}
                onBlur={this.setParam}
                floatingLabelText={<span><b style={{ color: '#aaa', fontSize: '18px' }}>Description</b> (Describe list's purpose)</span>}
                floatingLabelFixed="true"
            />
        </div>
        <div className="form-group">
            <TextField
                name="category"
                style={{ width: '60%' }}
                onBlur={this.setParam}
                floatingLabelText={<span><b style={{ color: '#aaa', fontSize: '18px' }}>Category</b> (Lists are grouped by category name)</span>}
                floatingLabelFixed="true"
            />
        </div>

        <h5 style={{ color: 'rgb(159, 207, 223)', marginBottom: '10px' }}>Associative Data:</h5>
        <div style={{ paddingBottom: '15px', fontWeight: 300 }}><i>Associative data is additional data that is captured at the time a player is added to a list.  All lists support player "Rank" by default.</i></div>
        <div>
          <Checkbox
            name="captureTeam"
            label="Team (draft list required)"
            onCheck={this.setParam}
          />
        </div>
        <div>
          <Checkbox
            name="captureGM"
            label="GM (draft list optional)"
            onCheck={this.setParam}
          />
        </div>
      </div>
    )
  }

  createListModalWrapper ({ title, open, body }) {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => this.setModal({ openCreateListModal: false })}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.createList}
      />,
    ];

    return (
      <div>
          <Dialog
            title={title}
            contentStyle={{ borderRaduis: '20px', border: '1px solid rgb(46, 110, 115)' }}
            actionsContainerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.35)', borderTop: '1px solid rgb(46, 110, 115)' }}
            titleStyle={{ color: 'rgb(159, 207, 223)', paddingBottom: '10px' }}
            actions={actions}
            modal={true}
            open={open}
          >
            {body}
        </Dialog>
      </div>
    )
  }

  createList = () => {

    const { formListData } = this.state;
    const { showMessage, createPlayerList } = this.props;

    createPlayerList(formListData);

    // TODO needs to key off of redux modal state
    this.setState({ openCreateListModal: false });
    showMessage({ open: true, text: <b>New list created!</b> });
  }

  render () {

    const { openCreateListModal } = this.state;
    const { lists, activeList, userToken } = this.props;

    return (
        <div>
          { this.createListModalWrapper({ title: <div>Create a New <b>Personal</b> List:</div>, open: openCreateListModal, body: this.createListBody() }) }

          <div style={{ cursor: 'pointer', display: 'flex', backgroundColor: 'rgba(0, 0, 0, 0.35)', width: '100%', padding: '5px 5px 5px 10px', borderBottom: '1px solid rgb(46, 110, 115)', borderRight: '1px solid rgb(46, 110, 115)', alignItems: 'center' }}>
            <FlatButton onClick={ () => (this.setModal({ openCreateListModal: true }))} style={{ minWidth: '30px', paddingRight: '5px' }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <i className="nav-icon material-icons" style={{ color: '#1ecbce', padding: '0px 5px 0px 10px' }}>add</i><span style={{ paddingRight: '10px' }}>Create Personal List</span>
              </div>
            </FlatButton>
          </div>
          <div className="container-fluid no-breadcrumbs page-dashboard">
              { userToken ? 
                <div className="row">
                    <div className="col-xl-3" style={{ padding: '30px', margin: '-20px 10px -20px -20px' }}>
                        <ListItems lists={lists} />
                    </div>
                    <div className="col-xl-9">
                        { activeList &&
                          <Boids listName={activeList.name} />
                        }
                    </div>
                </div>
              :
                <div>Not Authorized</div>
              }
          </div>
        </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Lists));
