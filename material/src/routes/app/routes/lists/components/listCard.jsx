import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, find } from 'lodash';
import { setActiveList, getLists } from 'actions';


const mapStateToProps = state => {

    const lists = get(state, 'list.lists');
    const activeListId = get(state, 'list.activeList.id');
    const list = find(lists, { 'id': activeListId });

    return ({ activeListId, activeListName: get(list, 'name', '') });
};

const mapDispatchToProps = dispatch => ({
    setList: (id, key) => {
        dispatch(setActiveList(id, key));
    },
    getLists: () => {
        dispatch(getLists());
    },
});


class ListCard extends Component {

    static propTypes = {
        list: PropTypes.object.isRequired,
        setList: PropTypes.func.isRequired,
        activeListName: PropTypes.string,
        selectedListStyle: PropTypes.object,
    }

    static defaultProps = {
        activeListName: null,
        selectedListStyle: { border: '1px solid #219799', outline: 0, borderRight: '3px solid #219799' },
    }

    constructor (props) {
        super(props)
    
        this.state = {};
    }

    getListStyle = (activeListId, id) => {

        const { selectedListStyle } = this.props;

        if (activeListId === id) {
            return selectedListStyle;
        } else {
            return { bob: 'god' };
        }
    }

    listHandler = (activeListId, key) => {

        const { setList } = this.props;

        setList(activeListId, key);
        window.scrollTo(0, 0);
    }

    render () {

        const { list, id, key, activeListId } = this.props;

        return (
            <button className="list-card-container" style={{ ...this.getListStyle(activeListId, id), margin: '10px 20px 10px 20px' }} onClick={() => this.listHandler(id, key)}>
                <div style={{ fontSize: '18px' }}>{list.name}</div>
                <div>{list.description}</div>
            </button>
        );
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ListCard);
