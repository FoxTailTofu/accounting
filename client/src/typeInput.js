import React, { useState } from 'react';

function TypeInput({ onUpdate, itemInputRef, costInputRef }) {
    const types = ['飲食', '生活', '其他'];
    const item = {
        飲食: ['正餐', '飲料', '零食',],
        生活: ['日用', '課金', '蝦皮'],
    };

    const [selectedType, setSelectedType] = useState('');
    const [selectedItem, setSelectedItem] = useState('');

    const handleTypeClick = (type) => {
        setSelectedType(type);
        setSelectedItem('');
        onUpdate({ type, item: '' });
        if (item[type] === undefined) {
            itemInputRef.current.focus();
        }
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
        onUpdate({ type: selectedType, item });
        costInputRef.current.focus();
    };

    return (
        <div>
            {types.map((type) => (
                <button key={type} onClick={() => handleTypeClick(type)}>
                    {type}
                </button>
            ))}
            <hr></hr>
            {item[selectedType]?.map((item) => (
                <button
                    key={item}
                    onClick={() => handleItemClick(item)}
                >
                    {item}
                </button>
            ))}
            <hr></hr>
        </div>
    );
}

export default TypeInput;
