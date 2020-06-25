import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, orderBy, find } from 'lodash';
import { setPlayerRank, batchPlayerRanks, getLists } from 'actions';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import BoidCard from './boidCard';


const styles = {
    button: {
        background: 'none',
        color: '#eee',
        fontSize: '16px',
        border: '0px',
        cursor: 'pointer',
        outline: 'none',
    },
};

const syncString = boids => {
    
    return boids.reduce((acc, boid, i) => {
        
        const inc = typeof(get(boid, 'listdata.rank')) === 'number' ?  get(boid, 'listdata.rank') : i+1;

        return (acc + boid.id + '_' + inc + '|')
    },'');
};

const hasMissingRank = boids => boids.find(boid => boid.listdata.rank === null);

const mapStateToProps = state => {

    const lists = get(state, 'list.lists');
    const activeListId = get(state, 'list.activeList');
    const list = find(lists, { id: activeListId });

    return ({ activeListId, boids: orderBy(list.boids,  [ 'listdata.rank' ]) });
};

const mapDispatchToProps = dispatch => ({
    setPlayerRanksById: id => {
      dispatch(setPlayerRank(id));
    },
    batchPlayerRanksById: (listId, players) => {
        dispatch(batchPlayerRanks(listId, players));
    },
    getLists: () => {
        dispatch(getLists());
    },
});

const SortableItem = SortableElement(({ boid, pos, sortByNumber  }) => <BoidCard boid={boid} pos={pos} sortByNumber={sortByNumber} />);

const SortableList = SortableContainer(({ boids, sortByNumber }) => {

    return (
        <div>
            { boids.map((boid, index) => (
                <SortableItem key={`boid-${boid.id}`} index={index} pos={index+1} boid={boid} sortByNumber={sortByNumber} />
            ))}
        </div>
    );
});

class Boids extends Component {

    static propTypes = {
        activeId: PropTypes.string,
        boids: PropTypes.array,
    }

    static defaultProps = {
        boids: [],
    }

    constructor (props) {

        super(props);
    
        this.state = {
          boids: [],
        }
    }

    componentDidMount () {

        const { boids, activeListId, getLists } = this.props;
        const ordered = orderBy(boids, [ 'listdata.rank' ] );

        this.setState({ boids: ordered, activeListId });
    }

    componentDidUpdate () {

        const { activeListId, boids } = this.props;

        if (activeListId !== this.state.activeListId) {
            const ordered = orderBy(boids, [ 'listdata.rank' ] );

            this.setState({ boids: ordered, activeListId }); 
        }

        if (this.props.boids.length !== this.state.boids.length) {
            this.refreshState();
        }
    }

    onSortEnd = ({ oldIndex, newIndex }) => {

        const { boids } = this.state;

        this.setState({ boids: arrayMove(boids, oldIndex, newIndex) });
    }

    applyOrder = () => {

        const { batchPlayerRanksById, listId, getLists } = this.props;
        const { boids } = this.state;

        const ranked = boids.reduce((acc, boid, i) => {

            const rank = i + 1;

            if (boid.listdata && (boid.listdata.rank !== rank)) {
                boid.listdata.rank = rank;
                acc.push(boid);
            };

            return acc;
        }, []);

        const ordered = orderBy(ranked, ['listdata.rank']);
        const converted = ordered.reduce((acc, boid) => {
            acc[boid.id] = boid.listdata.rank;
            return acc;
        }, {});

        batchPlayerRanksById(listId, converted);
    }

    cancelChange = () => {

        this.refreshState();
    }

    refreshState = () => {

        const { boids } = this.props;

        this.setState({ boids }); 
    }

    render () {

        const { listName } = this.props;
        const { boids } = this.state;
        // const synced = syncString(this.state.boids) === syncString(this.props.boids);
        // const missingRank = hasMissingRank(boids);

        return (
            <div className="list-boids-container">
                <div className="content-header">
                    <h5 style={{ margin: '10px 10px 10px 10px', paddingBottom: '10px' }}>
                        <span style={{ marginRight: '10px' }}>{listName} - {boids.length} total players</span>
                        <span>
                            <button title="Sets the player ranks, use when player cards are highlighted in purple" style={styles.button} onClick={this.applyOrder}>[ Set Ranks ]</button>
                            <button title="Cancels any order/rank changes you have made" onClick={this.cancelChange} style={styles.button}>[ Cancel ]</button>
                        </span>
                    </h5>
                </div>

                { boids.length > 0 ?
                    <SortableList useDragHandle lockAxis="y" boids={boids} onSortEnd={this.onSortEnd} sortByNumber={this.onSortEnd} />
                :
                    <div className="warning" style={{ paddingLeft: '10px' }}>This list has no players.</div>
                }
            </div>
        );
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Boids);
