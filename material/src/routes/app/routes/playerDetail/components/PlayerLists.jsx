import React from 'react';


const PlayerLists = ({ lists, username }) => {

  const globalLists = lists && lists.filter(list => list.key === 'global');
  const personalLists = lists && lists.filter(list => (list.key === 'personal') && (list.userName === username));

  return (
    <div className="row" style={{ height: '186px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ margin: '15px -10px 0px 10px', width: 'width: 270px', overflowY: 'auto', position: 'relative', height: '180px' }}>
        <div style={{ marginBottom: '7px', color: 'rgb(159, 207, 223)', fontWeight: 500, textShadow: 'rgba(0, 0, 0, 0.4) 1px 1px 3px', fontSize: '18px' }}>Global Rankings:</div>

        { globalLists.length > 0 ?
            globalLists.map(list => {
                return <div>{list.name} ({list.listdata.rank})</div>
            })
        :
            <div>Player does not belong to a Global list</div>
        }
      </div>
      <div style={{ margin: '15px 0px 0px 20px', width: 'width: 260px', overflowY: 'auto', position: 'relative', height: '180px' }}>
        <div style={{ marginBottom: '7px', color: 'rgb(159, 207, 223)', fontWeight: 500, textShadow: 'rgba(0, 0, 0, 0.4) 1px 1px 3px', fontSize: '18px' }}>Personal Lists: <span style={{ fontSize: '14px', cursor: 'pointer' }}>(hide)</span></div>

        <div>
          { personalLists.length > 0 ?
              personalLists.map(list => {
                  return <div><a href={`#/app/lists`}>{list.name} ({list.listdata.rank})</a></div>
              })
          :
              <div>Player does not belong to a Personal list</div>
          }
        </div>

      </div>
    </div>
  )
};

PlayerLists.defaultProps = {
  lists: null,
};

export default PlayerLists;
