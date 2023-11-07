import { Modal } from 'antd'
import { OutlinedButton, PrimaryButton } from 'elements'
import React from 'react'
import styled from 'styled-components'

const ModelStyled = styled(Modal)``

export const PopUpModal = ({
    children,
    onCancel,
    onSubmit,
    width,
    ...rest
}) => {
    return (
        <div className="model">
            <ModelStyled
                footer={[
                    <OutlinedButton onClick={() => onCancel(false)}>
                        Cancel
                    </OutlinedButton>,
                    <PrimaryButton onClick={onSubmit}> Submit </PrimaryButton>,
                ]}
                onCancel={onCancel}
                width={width || 550}
                {...rest}
            >
                {children}
            </ModelStyled>
        </div>
    )
}
