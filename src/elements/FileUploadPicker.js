import { useDropzone } from 'react-dropzone';
import React, {
  useState, useRef, useCallback, useEffect,
} from 'react';
import { BorderButton } from 'elements';
import { Trash, UploadSimple } from 'phosphor-react';
import { CommonUtility } from 'utility';
import { Modal, Image } from 'antd';
import styled from 'styled-components';
import { ImageWithFallback } from 'components';

const FlexBox = styled.div`
  display : flex !important;
  align-items: center;
  justify-content: center;
`;

export function PreviewImage({ open, closeModal, url }) {
  return (
    <Modal
      basic
      open={open}
      size="large"
      onClose={() => closeModal()}
    >
      <FlexBox>
        <Image src={url} alt="Preview Image" />
      </FlexBox>
    </Modal>
  )
}

const ModalSteps = styled.div`{
    font-family: 'Nunito Sans';
    font-style: normal;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.primary};
    margin-top: 20px;
    > div {
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        > span {
            color: ${({ theme }) => theme.colors.grey};
            margin-left: 4px;
            margin-right: 8px;
            font-size: 16px;
        }
    }
    .download-link {
        button {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-weight: 700 !important;
            font-family: 'Nunito Sans';
            font-size: 12px;
            padding: 9px 15px;
            color: ${({ theme }) => theme.colors.primary};
        }
    }
}`

const PreviewContainer = styled.div`
    border-radius: 5px;
    border: 1px solid #f6f6f6;
    align-items: center;
    justify-content: between;
    display: flex;
    position: relative;
`;

const DeleteIcon = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    width: 40px;
    justify-content: center;
`

const DropContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.6rem 3rem;
    height: ${({ containerHeight }) => containerHeight}px;
    height: ${({ containerWidth }) => containerWidth}px;
    justify-content: center;
    background-color:  ${({ theme }) => theme.colors.secondary};
    color :  ${({ theme }) => theme.colors.white};
    outline: none;
    transition: border .24s ease-in-out;
    border: 1px dashed ${({ theme }) => theme.colors.secondary};
    border-radius: 20px;
    cursor: pointer;
    p {
        font-family: 'Nunito Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: ${({ theme }) => theme.colors.white};
    }
    .browse-button {
        padding: 8px 17px;
        height: 34px;
        font-family: 'Nunito Sans';
        font-style: normal;
        font-weight: 700 !important;
        font-size: 12px;
        line-height: 16px;
        display: flex;
        align-items: center;
        text-align: center;
        color: ${({ theme }) => theme.colors.white};
    }
`;

const FilePreviewContainer = styled.article`
    margin-bottom: 15px;
    height: ${({ containerHeight }) => containerHeight}px;
    overflow-y:  none;
`;

const FileName = styled.p`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`
const ImagePreview = styled.img`
    max-width: 100%;
	max-height: 100%;
	width: auto;
	height: auto;
`;

export function FileUploadPicker({
  uploadText, maxFileSize, accept, containerHeight = 300, containerWidth = 300, maxFiles = 1, files, setFiles, instructions = [], previewButton, imagePreview, aliasName,customButton,
}) {
  const hasWindow = typeof window !== 'undefined'
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef();

  useEffect(() => {
    setPreviewUrl(imagePreview)
  }, [imagePreview])

  const addNewFiles = (newFiles) => {
    if ((maxFiles || 0) === 1 && newFiles.length > 0 && (!maxFileSize || (newFiles[0].size / 1048576) <= maxFileSize)) {
      setFiles([{
        name: newFiles[0].name,
        file: newFiles[0],
      }])
      fileInputRef.current.getElementsByTagName('input')[0].value = null;
      return;
    }
    const temp = [];
    newFiles.map(file => {
      if (!maxFileSize || (file.size / 1048576) <= maxFileSize) { // in MB
        if (!maxFiles || files.length < maxFiles) {
          temp.push({
            name: file.name,
            file,
          });
        }
      }
      return ""
    })
    setFiles([...files, ...temp]);
    fileInputRef.current.getElementsByTagName('input')[0].value = null;
  };

  const onDrop = useCallback((acceptedFiles) => {
    addNewFiles(acceptedFiles);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept,
    maxFiles,
    multiple: !maxFiles || maxFiles > 1,
    onDrop,
  });

  const removeFile = (e, fileName) => {
    e.preventDefault();
    e.stopPropagation();
    setFiles(files.filter((x) => x.name !== fileName));
  }

  const closePreviewImage = () => {
    setPreviewUrl('');
    setShowPreview(false)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Handler to call on window resize
      const handleResize = () => { }
      // Add event listener
      window.addEventListener('resize', handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
    return ''
  }, [hasWindow]);

  return (
    <>
      {CommonUtility.isValidArray(instructions) && (
        <ModalSteps>
          {instructions.map(({ id, label }) => (
            <div key={id}>
              {instructions.length > 1 && <span>{id}</span>} {label}
            </div>
          ))}
        </ModalSteps>
      )}
      {files.length < maxFiles && !customButton && (
        <DropContainer containerHeight={containerHeight} containerWidth={containerWidth} {...getRootProps({ isDragActive, isDragAccept, isDragReject })} ref={fileInputRef}>
          <input {...getInputProps()} />
          <UploadSimple size={32} weight="fill" />
          {uploadText && <p className="mt-2 mb-0 text-center">{uploadText}</p>}
          <BorderButton type="button" className="browse-button">Browse</BorderButton>
        </DropContainer>
      )}
      {
        customButton && files.length < maxFiles && (
          <div {...getRootProps({ isDragActive, isDragAccept, isDragReject })} ref={fileInputRef}>
          <input {...getInputProps()} />
          {customButton}
        </div>
        )
      }
      {previewButton && <FilePreviewer files={files} removeFile={removeFile} containerHeight={containerHeight} aliasName={aliasName} />}
      {previewUrl && imagePreview && <ImagePreview
        src={URL.createObjectURL(
          previewUrl,
        )}
      />}
      <PreviewImage
        open={showPreview}
        url={previewUrl}
        closeModal={closePreviewImage}
      />
    </>
  )
}

export const FilePreviewer = ({ files, containerHeight, removeFile, perRowItem }) => {
  return (
    <div>
      <FilePreviewContainer className="d-flex flex-wrap col-12">
        {files.map((file) => (
          <div className={`pr-2 mb-2 col-${(12 / perRowItem) || "3"}`} key={files.name || file.ImageId}>
          <PreviewContainer containerHeight={containerHeight} key={file.name} className="p-2 justify-content-between">
            <FileName className="my-0">
              <ImageWithFallback src={file.Image || URL.createObjectURL(file.file)} height="50" width="100%" />
            </FileName>
            <DeleteIcon onClick={() => removeFile(file?.name || file.ImageId,file.ImageId)}>
              <Trash
                size={22}
                className="mx-1 pointer"
              />
            </DeleteIcon>
          </PreviewContainer>
          </div>
        ))}
      </FilePreviewContainer>
    </div>
  )
}