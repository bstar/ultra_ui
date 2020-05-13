import React from 'react';
import PropTypes from 'prop-types';
import { sortableHandle } from 'react-sortable-hoc';


const getBorder = (rank, pos) => {
   
    if (rank !== pos) {
        return { border: '1px solid #b59d51' };
    }
};

const handleKeyPress = (e, pos, sortByNumber) => {

    const oldIndex = pos-1;
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

const BoidCard = ({ boid, pos, sortByNumber }) => {

    const DragHandle = sortableHandle(() => <img style={{ height: '22px', cursor: 'move', padding: '0px 0px 3px 0px', filter: 'invert(100%) hue-rotate(20deg)' }} src="assets/img/updown3.png" alt="Move Up/Down" />);

    if (boid) {
        return (
            <div className="boid-card-container" style={getBorder(boid.listdata.rank, pos)}>
                <div style={{ display: 'flex', userSelect: 'none', alignSelf: 'center', alignItems: 'center', flexDirection: 'column', width: '100px', fontSize: '22px', padding: '0px 18px 0px 10px', textShadow: '1px 1px 2px black' }}>
                    <div>{pos}</div>
                    <div><DragHandle /></div>
                    <div><input onKeyPress={e => handleKeyPress(e, pos, sortByNumber)} style={{ textAlign: 'center', outline: 'none', border: '1px solid #2e6e73', width: '28px', height: '20px', padding: '2px', fontSize: '12px', background: 'none', color: '#eee' }}></input></div>
                </div>
                <div style={{ cursor: 'auto', userSelect: 'none', flexDirection: 'row', display: 'flex', overflow: 'auto' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ padding: '0px 10px 0px 10px', width: '300px' }}>
                            <div style={{ fontSize: '18px' }}>
                                <a style={{ paddingRight: '5px' }} href={`#/app/playerdetail/${boid.id}`}>{boid.name}</a> 
                                <span style={{ fontSize: '11px' }}><b>{boid.positions_short}</b></span>
                            </div>
                            <div>{boid.dob} ({boid.age})</div>
                            <div><b>Nation: </b>{boid.nation}</div>
                        </div>
                        <div style={{ padding: '0px 10px 0px 10px', width: '250px' }}>
                            <div><b>Club:</b> {boid.club_playing}</div>
                            <div>{boid.handedness}</div>
                            <div>{boid.player_roles}</div>
                        </div>
                        <div style={{ padding: '0px 10px 0px 10px', width: '150px' }}>
                            <div><b>COM:</b> {boid.combined_rating}</div>
                            <div><b>A/O:</b> {boid.age_over && boid.age_over.toFixed(1)}</div>
                            <div><b>Growth:</b> {boid.att_growth}</div>
                        </div>
                        <div style={{ padding: '0px 10px 0px 10px', width: '200px' }}>
                            <div><b>Tech Weighted:</b> {boid.technical_off_weighted.toFixed(1)}</div>
                            <div><b>Mental Weighted:</b> {boid.age_over && boid.mental_off_weighted.toFixed(1)}</div>
                            <div><b>Physical Weighted:</b> {boid.age_over && boid.physical_off_weighted.toFixed(1)}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <span />;
};

BoidCard.propTypes = {
    boid: PropTypes.object,
};

BoidCard.defaultProps = {
    boid: {},
};

export default BoidCard;