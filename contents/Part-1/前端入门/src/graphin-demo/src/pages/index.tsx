import Myapp from './myComponent/index';

const mydata = {
  nodes: [
    {
      id: 'node-0',
      style: {
        label: { value: '我是新节点' },
      }
    },
  ],
  edges: [],
};

export default () => <Myapp data={mydata} />;
