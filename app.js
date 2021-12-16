const express = require('express');
const cors = require('cors');
const { PORT } = require('./config');

const app = express();
const corsOption = {
  origin: 'http://localhost:3000',
};

const indexRouter = require('./routes/index');

app.use(express.json());
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`listening at port : ${PORT}`);
});
