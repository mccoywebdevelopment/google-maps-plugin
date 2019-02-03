function isUserLoggedOn(req, res) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
    {
    	return true;
    }
    else{
    	return false;
    }
}
module.exports.isUserLoggedOn=isUserLoggedOn;