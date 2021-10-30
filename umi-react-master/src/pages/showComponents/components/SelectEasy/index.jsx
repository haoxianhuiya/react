
import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'dva';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';

const SelectFundEasy = props => {
  const { dispatch, style } = props;
  const [scrollPage, setScrollPage] = useState(1)
  const [fetching, setFetching] = useState(false)
  const [data, setData] = useState([])
  const [inputValue, setInputValue] = useState('')

  const handleSearch = (params) => {
    const { page, value } = params
    setInputValue(value)
    const list = data;
    dispatch({
      type: 'showComponents/getList',
      payload: {
        page,
        search: value
      },
      callback: (res) => {
        if (res && res.rows) {
          let newList = []
          if (page > 1) {
            newList = list.concat(res.rows)
          } else {
            newList = res.rows
          }
          setData(newList)
          setFetching(false)
        }
      }
    });
  }

  // 初始化加载所有用户
  useEffect(() => {
    if (props.value) {
      handleSearch({ page: 1, value: props.value })
    } else {
      handleSearch({ page: 1 })
    }
  }, [])

  // 滚动则查询下一页
  const companyScroll = e => {
    e.persist();
    const { target } = e;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      const nextScrollPage = scrollPage + 1;
      setScrollPage(nextScrollPage)
      handleSearch({ page: nextScrollPage, value: inputValue }); // 查询下一页，value不变
    }
  };

  // 输入框值变化则重置data为空数组、第一页，spin开始转，查询
  const fetchCompany = value => {
    setData([])
    setFetching(true)
    setScrollPage(1)
    handleSearch({ page: 1, value }); // 改变输入框的value存值，并且页码重置为1
  };

  const debounceFetcher = React.useMemo(() => {
    return debounce(fetchCompany, 800);
  }, [data, 800]);

  return (
    <Select
      style={{ ...style }}
      disabled={props.disabled}
      allowClear
      value={props.value}
      onChange={props.onChange}
      showSearch
      placeholder="请选择"
      notFoundContent={fetching ? <Spin size="small" style={{ width: '100%', display: 'flex', justifyContent: 'center' }} /> : null}
      onSearch={debounceFetcher}
      optionLabelProp="value"
      onPopupScroll={companyScroll}
    >
      {
        data.length > 0 && data.map(item => <Select.Option title={item.content} item={item} key={item.value} value={item.content}>{`${item.content}(${item.value})`}</Select.Option>)
      }
    </Select>
  )
}
export default connect((showComponents) => ({ showComponents }))(SelectFundEasy);
