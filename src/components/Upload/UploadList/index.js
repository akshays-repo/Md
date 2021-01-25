import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import { getFileExtension } from '_utils';
// import { getFileExtension } from '_utils';
// import 'assets/styles/colors.scss';

const whiteColor = { color: 'white' };
class UploadList extends Component {
  state = {
    selectedItems: [],
  };

  handleRemove = e => {
    const { onRemove } = this.props;
    console.log(e.currentTarget.dataset.uid);
    const { dataset } = e.currentTarget;
    if (dataset.uid) onRemove(dataset.uid);
  };

  handleImageClick = e => {
    console.log(e.currentTarget);
    const { dataset } = e.currentTarget;
    if (dataset.url) window.open(dataset.url, '_blank');
  };

  handleSelectClick = id => {
    const { onSelect } = this.props;
    this.setState(
      prev => {
        const { selectedItems: prevSelected } = prev;
        console.log('selected', id, prevSelected);
        if (prevSelected.includes(id))
          return {
            ...prev,
            selectedItems: prevSelected.filter(i => i !== id),
          };
        return {
          ...prev,
          selectedItems: [...prevSelected, id],
        };
      },
      () => {
        // eslint-disable-next-line react/destructuring-assignment
        if (onSelect) onSelect(this.state.selectedItems);
      },
    );
  };

  render() {
    const {
      list: origList,
      onRemove,
      // showPreview
    } = this.props;

    const list = origList.map(i => ({ ...i, uid: i.id }));
    console.log(list);

    const renderImg = ({ url, file, thumbnail }) => {
      if (file)
        return file.type.match(/image.*/) ? (
          <img className="img-fluid" src={url || ''} alt="" />
        ) : (
          <embed className="img-fluid" type={file ? file.type : ''} src={url} />
        );

      return getFileExtension(thumbnail || url) === 'pdf' ? (
        <p className="text-center">PDF</p>
      ) : (
        <img className="img-fluid" src={`/${thumbnail || url}`} alt="" />
      );
      // return getFileExtension(thumbnail || url) === 'pdf' ? (
      //   <object className="img-fluid" data={thumbnail || url}>
      //     <embed src={thumbnail || url} />
      //     <p>This browser does not support PDFs. Please download the PDF to view it: <a href="https://drive.google.com/file/d/1ZKgZhUuBr_-nLnbpExhQmqKCx_1QqxT2/preview">View the PDF</a>.</p>
      //   </object>) : <img className="img-fluid" src={`/${thumbnail || url}`} alt="" />
    };

    const renderSelect = uid => {
      const { selectedItems } = this.state;

      if (selectedItems.includes(uid)) return <i className="fa fa-check" />;
      return null;
    };

    const renderItem = item => {
      console.log('uploadlist', item);
      console.log(this.props);
      const { onSelect, loading } = this.props;
      return (
        <li key={`${item.uid}`} className="upload-list-item text-center">
          {' '}
          {/** overlay was inside upload-list-item */} {/* handle if file null */}
          <div className="upload-item">
            {renderImg({ url: item.url, file: item.file })}

            <div className="overlay">
              {!loading && item.url && (
                <a target="_blank" rel="noopener noreferrer" href={`/${item.url}`}>
                  <Icon type="eye" />
                </a>
              )}
              {onRemove && !loading && (
                <Icon
                  data-uid={item.uid || item.id}
                  role="button"
                  tabIndex={-1}
                  onKeyDown={this.handleRemove}
                  onClick={this.handleRemove}
                  type="trash"
                />
              )}
              {/* {showPreview && !loading && (
                <Icon
                  role="button"
                  data-url={item.previewUrl || item.url}
                  tabIndex={0}
                  onClick={this.handleImageClick}
                  type="eye"
                />
              )} */}
              {loading && item.file && (
                <span
                  style={whiteColor}
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
            </div>
          </div>
          {onSelect && !item.file && (
            <div
              role="button"
              tabIndex={-1}
              data-uid={item.uid}
              value={item.uid}
              onClick={() => this.handleSelectClick(item.uid)}
              onKeyDown={() => this.handleSelectClick(item.uid)}
              className="upload-list-item__select"
            >
              {renderSelect(item.uid)}
            </div>
          )}
        </li>
      );
    };

    return (
      <div className="upload-list-wrapper">
        <ul className="upload-list">{list.filter(i => i.file).map(i => renderItem(i))}</ul>
        {list.filter(i => i.file).length > 0 && <div className="divider" />}
        <ul className="upload-list">{list.filter(i => !i.file).map(i => renderItem(i))}</ul>
      </div>
    );
  }
}

UploadList.propTypes = {
  list: PropTypes.array,
  onRemove: PropTypes.func,
  // showPreview: PropTypes.bool,
  loading: PropTypes.bool,
  onSelect: PropTypes.func,
};

UploadList.defaultProps = {
  list: [],
  onRemove: null,
  // showPreview: true,
  onSelect: null,
  loading: false,
};

export default UploadList;
