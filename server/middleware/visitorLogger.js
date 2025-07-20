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
} catch (error) {
  console.error('FATAL: Could not load MaxMind DB. Visitor logging is disabled.', error);
}

export const logVisitor = (req, res, next) => {
  console.log(`[Log] Middleware triggered for: ${req.originalUrl}`);

  if (!lookup) {
    console.log('[Log] MaxMind DB not loaded. Skipping.');
    return next();
  }

  const originalIp = req.ip;
  // If the request is from localhost, use a test IP to ensure the lookup works.
  const ipForLookup = (originalIp === '::1' || originalIp === '127.0.0.1') 
    ? '8.8.8.8' // A known Google IP address
    : originalIp;
  
  console.log(`[Log] Original IP: ${originalIp}. IP for lookup: ${ipForLookup}`);

  try {
    const geoData = lookup.get(ipForLookup);
    console.log('[Log] Geo data from lookup:', geoData);

    if (geoData?.location?.latitude) {
      console.log('[Log] ✅ Valid location found. Saving to database...');
      const newVisitor = new Visitor({
        ipAddress: originalIp, // Always save the real IP
        city: geoData.city?.names.en || 'Unknown City',
        country: geoData.country?.iso_code || 'N/A',
        location: {
          coordinates: [geoData.location.longitude, geoData.location.latitude],
        },
      });

      newVisitor.save()
        .then(() => console.log('[Log] ✅ SUCCESS: Visitor record saved to MongoDB!'))
        .catch(err => console.error('[Log] ❌ DATABASE ERROR:', err));
    } else {
      console.log('[Log] ❌ WARNING: No location data found. Not saving record.');
    }
  } catch (error) {
    console.error('[Log] ❌ LOOKUP ERROR:', error);
  }

  next();
};
