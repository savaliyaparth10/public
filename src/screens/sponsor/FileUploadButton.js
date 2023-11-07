import React, { useState } from 'react';
import { Button, Table } from 'antd';

const FileUploadButton = ({ onFileUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileData, setFileData] = useState([]);
    const [tableData, setTableData] = useState([]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleFileSubmit = () => {
        if (selectedFile) {
            setFileData([...fileData, selectedFile.name]);
            setTableData([...tableData, { key: selectedFile.name }]);
            onFileUpload(selectedFile);
        }
    };

    const columns = [
        {
            title: 'File Name',
            dataIndex: 'key',
            key: 'key',
        },
    ];

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <input type="file" onChange={handleFileChange} accept=".csv" style={{ display: 'none' }} />
                <div>
                    <Button
                        onClick={() => document.querySelector('input[type="file"]').click()}
                        style={{
                            backgroundColor: '#D44456',
                            color: '#fff',
                            height: '40px',
                            border: 'none',
                            borderRadius: '10px',
                            padding: '10px 20px',
                            cursor: 'pointer',
                            textAlign: 'center',
                            marginRight: '10px',
                        }}
                    >
                        Upload File
                    </Button>
                    {selectedFile && (
                        <Button
                            onClick={handleFileSubmit}
                            style={{
                                backgroundColor: '#D44456',
                                color: '#fff',
                                height: '40px',
                                border: 'none',
                                borderRadius: '10px',
                                padding: '10px 20px',
                                cursor: 'pointer',
                                textAlign: 'center',
                            }}
                        >
                            Submit
                        </Button>
                    )}
                </div>
                <Button
                    style={{
                        backgroundColor: '#D44456',
                        color: '#fff',
                        height: '40px',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        textAlign: 'center',
                    }}
                >
                    Download Sample File
                </Button>
            </div>
            <Table dataSource={tableData} columns={columns} />
        </div>
    );
};

export default FileUploadButton;