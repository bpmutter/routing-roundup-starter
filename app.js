const express = require('express');
const app = express();
const routes = require('./routes/routes')
const port = 8081;

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.send(`Hello from Express!`)
})

app.get(/xyz$/, (req, res) => {
  res.send(`That's all I wrote.`)
})

app.get(/^\/capital-letters\//, (req, res) => {

  console.log(`req.path: `, req.path)
  const path = req.path.slice(17)
  const toUpper = path.toUpperCase()

  res.send(toUpper)

});

app.use('/margot', routes);
app.use('/margeaux', routes);

app.all('*', (req,res)=>{
  const data = {
    method: req.method,
    path: req.path,
    randomNumber: Math.floor(Math.random()*100 + 1),
  }
  res.render('template', data);
})


app.listen(port, ()=>{
    console.log("listening on", port );
});
