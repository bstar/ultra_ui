import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import get from 'lodash.get';
import { setActiveList } from 'actions';


const mapStateToProps = state => ({
    activeListName: get(state, 'list.activeList.name'),
    placeholder: "text",
});

const mapDispatchToProps = dispatch => ({
    setList: id => {
        dispatch(setActiveList(id));
    },
});

const ListCard = ({ list, setList, activeListName }) => {

    const listHandler = id => {
        window.scrollTo(0, 0);
        setList(id);
    };

    const containerBorderStyle = activeListName === list.name ? { border: '1px solid #23a8aa', outline: 0 } : {};

    return (
        <button className="list-card-container" style={containerBorderStyle} onClick={() => listHandler(list.id)}>
            <div style={{ fontSize: '18px' }}>{list.name}</div>
            <div>{list.description}</div>
            <div><b>Type:</b> {list.type}</div>
            <div><b>Key:</b> {list.key}</div>
        </button>
    );
};

ListCard.propTypes = {
    list: PropTypes.object.isRequired,
    setList: PropTypes.func.isRequired,
    activeListName: PropTypes.string,
};

ListCard.defaultProps = {
    activeListName: null,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ListCard);