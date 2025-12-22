const { supabase } = require('../config/supabase');

const authController = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw new Error(error.message);

      res.json({
        ok: true,
        message: 'User registered successfully',
        data,
      });
    } catch (err) {
      res.status(400).json({ ok: false, error: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw new Error(error.message);

      res.json({
        ok: true,
        message: 'Logged in',
        data,
      });
    } catch (err) {
      res.status(400).json({ ok: false, error: err.message });
    }
  },
};

const authMiddleware = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return res.status(401).json({
        ok: false,
        error: 'No token provided. Please login!'
      });
    }

    const token = authHeader.replace('Bearer ', '');
    
    // Supabase verifies the token    
    const { data : { user }, error } = await supabase.auth.getUser(token);
    
    if(error || !user ){
      return res.status(401).json({
        ok: false,
        error: 'Invalid or expired token.'
      });
    }

    req.user = user;
    next();
    
  } catch (error) {
    return res.status(500).json({ 
      ok: false, 
      error: 'Authentication failed' 
    });
  }
};

module.exports = { authController, authMiddleware };