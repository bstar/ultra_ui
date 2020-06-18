import React from 'react';
import { convertWeighted, getRatingColor } from 'utils';

const Statboxes = ({ player }) => {

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

  const combinedRating = convertWeighted(player.combined_off_weighted);
  const technicalRating = convertWeighted(player.technical_off_weighted, 'technical');
  const mentalRating = convertWeighted(player.mental_off_weighted, 'mental');
  const physicalRating = convertWeighted(player.physical_off_weighted, 'physical');

  return (
    <div className="row">
      <div className="col-xl-3 col-sm-6">
        <div className="box box-default">
          <div className="box-top" style={styles.boxtop}>
            { player.id &&
              <div style={ styles.statText } className="row">
                <div className="col-xl-12">
                  <div className={`${getRatingColor(combinedRating)}`}>
                    {combinedRating}
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
                  <div className={`${getRatingColor(technicalRating)}`}>
                    {technicalRating}
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
                  <div className={`${getRatingColor(mentalRating)}`}>
                    {mentalRating}
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
                  <div className={`${getRatingColor(physicalRating)}`}>
                    {physicalRating}
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
