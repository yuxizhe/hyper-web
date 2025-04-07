import React, { useEffect, useMemo, useState } from 'react';
import { Graphin } from '@antv/graphin';

export default () => {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    fetch('https://assets.antv.antgroup.com/g6/collection.json')
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
        setData(data);
      }
      )
  }, []);

  const options = useMemo(
    () => {
      let groupedNodesByCluster = {};
      let createStyle = () => ({});

      if (data) {
        groupedNodesByCluster = data.nodes.reduce((acc, node) => {
          const cluster = node.data.cluster;
          acc[cluster] ||= [];
          acc[cluster].push(node.id);
          return acc;
        }, {});

        createStyle = (baseColor) => ({
          fill: baseColor,
          stroke: baseColor,
          labelFill: '#fff',
          labelPadding: 2,
          labelBackgroundFill: baseColor,
          labelBackgroundRadius: 5,
        });
      }

      return {
        autoResize: true,
        data,
        behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
        node: {
          palette: { field: 'cluster' },
        },
        autoFit: 'center',
        layout: {
          type: 'force',
          preventOverlap: true,
          linkDistance: (d) => {
            if (d.source === 'node0' || d.target === 'node0') {
              return 200;
            }
            return 80;
          },
        },
        plugins: [
          {
            key: 'bubble-sets-a',
            type: 'bubble-sets',
            members: groupedNodesByCluster['a'],
            labelText: 'cluster-a',
            ...createStyle('#1783FF'),
          },
          {
            key: 'bubble-sets-b',
            type: 'bubble-sets',
            members: groupedNodesByCluster['b'],
            labelText: 'cluster-b',
            ...createStyle('#00C9C9'),
          },
          {
            key: 'bubble-sets-c',
            type: 'bubble-sets',
            members: groupedNodesByCluster['c'],
            labelText: 'cluster-c',
            ...createStyle('#F08F56'),
          },
          {
            key: 'bubble-sets-d',
            type: 'bubble-sets',
            members: groupedNodesByCluster['d'],
            labelText: 'cluster-d',
            ...createStyle('#D580FF'),
          },
        ],
      }
    },
    [data],
  );

  if (!data) return <p>Loading...</p>;

  return <Graphin options={options} id="my-graphin-demo"
    className="my-graphin-container"
    style={{ width: '100%', height: '80vh' }} />;
}