import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, orderBy, find } from 'lodash';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { setPlayerRank, batchPlayerRanks, batchUpdatePlayers, getLists, openModal, closeModal, loadMessage } from 'actions';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
// import { SelectRoles } from '../../../../../components/Search';
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

const mapStateToProps = state => ({
    batchUpdatePlayersStatus: get(state, 'modal.batchUpdatePlayers', false),
});

const mapDispatchToProps = dispatch => ({
    setPlayerRanksById: id => {
        dispatch(setPlayerRank(id));
    },
    batchPlayerRanksById: (listId, players, key) => {
        dispatch(batchPlayerRanks(listId, players, key));
    },
    updatePlayers: players => {
        dispatch(batchUpdatePlayers(players));
    },
    getLists: () => {
        dispatch(getLists());
    },
    showModal: id => {
        dispatch(openModal(id));
    },
    hideModal: id => {
        dispatch(closeModal(id));
    },
    showMessage: message => {
        dispatch(loadMessage(message));
    },
});

const SortableItem = SortableElement(({ boid, pos, onSortEnd }) => <BoidCard boid={boid} pos={pos} rank={boid.listdata.rank} onSortEnd={onSortEnd} />);
const SortableList = SortableContainer(({ boids, sortByNumber }) => {

    return (
        <div>
            { boids.map((boid, index) => (
                <SortableItem key={`boid-${boid.id}`} index={index} pos={index+1} boid={boid} onSortEnd={sortByNumber} />
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
            direction: 'asc',
            role: '',
            // filter: { role: null, wtech: null, wmen: null, wphy: null, com: null, age: null }, // TBD
            filter: 'listdata.rank',
            openBatchUpdatePlayersModal: false,
        };
    }

    componentDidMount () {

        const { activeListBoids, activeListId } = this.props;
        const { filter, direction } = this.state;
        const ordered = orderBy(activeListBoids, [ filter, 'listdata.createdAt' ], [direction]);
        
        this.setState({ boids: ordered, activeListId });
    }

    componentDidUpdate (prevProps, prevState) {

        const { activeListId, activeListBoids } = this.props;
        const { filter, direction, boids } = this.state;
        const ordered = orderBy(boids, [ filter, 'listdata.createdAt'], [direction]);

        if (activeListId !== this.state.activeListId) {
            this.setState({ boids: ordered, activeListId }); 
        }

        // TODO handles refreshes when deleting a boid, should do this in saga?
        if (activeListBoids.length !== this.state.boids.length) {
            this.refreshState();
        }

        if (prevState.direction !== direction) {
            this.setState({ boids: ordered, activeListId });
        }
    }

    onSortEnd = ({ oldIndex, newIndex }) => {

        const { boids } = this.state;

        this.setState({ boids: arrayMove(boids, oldIndex, newIndex) });
    }

    applyOrder = () => {

        const { batchPlayerRanksById, activeListId, activeListKey, getLists } = this.props;
        const { filter, boids, direction } = this.state;

        const ranked = boids.reduce((acc, boid, i) => {

            const rank = i + 1;

            if (boid.listdata && (boid.listdata.rank !== rank)) {
                boid.listdata.rank = rank;
                acc.push(boid);
            };

            return acc;
        }, []);

        const ordered = orderBy(ranked, [filter, 'listdata.createdAt'], [direction]);
        const converted = ordered.reduce((acc, boid) => {
            acc[boid.id] = boid.listdata.rank;
            return acc;
        }, {});

        batchPlayerRanksById(activeListId, converted, activeListKey);
    }

    cancelChange = () => {

        this.refreshState();
    }

    refreshState = () => {

        const { activeListBoids } = this.props;
        const { filter, direction } = this.state;
        const boids = orderBy(activeListBoids, [ filter, 'listdata.createdAt'], [direction]);
        
        this.setState({ boids });
    }

    filterAndSort = (e, filter) => {

        const { boids } = this.state;
        const filters = [ 'combined_rating', 'age_over', 'att_growth' ];
        // direction dynamically set based on most sensible ordering
        const direction = filters.includes(filter) ? 'desc' : (filter === 'listdata.rank') ? 'asc' : this.state.direction;

        this.setState({ boids: orderBy(boids, [ filter, 'listdata.createdAt'], [direction]), filter, direction });
    }

    setDirection = e => {

        // bug in material ui v0.20.1 requires that onClick event used for radio buttons
        const direction = e.target.value;

        this.setState({ direction })
    }

    // onChangeRole = (event, index, value) => {
    //     const { boids } = this.state;
    //     const filteredBoids = boids.filter(boid => boid.player_roles === value);
    //     console.log("FILTERED", filteredBoids)
    //     this.setState({ boids: filteredBoids, role: value });
    // }

    // setPlayerData = () => {
        
    //     const { showModal } = this.props;

    //     showModal('batchUpdatePlayers');
    // }

    // Types supported: iis, com, age, off, draft
    convertBoids = (boids, year, type) => {

        const year_drafted = (type === 'draft') ? year : null;

        return boids.map((boid, index) => {

            const converted = { id: boid.id, [`${type}_ranking`]: index + 1 };
            if (year_drafted) converted.year_drafted = year_drafted;

            return converted;
        });
    }

    batchUpdatePlayersModalWrapper = ({ title, body, open }) => {

        const { hideModal, updatePlayers, year, type } = this.props;
        const { boids } = this.state;
        const convertedBoids = this.convertBoids(boids, year, type);
    
        const actions = [
          <FlatButton
            label="Cancel"
            primary={true}
            onClick={() => hideModal('batchUpdatePlayers')}
          />,
          <FlatButton
            label="Submit"
            primary={true}
            disabled={false}
            onClick={() => updatePlayers(convertedBoids)}
            batchUpdatePlayers
          />,
        ];
    
        return (
          <div>
              <Dialog
                title={title}
                actions={actions}
                modal={true}
                contentStyle={{ borderRaduis: '20px', border: '1px solid rgb(46, 110, 115)', maxWidth: '50%' }}
                actionsContainerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.35)', borderTop: '1px solid rgb(46, 110, 115)' }}
                titleStyle={{ color: 'rgb(159, 207, 223)', paddingBottom: '10px' }}
                open={open}
              >
                {body}
            </Dialog>
          </div>
        )
    }

    cloneList = () => {

        console.log("CLONING!", this.state.boids);
    }

    setModal = id => {

        const { showModal } = this.props;
    
        showModal(id);
    }
    

    render () {

        const { activeListName, batchUpdatePlayersStatus, year, type } = this.props;
        const { boids, direction, role } = this.state;

        return (
            <div className="list-boids-container">

                { this.batchUpdatePlayersModalWrapper({ title: 'Are you sure you want to update these players?', open: batchUpdatePlayersStatus, body: <div>Body here...</div> }) }
    
                <div className="content-header">
                    <h5 style={{ margin: '10px 10px 10px 10px', paddingBottom: '10px' }}>
                        <span style={{ marginRight: '10px' }}>{year} {activeListName} - {boids.length} total players</span>
                        <span>
                            <button title="Sets the player ranks, use when player cards are highlighted in purple" style={styles.button} onClick={this.applyOrder}>[ Set Ranks ]</button>
                            <button title="Sets the player ranks, use when player cards are highlighted in purple" style={styles.button} onClick={() => this.setModal('batchUpdatePlayers')}>[ Set Players ]</button>
                            <button title="Cancels any order/rank changes you have made" onClick={this.cancelChange} style={styles.button}>[ Cancel Changes ]</button>
                            <button title="Clones active list" onClick={this.cloneList} style={styles.button}>[ Clone List ]</button>
                        </span>
                    </h5>
                </div>
                <div style={{ padding: '10px', display: 'flex' }}>
                    <div className="search-pod" style={{ display: 'flex', height: 'inherit', margin: '0px 20px 0px 0px', width: '100%' }}>
                        <div style={{ width: '50%' }}>
                            <div style={{ fontSize: '16px', marginBottom: '10px', padding: '0px' }}>Sort:</div>
                            <RadioButtonGroup name="sortList" defaultSelected="listdata.rank" onChange={this.filterAndSort}>
                                <RadioButton
                                    style={{ maxWidth: 250, float: 'left' }}
                                    value="listdata.rank"
                                    label="Rank"
                                />
                                <RadioButton
                                    style={{ maxWidth: 250, float: 'left' }}
                                    value="combined_rating"
                                    label="COM Score"
                                />
                                <RadioButton
                                    style={{ maxWidth: 250, float: 'left' }}
                                    value="age_over"
                                    label="Age / Over"
                                />
                                <RadioButton
                                    style={{ maxWidth: 250, float: 'left' }}
                                    value="att_growth"
                                    label="Growth"
                                />
                            </RadioButtonGroup>
                        </div>
                        <div style={{ width: '50%' }}>
                            <div style={{ fontSize: '16px', marginBottom: '10px', padding: '0px' }}>Direction:</div>
                            <RadioButton
                                style={{ maxWidth: 250 }}
                                value="desc"
                                label="Descending"
                                checked={direction === 'desc'}
                                onClick={this.setDirection}
                            />
                            <RadioButton
                                style={{ maxWidth: 250 }}
                                value="asc"
                                label="Ascending"
                                checked={direction === 'asc'}
                                onClick={this.setDirection}
                            />
                        </div>
                    </div>
                    {/* <div className="search-pod" style={{ display: 'flex', height: 'inherit', margin: '0px' }}>
                        <SelectRoles onChange={this.onChangeRole} role={role} />
                    </div> */}
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
