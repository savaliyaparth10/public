import React from 'react';
import { Collapse } from 'antd';
import { CaretDown, CaretUp } from 'phosphor-react';

const { Panel } = Collapse;

export const Accordion = ({ children, title, className }) => (
    <div className={className}>
        <Collapse
            bordered={false}
            expandIcon={({ isActive }) => isActive ? <CaretUp size={24} /> : <CaretDown size={24} />}
        >
            <Panel header={title} key="1">
                {children}
            </Panel>
        </Collapse>
    </div>
);