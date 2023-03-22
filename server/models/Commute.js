const { Schema, model } = require('mongoose');
const today = new Date();
const minDate = today.getFullYear()+'-'+String(today.getMonth()+1).padStart(2, '0')+'-'+String(today.getDate()).padStart(2, '0');
const maxDate = today.getFullYear()+'-'+String(today.getMonth()+2).padStart(2, '0')+'-'+String(today.getDate()).padStart(2, '0');

const commuteSchema = new Schema(
  {
    from: {
      type: String,
      required: true,
      minLength: [3, 'City of Departure must be between 3 and 14 letters!'],
      maxLength: [14, 'City of Departure must be between 3 and 14 letters!'],
      match: [/\d/, 'City of Departure must be letters only!'],
    },
    to: {
      type: String,
      required: true,
      minLength: [3, 'City of Arrival must be between 3 and 14 letters!'],
      maxLength: [14, 'City of Arrival must be between 3 and 14 letters!'],
      match: [/\d/, 'City of Arrival must be letters only!'],
    },
    seats: {
        type: Number,
        required: true,
        min: [1, 'Available seats must a number be between 0 and 4!'],
        max: [4, 'Available seats must a number be between 0 and 4!'],
        validate: /[1-4]{1}$/,
      },
    phone: {
        type: String,
        required: true,
        match: [/^0[1-9]{1}[0-9]{8}$/, 'Phone number is not valid!'],
    },
    time: {
        type: Date,
        required: true,
        min: [minDate, 'Scheduled date must be in the future!'],
        max: [maxDate, 'Scheduled date must be in the near future!'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const commuteModel = model('Commute', commuteSchema);
module.exports = {
  commuteModel,
};
