// Import requires
var router =  require('express').Router();
var mongoose = require('mongoose');

var Article = mongoose.model('Article');

// GET - Return all articles in the DB
router.get('/' , (req, res) => {
    Article.find({}, (err, articles) =>  {
        res.json(articles);
    });
});

// GET - Return an article with specific ID
router.get('/:id', (req, res) => {
    Article.findOne({_id: req.params.id}, (err, article) => {
        res.json(article);
    });
});



// POST -- Insert a new article in DB
router.post('/', (req, res, next) => {
    var newArticle = req.body;
    console.log(newArticle);

    var article = new Article();

    article.titulo = newArticle.titulo;
    article.description = newArticle.description;
    article.cuerpo = newArticle.cuerpo;
    article.author = newArticle.author;

    article.save().then(() => {
        return res.json({isCreated: true});
    }).catch(next);
});

//PUT -- Update a register already exists
router.put('/:id', (req, res) => {
    Article.updateOne (
        {_id: req.params.id},
        {$set:{
            titulo: req.body.titulo,
            description: req.body.description,
            cuerpo: req.body.cuerpo,
            author: req.body.author
        }}).then(() => {
            res.json({isUpdated: true});
        });
});

//PUT -- Add comments to specific article
router.put('/AddComments/:id', (req, res) => {
    Article.findOneAndUpdate(
        {_id: req.params.id},
        {$push: {comments : req.body.comments}}
    ).then(() => {
        res.json({isUpdated: true});
    });
});

//DELETE - Delete an article with specified ID
router.delete('/:id', (req,res) => {
    Article.deleteOne({_id: req.params.id}, () => {
        res.json({isDeleted: true});
    });
})

module.exports = router;