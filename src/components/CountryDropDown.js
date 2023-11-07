import React from 'react';
import { Dropdown, Space, Typography } from 'antd';
import { CaretDown, Globe } from 'phosphor-react';
import { useAuth } from 'context';
import { useNavigate } from 'react-router-dom';

export const CountryDropDown = ({ list }) => {
    const { setCountryId, CountryId } = useAuth()
    const items = list.map(item => { return { key: item.key, label: item.label, icon: <img height={30} width={30} src={item.FlagPath} alt="" /> } })
    const navigate = useNavigate();
    return (

        <Dropdown
            trigger={['click']}
            menu={{
                items,
                selectable: true,
                selectedKeys: [CountryId.toString()],
                onSelect: ({ key }) => {
                    setCountryId(key)
                    navigate('/')
                },
            }}
            overlayClassName="asasas"
        >
            <Typography.Link>
                <Space>
                    {
                        items.find(
                            item => item.key.toString() === CountryId.toString(),
                        )?.icon
                    }
                    <div className="icon">
                        <Globe size={22} />
                    </div>
                    <CaretDown size={22} color="#345893" />
                </Space>
            </Typography.Link>
        </Dropdown>
    )
}