import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import { withRouter } from 'react-router-dom';
import Divider from 'material-ui/Divider';

const HeaderIconButtonStyle = {
  width: '60px',
  height: '60px'
};

const styles = {
  title: {
    fontSize: '24px',
    padding: '20px',
  }
}


class NavLeftList extends React.Component {

  handleChange = (event, value) => {
    this.props.history.push(value);
  }

  render() {
    return (
      <ul className="list-unstyled list-inline">
      </ul>
    );
  }
}

export default withRouter(NavLeftList);
