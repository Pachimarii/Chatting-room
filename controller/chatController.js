var async = require("async");
let user = require('../models/userModels')
exports.getGameChat = function(req, res){
    console.log("in controller");
    const name = req.params.name;
    const userid =req._passport.session.user;
    user.findById(userid,(err,data)=>{
        if(!err){
            res.render('groupchat/groupchat', {title:'gameChat', user: data, groupName: name});
        }
    }
    )};
    