import Graphin, { GraphinContextType, GraphinData, GraphinTreeData } from '@antv/graphin';
import {
  MiniMap,
  Toolbar,
  ContextMenu,
  FishEye,
  LayoutSelector 
} from '@antv/graphin-components';
import { ZoomOutOutlined, ZoomInOutlined } from '@ant-design/icons';
import { ToolBarItemType } from '@antv/graphin-components/lib/Toolbar';
import styles from './index.less';
import React, { useState } from 'react';
import DemoLayoutSelector from './LayoutSelector/LayoutSelectorDemo';
const { Menu } = ContextMenu;

const defaultLayout = {
  type: 'graphin-force',
  preset: {
    type: 'concentric',
  },
  animation: true,
};

const defaultData = {
  nodes: [
    {
      id: 'node-0',
      style: {
        label: { value: '节点0' },
      },
      x: 100,
      y: 100,
    },
    {
      id: 'node-1',
      style: {
        label: { value: '节点1' },
      },
      x: 200,
      y: 200,
    },
    {
      id: 'node-2',
      style: {
        label: { value: '节点2' },
      },
      x: 100,
      y: 300,
    },
    {
      id: 'node-3',
      style: {
        label: { value: '节点3' },
      },
      x: 200,
      y: 400,
    },
  ],
  edges: [
    {
      source: 'node-0',
      target: 'node-1',
    },
  ],
};

// 这里是导出的页面父组件
export default ( props: {data ?:  GraphinTreeData | GraphinData  }  ) => {
  if (props.data === undefined) {
    props.data = defaultData
  }

  const { data } = props
  const [layout, setLayout] = useState({ ...defaultLayout, animation: true });
  const updateLayout = (previousType: string, type: string) => {
    setLayout({ ...defaultLayout, type });
  };

  const [visible, setVisible] = useState(false);
  const menuClick = () => {
    setVisible(!visible);
  };

  const options = [
    {
      key: 'zoomOut',
      name: (
        <span>
          放大 <ZoomInOutlined />
        </span>
      ),
      icon: <ZoomInOutlined />,
    },
    {
      key: 'zoomIn',
      name: <ZoomOutOutlined />,
    },
  ];

  const toolbarClick = (
    context: GraphinContextType,
    option: ToolBarItemType,
  ) => {
    const { apis } = context;
    const { handleZoomIn, handleZoomOut } = apis;
    if (option.key === 'zoomIn') {
      handleZoomIn();
    } else if (option.key === 'zoomOut') {
      handleZoomOut();
    }
  };



  return (
    <div className={styles.main}>
      {/*  在组件上可以自定义组件暴露的prop属性 这里我们把需要可视化的数据传入，并且定义了layout布局，自适应画布大小 */}
      <Graphin data={data} layout={layout} fitView={true}>
        {/* 小地图 */}
        <div className={styles.map}>
          <MiniMap visible={true} />
        </div>

        {/* 工具栏 */}
        <div className={styles.toolbar}>
          <Toolbar options={options} onChange={toolbarClick} />
        </div>

        {/* 右键菜单 */}
        <ContextMenu bindType="canvas">
          <Menu bindType="canvas">
            <Menu.Item onClick={menuClick}>开启放大镜🔍</Menu.Item>
          </Menu>
        </ContextMenu>

        {/* 放大镜 */}
        <FishEye options={{}} visible={visible} handleEscListener={menuClick} />

        {/* 布局选择器 */}
        <LayoutSelector>
          <DemoLayoutSelector updateLayout={updateLayout} />
        </LayoutSelector>
      </Graphin>
    </div>
  );
};
