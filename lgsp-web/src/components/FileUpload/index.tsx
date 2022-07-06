import { FieldProps } from 'formik';
import React, { useMemo, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const thumbsContainer: any = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb: any = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


interface IFileUpload extends FieldProps  {
  files: File[],
  onDrop: (acceptedFiles: File[]) => void,
  type: 'file' | 'image',
  maxFiles?: number,
  isMulti?: boolean,
}

const FileUpload: React.FC<IFileUpload> = ({field, form, files,maxFiles=1,isMulti=false, onDrop, type  }) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    maxFiles: maxFiles,
    multiple: isMulti,
    onDrop: onDrop,
  });

  const { name } = field;
  const {  errors,touched } = form;

  const errorMsg = touched[name] && errors[name];
  
  const style: any = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragAccept,
    isDragReject
  ]);

  const thumbs = files.map((file: any) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          alt={file.name}
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));

  const linkFiles = () => {
    return (
      <div className="list-file-upload">
        {files.length > 0 &&
        (<span className="label">File upload:</span>)}
        {files.map((file: any) => <span key={file.path}>{file.path}</span>)}

      </div>
    )
  }

  useEffect(() => () => {
    files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className="container files-upload">
      <div {...getRootProps({ style })} >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {type === 'image' ? <aside style={thumbsContainer}>
        {thumbs}
      </aside> : linkFiles()}
      {errorMsg && <span className="text-error"> {errorMsg}</span>}
    </div>
  );
}

export default FileUpload;
