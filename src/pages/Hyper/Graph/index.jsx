import React, { useEffect, useMemo, useState } from 'react';
import { Graphin } from '@antv/graphin';

import hyper from './data.js'

const colors = [
  '#F6BD16',
  '#00C9C9',
  '#F08F56',
  '#D580FF',
  '#FF3D00',
  '#FF2D00',
  '#FF1D00',
  '#FF0D00',
  '#FF0000',
  '#FF0D00',
  '#FF1D00',
  '#FF2D00',
  '#FF3D00',]

export default () => {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    fetch('https://assets.antv.antgroup.com/g6/collection.json')
      .then((res) => res.json())
      .then((data) => {
        console.log('data', hyper);
        setData(hyper);
      }
      )
  }, []);

  const options = useMemo(
    () => {
      let groupedNodesByCluster = {};
      let createStyle = () => ({});

      let hyperData = {
        nodes: [],
        edges: [],
      };
      let plugins = [];
      if (data) {
        for (const key in data.vertices) {
          hyperData.nodes.push({
            id: key,
            label: key,
            ...data.vertices[key],
          });
        }

        createStyle = (baseColor) => ({
          fill: baseColor,
          stroke: baseColor,
          labelFill: '#fff',
          labelPadding: 2,
          labelBackgroundFill: baseColor,
          labelBackgroundRadius: 5,
        });

        const keys = Object.keys(data.edges);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          console.log(i, colors[i]);
          const nodes = key.split('|#|');
          groupedNodesByCluster[key] = nodes;
          plugins.push({
            key: `bubble-sets-${key}`,
            type: 'bubble-sets',
            members: nodes,
            // labelText: key,
            ...createStyle(colors[i]),
          });
        }
      }

      plugins.push({
        type: 'tooltip',
        getContent: (e, items) => {
          let result = `<h4>Custom Content</h4>`;
          items.forEach((item) => {
            result += `<p>${item.data.description}</p>`;
          });
          return result;
        },
      })

      console.log(hyperData);

      return {
        autoResize: true,
        data: hyperData,
        behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
        node: {
          palette: { field: 'cluster' },
          labelText: (d) => d.label,
        },
        autoFit: 'center',
        layout: {
          type: 'force',
          preventOverlap: true,
          linkDistance: (d) => {
            return 4;
          },
        },
        plugins,
      }
    },
    [data],
  );

  if (!data) return <p>Loading...</p>;

  return <Graphin options={options} id="my-graphin-demo"
    className="my-graphin-container"
    style={{ width: '100%', height: '80vh' }} />;
}