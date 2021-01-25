/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const getPaddingLeft = level => {
  return level * 10;
};

const StyledTreeNode = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 5px;
  padding-left: ${props => getPaddingLeft(props.level)}px;
`;

const NodeIcon = styled.div`
  opacity: 1;
  ${props =>
    !props.hasChildren &&
    css`
      opacity: 0;
      pointer-events: none;
    `}
`;

const Label = styled.h5`
  font-size: 14px;
  margin: 0;
  font-weight: 600;
  margin-left: 8px;
  ${props =>
    props.isLeafWithParent &&
    css`
      /* color: palevioletred; */
      font-weight: 400;
    `}
  &:hover {
    cursor: pointer;
  }
`;

const TreeNode = props => {
  const handleToggle = () => {
    console.log('toggle node');
    const { node, onToggle } = props;
    onToggle(node);
  };

  const handleSelectNode = () => {
    console.log('selected node');
    const { node, onNodeSelect } = props;
    onNodeSelect(node);
  };
  const { level, node } = props;
  console.log('hi');
  return (
    <>
      <StyledTreeNode level={level}>
        <NodeIcon hasChildren={node.children && node.children.length > 0} onClick={handleToggle}>
          {node.isOpen && <i className="fas fa-angle-up" />}
          {!node.isOpen && <i className="fas fa-angle-down" />}
        </NodeIcon>

        <Label
          isLeafWithParent={!node.children && node.parent !== 0}
          role="button"
          onClick={handleSelectNode}
        >
          {node.title}
        </Label>
      </StyledTreeNode>

      {node.isOpen === true &&
        node.children &&
        node.children.length > 0 &&
        node.children.map(i => <TreeNode {...props} node={i} key={i.id} level={level + 1} />)}
    </>
  );
};

// class TreeNode extends Component {
//   handleToggle = () => {
//     const { node, onToggle } = this.props;
//     onToggle(node);
//   };

//   handleSelectNode = () => {
//     const { node, onSelect } = this.props;
//     onSelect(node);
//   };

//   render() {
//     const { level, node } = this.props;
//     console.log(node.children);
//     return (
//       <>
//         <StyledTreeNode level={level}>
//           <NodeIcon onClick={this.handleToggle}>
//             {node.isOpen && <i className="fas fa-angle-up" />}
//             {!node.isOpen && <i className="fas fa-angle-down" />}
//           </NodeIcon>
//           <Label role="button" onClick={this.handleSelectNode}>
//             {node.title}
//           </Label>
//         </StyledTreeNode>
//         hi
//         {node.isOpen &&
//           node.children &&
//           node.children.map(i => <TreeNode node={i} level={level + 1} {...this.props} />)}
//       </>
//     );
//   }
// }

TreeNode.propTypes = {
  level: PropTypes.number,
  onNodeSelect: PropTypes.func.isRequired,
};

TreeNode.defaultProps = {
  level: 0,
};

export default TreeNode;
