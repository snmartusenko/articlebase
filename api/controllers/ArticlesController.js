/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 * @param Articles /models/Articles
 */


module.exports = {
  list: async function (req, res) {
    let articles = await Articles.find()
      .catch(error => res.view('500'));

    return res.view('articles/list', {articles: articles});
  },

  add: function (req, res) {
    return res.view('articles/add');
  },

  create: async function (req, res) {
    let title = req.body.title;
    let body = req.body.body;

    await Articles.create({title: title, body: body})
      .catch(error => res.view('500'));

    return res.redirect('/articles/list');
  },

  delete: async function (req, res) {
    await Articles.destroy({_id: req.params.id})
      .catch(error => res.view('500'));
    return res.redirect('/articles/list');
  },

  edit: async function (req, res) {
    console.log('edit');
    console.log('req.params.id', req.params.id);
    let article = await Articles.findOne({id: req.params.id})
      .catch(error => res.view('500'));
    // console.log(article)
    return res.view('articles/edit', {article: article});
  },

  update: async function (req, res) {
    console.log('update');
    console.log('req.params.id', req.params.id);
    let title = req.body.title;
    let body = req.body.body;

    let updated = await Articles.update({id: req.params.id})
      .set({title: title, body: body})
      .fetch()
      .catch(error => res.view('500'));

    console.log(updated);

    return res.redirect('/articles/list');
  },
};

