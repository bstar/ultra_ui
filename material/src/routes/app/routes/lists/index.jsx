import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import get from 'lodash.get';
import { getLists } from 'actions';

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
  }
});

class Lists extends Component {

  componentDidMount () {

    const { getLists } = this.props;

    getLists();
  }

  render () {

    const { lists, activeList, userToken } = this.props;

    return (
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
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Lists));
