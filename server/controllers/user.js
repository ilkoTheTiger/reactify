const { userModel } = require('../models/User');
const { errorHandler } = require('../utils/errorHandler');
const { ValidationError } = require('../utils/createValidationError');
const userManager = require('../managers/userManager');

const getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await userModel.findById(userId, '-__v -isDeleted');

    if (!user) {
      throw new ValidationError('There is no such user with provided id.', 404);
    }

    res.status(200).json({ user: user.toObject() });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

// const addUser = async (req, res) => {
//   const { firstName, lastName, email, imageUrl, phoneNumber, address } = req.body;
//   const data = { firstName, lastName, email, imageUrl, phoneNumber };

//   try {
//     const createdUser = await userModel.create({ ...data, address });
//     const user = { ...data, _id: createdUser._id, createdAt: createdUser.createdAt, updatedAt: createdUser.updatedAt };

//     res.status(200).json({ user });
//   } catch (error) {
//     errorHandler(error, res, req);
//   }
// };

// const updateUser = async (req, res) => {
//   const { userId } = req.params;
//   const { firstName, lastName, email, imageUrl, phoneNumber, address } = req.body;
//   const data = { firstName, lastName, email, imageUrl, phoneNumber, address };

//   try {
//     const user = await userModel
//       .findByIdAndUpdate(userId, data, { runValidators: true, new: true })
//       .select('firstName lastName email imageUrl phoneNumber createdAt updatedAt');

//     res.status(200).json({ user: user.toObject() });
//   } catch (error) {
//     errorHandler(error, res, req);
//   }
// };

const addUser = async (req, res) => {
  const { email, password, repass } = req.body;
  try {
    if (password !== repass) {
      throw new ValidationError('Password mismatch', 401);
    }

    const result = await userManager.register(email, password);

    res.json({ result: result.toObject() });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await userManager.login(email, password);

    if (!result) {
      throw new ValidationError('There is no such user with provided email.', 401);
    }

    res.status(200).json({ result: result.toObject() });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const logoutUser = async (req, res) => {
  res.json({ ok: true });
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, email, imageUrl, phoneNumber, address } = req.body;
  const data = { firstName, lastName, email, imageUrl, phoneNumber, address };

  try {
    const user = await userModel
      .findByIdAndUpdate(userId, data, { runValidators: true, new: true })
      .select('firstName lastName email imageUrl phoneNumber createdAt updatedAt');

    res.status(200).json({ user: user.toObject() });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    await userModel.findByIdAndUpdate(userId, { isDeleted: true });

    res.status(200).json({ userId });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const getUsers = async (req, res) => {
  const page = parseInt(req?.query?.page) || 1;
  const limit = parseInt(req?.query?.limit) || 5;
  const sort = req?.query?.sort;
  const order = req?.query?.order;
  const search = req?.query?.search;
  const criteria = (req?.query?.criteria || '').trim();
  const skipIndex = (page - 1) * limit;

  const query = { isDeleted: false };
  const sortCriteria = {};

  if (sort && sort !== 'null' && order && order !== 'null') {
    sortCriteria[sort] = order;
  }

  if (search && search !== 'null' && criteria && criteria !== 'null') {
    query[criteria] = criteria == '_id' ? search : new RegExp(search, 'i');
  }

  try {
    const count = await userModel.countDocuments(query);
    let users = await userModel
      .find(query)
      .select('firstName lastName email imageUrl phoneNumber createdAt updatedAt')
      .limit(limit)
      .skip(skipIndex)
      .sort(sortCriteria)
      .lean();

    res.status(200).json({ users, count });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(200).json({ users: [], count: 0 });
    }

    errorHandler(error, res, req);
  }
};

module.exports = {
  getUser,
  addUser,
  logoutUser,
  loginUser,
  updateUser,
  deleteUser,
  getUsers,
};
