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
  }

};

