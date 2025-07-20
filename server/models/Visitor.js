import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  ipAddress: { type: String, required: true },
  city: { type: String },
  country: { type: String },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  visitDate: { type: Date, default: Date.now }
});

visitorSchema.index({ location: '2dsphere' });

const Visitor = mongoose.model('Visitor', visitorSchema);
export default Visitor;
