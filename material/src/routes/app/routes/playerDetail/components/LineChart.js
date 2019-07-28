import React from 'react';
import _ from 'lodash';
import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';

const line = {};

line.options = (player) => {

  console.log("PLAYER", player)
  const technicalRating = _.map(player.player.attributes, (attribute) => {
    return attribute.technical_rating;
  });

  const mentalRating = _.map(player.player.attributes, (attribute) => {
    return attribute.mental_rating;
  });

  const physicalRating = _.map(player.player.attributes, (attribute) => {
    return attribute.physical_rating;
  });

  const dates = _.map(player.player.attributes, (attribute) => {
    const num = attribute.game_date.match(/^\S{3}/);

    return `${num && num[0]} — ${attribute.att_growth}`; // TODO save age in attributes array
  });;


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
        data: ['Technical', 'Mental', 'Physical'],
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
          name: 'Technical',
          type: 'line',
          smooth: false,
          data: technicalRating,
        },
        {
          name: 'Mental',
          type: 'line',
          smooth: false,
          data: mentalRating,
        },
        {
          name: 'Physical',
          type: 'line',
          smooth: false,
          data: physicalRating,
        }
      ]
    }
  );
};


const Chart = (player) => (
  <div><ReactEcharts style={{ height: '200px' }} option={line.options(player)} showLoading={false} /></div>
);

export default Chart;
