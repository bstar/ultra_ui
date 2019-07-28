import React from 'react';
import _ from 'lodash';
import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';

const radar = {};



const getCategotyValues = (atts) => {

  return {
    offence: (atts.stickhandling + atts.wristshot + atts.deking + atts.passing + atts.creativity)/5,
    defence: (atts.checking + atts.positioning + atts.slapshot + atts.passing)/4,
    skating: (atts.acceleration + atts.speed + atts.stamina)/3,
    tenacity: (atts.determination + atts.work_rate + atts.bravery + atts.strength)/4,
    leadership: (atts.influence + atts.teamwork + atts.work_rate)/3,
  }
}


radar.options = (player) => {

  const attributes = player.attributes ? player.attributes[player.attributes.length - 1] : {};
  const speed = attributes.speed;
  const acceleration = attributes.acceleration;
  const wristshot = attributes.wristshot;
  const stickhandling = attributes.stickhandling;
  const passing = attributes.passing;
  const deking = attributes.deking;
  const anticipation = attributes.anticipation;
  const influence = attributes.influence;
  const determination = attributes.determination;
  const positioning = attributes.positioning;
  const checking = attributes.checking;
  const categories = getCategotyValues(attributes);
  const glove = attributes.glove;
  const blocker = attributes.blocker;
  const reflexes = attributes.reflexes;
  const rebound_control = attributes.rebound_control;
  const agility = attributes.agility;

  const playerIndicator = [
    { name: 'Anticipation', max: 20},
    { name: 'Offence', max: 20},
    { name: 'Skating', max: 20},
    { name: 'Passing', max: 20},
    { name: 'Determination', max: 20},
    { name: 'Leadership', max: 20},
    { name: 'Tenacity', max: 20},
    { name: 'Defence', max: 20},
  ];

  const goalieIndicator = [
    { name: 'Anticipation', max: 20},
    { name: 'Glove', max: 20},
    { name: 'Blocker', max: 20},
    { name: 'Positioning', max: 20},
    { name: 'Determination', max: 20},
    { name: 'Reflexes', max: 20},
    { name: 'Agility', max: 20},
    { name: 'Rebounds', max: 20},
  ];

  const playerValue = [ anticipation, categories.offence, categories.skating, passing, determination, categories.leadership, categories.tenacity, categories.defence ];
  const goalieValue = [ anticipation, glove, blocker, positioning, determination, reflexes, agility, rebound_control ];
  const value = player.positions_short === 'G' ? goalieValue : playerValue;
  const indicator = player.positions_short === 'G' ? goalieIndicator : playerIndicator;

  return ({
    radar: [
      {
        axisLine: {
          show: false,
        },
        splitNumber: 4,
        splitLine: {
          lineStyle: {
            color: 'rgba(0,0,0,0)'
          }
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: CHARTCONFIG.color.splitArea2
          }
        },
        indicator,
      }
    ],
    calculable: true,
    series: [
      {
        name: 'Role Attributes',
        type: 'radar',
        symbol:'none',
        itemStyle: {
            emphasis: {
                color: '#eee',
                lineStyle: {
                    width: 1
                }
            }
        },
          data: [
          {
            value,
            name: 'Attributes',
            itemStyle: {
              normal: {
                color: '#ddd',
                borderType: 'solid'
              }
            }
          }
        ]
      }
    ]
  })
};


const Chart = ({player}) => (
  <ReactEcharts style={{ height: '207px', marginTop: '30px' }} option={radar.options(player)} showLoading={false} />
);

export default Chart;
