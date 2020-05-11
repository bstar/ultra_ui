import React from 'react';

const Statboxes = ({ player }) => {

  const getRatingColor = rating => {

    const convertedRating = rating.toFixed(0);

    if (convertedRating < 30) {
      return 'red';
    }

    if (convertedRating < 60) {
      return 'orange';
    }

    if (convertedRating < 85) {
      return 'green';
    }

    return 'blue';
  };

  const styles = {
    statText: {
      textShadow: '1px 1px 3px rgba(0, 0, 0,.4)',
      fontSize: '28px',
      fontWeight: 400,
      lineHeight: '30px',
      marginTop: '10px',
    },
    headingText: {
      fontSize: '12px',
      color: 'rgba(255, 255, 255, 0.7)',
      border: '1px solid rgb(46, 110, 115)',
    },
    ratingsLabel: {
      padding: '0px',
      fontSize: '16px',
    },
    boxtop: {
      padding: '15px 10px 0px 10px',
    },
    colShadow: {
      boxShadow: '1px 1px 18px rgba(1, 1, 1, .35)',
    }
  };

  return (
    <div className="row">
      <div className="col-xl-3 col-sm-6">
        <div className="box box-default">
          <div className="box-top" style={styles.boxtop}>
            { player.id &&
              <div style={ styles.statText } className="row">
                <div className="col-xl-12">
                  <div className={`${getRatingColor(player.combined_off_weighted)}`}>
                    {((player.combined_off_weighted * .01)*20).toFixed(1)}
                  </div>
                  <div style={{...styles.ratingsLabel}}>
                    Offensive Combined
                  </div>
                </div>
              </div>
            }
          </div>
          <div className="box-info" style={{ top: '0%' }}>
            <span style={ styles.headingText }>Combined Weighted Rating</span>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6">
        <div className="box box-default">
          <div className="box-top" style={styles.boxtop}>
            { player.id &&
              <div style={ styles.statText } className="row">
                <div className="col-xl-12">
                  <div className={`${getRatingColor(player.technical_off_weighted)}`}>
                    {((player.technical_off_weighted * .01)*20).toFixed(1)}
                  </div>
                  <div style={{...styles.ratingsLabel}}>
                    Offensive Technical
                  </div>
                </div>
              </div>
            }
          </div>
          <div className="box-info" style={{ top: '0%' }}>
            <span style={ styles.headingText }>Technical Weighted Rating</span>
          </div>

        </div>
      </div>
      <div className="col-xl-3 col-sm-6">
        <div className="box box-default">
          <div className="box-top" style={styles.boxtop}>
            { player.id &&
              <div style={ styles.statText } className="row">
                <div className="col-xl-12">
                  <div className={`${getRatingColor(player.mental_off_weighted)}`}>
                    {((player.mental_off_weighted * .01)*20).toFixed(1)}
                  </div>
                  <div style={{...styles.ratingsLabel}}>
                    Offensive Mental
                  </div>
                </div>
              </div>
            }
          </div>
          <div className="box-info" style={{ top: '0%' }}>
            <span style={ styles.headingText }>Mental Weighted Rating</span>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6">
        <div className="box box-default">
          <div className="box-top" style={styles.boxtop}>
            { player.id &&
              <div style={ styles.statText } className="row">
                <div className="col-xl-12">
                  <div className={`${getRatingColor(player.physical_off_weighted)}`}>
                    {((player.physical_off_weighted * .01)*20).toFixed(1)}
                  </div>
                  <div style={{...styles.ratingsLabel}}>
                    Offensive Physical
                  </div>
                </div>
              </div>
            }
          </div>
          <div className="box-info" style={{ top: '0%' }}>
            <span style={ styles.headingText }>Physical Weighted Rating</span>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Statboxes;
