import React from 'react';
import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';

import { getCategotyValues } from '../../../../../utils';

const radar = {};

radar.options = ({ position, attsArray }) => {
  const attributes = attsArray ? attsArray[attsArray.length - 1] : {};
  const passing = attributes.passing;
  const anticipation = attributes.anticipation;
  const determination = attributes.determination;
  const positioning = attributes.positioning;
  const categories = getCategotyValues(attributes);
  const glove = attributes.glove;
  const blocker = attributes.blocker;
  const reflexes = attributes.reflexes;
  const rebound_control = attributes.rebound_control;
  const agility = attributes.agility;

  // const speed = attributes.speed;
  // const acceleration = attributes.acceleration;
  // const wristshot = attributes.wristshot;
  // const stickhandling = attributes.stickhandling;
  // const deking = attributes.deking;
  // const influence = attributes.influence;
  // const checking = attributes.checking;

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
  const value = position === 'G' ? goalieValue : playerValue;
  const indicator = position === 'G' ? goalieIndicator : playerIndicator;

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

const PlayerRadarChart = ({ position, attributes }) => (
  <ReactEcharts style={{ height: '210px', width: '280px', position: 'unset' }} option={radar.options({ position, attsArray: attributes })} showLoading={false} />
);

export default PlayerRadarChart;
