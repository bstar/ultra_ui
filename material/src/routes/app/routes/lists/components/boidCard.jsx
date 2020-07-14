import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, find } from 'lodash';
import { sortableHandle } from 'react-sortable-hoc';
import { loadMessage, removePlayerFromList, openModal, closeModal, getLists } from 'actions';
import { getCOMColor, getAOColor, getGrowthColor, getRatingColor, convertWeighted } from 'utils';
import { nhlTeams } from '../../../../../constants'


const mapStateToProps = state => {

    const lists = get(state, 'list.global');
    const activeListId = get(state, 'list.activeList');
    const list = find(lists, { 'id': activeListId });

    return ({ list, lists });
};

const mapDispatchToProps = dispatch => ({
    showMessage: message => {
        dispatch(loadMessage(message));
    },
    removePlayer: (listId, playerId, listName, boidName) => {
        dispatch(removePlayerFromList(listId, playerId, listName, boidName));
    },
    showModal: id => {
        dispatch(openModal(id));
    },
    hideModal: id => {
        dispatch(closeModal(id));
    },
});


const handleKeyPress = (e, pos, sortByNumber) => {

    const oldIndex = pos - 1;
    const newIndex = e.target.value-1;

    if (e.key === 'Enter') {
        if (Number.isInteger(newIndex) && newIndex >= 0) {
            sortByNumber({ oldIndex, newIndex });
            e.target.value = '';
            e.target.blur();
        } else {
            console.log("Invalid position.");
        }
    }
};

const getStatus = (list, lists, boid) => {

    const { draftId, rankId } = list;

    if (draftId) {
        
        const draftedList = find(lists, { 'id': draftId });
        const draftedBoid = find(draftedList.boids, { 'id': boid.id });

        if (draftedBoid) {

            const teamName = find(nhlTeams, { 'short': draftedBoid.listdata.team });

            if (teamName) {
                return <span>Selected: <a href="#">{teamName.region} {teamName.name}</a></span>;
            }
        } else {
            return (<span className="green">Available</span>);
        }
    }

    if (rankId) {
        
        const rankedList = find(lists, { 'id': rankId });
        const rankedBoid = find(rankedList.boids, { 'id': boid.id });

        if (rankedBoid) {
            return <span>ISS Rank: <a href="#">{rankedBoid.listdata.rank}</a></span>;
        } else {
            return <span>Unranked</span>
        }
    }
};


class BoidCard extends Component {

    static propTypes = {
        boid: PropTypes.object,
    };

    static defaultProps = {
        boid: {},
    };

    constructor (props) {

        super(props)
    
        this.state = {};
    }

    getBorder = (rank, pos) => {
   
        if (rank !== pos) {
            return { border: '1px solid #c16ea4' };
        }
    }

    handleRemovePlayer = ({ listId, boidId, listName, boidName }) => {

        const { removePlayer } = this.props;

        removePlayer(listId, boidId, listName, boidName);
    }
    
    render () {

        const { boid, pos, rank, sortByNumber, list, lists } = this.props;
        const { team, gm, grade } = boid.listdata;
        const technicalWeighted = convertWeighted(boid.technical_off_weighted);
        const mentalWeighted = convertWeighted(boid.mental_off_weighted);
        const physicalWeighted = convertWeighted(boid.physical_off_weighted);
        const DragHandle = sortableHandle(() => <img style={{ height: '22px', cursor: 'move', padding: '0px 0px 3px 0px', filter: 'invert(100%) hue-rotate(20deg)' }} src="assets/img/updown3.png" alt="Move Up/Down" />);

        if (boid) {
            return (
                <div className="boid-card-container" style={{ cursor: 'default', width: 'fit-content', ...this.getBorder(rank, pos) }}>
                    <div style={{ display: 'flex', userSelect: 'none', alignSelf: 'center', alignItems: 'center', flexDirection: 'column', width: '100px', fontSize: '22px', padding: '0px 18px 0px 10px', textShadow: '1px 1px 2px black' }}>
                        <div>{pos}</div>
                        <div className="handle"><DragHandle /></div>
                        <div><input onKeyPress={e => handleKeyPress(e, pos, sortByNumber)} style={{ textAlign: 'center', outline: 'none', border: '1px solid #2e6e73', width: '28px', height: '20px', padding: '2px', fontSize: '12px', background: 'none', color: '#eee' }}></input></div>
                    </div>
                    <div style={{ userSelect: 'none', flexDirection: 'row', display: 'flex', overflow: 'auto' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ padding: '0px 10px 0px 10px', width: '280px' }}>
                                <div style={{ fontSize: '18px' }}>
                                    <a style={{ paddingRight: '5px' }} href={`#/app/playerdetail/${boid.id}`}>{boid.name} {pos} {boid.listdata.rank}</a> 
                                    <span style={{ fontSize: '11px' }}><b>{boid.positions_short}</b></span>
                                </div>
                                <div title="Player's date of birth">{boid.dob} ({boid.age})</div>
                                {/* <div title="Team that drafted player"><b>{getStatus(list, lists, boid)}</b></div> */}
                            </div>
                            {/* <div style={{ padding: '0px 10px 0px 10px', width: '220px', overflow: 'hidden' }}>
                                <div title="Team that drafted player"><b>Drafted By: </b><a href="#">{team || 'n/a'}</a></div>
                                <div title="GM who drafted player"><b>Drafted GM:</b> <a href="#">{gm || 'n/a'}</a></div>
                                <div title="Player's assigned grade from GM"><b>Grade:</b> <a href="#">{grade || 'n/a'}</a></div>
                            </div> */}
                            <div style={{ padding: '0px 10px 0px 10px', width: '220px', overflow: 'hidden' }}>
                                <div title="Player's nation of origin"><b>Nation: </b><a href="#">{boid.nation}</a></div>
                                <div title="Player's current contracted club"><b>Club:</b> <a href="#">{boid.club_playing}</a></div>
                                <div title="Positional role as assigned by game"><b>Role:</b> <a href="#">{boid.player_roles}</a></div>
                            </div>
                            <div style={{ padding: '0px 10px 0px 10px', width: '110px' }}>
                                <div title="Sum of all player's attributes"><b>COM:</b> <span className={getCOMColor(boid.combined_rating)}>{boid.combined_rating}</span></div>
                                <div title="Player's COM score divided by their age"><b>A/O:</b>  <span className={getAOColor(boid.age_over)}>{boid.age_over && boid.age_over.toFixed(1)}</span></div>
                                <div title="Attribute points acquired since previous snapshot"><b>Growth:</b> <span className={getGrowthColor(boid.att_growth)}>{boid.att_growth}</span></div>
                            </div>
                            <div style={{ padding: '0px 10px 0px 10px', width: '200px' }}>
                                <div title="Weighted technicals"><b>W Tech:</b> <span className={getRatingColor(technicalWeighted)}>{technicalWeighted}</span></div>
                                <div title="Weighted mentals"><b>W Mental:</b> <span className={getRatingColor(mentalWeighted)}>{mentalWeighted}</span></div>
                                <div title="Weighted Pphysicals"><b>W Physical:</b> <span className={getRatingColor(physicalWeighted)}>{physicalWeighted}</span></div>
                            </div>
                        </div>
    
                    </div>
                    <div><i onClick={() => this.handleRemovePlayer({ listId: list.id, boidId: boid.id, listName: list.name, boidName: boid.name }) } title="Remove player from list" className="nav-icon material-icons" style={{ textShadow: '1px 1px 8px #222', cursor: 'pointer', color: 'red', paddingRight: '5px' }}>close</i></div>
                </div>
            );
        }
        return <span />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoidCard);
