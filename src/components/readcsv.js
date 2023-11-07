import React from 'react';
// import { InsuranceService } from 'utility';
import * as XLSX from 'xlsx';

export const ReadXLSX = () => {
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = async (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // Assuming the XLSX file has only one sheet
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];

            // Convert the worksheet to JSON object
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            jsonData.shift()
            console.log("🚀 ~ file: read-xlsx.js ~ line 20 ~ reader.onload= ~ jsonData", jsonData)
            // Do something with the JSON data
            // const ssss = jsonData.filter(ele => ele.length > 1).map((item) => ({
            //             insurance: item[0],
            //             remark: item[1],
            //             insurancecategory: item[2],
            //             address1: item[3],
            //             address2: item[4],
            //             postalcode: item[5],
            //             location: item[6],
            //             website: item[7],
            //             insurergln: item[8],
            //             recipientgln: item[9],
            //         }
            //     ))
            // await InsuranceService.bulk(
            //     ssss,
            // )
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <div>
            <input type="file" onChange={handleFileUpload} />
        </div>
    );
};