import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, find } from 'lodash';
import { setActiveList, getLists } from 'actions';


const mapStateToProps = state => {

    const lists = get(state, 'list.lists');
    const activeListId = get(state, 'list.activeList');
    const list = find(lists, { 'id': activeListId });

    return ({ activeListName: get(list, 'name', '') });
}


const mapDispatchToProps = dispatch => ({
    setList: id => {
        dispatch(setActiveList(id));
    },
    getLists: () => {
        dispatch(getLists());
    },
});

const ListCard = ({ list, setList, activeListName, getLists }) => {

    const listHandler = id => {
        window.scrollTo(0, 0);
        setList(id);
        getLists();
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
