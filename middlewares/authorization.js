function authorization (req, res, next) {

  const role = req.loginUser.role;

  if(role === 'Admin'){
    next();
  } else {
    res.status(401).json({msg : "Not Authorized"});
    
    // next({ msg : "Not Authorized", status: 401});
  }
}

module.exports = authorization