import React from 'react'
import { Tabs } from 'antd';
import ManualScreen from './ManualScreen';
import FileUploadButton from './FileUploadButton';
import TicketFormScreen from './ticket-form';

const SponsorScreens = () => {
    const onChange = (key) => {
        console.log(key);
      };
      const items = [
        {
          key: '1',
          label: 'Sponsor Ticket',
          children: <TicketFormScreen />,
        },
        {
          key: '2',
          label: 'Manual',
          children: <ManualScreen />,
        },
        {
          key: '3',
          label: 'Upload',
          children: <FileUploadButton />,
        },
      ];

    return (
        <div>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
    )
}

export default SponsorScreens;