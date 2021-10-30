import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import SelectEasy from './components/SelectEasy';

const ShowComponents = props => {
    const { dispatch, global } = props;
    const [selectEasyItem, setSelectEasyItem] = useState(null)

    return <div style={{ width: '100%' }}>
        <SelectEasy value={selectEasyItem} onChange={(val) => setSelectEasyItem(val)} style={{ width: '160px' }} />
    </div>;
};
export default connect(({ global, showComponents }) => ({
    global,
    showComponents
}))(ShowComponents);