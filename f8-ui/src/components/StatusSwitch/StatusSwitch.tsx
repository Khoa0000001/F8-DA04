/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Switch } from 'antd';

const StatusSwitch = ({ initialValue, onSwitchChange }: { initialValue: any; onSwitchChange: any }) => {
    const [checked, setChecked] = useState(initialValue);

    const handleSwitchChange = (newValue: any) => {
        onSwitchChange(newValue);
        setChecked(newValue);
    };

    return <Switch checked={checked} onChange={handleSwitchChange} />;
};

export default StatusSwitch;
