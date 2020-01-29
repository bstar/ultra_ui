import React from 'react';
import { withRouter } from 'react-router-dom';


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
