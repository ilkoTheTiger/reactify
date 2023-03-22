const { commuteModel } = require('../models/Commute');
const { errorHandler } = require('../utils/errorHandler');
const { ValidationError } = require('../utils/createValidationError');

const getCommute = async (req, res) => {
  const { commuteId } = req.params;

  try {
    const commute = await commuteModel.findById(commuteId, '-__v -isDeleted');

    if (!commute) {
      throw new ValidationError('There is no such commute with provided id.', 404);
    }

    res.status(200).json({ commute: commute.toObject() });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const addCommute = async (req, res) => {
  const { from, to, seats, phone, time } = req.body;
  const data = { from, to, seats, phone, time };

  try {
    const createdCommute = await commuteModel.create({ ...data });
    const commute = { ...data, _id: createdCommute._id, createdAt: createdCommute.createdAt, updatedAt: createdCommute.updatedAt };

    res.status(200).json({ commute });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const updateCommute = async (req, res) => {
  const { commuteId } = req.params;
  const { from, to, seats, phone, time } = req.body;
  const data = { from, to, seats, phone, time };

  try {
    const commute = await commuteModel
      .findByIdAndUpdate(commuteId, data, { runValidators: true, new: true })
      .select('from to seats phone time createdAt updatedAt');

    res.status(200).json({ commute: commute.toObject() });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const deleteCommute = async (req, res) => {
  const { commuteId } = req.params;

  try {
    await commuteModel.findByIdAndUpdate(commuteId, { isDeleted: true });

    res.status(200).json({ commuteId });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const allCommutes = async (req, res) => {
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
    const count = await commuteModel.countDocuments(query);
    let commutes = await commuteModel
      .find(query)
      .select('from to seats phone time createdAt updatedAt')
      .limit(limit)
      .skip(skipIndex)
      .sort(sortCriteria)
      .lean();

    res.status(200).json({ commutes, count });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(200).json({ commutes: [], count: 0 });
    }

    errorHandler(error, res, req);
  }
};

module.exports = {
  getCommute,
  addCommute,
  updateCommute,
  deleteCommute,
  allCommutes,
};
