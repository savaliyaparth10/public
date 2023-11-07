import React from 'react'
import styled from 'styled-components'
import { ImageWithFallback } from './Common'
import { Link } from 'react-router-dom'
import { Checkbox, Tag } from 'antd'
import { OutlinedButton } from 'elements'
import { GearSix, Trash, Heart } from 'phosphor-react'

const CardLayout = styled.div`
    overflow: visible;
    cursor: pointer;
    .disabled {
        pointer-events: none;
    }
    .hover-container {
        width: 100%;
        height: 100%;
        top: 0;
        position: absolute;
        border-radius: 1rem;
        .edit-delete {
            display: none;
            position: absolute;
            bottom: 1rem;
            right: 1rem;
            button {
                display: inline-flex;
            }
            .view-sold-ticket {
                ${'' /* padding: 8px 16px;
                font-weight: 500;
                font-size: 16px;
                color: ${({ theme }) => theme.colors.white} !important;
                background: ${({ theme }) => theme.colors.gray};
                border-radius: 0.5rem;
                margin: auto;
                width: 200px;
                text-align: center; */}
            }
        }
        &:hover {
            background: rgba(69, 74, 85, 0.3);
            .edit-delete {
                display: inline-flex;
            }
            .title {
                color: ${({ theme }) => theme.colors.white} !important;
            }
        }
    }
    .img-container {
        img {
            width: 100%;
            object-fit: cover;
            overflow: hidden;
            aspect-ratio: 16/9;
            border-radius: 1rem 1rem 0rem 0rem;
        }
    }
    .title {
        color: #b9bbbf !important;
        font-weight: 700;
        font-size: 18px;
        margin-left: 4.5px;
    }
    .heart {
        position: absolute;
        top: 3%;
        right: 0%;
        padding-block: 1px;
        padding-inline: 8px;
        border: 0;
        cursor: pointer;
    }
    position: relative;
    border: none !important;
`
const CardDetails = styled.div`
position:relative;
    padding: 16px;
    font-weight: 500;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.white} !important;
    background: ${({ theme }) => theme.colors.darkGray};
    border-radius: 0 0 1rem 1rem;
`

export const CommonImageDetailCard = ({
    data,
    url,
    editMode = false,
    openDeleteModal,
    disableHover = false,
    imgHeight,
    checkBox,
    goToDetail,
    onSelectEvent,
    selected,
    addRemoveFavorite,
    favoriteButton = false,
    children,
}) => {
    return (
        <CardLayout
            imgHeight={imgHeight}
            onClick={() => {
                if (typeof onSelectEvent === "function") {
                    onSelectEvent()
                } else if (goToDetail) {
                    goToDetail()
                }
            }}>
            <div className="img-container">
                <ImageWithFallback
                    className="img"
                    src={
                        url ||
                        'https://picsum.photos/500/200/?blur=2'
                    }
                    alt="event"
                />
                {!editMode && favoriteButton && <Tag className="heart" onClick={(e) => { e.preventDefault(); e.stopPropagation(); addRemoveFavorite() }}>
                    <Heart size={40} color={data.IsFavorite ? "#FF384E" : "#fff"} weight={data.IsFavorite ? "fill" : "duotone"} />
                </Tag>}
            </div>
            <CardDetails>
              {children}
            </CardDetails>
            {editMode && (
                <div className={`hover-container ${disableHover && 'disabled'}`}>
                    <div className="edit-delete">
                        <Link to={`/events/sold-ticket/${data.ProviderEventId}`}>
                            <OutlinedButton>
                                <span className="view-sold-ticket">View Sold Ticket</span>
                            </OutlinedButton>
                        </Link>
                        <OutlinedButton
                            className="ml-2"
                            onClick={e => {
                                e.preventDefault()
                                e.stopPropagation()
                                openDeleteModal(data)
                            }}
                        >
                            <Trash size={22} />
                        </OutlinedButton>
                        <Link to={`/events/edit/${data.ProviderEventId}`}>
                            <OutlinedButton className="ml-2">
                                <GearSix size={22} />
                            </OutlinedButton>
                        </Link>
                    </div>
                </div>
            )}
            {checkBox && (
                <div className="d-flex justify-content-end">
                    <Checkbox checked={selected} onClick={onSelectEvent} />
                </div>
            )}
        </CardLayout>
    )
}