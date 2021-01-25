/* eslint-disable no-underscore-dangle */
// import LTT from 'list-to-tree';

export const getFormData = (data = {}) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
};

export const getFormDataA = (data, fields = []) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    switch (value.constructor) {
      case Array: {
        if (fields.length === 0 || fields.includes(key)) {
          value.forEach(v => formData.append(key, v));
        }
        break;
      }
      case Object: {
        if (fields.length === 0 || fields.includes(key)) {
          formData.append(key, JSON.stringify(value));
        }
        break;
      }
      default:
        if (fields.length === 0 || fields.includes(key)) {
          formData.append(key, value);
        }
        break;
    }
  });
  return formData;
};

export function getFormattedDate(dateJSON) {
  const date = new Date(dateJSON);
  const DD = (date.getDate() < 10 ? '0' : '') + date.getDate();
  const MM = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
  const YYYY = date.getFullYear();

  // return `${DD}-${MM}-${YYYY}`;
  return `${YYYY}-${MM}-${DD}`;
}

export function getFormattedTime(dateJSON) {
  const date = new Date(dateJSON);
  const HH = (date.getHours() < 10 ? '0' : '') + date.getHours();
  const mm = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  const ss = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();

  return `${HH}:${mm}:${ss}`;
}

export const lazyFunction = (f, ...args) => {
  return () => {
    return f.apply(this, args);
  };
};

export const createMarkup = htmlContent => {
  return { __html: htmlContent };
};

export const generateCategoryTree = categories => {
  const categoriesFormatted = categories.map(item => {
    return {
      title: item.name,
      value: item._id,
      key: item._id,
      id: item._id,
      slug: item.slug,
      parent: item.parent === null ? 0 : item.parent,
    };
  });
  // console.log(categoriesFormatted);
  const tree = unflatten(categoriesFormatted);
  // const ltt = new LTT(categoriesFormatted, {
  //   key_id: 'id',
  //   key_parent: 'parent',
  // });
  // const tree = ltt.GetTree();
  // console.log(tree);
  return tree;
};

export const unflatten = (array, parent, tree) => {
  tree = typeof tree !== 'undefined' ? tree : [];
  parent = typeof parent !== 'undefined' ? parent : { id: 0 };
  // console.log('unflatten', array)
  const children = array.filter(child => {
    return child.parent === parent.id;
  });
  console.log(children.length);
  if (children.length !== 0) {
    if (parent.id === 0) {
      tree = children;
    } else {
      parent.children = children;
    }
    children.forEach(child => {
      unflatten(array, child);
    });
  }

  return tree;
};

export const resizeImage = settings => {
  const { file, maxSize } = settings;
  const reader = new FileReader();
  const image = new Image();
  const canvas = document.createElement('canvas');
  // eslint-disable-next-line no-unused-vars
  const dataURItoBlob = dataURI => {
    const bytes =
      dataURI.split(',')[0].indexOf('base64') >= 0
        ? atob(dataURI.split(',')[1])
        : unescape(dataURI.split(',')[1]);
    const mime = dataURI
      .split(',')[0]
      .split(':')[1]
      .split(';')[0];
    const max = bytes.length;
    const ia = new Uint8Array(max);
    for (let i = 0; i < max; i += 1) ia[i] = bytes.charCodeAt(i);
    return new Blob([ia], { type: mime });
  };
  const resize = () => {
    let { width, height } = image;
    if (width > height) {
      if (width > maxSize) {
        height *= maxSize / width;
        width = maxSize;
      }
    } else if (height > maxSize) {
      width *= maxSize / height;
      height = maxSize;
    }
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(image, 0, 0, width, height);
    const dataUrl = canvas.toDataURL('image/jpeg');
    // return dataURItoBlob(dataUrl);
    return dataUrl;
  };
  return new Promise((ok, no) => {
    if (!file.type.match(/image.*/)) {
      no(new Error('Not an image'));
      return;
    }
    reader.onload = readerEvent => {
      image.onload = () => {
        return ok(resize());
      };
      image.src = readerEvent.target.result;
    };
    reader.readAsDataURL(file);
  });
};

export const readAsDataURL = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

export const printResponse = response => {
  console.log(response);
  console.log(response.status);
  console.log(response.statusText);
  console.log(response.data);
};

export const printError = error => {
  console.log(error.response);
  console.log(error.request);
  console.log(error.message);
};

export const isErrorResponse = () => {
  return null;
};
export const getData = () => {};
export const getErrorMessage = () => {};

export const validateUserProfile = (values, isEdit, isPassword) => {
  console.log(values);
  const errors = {};
  const keys = Object.entries(values);
  const formValues = keys.filter(
    ([key]) => key !== 'currentPassword' && key !== 'newPassword' && key !== 'confirmPassword',
  );
  const passwordValues = keys.filter(
    ([key]) => key === 'currentPassword' || key === 'newPassword' || key === 'confirmPassword',
  );

  if (isEdit) {
    formValues.forEach(([key, value]) => {
      // if (key !== 'currentPassword' && key !== 'newPassword' && key !== 'confirmPassword')
      if (!value) errors[key] = 'Required';
    });
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
  }
  if (isPassword) {
    console.log('validating password');
    const passRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    passwordValues.forEach(([key, value]) => {
      // if (key !== 'currentPassword' && key !== 'newPassword' && key !== 'confirmPassword')
      if (!value) errors[key] = 'Required';
    });
    if (values.newPassword && !values.newPassword.match(passRegEx)) {
      errors.newPassword =
        'Password must be between 6 to 20 characters with at least one numeric digit, one uppercase and one lowercase letter';
    } else if (
      values.newPassword &&
      values.newPassword.match(passRegEx) &&
      values.newPassword !== values.confirmPassword
    ) {
      errors.confirmPassword = 'Passwords do not match';
    }
  }

  return errors;
};

export const getFileExtension = (str = '') => {
  if (str) {
    return str.split('.').pop();
  }
  return '';
};

export const omit = (obj, omitKey) =>
  Object.keys(obj).reduce((result, key) => {
    if (key !== omitKey) {
      result[key] = obj[key];
    }
    return result;
  }, {});
