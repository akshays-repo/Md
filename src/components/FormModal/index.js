import React from 'react';
import classNames from 'classnames';
import './styles.css';

export const FormModal = FormComponent => {
  class ModalFormComponent extends React.Component {
    render() {
      const { show, title, onClose, onSave } = this.props;
      console.log('modalformcomp');
      return (
        <div
          className={classNames({
            'modal modal-show': show,
            'modal modal-none': !show,
          })}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button
                  type="button"
                  onClick={onClose}
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <FormComponent {...this.props} />
              </div>
              <div className="modal-footer">
                <button type="button" onClick={onSave} className="btn save-btn">
                  Save changes
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  return ModalFormComponent;
};

export default FormModal;
