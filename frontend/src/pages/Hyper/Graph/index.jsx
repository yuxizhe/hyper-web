import React, { useEffect, useMemo, useState } from 'react';
import { Graphin } from '@antv/graphin';

import hyper from './data.js'
import { Select } from 'antd';

const colors = [
  '#F6BD16',
  '#00C9C9',
  '#F08F56',
  '#D580FF',
  '#FF3D00',
  '#16f69c',
  '#004ac9',
  '#f056d1',
  '#a680ff',
  '#c8ff00',
]

export default () => {
  const [data, setData] = useState(undefined);
  const [keys, setKeys] = useState(undefined);
  const [key, setKey] = useState(undefined);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/db/hyperedges')
      .then((res) => res.json())
      .then((data) => {
        setKeys(data);
      }
      )
    fetch('http://127.0.0.1:8000/db/hyperedge_neighbor/' + '二郎神|*|玉帝')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      }
      )
  }, []);

  useEffect(() => {
    if (!key) return;
    fetch('http://127.0.0.1:8000/db/hyperedge_neighbor/' + key)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      }
      )
  }, [key]);

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
          labelPlacement: 'center',
          labelAutoRotate: false,
          // bubblesets
          maxRoutingIterations: 100,
          maxMarchingIterations: 20,
          pixelGroup: 4,
          edgeR0: 10,
          edgeR1: 60,
          nodeR0: 15,
          nodeR1: 50,
          morphBuffer: 10,
          threshold: 1,
          memberInfluenceFactor: 1,
          edgeInfluenceFactor: 1,
          nonMemberInfluenceFactor: -0.8,
          virtualEdges: true,
        });

        const keys = Object.keys(data.edges);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const edge = data.edges[key];
          const nodes = key.split('|#|');
          groupedNodesByCluster[key] = nodes;
          plugins.push({
            key: `bubble-sets-${key}`,
            type: 'bubble-sets',
            members: nodes,
            labelText: '' + edge.keywords,
            ...createStyle(colors[i % 10]),
          });
        }
      }

      plugins.push({
        type: 'tooltip',
        getContent: (e, items) => {
          let result = '';
          items.forEach((item) => {
            result += `<h4>${item.id}</h4><p>${item.description}</p>`;
          });
          return result;
        },
      })

      console.log(hyperData);

      return {
        autoResize: true,
        data: hyperData,
        node: {
          palette: { field: 'cluster' },
          style: {
            labelText: d => d.id,
          }
        },
        animate: false,
        behaviors: [
          // {
          //   type: 'click-select',
          //   degree: 1,
          //   state: 'active',
          //   unselectedState: 'inactive',
          //   multiple: true,
          //   trigger: ['shift'],
          // },
          'zoom-canvas', 'drag-canvas', 'drag-element',
        ],
        autoFit: 'center',
        layout: {
          type: 'force',
          // enableWorker: true,
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

  return <>
    选择超边：<Select onChange={setKey} style={{ width: 300 }} defaultValue={'二郎神|*|玉帝'} showSearch>
      {keys.map((key) => {
        return <Select.Option key={key} value={key} >{key}</Select.Option>
      })}
    </Select>
    <Graphin options={options} id="my-graphin-demo"
    className="my-graphin-container"
      style={{ width: '100%', height: '80vh' }} />
  </>
}