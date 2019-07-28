import React from 'react';
import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';

const Statboxes = ({ player }) => {

  const getRatingColor = (rating) => {
    if (rating < 30) {
      return 'red';
    }

    if (rating < 70) {
      return 'orange';
    }

    if (rating < 80) {
      return 'green';
    }

    return 'blue';
  }

  const getMentalRatingColor = (rating) => {
    if (rating < 30) {
      return 'red';
    }

    if (rating < 50) {
      return 'orange';
    }

    if (rating < 75) {
      return 'green';
    }

    return 'blue';
  }


  const totals = {
    technical: 12,
    mental: 9,
    physical: 6,
    total: 27,
  };

  const styles = {
    statText: {
      textShadow: '1px 1px 3px rgba(0, 0, 0,.4)',
      fontSize: '22px',
      fontWeight: 400,
      lineHeight: '26px',
      marginTop: '10px',
    },
    headingText: {
      border: 'none',
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
      boxShadow: '1px 1px 18px rgba(1, 1, 1, .35)'
    }
  }

  const ageRatingTotal = (((player.combined_rating / totals.total) / (player.age * .01)) * 1.5).toFixed(0);
  const ageRatingTechnical = (((player.combined_rating / totals.technical) / (player.age * .01)) * 1.5).toFixed(0);
  const ageRatingMental = (((player.combined_rating / totals.mental) / (player.age * .01)) * 1.5).toFixed(0);
  const ageRatingPhysical = (((player.combined_rating / totals.physical) / (player.age * .01)) * 1.5).toFixed(0);

  return (
    <div className="row">
      <div className="col-xl-3 col-sm-6">
        <div className="box box-default">
          <div className="box-top" style={styles.boxtop}>
            { player.id &&
              <div style={ styles.statText } className="row">
                <div className="col-xl-4">
                  <div className={`${getRatingColor(player.combined_off_weighted)}`}>
                    {player.combined_off_weighted.toFixed(2)}
                  </div>
                  <div style={{...styles.ratingsLabel}}>
                    Offensive
                  </div>
                </div>
                <div className="col-xl-4">
                  <div className={`${getRatingColor(player.combined_def_weighted)}`}>
                    {player.combined_def_weighted.toFixed(2)}
                  </div>
                  <div style={{...styles.ratingsLabel}}>
                    Defensive
                  </div>
                </div>
                <div className="col-xl-4">
                  <div className={`${getRatingColor(player.combined_two_weighted)}`}>
                    {player.combined_two_weighted.toFixed(2)}
                  </div>
                  <div style={{...styles.ratingsLabel}}>
                    Two Way
                  </div>
                </div>
              </div>
            }
          </div>
          <div className="box-info" style={{ top: '0%' }}>
            <span style={ styles.headingText }>Combined Weighted Ratings</span>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6">
        <div className="box box-default">
          <div className="box-top" style={styles.boxtop}>
            { player.id &&
              <div style={ styles.statText } className="row">
                <div className="col-xl-4">
                  <div className={`${getRatingColor(player.technical_off_weighted)}`}>
                    {player.technical_off_weighted.toFixed(2)}
                  </div>
                  <div style={{...styles.ratingsLabel}}>
                    Offensive
                  </div>
                </div>
                <div className="col-xl-4">
                  <div className={`${getRatingColor(player.technical_def_weighted)}`}>
                    {player.technical_def_weighted.toFixed(2)}
                  </div>
                  <div style={{...styles.ratingsLabel}}>
                    Defensive
                  </div>
                </div>
                <div className="col-xl-4">
                  <div className={`${getRatingColor(player.technical_two_weighted)}`}>
                    {player.technical_two_weighted.toFixed(2)}
                  </div>
                  <div style={{...styles.ratingsLabel}}>
                    Two Way
                  </div>
                </div>
              </div>
            }
          </div>
          <div className="box-info" style={{ top: '0%' }}>
            <span style={ styles.headingText }>Technical Weighted Ratings</span>
          </div>

        </div>
      </div>
      <div className="col-xl-3 col-sm-6">
        <div className="box box-default">
          <div className="box-top" style={styles.boxtop}>
            { player.id &&
              <div style={ styles.statText } className="row">
                <div className="col-xl-4">
                  <div className={`${getMentalRatingColor(player.mental_off_weighted)}`}>
                    {player.mental_off_weighted.toFixed(2)}
                  </div>
                  <div style={{...styles.ratingsLabel}}>
                    Offensive
                  </div>
                </div>
                <div className="col-xl-4">
                  <div className={`${getMentalRatingColor(player.mental_def_weighted)}`}>
                    {player.mental_def_weighted.toFixed(2)}
                  </div>
                  <div style={{...styles.ratingsLabel}}>
                    Defensive
                  </div>
                </div>
                <div className="col-xl-4">
                  <div className={`${getMentalRatingColor(player.mental_two_weighted)}`}>
                    {player.mental_two_weighted.toFixed(2)}
                  </div>
                  <div style={{...styles.ratingsLabel}}>
                    Two Way
                  </div>
                </div>
              </div>
            }
          </div>
          <div className="box-info" style={{ top: '0%' }}>
            <span style={ styles.headingText }>Mental Weighted Ratings</span>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6">
        <div className="box box-default">
          <div className="box-top" style={styles.boxtop}>
            { player.id &&
              <div style={ styles.statText } className="row">
                <div className="col-xl-4">
                  <div className={`${getRatingColor(player.physical_off_weighted)}`}>
                    {player.physical_off_weighted.toFixed(2)}
                  </div>
                  <div style={{...styles.ratingsLabel}}>
                    Offensive
                  </div>
                </div>
                <div className="col-xl-4">
                  <div className={`${getRatingColor(player.physical_def_weighted)}`}>
                    {player.physical_def_weighted.toFixed(2)}
                  </div>
                  <div style={{...styles.ratingsLabel}}>
                    Defensive
                  </div>
                </div>
                <div className="col-xl-4">
                  <div className={`${getRatingColor(player.physical_two_weighted)}`}>
                    {player.physical_two_weighted.toFixed(2)}
                  </div>
                  <div style={{...styles.ratingsLabel}}>
                    Two Way
                  </div>
                </div>
              </div>
            }
          </div>
          <div className="box-info" style={{ top: '0%' }}>
            <span style={ styles.headingText }>Physical Weighted Ratings</span>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Statboxes;
