// @flow
import React from 'react';
import PropTypes from 'prop-types';
import styles from 'assets/styles/facebook.scss';
import FacebookLogin from './facebook';

// https://www.w3.org/TR/html5/disabled-elements.html#disabled-elements
const shouldAddDisabledProp = (tag) => [
  'button',
  'input',
  'select',
  'textarea',
  'optgroup',
  'option',
  'fieldset',
  // eslint-disable-next-line prefer-template
].indexOf((tag + '').toLowerCase()) >= 0;

class ReactFacebookLoginWithButton extends React.Component {

  style() {
    const defaultCSS = this.constructor.defaultProps.cssClass;
    const { cssClass } = this.props
    if (cssClass === defaultCSS) {
      return <style dangerouslySetInnerHTML={{ __html: styles }} />
    }
    return false;
  }

  containerStyle(renderProps) {
    const { isProcessing, isSdkLoaded, isDisabled } = renderProps;
    const { containerStyle } = this.props;

    const style = { transition: 'opacity 0.5s' };
    if (isProcessing || !isSdkLoaded || isDisabled) {
      style.opacity = 0.6;
    }
    return Object.assign(style, containerStyle);
  }

  renderOwnButton(renderProps) {
    const { cssClass, size, icon, textButton, typeButton, buttonStyle, tag } = this.props;

    const { onClick, isDisabled } = renderProps;

    const isIconString = typeof icon === 'string';
    const optionalProps = {};
    if (isDisabled && shouldAddDisabledProp(tag)) {
      optionalProps.disabled = true;
    }
    return (
      <span style={this.containerStyle(renderProps)}>
        {isIconString && (
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
          />
        )}
        <this.props.tag
          type={typeButton}
          className={`${cssClass} ${size}`}
          style={buttonStyle}
          onClick={onClick}
          {...optionalProps}
        >
          {icon && isIconString && (
            <i className={`fa ${icon}`} />
          )}
          {icon && !isIconString && icon}
          {textButton}
        </this.props.tag>
        {this.style()}
      </span>
    );
  }

  render() {
    return (
      <FacebookLogin {...this.props} render={renderProps => this.renderOwnButton(renderProps)} />
    );
  }
}

ReactFacebookLoginWithButton.propTypes = {
  textButton: PropTypes.string,
  typeButton: PropTypes.string,
  size: PropTypes.string,
  cssClass: PropTypes.string,
  fields: PropTypes.string,
  icon: PropTypes.any,
  containerStyle: PropTypes.object,
  buttonStyle: PropTypes.object,
  tag: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
}

ReactFacebookLoginWithButton.defaultProps = {
  icon: '',
  containerStyle: {},
  buttonStyle: {},
  textButton: 'Facebook',
  typeButton: 'button',
  size: 'metro',
  fields: 'name',
  cssClass: 'kep-login-facebook',
  tag: 'button',
}

export default ReactFacebookLoginWithButton;
