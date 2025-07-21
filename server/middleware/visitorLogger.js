
import Visitor from '../models/Visitor.js';
import express from 'express'
const visitorLogger = express.Router();


export const logVisitor = (req, res) => {
  const ip = req.body.ip;

  try {
    // const geoData = lookup.get(ip);

    if (req.body.ip) {
      const newVisitor = new Visitor({
        ipAddress: ip,
        city: req.body.location.city + " " + req.body.location.region || 'Unknown City',
        country: req.body.location.country || 'N/A',
        location: {
          coordinates: [req.body.coordinates.longitude, req.body.coordinates.latitude],
        },
        network: [req.body.network.isp, req.body.network.organization],
        postalCode: req.body.location.postalCode,
      });
      console.log(newVisitor);
      // Save without waiting for it to complete
      newVisitor.save().catch(err => console.error('DB Save Error:', err));
    }
  } catch (error) {
    // Non-critical error, e.g., IP not in database. Just move on.
  }

};

visitorLogger.post('/', logVisitor);