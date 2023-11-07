import { Tabs } from 'antd'
import styled from 'styled-components'
// import { ChangePasswordTab, OrdersTab, UserInfoTab, FavoriteEvents, Team, MyEvents } from '../page-components'
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { useAuth } from 'context';
import { ChangePasswordTab, OrdersTab, UserInfoTab, FavoriteEvents, Team, MyEvents, OfferOrdersTab } from 'page-components/profile';

// const { ChangePasswordTab, OrdersTab, UserInfoTab, FavoriteEvents, Team, MyEvents } = profile;

const TabsHeader = styled(Tabs)`
    .left {
        left:5px;
    }
    .ant-tabs-nav-wrap{
      font-size:16px;
      font-weight:600;
      border-bottom: 1px solid #6e6c6b;
    }
     .ant-tabs-ink-bar {
        background: ${({ theme }) => theme.colors.white} !important;
    }
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${({ theme }) => theme.colors.white} !important;
}

.ant-tabs-tab:hover{
 color: ${({ theme }) => theme.colors.white} !important;
}
`
const TabsItems = [
    {
        label: `Profile`,
        key: `/profile`,
        children: <UserInfoTab />,
        path: "/profile",
    },
    {
        label: `Tickets`,
        key: `order`,
        children: <OrdersTab />,
        path: "/order",
    },
    {
        label: `Purchase`,
        key: `offer-order`,
        children: <OfferOrdersTab />,
        path: "/offer-order",
    },
    {
        label: `Events`,
        key: `my-events`,
        children: <MyEvents />,
        path: "/my-events",
    },
    {
        label: `Favorite Events`,
        key: `favorite-events`,
        children: <FavoriteEvents />,
        path: "/favorite-events",
    },
    {
        label: `Team`,
        key: `my-team`,
        children: <Team />,
        path: "/my-team",
    },
    {
        label: `Change Password`,
        key: `change-password`,
        children: <ChangePasswordTab />,
        path: "/change-password",
    },

]

export function ProfileScreen({ children }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const { profile } = useAuth();
    const defaultSelected = useMemo(() => {
        if (id === 'profile') {
            return "/"
        }
        return id
    }, [id])

    return (
        <div className="container">
            {children}
            <TabsHeader
                className="left"
                defaultActiveKey={defaultSelected}
                onChange={(path) => {
                    navigate(`../${path}`)
                }}
                items={TabsItems.filter((tab) => (profile?.SignInProvider === 6 && tab.key === 'change-password') || tab.key !== 'change-password')}
            />
        </div>
    )
}
