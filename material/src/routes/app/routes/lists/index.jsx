import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { get, find } from 'lodash';
import {
  getListsByKey,
  createList,
  loadMessage,
  openModal,
  closeModal,
} from 'actions';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ListItems from './components/listItems';
import Boids from './components/boids';


const mapStateToProps = state => ({
  userRole: get(state, 'user.jwt.role'),
  userToken: get(state, 'user.data.token'),
  personalLists: get(state, 'list.personal'),
  globalLists: get(state, 'list.global'),
  activeListId: get(state, 'list.activeList.id'),
  activeListKey: get(state, 'list.activeList.key'),
  createListModalStatus: get(state, 'modal.createListModal'),
});

const mapDispatchToProps = dispatch => ({
  getListsByKey: key => {
    dispatch(getListsByKey(key));
  },
  createPlayerList: list => {
    dispatch(createList(list));
  },
  showMessage: message => {
    dispatch(loadMessage(message));
  },
  showModal: id => {
    dispatch(openModal(id));
  },
  hideModal: id => {
    dispatch(closeModal(id));
  },
});

class Lists extends Component {

  constructor (props) {

    super(props);

    this.state = {
      openCreateListModal: false,
      formListData: {},
    };
  }

  componentDidMount () {

    const { getListsByKey, match } = this.props;
    const { key, type } = match.params;

    this.setState({ key, type });

    getListsByKey(key);
  }

  componentDidUpdate () {

    const { getListsByKey, match } = this.props;
    const { key, type } = this.state;
    const params = match.params

    // looks for key and type change when navigating routes
    if ((key !== params.key) || (type !== params.type)) {
      this.setState({ key: params.key, type: params.type });
      getListsByKey(params.key);
    }
  }

  setModal = id => {

    const { showModal } = this.props;

    showModal(id);
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
            label="Team (Required draft data)"
            onCheck={this.setParam}
          />
        </div>
        <div>
          <Checkbox
            name="captureGM"
            label="GM (Optional draft data)"
            onCheck={this.setParam}
          />
        </div>
        <div>
          <Checkbox
            name="captureGrade"
            label="Grade (A-F player grades, optional for rankings and personal lists)"
            onCheck={this.setParam}
          />
        </div>
      </div>
    )
  }

  createListModalWrapper ({ title, open, body }) {

    const { hideModal } = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => hideModal('createListModal') }
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
    const { createPlayerList } = this.props;

    createPlayerList(formListData);
  }

  filteredLists = (lists, key, type) => {

    if (key === 'personal') return lists; // personal lists are never filtered by type

    const types = (type === 'rankings') ? [ 'iss', 'com', 'age', 'off' ] : [type];

    return lists && lists.filter(list => types.includes(list.type));
  }

  render () {

    const { key, type } = this.state;
    const { personalLists, globalLists, activeListId, userToken, userRole, createListModalStatus, isAuthed } = this.props;
    const listGroups = { personal: personalLists, global: globalLists };
    const lists = listGroups[key];
    const filteredLists = this.filteredLists(lists, key, type);
    const activeList = find(filteredLists, { 'id': activeListId });

    if (!isAuthed()) { return <div style={{ padding: '20px 0px 0px 30px', position: 'relative' }}>Not Authenticated</div> };

    return (
        <div>
          { this.createListModalWrapper({ title: <div>Create a New List:</div>, open: createListModalStatus, body: this.createListBody() }) }

          <div style={{ position: 'relative', cursor: 'pointer', display: 'flex', backgroundColor: 'rgba(0, 0, 0, 0.35)', width: '100%', padding: '5px 5px 5px 10px', borderBottom: '1px solid rgb(46, 110, 115)', borderRight: '1px solid rgb(46, 110, 115)', alignItems: 'center' }}>
            <FlatButton onClick={ () => (this.setModal('createListModal'))} style={{ minWidth: '30px', paddingRight: '5px' }}>
              { ([ 'admin', 'super' ].includes(userRole) || key === 'personal') &&
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <i className="nav-icon material-icons" style={{ color: '#1ecbce', padding: '0px 5px 0px 10px' }}>add</i><span style={{ paddingRight: '10px', textTransform: 'capitalize' }}>create {type} list</span>
                </div>
              }
            </FlatButton>
          </div>
          <div className="container-fluid no-breadcrumbs page-dashboard">
              { userToken ?
                <div className="row">
                    <div className="col-xl-3" style={{ padding: '30px', margin: '-20px 10px -20px -20px', backgroundColor: 'rgba(0, 0, 0, 0.2)', borderRight: '1px solid rgb(46, 110, 115)', borderBottom: '1px solid rgb(46, 110, 115)' }}>
                        { lists && lists.length > 0 ?
                          <ListItems lists={filteredLists} />
                        :
                        <div style={{ marginLeft: '30px', color: '#eee' }}>No lists to display</div>
                        }
                    </div>
                    <div className="col-xl-9">
                        { activeList &&
                          <Boids listName={activeList.name} activeListName={activeList.name} year={activeList.year} type={activeList.type} activeListId={activeList.id} activeListKey={activeList.key} activeListBoids={activeList.boids} />
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
