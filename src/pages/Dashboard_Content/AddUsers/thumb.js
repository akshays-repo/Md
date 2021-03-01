import React, { useState, useEffect } from 'react';
export const Thumb = ({ file, onImageDelete }) => {
  const [loading, setloading] = useState(true);
  const [thumb, setthumb] = useState(undefined);

  useEffect(() => {
    let reader = new FileReader();
    setloading(true);
    reader.onloadend = () => {
      setloading(false);
      setthumb(reader.result);
    };
    reader.readAsDataURL(file);
  }, [file]);

  if (!file) {
    return null;
  }

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <div className="thumbimage" style={{ marginRight: 10, marginBottom: 10 }}>
      <img
        src={thumb}
        alt={file.name}
        // className="img-thumbnail mt-2"
        style={{
          maxHeight: 100,
          maxWidth: 100,
          height: 100,
          width: 100,
          borderRadius: 100,
          // objectFit: 'contain',
        }}
      />
      <button
        style={{
          backgroundColor: 'transparent',
          color: 'white',
          border: 0,
        }}
        onClick={() => onImageDelete(file.name)}
      >
        <i className="fa fa-trash"></i>
      </button>
    </div>
  );
};
