module.exports = {
    isOwner : function(req, res) {     // check a login status
        if(req.session.is_logined) {
            return true;
        } else {
            return false;
        }
    }, 
    StatusUI : function(req, res) {   // chaning login => logout
        var authStatusUI = '<a href="/login">login</a>'
        if(this.isOwner(req, res)) {     
            authStatusUI = `${req.session.nickname} | <a href="/logout">logout</a>`
        }
        return authStatusUI;
    }
}


