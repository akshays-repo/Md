/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import ModalHead from './ModalHead';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import './styles.scss';

const StyledIconDiv = styled.div`
  padding: 1em;
  border-bottom: 1px solid #dee2e6;
  position:sticky;
  background-color:inherit;
  z-index:1;
  top:0;
`;

const StyledModal = styled.div`
  height: 100%;
`;

const StyledModalContent = styled.div`
  height: 100%;
  overflow-y: auto;
`;
class Modal extends Component {
  static Head = ModalHead;

  static Body = ModalBody;

  static Footer = ModalFooter;

  render() {
    const { show, onClose, children } = this.props;
    console.log('in Modal', show);
    // if (!show) return null;
    return (
      <div
        className={classNames({
          'modal modal-show': show,
          'modal modal-none': !show,
        })}
        // ROLE WAS dialog
        role="presentation"
        tabIndex={-42}
        
      >
        <StyledModal
          className={classNames({
            'modal-dialog': true,
          })}
          role="dialog"
        >
          <StyledModalContent className="modal-content">
            {onClose && (
              <StyledIconDiv role="button" tabIndex={0} onKeyDown={onClose} onClick={onClose}>
                <i className="fas fa-close fa-pull-right" />
              </StyledIconDiv>
            )}
            {show && children}
            {!show && null}
          </StyledModalContent>
        </StyledModal>
      </div>
    );
  }
}

export default Modal;
