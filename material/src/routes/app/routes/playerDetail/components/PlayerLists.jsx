import React from 'react';



const PlayerLists = ({ lists }) => (
    <div className="row" style={{ height: '186px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ margin: '15px -10px 0px 10px', width: '50%', overflowY: 'auto', position: 'relative', height: '155px' }}>
        <div style={{ marginBottom: '7px', color: 'rgb(159, 207, 223)', fontWeight: 500, textShadow: 'rgba(0, 0, 0, 0.4) 1px 1px 3px', fontSize: '18px' }}>Global Rankings:</div>

        { lists ?
            lists.filter(list => list.type === 'global').map(list => {
                return <div><a href={`#/app/lists`}>{list.name} ({list.listdata.rank})</a></div>
            })
        :
            <div>Player belongs to no lists.</div>
        }
      </div>
      <div style={{ margin: '15px 0px 0px 10px', width: '50%', overflowY: 'auto', position: 'relative', height: '155px' }}>
        <div style={{ marginBottom: '7px', color: 'rgb(159, 207, 223)', fontWeight: 500, textShadow: 'rgba(0, 0, 0, 0.4) 1px 1px 3px', fontSize: '18px' }}>Personal Lists: <span style={{ fontSize: '14px', cursor: 'pointer' }}>(hide)</span></div>

        { lists ?
            lists.filter(list => list.type === 'personal').map(list => {
                console.log("LSIT", list)
                return <div><a href={`#/app/lists`}>{list.name} ({list.listdata.rank})</a></div>
            })
        :
            <div>Player belongs to no lists.</div>
        }
      </div>
    </div>
);

PlayerLists.defaultProps = {
  lists: null,
};

export default PlayerLists;
