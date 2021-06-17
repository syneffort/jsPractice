const express = require('express');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 3000);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './public')));

app.get('/hello', (req, res) => {
    res.render('hello', { name: req.query.nameQuery });
});

app.get('/hello/:nameParam', (req, res) => {
    res.render('hello', { name: req.params.nameParam });
});

app.listen(app.get('port'), () => {
    console.log(`✨ server start @ port ${app.get('port')}`);
})