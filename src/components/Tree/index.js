import React, { Component } from 'react';
import PropTypes from 'prop-types';
import findIndex from 'lodash/findIndex';
import shallowEqual from 'shallowequal';
import { lazyFunction } from '_utils';
import TreeNode from './TreeNode';

/**
 * data =[
 * {
 * parent:0,
 * title:'abc'
 * children:[],
 * isOpen,
 * isSelected
 * }
 * ]
 */

class Tree extends Component {
  constructor(props) {
    super(props);
    console.log('tree props', props);
    this.state = {
      nodes: props.treeData,
    };
  }

  static getDerivedStateFromProps(props, state) {
    // reset state if props tree data changed
    if (!shallowEqual(props.treeData, state.nodes)) {
      console.log('tree data changed');
      return {
        nodes: props.treeData,
      };
    }
    return null;
  }

  onSelect = node => {
    // const { nodes } = this.state;
    const { onSelect } = this.props;
    // const nodeIndex = findIndex(nodes, i => i.id === node.id);
    // if (nodeIndex >= 0) nodes[nodeIndex].isSelected = !nodes[nodeIndex].isSelected;
    // this.setState({ nodes });
    onSelect(node);
  };

  onToggle = node => {
    const { nodes } = this.state;
    const nodeIndex = findIndex(nodes, i => i.id === node.id);
    if (nodeIndex >= 0) nodes[nodeIndex].isOpen = !nodes[nodeIndex].isOpen;
    this.setState({ nodes });
  };

  render() {
    const { nodes } = this.state;
    const rootNodes = nodes.filter(i => i.parent === 0);
    console.log('nodes', nodes);
    console.log('rootNodes', rootNodes);

    return (
      <div>
        {rootNodes.map(i => (
          <TreeNode
            key={i.id}
            node={i}
            onNodeSelect={this.onSelect}
            // childNodes={i.children}
            onToggle={this.onToggle}
          />
        ))}
      </div>
    );
  }
}
const lazyTreeType = lazyFunction(() => {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  return Tree.propTypes.treeData;
});

Tree.propTypes = {
  treeData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      parent: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
      children: PropTypes.arrayOf(PropTypes.instanceOf(lazyTreeType)),
    }),
  ).isRequired,
};

export default Tree;
