const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'error',
      message: 'એક્સેસ નામંજૂર: લૉગિન કરવું જરૂરી છે.'
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_shree_mahendi_key_12345');
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      status: 'error',
      message: 'અમાન્ય અથવા જૂનો ટોકન. કૃપા કરીને ફરી લૉગિન કરો.'
    });
  }
};
