var async = require("async");
const games = require('../models/gameModels');
let user = require('../models/userModels')
exports.getHomePage = function (req, res) {
    console.log("I am inside getHomePage")    
    const userid =req._passport.session.user;
    //run all the function in the array at same times
    async.parallel([function(callback){
        // Retrieve all the data
        games.find({},(err, result)=>{
            callback(err,result);
        })
    },function(callback){
        // Retrieve all the data
        user.findById(userid,(err, result)=>{
            callback(err,result);
        })

    }],(err,results) => {
        //get result from first function
        const output  = results[0];
        const user  = results[1];
        for (o of output) {
            o.temp = o.name.split(" ").join('_')
        }
        console.log(output[0].temp)
        return res.render('home',{title:'Gaming Hub',user, output});
    });
 
}
