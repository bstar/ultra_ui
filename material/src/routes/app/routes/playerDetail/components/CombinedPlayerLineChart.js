import React from 'react';
import _ from 'lodash';
import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';

const line = {};


line.options = ({ attributes }) => {

  const combinedRating = _.map(attributes, attribute => attribute.combined_rating);

  const dates = _.map(attributes, attribute => {
    const num = attribute.game_date.match(/^\S{3}/);

    return `${num && num[0]} — ${attribute.att_growth}`; // TODO save age in attributes array
  });

  return (
    {
      height: 150,
      grid: {
        left: 30,
        top: 15,
        right: 5,
        bottom: 0
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        show: false,
        itemGap: 5,
        data: ['Combined'],
        textStyle: {
          color: CHARTCONFIG.color.text
        },
        margin: {
          top: 0,
          bottom: 0,
        }
      },
      calculable: false,
      axisLine: {
        show: true,
        lineStyle: {
          color: '#eee'
        }
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: dates,
          axisLabel: {
            textStyle: {
              color: CHARTCONFIG.color.text
            }
          },
          splitLine: {
            lineStyle: {
              color: CHARTCONFIG.color.splitLine
            }
          }
        }
      ],
      yAxis: [
        {
          scale: true,
          display: true,
          tickPadding: 0,
          type: 'value',
          axisLabel: {
            textStyle: {
              color: CHARTCONFIG.color.text
            }
          },
          splitLine: {
            lineStyle: {
              color: CHARTCONFIG.color.splitLine
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: CHARTCONFIG.color.splitArea
            }
          }
        }
      ],
      series: [
        {
          name: 'Combined',
          type: 'line',
          smooth: false,
          data: combinedRating,
          areaStyle: { normal: { opacity: 0.15, color: 'rgb(125, 214, 223)' } },
          itemStyle: {
            normal: {
                color: 'rgb(125, 183, 223)'
            }
          },
        }
      ]
    }
  );
};


const CombinedPlayerLineChart = ({ attributes }) => (
  <div>
    <ReactEcharts style={{ height: '200px' }} option={line.options({ attributes })} showLoading={false} />
  </div>
);

export default CombinedPlayerLineChart;
