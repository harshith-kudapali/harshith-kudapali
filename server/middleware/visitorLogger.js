import maxmind from 'maxmind';
import path from 'path';
import Visitor from '../models/Visitor.js';

// The path needs to be resolved from the current working directory in Vercel
const dbPath = path.join(process.cwd(), 'server', 'database', 'GeoLite2-City.mmdb');

let lookup;
try {
  lookup = await maxmind.open(dbPath);
  console.log('MaxMind GeoIP database loaded successfully.');
} catch (error) {
  console.error('FATAL: Could not load MaxMind DB.', error);
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
