import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Space, Input, Tag, Tooltip, theme } from 'antd';
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import CollectionService from '../../api/Collection/collection';
import { MESSAGE, STATUS_CODE, VALIDATIONS } from '../../Utils/constants';
import { collectionAction } from '../../redux/actions/collectionAction';
import { NotificationWithIcon } from '../../Utils/helper';

interface Props {
    tagvalue: any[]
}

const TagComp = ({ tagvalue }: Props) => {

    const { token } = theme.useToken();
    const [tags, setTags] = useState(tagvalue);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState('');
    const inputRef = useRef<InputRef>(null);
    const editInputRef = useRef<InputRef>(null);
    const { collectionId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);

    useEffect(() => {
        setTags(tagvalue)
    }, [tagvalue])

    useEffect(() => {
        editInputRef.current?.focus();
    }, [inputValue]);

    const handleClose = (removedTag: string) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        updateData({ tags: newTags })
        setTags(newTags);
    };

    const showInput = () => {
        setInputVisible(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            setTags([...tags, inputValue]);
        }
        if (inputValue.trim() !== '') {
            updateData({ tags: [...tags, inputValue] })
            setInputVisible(false);
            setInputValue('');
        }
    };

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditInputValue(e.target.value);
    };

    const updateData = async (values: any) => {
        try {
            if (collectionId) {
                const updateRes = await CollectionService.updateCollection(collectionId, values)
                if (updateRes && updateRes?.code === STATUS_CODE.SUCCESS) {
                    dispatch(collectionAction({ collection: updateRes.result }))
                    NotificationWithIcon("success", "Setting saved.")
                    return updateRes?.result?.name
                }
            }
        } catch (err: any) {
            if (err && err?.status === STATUS_CODE.UNAUTHORIZED) {
                NotificationWithIcon("error", MESSAGE.UNAUTHORIZED || VALIDATIONS.SOMETHING_WENT_WRONG)
            } else {
                NotificationWithIcon("error", err?.data?.error?.message || VALIDATIONS.SOMETHING_WENT_WRONG)
            }
        }
    }

    const handleEditInputConfirm = () => {
        if (editInputValue.trim() !== '') {
            const newTags = [...tags];
            newTags[editInputIndex] = editInputValue;
            updateData({ tags: newTags })
            setTags(newTags);
            setEditInputIndex(-1);
        }
        setInputValue('');
    };

    const tagInputStyle: React.CSSProperties = {
        width: 78,
        verticalAlign: 'top',
        height: '1.8rem',
    };

    const tagPlusStyle: React.CSSProperties = {
        background: token.colorBgContainer,
        borderStyle: 'dashed',
        fontSize: "1rem",
        fontFamily: "poppins",
        height: '1.8rem',
        padding: "4% 2%",
        display: 'flex', flexDirection: 'row', justifyContent: 'center',
        margin: '2px',
        paddingRight: '5px',
        paddingLeft: '5px'
    };

    return (
        <Space size={[0, 8]} wrap >
            <Space size={[0, 8]} wrap>
                {tags && tags.map((tag, index) => {
                    if (editInputIndex === index) {
                        return (
                            <Input
                                ref={editInputRef}
                                key={tag}
                                size="large"
                                style={tagInputStyle}
                                value={editInputValue}
                                onChange={handleEditInputChange}
                                onBlur={handleEditInputConfirm}
                                onPressEnter={handleEditInputConfirm}
                            />
                        );
                    }
                    const isLongTag: any = tag && tag !== null && tag.length > 20;
                    const tagElem = (
                        <Tag
                            key={tag}
                            closable={true}
                            style={{
                                userSelect: 'none', fontSize: "1rem", height: '1.8rem',
                                padding: "0% 2%", display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: "3px", paddingRight: '4px'
                            }}
                            onClose={() => handleClose(tag)}
                        >
                            <span
                                style={{
                                    fontSize: "1rem",
                                    fontFamily: "poppins", height: '1.8rem',
                                    marginTop: "0px", display: 'flex', flexDirection: 'row', justifyContent: 'center', marginLeft: "8px"
                                }}
                                onDoubleClick={(e) => {
                                    setEditInputIndex(index);
                                    setEditInputValue(tag);
                                    e.preventDefault();
                                }}
                            >
                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                            </span>
                        </Tag>
                    );
                    return isLongTag ? (
                        <Tooltip title={tag} key={tag}>
                            {tagElem}
                        </Tooltip>
                    ) : (
                        tagElem
                    );
                })}
            </Space>
            {
                inputVisible ? (
                    <Input
                        ref={inputRef}
                        type="text"
                        size="large"
                        style={tagInputStyle}
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputConfirm}
                        onPressEnter={handleInputConfirm}
                    />
                ) : (
                    <Tag style={tagPlusStyle} onClick={showInput} >
                        <PlusOutlined style={{ marginTop: "2px", marginRight: '4px' }} /> New Tag
                    </Tag>
                )
            }
        </Space >
    );
};

export default TagComp;