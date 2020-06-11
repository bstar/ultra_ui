import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, orderBy } from 'lodash';
import { setPlayerRank } from 'actions';
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
    }
};

const mapStateToProps = state => ({
    activeListId: get(state, 'list.activeList.id'),
    boids: get(state, 'list.activeList.boids'),
});

const mapDispatchToProps = dispatch => ({
    setPlayerRanksById: id => {
      dispatch(setPlayerRank(id));
    }
});

const SortableItem = SortableElement(({ boid, pos, sortByNumber }) => <BoidCard boid={boid} pos={pos} sortByNumber={sortByNumber} />);

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
          changed: false,
        }
    }

    componentDidMount () {

        const { boids, activeListId } = this.props;

        const ordered = orderBy(boids, [ 'listdata.rank' ] );

        this.setState({ boids: ordered, activeListId });
    }

    componentDidUpdate () {

        const { activeListId, boids } = this.props;

        if (activeListId !== this.state.activeListId) {
            const ordered = orderBy(boids, [ 'listdata.rank' ] );

            this.setState({ boids: ordered, activeListId }); 
        }
    }

    onSortEnd = ({ oldIndex, newIndex }) => {

        const { boids } = this.state;

        this.setState({ boids: arrayMove(boids, oldIndex, newIndex) });
        this.setState({ changed: true });
    }

    applyOrder = () => {

        const { setPlayerRanksById } = this.props;
        const { boids } = this.state;

        const ordered = orderBy(boids.map((boid, index) => {

            const rank = index + 1;
            boid.listdata.rank = rank;

            setPlayerRanksById({ boidId: boid.id, listId: boid.listdata.listId, rank });
            return boid;
        }), [ 'listdata.rank' ]);

        this.setState({ changed: false, boids: ordered });
    }

    render () {

        const { listName } = this.props;
        const { boids, changed } = this.state;

        return (
            <div className="list-boids-container">
                <div className="content-header">
                    <h5 style={{ margin: '10px 10px 10px 10px', paddingBottom: '10px' }}>{listName} - {boids.length} total players { changed && (<span><button style={styles.button} onClick={this.applyOrder}>Apply Updated Ranks</button><button style={styles.button}>Cancel</button></span>) }</h5>
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