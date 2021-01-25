import React, { Component } from 'react';
import { Button } from 'components/Button';
import { resizeImage } from '_utils';
import shortId from 'shortid';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import UploadList from './UploadList';

class Upload extends Component {
  state = {
    fileList: [],
    loading: false,
    // origFileList: [],
  };

  componentDidMount() {
    console.log(this.props);
    const { fileList } = this.props;
    if (fileList && fileList.length) {
      this.setState({
        fileList,
        // origFileList: fileList,
      });
    }
  }

  componentDidUpdate({ fileList: prevFileList }) {
    const { fileList: currentFileList } = this.props;
    if (prevFileList !== currentFileList) this.updateFileList();
  }

  updateFileList = () => {
    const { fileList } = this.props;
    this.setState({
      fileList,
      // origFileList: fileList,
    });
  };

  // static getDerivedStateFromProps({ fileList: propsFileList }, { fileList: stateFileList }) {
  //   console.log(propsFileList);
  //   if (propsFileList !== stateFileList && typeof propsFileList !== 'undefined')
  //     return {
  //       fileList: propsFileList,
  //     };
  //   return null;
  // }

  onChangeFiles = async () => {
    const { onChange, action } = this.props;
    const { fileList } = this.state;
    console.log(fileList);
    if (action) {
      this.setState({ loading: true });
      const b = await action({ fileList });
      this.setState({ loading: false });
      console.log('Uploaded?', b);
    }
    if (onChange) onChange(fileList);
  };

  onChange = async e => {
    console.log('onChange', e.target.files);
    const newFiles = e.target && e.target.files ? [...e.target.files] : [];

    // const { action } = this.props;

    if (newFiles.length > 0) {
      console.log('newFiles', newFiles);

      const filesWithUrl = await Promise.all(
        newFiles.map(async file => {
          const newId = shortId.generate();
          return {
            url: file.type.match(/image.*/)
              ? await resizeImage({ file, maxSize: 200 })
              : URL.createObjectURL(file),
            previewUrl: URL.createObjectURL(file),
            uid: newId,
            id: newId,
            file,
          };
        }),
      );
      console.log('filesWithUrl', filesWithUrl);
      this.setState(
        prev => ({
          fileList: [...prev.fileList, ...filesWithUrl],
        }),
        this.onChangeFiles,
      );
    }
    return null;
  };

  removeFile = uid => {
    const { fileList } = this.state;
    const newFileList = fileList.filter(i => {
      console.log(i.uid, uid, String(uid) !== String(i.uid));
      return String(i.uid) !== String(uid);
    });
    console.log(newFileList);
    this.setState(
      {
        fileList: newFileList,
      },
      this.onChangeFiles,
    );
  };

  onRemove = uid => {
    const { onRemove } = this.props;
    // const { origFileList } = this.state;
    const { fileList } = this.state;
    console.log('will remove', uid);

    // if (
    //   isEmpty(
    //     find(origFileList, i => {
    //       console.log(String(i.uid), String(uid));
    //       return String(i.uid) === String(uid);
    //     }),
    //   )
    // )
    const obj = find(fileList, i => String(i.uid) === String(uid));
    if (!isEmpty(obj) && obj.file) this.removeFile(uid);
    else if (onRemove) onRemove(uid);
    else {
      this.removeFile(uid);
    }
  };

  handleUpload = async () => {
    const { fileList } = this.state;
    const { handleUpload } = this.props;

    if (handleUpload) {
      this.setState({loading:true})
      await handleUpload({
        fileList,
      });
      this.setState({loading:false})
    }
  };

  render() {
    console.log(this.props);
    const { name, label, multiple, errors, isRemove, onSelect, action } = this.props;
    const { loading } = this.state;
    const { fileList } = this.state;
    return (
      <div>
        <div className="flex space-between">
          <div className="upload-btn-wrapper">
            <Button>
              {label}
              <span>
                {/* <i className="fa fa-upload" /> */}
                <img className="" src="/resources/images/kickill-upload.svg" alt="" />
              </span>
            </Button>
            <input name={name} multiple={multiple} type="file" onChange={this.onChange} />
          </div>
          {fileList.length > 0 && !isEmpty(find(fileList, 'file')) && !action && (
            <Button
              type="button"
              // loading={isSubmitting}
              icon="fa-arrow-right"
              onClick={this.handleUpload}
              className="btn big-login-btn"
              loading={loading}
            >
              Upload
            </Button>
          )}
        </div>
        <UploadList
          list={fileList}
          loading={loading}
          onRemove={isRemove ? this.onRemove : null}
          onSelect={onSelect}
          
        />
        {errors && <div className="error-message">{errors}</div>}
      </div>
    );
  }
}

Upload.defaultProps = {
  name: 'sample-file',
  label: 'Add files for upload',
  multiple: false,
  isRemove: true,
  action: null,
};

export default Upload;
