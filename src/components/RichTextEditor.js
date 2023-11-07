import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const RichTextEditor = ({ value, onChange, onBlur }) => (
    <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
    />
);