module.exports = app => {
  class NewsService extends app.Service {
    * list(page = 1) {
      // read config
      const { serverUrl, pageSize } = this.app.config.news;

      // use build-in http client to GET hacker-news api
      const { data: idList } = yield this.ctx.curl(`${serverUrl}/topstories.json`, {
        data: {
          orderBy: '"$key"',
          startAt: `"${pageSize * (page - 1)}"`,
          endAt: `"${pageSize * page - 1}"`,
        },
        dataType: 'json',
      });
      // parallel GET detail, see `yield {}` from co
      const newsList = yield Object.keys(idList).map(key => {
        const url = `${serverUrl}/item/${idList[key]}.json`;
        return this.ctx.curl(url, { dataType: 'json' });
      });
      return newsList.map(res => res.data);
    }


    * create() {
        try {
            const result = yield app.mysql.beginTransactionScope(function* (conn) {
              // don't commit or rollback by yourself
              yield conn.insert('ma_user', {
                  nickname: 'tom',
                  sex: '2',
                  birthday: '2016-05-24',
              });
              yield conn.update('ma_user', {
                  id: 12,
                  nickname: 'to22222m',
                  sex: '1',
                  birthday: '2016-05-24',
              });

                yield conn.insert('ma_user', {
                  id: 13,
                  nickname: 'tom',
                  sex: '2',
                  birthday: '2016-05-24',
              });
              return { success: true };
            }, this.ctx);

        } catch (err) {

          console.info(err);
        }
    }

    * dblist() {
     let list = yield this.app.mysql.get('ma_user');
    }
  }
  return NewsService;
};
