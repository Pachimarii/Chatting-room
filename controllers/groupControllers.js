const Users= require('../models/userModel');
const Group = require('../models/groupMessageModel');
const async = require('async');

exports.getGroupPage = function (req, res) {
    let name = req.params.name
    let gpname = name.split("_").join(" ")

    Group.find({room: name}).populate('sender')
    .then(e=>{
        console.log(`result: ${e}`)
        res.render('groupchat/group',{user:req.user, name, gpname, groupMsg:e})
    })       
}

exports.groupPostPage = function (req,res) {
    async.parallel([
        function(callback){
            if(req.body.message){
                const group = new Group();
                group.sender = req.user._id;
                group.body = req.body.message;
                group.name = req.body.group;
                group.createAt = new Date();

                group.save((err,msg)=> {
                    console.log(msg);
                    callback(err,msg);
                })
            }
        }
    ],(err,results)=>{
        res.redirect('/group/'+req.params.name);
    });
}