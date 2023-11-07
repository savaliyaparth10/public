import { Form, Select, TimePicker, DatePicker, Divider } from "antd"
import { Controller } from "react-hook-form"
import { AppInput, AppTextArea, AppCheckBox } from "./Common"
import styled from "styled-components"
import { CaretDown } from "phosphor-react"
import { DateUtility } from "utility"
import { useEffect, useRef, useState } from "react"
import { BorderButton } from "./Button"

const { RangePicker } = DatePicker;

const AntInputColumn = styled(Form.Item)`
    margin-bottom:0px;
    input {
        background: ${({ theme }) => theme.colors.secondary} !important;
        color : ${({ theme }) => theme.text.primary} !important;
        border-color:  ${({ theme }) => theme.colors.secondary} !important;
        ::placeholder {
                color: ${({ theme }) => theme.text.primary} !important;
                opacity:0.3;
        }
    }
    .ant-form-item-label {
        label {
            height:30px !important;
            color : white !important;
        }
    }
    .ant-checkbox-wrapper {
        border:none !important;
    }
    .ant-form-item-row {
       display:block;
        .ant-form-item-label{
            text-align:left;
            padding: 0 0 0px !important;
        }
    }
    .ant-form-item-label > label::after {
        content:"" !important;
    }
    .ant-input {
        height:35px;
        :focus {
            box-shadow:none !important;
        }
    }
    .ant-select-selector {
            height:35px !important;
            box-shadow:none !important;
            border-color:  ${({ theme }) => theme.colors.secondary} !important;
            .ant-select-selection-placeholder {
                color: ${({ theme }) => theme.text.primary} !important;
                opacity:0.3;
            }
            :focus {
                box-shadow:none !important;
            }
    }
    .ant-input:focus {
        border-color: ${({ theme }) => theme.colors.primary} !important;
    }
    textarea {
        border:solid 1px ${({ theme }) => theme.colors.secondary} !important;
        background: ${({ theme }) => theme.colors.secondary} !important;
        color: ${({ theme }) => theme.colors.white} !important;
        min-height:75px;
        ::placeholder {
            color: ${({ theme }) => theme.text.primary} !important;
            opacity:0.3;
    }
    }
    .ant-picker-range {
        border:solid 1px ${({ theme }) => theme.colors.primary} !important;
        width:100%;
    }
    .ant-checkbox-wrapper {
        height: fit-content;
        span {
            color: ${({ theme }) => theme.colors.white} !important;
  
        }
    }
    .ant-select-arrow {
        svg {
            fill: ${({ theme }) => theme.colors.white} !important;
        }
        polyline {
            stroke: ${({ theme }) => theme.colors.white};
        }
    }
    .ant-picker {
        width:100%;
        background:  ${({ theme }) => theme.colors.secondary} !important;
        border-color:  ${({ theme }) => theme.colors.secondary} !important;
        
    }
    .checkbox-flex {
        div {
            display: flex !important;
        }
    }
    .ant-picker-focused { 
        box-shadow:none !important
    }
    .ant-picker:hover {
        box-shadow:none !important
    }
    .ant-input-affix-wrapper {
        background:  ${({ theme }) => theme.colors.primary} !important;
        border-radius: 6px !important;
        border-color: ${({ theme }) => theme.colors.secondary} !important;;
        input {
            height: auto;    
        };
        height: 35px;
    }
    .ant-input-group-addon {
        display: none;
    }
    ${({ border }) => border && `
        border: solid 1px;
        border-radius:5px;
    `}
`

const DangerText = styled.span`
    color:${({ theme }) => theme.colors.danger} !important;
    position: absolute;
    bottom: -20px;
    left: 0px;
    font-size: 12px;
    font-weight: 700;
}

`
export function FormTextSearchFormField({
    control,
    name,
    defaultValue = "",
    placeholder,
    required,
    errors,
    label,
    type,
    hint,
    ...rest
}) {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={props => (
                <AntInputColumn
                    label={label}
                    tooltip={{ icon: required ? <DangerText>*</DangerText> : <></> }}
                    rules={[{ required, message: errors?.message }]}
                >
                    <AppInput.Search
                        status={errors && "error"}
                        placeholder={placeholder}
                        value={props.field.value}
                        type={type}
                        allowClear
                        onChange={e => props.field.onChange(e.target.value)}
                        {...rest}
                    />
                    {errors && <DangerText className="danger">{errors.message || hint}</DangerText>}
                </AntInputColumn>
            )}
        />
    )
}

export function FormTextFormField({
    control,
    name,
    defaultValue = "",
    placeholder,
    required,
    errors,
    label,
    type,
    hint,
    ...rest
}) {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={props => (
                <AntInputColumn
                    label={label}
                    tooltip={{ icon: required ? <DangerText>*</DangerText> : <></> }}
                    rules={[{ required, message: errors?.message }]}
                >
                    <AppInput
                        status={errors && "error"}
                        placeholder={placeholder}
                        value={props.field.value}
                        type={type}
                        onChange={e => props.field.onChange(e.target.value)}
                        {...rest}
                    />
                    {errors && <DangerText className="danger">{errors.message || hint}</DangerText>}
                </AntInputColumn>
            )}
        />
    )
}

export function FormTextAreaFormField({
    control,
    name,
    defaultValue,
    placeholder,
    label,
    hint,
    required,
    errors, height,
    ...rest
}) {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={props => (
                <AntInputColumn
                    label={label}
                    tooltip={{ icon: required ? <DangerText>*</DangerText> : <></> }}
                    rules={[{ required, message: errors?.message }]}
                >
                    <AppTextArea
                        status={errors && "error"}
                        placeholder={placeholder}
                        value={props.field.value}
                        height={height || 100}
                        onChange={e => props.field.onChange(e.target.value)}
                        {...rest}
                    />
                    {errors && <DangerText>{errors.message || hint}</DangerText>}
                </AntInputColumn>
            )}
        />
    )
}

export function FormSelectionFieldWithoutControl({
    name, placeholder, required, errors, children, onChange, showSearch, onSearch,
    label, type, hint, options, mode, defaultValue, ...rest
}) {
    return (
        <AntInputColumn
            label={label}
            tooltip={{ icon: required ? <DangerText>*</DangerText> : <></> }}
            rules={[{ required, message: errors?.message }]}
        >
            <div className="d-flex"> <Select
                status={errors && "error"}
                placeholder={placeholder}
                mode={mode || "single"}
                showSearch={showSearch}
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                onSelect={(data) => {
                    const value = options.find(({ value }) => value === data);
                    if (onChange) {
                        onChange(value);
                    }
                }}
                onSearch={onSearch}
                suffixIcon={<CaretDown size={22} color="#345893" />}
                {...rest}
                options={options}
                showArrow
            />
                <>{children}</>
            </div>
            {errors && <DangerText>{errors.message || hint}</DangerText>}

        </AntInputColumn>
    )
}
export function FormSelectionField({
    control, name, placeholder, required, errors, children, onChange, showSearch, onSearch,
    label, type, hint, options, mode, defaultValue, ...rest
}) {
    return (
        <Controller
            control={control}
            name={name}
            // defaultValue={defaultValue || []}
            render={props => (
                <AntInputColumn
                    label={label}
                    tooltip={{ icon: required ? <DangerText>*</DangerText> : <></> }}
                    rules={[{ required, message: errors?.message }]}
                >
                    <div className="d-flex"> <Select
                        status={errors && "error"}
                        placeholder={placeholder}
                        mode={mode || "single"}
                        showSearch={showSearch}
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        onSelect={(data) => {
                            props.field.onChange(data)
                            if (onChange && onChange) {
                                onChange(data)
                            }
                        }}
                        onSearch={onSearch}
                        suffixIcon={<CaretDown size={22} color="#345893" />}
                        {...props.field}
                        {...rest}
                        options={options}
                        showArrow
                    />
                        <>{children}</>
                    </div>
                    {errors && <DangerText>{errors.message || hint}</DangerText>}

                </AntInputColumn>
            )}
        />
    )
}

export function FormSelectionWithAddField({
    control, name, placeholder, required, errors, children, onChange, showSearch, addOption,
    label, type, hint, options, mode, defaultValue, ...rest
}) {
    const [items, setItems] = useState([]);
    const [newname, setNewName] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        setItems([...options])
    }, [options])

    const onNameChange = (event) => {
        setNewName(event.target.value)
    };

    const addItem = (e) => {
        e.preventDefault();
        if (newname) {
            setItems([...items, { label: newname, value: newname, name: newname }]);
            addOption(newname)
            setNewName('');
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        }
    };

    return (
        <Controller
            control={control}
            name={name}
            // defaultValue={defaultValue || []}
            render={props => (
                <AntInputColumn
                    label={label}
                    tooltip={{ icon: required ? <DangerText>*</DangerText> : <></> }}
                    rules={[{ required, message: errors?.message }]}
                >
                    <div className="d-flex"> <Select
                        status={errors && "error"}
                        placeholder={placeholder}
                        mode={mode || "single"}
                        showSearch={showSearch}
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        onSelect={(data) => {
                            props.field.onChange(data)
                            if (onChange && onChange) {
                                onChange(data)
                            }
                        }}
                        suffixIcon={<CaretDown size={22} color="#345893" />}
                        {...props.field}
                        {...rest}
                        options={items || []}
                        showArrow
                        dropdownRender={(menu) => (
                            <>
                                <Divider
                                    style={{
                                        margin: '8px 0',
                                    }}
                                />
                                <div className="d-flex mx-2">
                                    <AntInputColumn border className="col-9">
                                        <AppInput
                                            placeholder="Please enter Provider"
                                            ref={inputRef}
                                            value={newname}
                                            onChange={onNameChange}
                                        />
                                    </AntInputColumn>
                                    <BorderButton className="col ml-2" type="text" onClick={addItem}>
                                        Add item
                                    </BorderButton>
                                </div>
                                {menu}
                            </>
                        )}
                    />
                        <>{children}</>
                    </div>
                    {errors && <DangerText>{errors.message || hint}</DangerText>}

                </AntInputColumn>
            )}
        />
    )
}

export const FormCheckBoxField = ({
    required, errors, label, text, disabled, hint,
    control, name, width, defaultValue, fieldProps, fieldClass, ...rest
}) => (
    <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={props => (
            <AntInputColumn
                label={label}
                tooltip={required && { title: 'Required', icon: <>*</> }}
                rules={[{ required, message: errors?.message }]}
                className="checkbox-flex"
            >
                <AppCheckBox
                    className="mr-2"
                    status={errors && "error"}
                    name={name}
                    checked={props.field.value}
                    label={text}
                    disabled={disabled}
                    defaultValue={false}
                    onChange={e => props.field.onChange(e.target.checked)}
                    {...rest}
                />
                {errors && <DangerText>{errors.message || hint}</DangerText>}
            </AntInputColumn>
        )}
    />
);
export const FormCheckBox = ({
    required, errors, label, text, disabled, hint, name, width, defaultValue, fieldProps, fieldClass, ...rest
}) => (
    <AntInputColumn
        label={label}
        tooltip={required && { title: 'Required', icon: <>*</> }}
        rules={[{ required, message: errors?.message }]}
        className="checkbox-flex"
    >
        <AppCheckBox
            className="mr-2"
            status={errors && "error"}
            name={name}
            label={text}
            disabled={disabled}
            defaultValue={false}
            {...rest}
        />
        {errors && <DangerText>{errors.message || hint}</DangerText>}
    </AntInputColumn>
);

export function FormTimeField({
    control,
    name,
    defaultValue = "",
    placeholder,
    required,
    errors,
    label,
    type,
    hint,
    ...rest
}) {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={(props) => (
                <AntInputColumn
                    label={label}
                    tooltip={{ icon: required ? <DangerText>*</DangerText> : <></> }}
                    rules={[{ required, message: errors?.message }]}
                >
                    <TimePicker
                        status={errors && "error"}
                        value={props.field.value}
                        onChange={(dayJS) => props.field.onChange(dayJS)}
                        format="HH:mm"
                        {...rest}
                    />
                    {errors && <DangerText className="danger">{errors.message || hint}</DangerText>}
                </AntInputColumn>
            )}
        />
    )
}

export function FormDateField({
    control,
    name,
    defaultValue = "",
    placeholder,
    required,
    errors,
    label,
    type,
    hint,
    disabledDate,
    ...rest
}) {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={(props) => (
                <AntInputColumn
                    label={label}
                    tooltip={{ icon: required ? <DangerText>*</DangerText> : <></> }}
                    rules={[{ required, message: errors?.message }]}
                >
                    <DatePicker
                        status={errors && "error"}
                        value={props.field.value}
                        onChange={(dayJS) => props.field.onChange(dayJS)}
                        disabledDate={(current) => DateUtility.disabledDate(current, disabledDate)}
                        {...rest}
                    />
                    {errors && <DangerText className="danger">{errors.message || hint}</DangerText>}
                </AntInputColumn>
            )}
        />
    )
}

export function FormDateTimeField({
    control,
    showTime = true,
    name,
    defaultValue = "",
    placeholder,
    required,
    errors,
    label,
    type,
    hint,
    ...rest
}) {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={(props) => (
                <AntInputColumn
                    label={label}
                    tooltip={{ icon: required ? <DangerText>*</DangerText> : <></> }}
                    rules={[{ required, message: errors?.message }]}
                >
                    <RangePicker
                        showTime={showTime}
                        status={errors && "error"}
                        value={props.field.value}
                        defaultValue={defaultValue}
                        onChange={(dayJS) => props.field.onChange(dayJS)}
                        disabledDate={DateUtility.disabledDate}
                        {...rest}
                    />
                    {errors && <DangerText className="danger">{errors.message || hint}</DangerText>}
                </AntInputColumn>
            )}
        />
    )
}

const Label = styled.label`
    display:inline-flex;
    align-items: center;
    height:30px
`
const Value = styled.div`
    height: 35px;
    padding: 4px 0px;
    line-height: 1.5714;
    display: flex;
    align-items: center;
`
export const FormNormalField = ({ label, value }) => {
    return (
        <div>
            <Label>
                {label}
            </Label>
            <Value>
                {value}
            </Value>
        </div>
    )
}