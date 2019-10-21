/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
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
  delete: function (req, res) {
    console.log('delete');
    console.log('req.params.id', req.params.id);
    Articles.destroy({_id: req.params.id}).exec(function (err) {
      if (err) return res.view('500');
      return res.redirect('/articles/list');
    })
    // .catch(error => res.view('500'));
    return false;
  }

};

