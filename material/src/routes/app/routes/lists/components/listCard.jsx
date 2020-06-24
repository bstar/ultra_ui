import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

    const containerBorderStyle = activeListName === list.name ? { border: '1px solid #219799', outline: 0, borderRight: '3px solid #219799' } : {};

    return (
        <button className="list-card-container" style={{ ...containerBorderStyle, margin: '10px 20px 10px 20px' }} onClick={() => listHandler(list.id)}>
            <div style={{ fontSize: '18px' }}>{list.name}</div>
            <div>{list.description}</div>
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
