const fs = require('fs');
const { inputRequired } = require('./utils');

const {tabList} = JSON.parse(fs.readFileSync('./generators/category-list.json'));

module.exports = plop => {
  plop.setGenerator('블로그 글 자동으로 만들기 중...', {
    prompts: [
      {
        type: 'input',
        name: 'title',
        message: '블로그 제목은?',
        validate: inputRequired('title'),
      },
      {
        type: 'list',
        name: 'postType',
        message: '블로그 포스트 카테고리는?',
        choices: tabList.map(tab => ({ name: tab.type, value: tab.type })),
      },
      {
        type: 'input',
        name: 'tags',
        message: '태그는? (콤마로 구분)',
      },
    ],
    actions: data => {
      data.createdDate = new Date().toISOString().split('T')[0];
      data.path = data.createdDate + '--' + data.title

      if (data.tags) {
        data.tags = `\ntags: [${data.tags.split(',')}]`;
      } else{
        data.tags = `\ntags: []`
      }

      return [
        {
          type: 'add',
          path: '../src/posts/{{postType}}/{{path}}.mdx',
          templateFile: 'templates/blog-post-md.template',
        },
      ];
    },
  });
};
