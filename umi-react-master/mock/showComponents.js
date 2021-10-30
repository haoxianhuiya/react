const responseJson = (data, code = 0) => {
  return {
    code,
    data
  }
}

const time = (fun) => {
  setTimeout(() => {
    fun && fun();
  }, 300);
};

export default {
  'GET /api/editTable/list': (req, res) => {
    const { page, search } = req.query;
    const result = [];
    for (let i = 1; i <= 10; i++) {
      const idx = ((page ? page : 1) - 1) * 10 + i;
      const content = `${search && search !== '' ? search : 'zhangsan'}${idx}`;
      result.push({
        id: idx,
        value: idx,
        content,
      });
    }
    time(() => {
      res.send(responseJson({
        rows: result
      }));
    })
  },
  'POST /api/editTable': (req, res) => {
    res.send(responseJson('添加成功!'));
  },
  'PUT /api/editTable/:id': (req, res) => {
    res.send(responseJson('编辑成功!'));
  },
  'DELETE /api/editTable/:id': (req, res) => {
    res.send(responseJson('删除成功!'));
  }
};
