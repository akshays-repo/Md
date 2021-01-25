import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
// import 'assets/styles/colors.scss';

class UploadList extends Component {
  handleRemove = e => {
    const { onRemove } = this.props;
    console.log(e.currentTarget);
    const { dataset } = e.currentTarget;
    if (dataset.uid) onRemove(dataset.uid);
  };

  handleImageClick = e => {
    console.log(e.currentTarget);
    const { dataset } = e.currentTarget;
    if (dataset.url) window.open(dataset.url, '_blank');
  };

  render() {
    const { list, onRemove, showPreview } = this.props;
    console.log(list);

    const renderImg = ({ url, file, thumbnail }) => {
      if (file)
        return file.type.match(/image.*/) ? (
          <img className="img-fluid" src={url || ''} alt="" />
        ) : (
          <embed className="img-fluid" type={file ? file.type : ''} src={url} />
          );

      return <img className="img-fluid" src={`/${thumbnail || url}`} alt="" />;
    };

    const renderItem = item => {
      return (
        <li key={`${item.uid}`} className="upload-list-item">
          {' '}
          {/** overlay was inside upload-list-item */} {/* handle if file null */}
          <div className="upload-item">
            {renderImg({ url: item.url, file: item.file })}

            <div className="overlay">
              {onRemove && (
                <Icon
                  data-uid={item.uid}
                  role="button"
                  tabIndex={0}
                  onKeyDown={this.handleRemove}
                  onClick={this.handleRemove}
                  type="trash"
                />
              )}
              {showPreview && (
                <Icon
                  role="button"
                  data-url={item.previewUrl || item.url}
                  tabIndex={0}
                  onClick={this.handleImageClick}
                  type="eye"
                />
              )}
            </div>
          </div>
        </li>
      );
    };

    return (
      <div className="upload-list-wrapper">
        <ul className="upload-list">{list.map(i => renderItem(i))}</ul>
      </div>
    );
  }
}

UploadList.propTypes = {
  list: PropTypes.array,
  onRemove: PropTypes.func,
  showPreview: PropTypes.bool,
};

UploadList.defaultProps = {
  list: [],
  onRemove: null,
  showPreview: true,
};

export default UploadList;
