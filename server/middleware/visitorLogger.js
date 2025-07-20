import maxmind from 'maxmind';
import path from 'path';
import { fileURLToPath } from 'url';
import Visitor from '../models/Visitor.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '..', 'database', 'GeoLite2-City.mmdb');

let lookup;
try {
  lookup = await maxmind.open(dbPath);
  console.log('MaxMind GeoIP database loaded successfully.');
} catch (error) {
  console.error('FATAL: Could not load MaxMind DB. Visitor logging is disabled.', error);
}

export const logVisitor = (req, res, next) => {
  if (!lookup) {
    return next();
  }

  const ip = req.ip;

  // Intentionally skip logging for local development to keep data clean
  if (ip === '::1' || ip === '127.0.0.1') {
    return next();
  }
  
  try {
    const geoData = lookup.get(ip);

    if (geoData?.location?.latitude) {
      const newVisitor = new Visitor({
        ipAddress: ip,
        city: geoData.city?.names.en || 'Unknown City',
        country: geoData.country?.iso_code || 'N/A',
        location: {
          coordinates: [geoData.location.longitude, geoData.location.latitude],
        },
      });
      // Save without waiting for it to complete
      newVisitor.save().catch(err => console.error('DB Save Error:', err));
    }
  } catch (error) {
    // Non-critical error, e.g., IP not in database. Just move on.
  }

  next();
};
