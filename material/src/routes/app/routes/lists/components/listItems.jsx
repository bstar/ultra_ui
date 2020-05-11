import React from 'react';
import PropTypes from 'prop-types';
import { groupBy, orderBy } from 'lodash';

import ListCard from './listCard';


const ListItems = ({ lists }) => {

    const grouped = groupBy(lists, 'category');

    return (
        <div className="lists-container">
            <div className="lists">
                { Object.keys(grouped).map(key => (
                    <div>
                        <div className="content-header">
                            <h5 style={{ marginLeft: '10px' }}>{key}:</h5>
                        </div>
                        { orderBy(grouped[key], ['name'], ['desc']).map(list => <ListCard key={list.id} list={list} />) }
                    </div>
                ))}
            </div>
        </div>
    );
};

ListItems.propTypes = {
    repos: PropTypes.array,
};

ListItems.defaultProps = {
    lists: [],
};

export default ListItems;