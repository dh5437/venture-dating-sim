const express = require('express');
const cors = require('cors');
const { PORT } = require('./config');

const app = express();
const corsOption = {
  origin: 'http://localhost:3000',
};

app.use(express.json());
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/index'));
app.use('/signup', require('./routes/signup'));
app.use('/login', require('./routes/login'));
app.use('/escape', require('./routes/escape'));
app.use('/retry', require('./routes/retry'));
app.use('/item', require('./routes/item'));
app.use('/rest', require('./routes/rest'));
app.use('/battle', require('./routes/battle'));

app.listen(PORT, () => {
  console.log(`listening at port : ${PORT}`);
});
