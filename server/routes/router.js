const userRouter = require('./user.js');
const commuteRouter = require('./commute.js');


module.exports = (app) => {
  app.use('/api/users', userRouter);
  app.use('/api/commutes', commuteRouter);
};
