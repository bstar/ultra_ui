import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import get from 'lodash.get';
import { getLists } from 'actions';

import ListItems from './components/listItems';
import Boids from './components/boids';


const mapStateToProps = state => ({
  lists: state.list.lists,
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

    const { lists, activeList } = this.props;

    return (
        <div className="container-fluid no-breadcrumbs page-dashboard">
            <div className="row">
                <div className="col-xl-3">
                    <ListItems lists={lists} />
                </div>
                <div style={{ width: '20px' }} /> 
                <div className="col-xl-8">
                    { activeList &&
                      <Boids />
                    }
                </div>
            </div>
        </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Lists));