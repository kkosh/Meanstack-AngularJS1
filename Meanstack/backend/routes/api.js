var User = require('../models/user_model');
session = require('express-session');


module.exports = function(router) {
    
    
router.post('/register', function(req, res) {
    
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.firstname =req.body.firstname;
    user.lastname =req.body.lastname;
    user.email =req.body.email;
    user.phone =req.body.phone;
    user.location =req.body.location;
  
    
    
        if(req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.firstname == null || req.body.firstname == '' || req.body.lastname == null || req.body.lastname == '' || req.body.email == null || req.body.email == '' || req.body.phone == null || req.body.phone == ''  || req.body.location == null || req.body.location == '') 
        {
        res.json({ result: false, message: "Ensure all details were provided!!!" });
        }
        else 
        {
                user.save(function(err) 
                {

                    if(err) {
                            res.json({ result: false, message: "username, email or phone already exist" });
                            }
                    else
                            {
                            res.json({ result: true, message: 'User created!!!' });
                            }

              });
        }    
});
    
router.use(
      session({	 
         secret : 'meanstack_sess_secret_key',
         resave: true,
         saveUninitialized: true
         })
);
 
    
router.post('/login', function(req, res) {
        
    User.findOne({ username : req.body.username }, 
                 { _id : 1, username : 1 , password : 1 }).exec(function(error, user) {
        
        
            if(error) {
            throw error;
            }
                
            if(user) {
                
                if(req.body.password == user.password) {
   
   
                    req.session._id = user._id;
                    res.json({result : true, message: "Thank you !!!"});
                    
                } else {
                    
                    res.json({result : false, message: "Invalid password !!!"});
                }            
            }
            
            else {
                res.json({result : false, message: "Please register first !!!"});
            } 
        
    });  
        
});
    
    
router.post('/sessionCheck', function(req, res){
    if(req.session._id) {
        res.json({result: true, message: "Status : LoggedIn"});
    } 
    else {
        res.json({ result: false, message: "Status : LoggedOut" });
    }
    
});
    
    
router.get('/getDetails', function(req, res) {
    
    if(req.session._id) {
    
    User.findOne({ _id : req.session._id }, 
                 { _id: 1, username: 1, password: 1, firstname: 1, lastname: 1, phone: 1, email: 1, location: 1 })
    .exec(function(err, user) {
      
        if(err){
            throw err;
        }
        
        if(user) {
        
        res.json({
            
            result: true,
            _id :user._id,
            username: user.username,
            password: user.password,
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phone,
            email: user.email,
            location: user.location
            
        });

        } else {
            res.json({result: false, message: "no user found"});
        }
        
     });
        
    } else {
        
        res.json({ result: false, message: "To view profile, Please login first !!!" });
        
    }
});    

router.post('/editUser', function(req, res) {
    
    if(req.session._id) {
       
            User.update({ _id : req.body._id }, 
                       { $set : { username : req.body.username,
                                  password: req.body.password,
                                  firstname: req.body.firstname,
                                  lastname: req.body.lastname,
                                  phone: req.body.phone,
                                  email: req.body.email,
                                  location: req.body.location 
                                }
            })
            .exec(function(err, result){
                
                if(err) {
                    throw err;
                } else {
                    if(result) {
                        res.json({result: true, message:"Thank you!!! Data updated"});
                    } else {
                        res.json({result: false, message:"Please try again !!!"});
                    }
                }
                
                
            });
       
       } else {
         
            res.json({result: false, message:"You need to login to update your info !!!"});
         
       }
    
    
    
});    
    
  
router.post('/sendMsg', function(req, res) {
    
    if(req.session._id) {
            
        User.findOne({email: req.body.to }).exec(function(err, user) {
            
            if(err) {
                throw err;
            }
            
            if(!user) {
                
                    res.json({ result: false, message: "Please enter valid Email" });
            }
            
            else {
                
                    User.update({email: req.body.to},
                               { $push : {
                                       message : {

                                            from: req.body.from,
                                            content: req.body.content
                                        }
                                    } 
                               })
                    .exec(function(err, msg) {


                        if(err) {
                            throw err;
                        }

                        if(msg) {
                            res.json({ result: true, message: "Message Sent !!!" });
                        } else {
                            res.json({ result: false, message: "Oops, delivery failed" });
                        } 
                    });
            }

        });                
    }
    
    else {
       
        res.json({result: false, message:"You need to login for sending message"});
        
    }

    
    
});    
    
  
router.get('/getMsg', function(req, res) {
    
    if(req.session._id) {
        
        User.findOne({_id: req.session._id}, {message:1})
        .exec( function(err, user) {
            res.json(user.message);            
        });
        
    } else {
        
        res.json({ result: false, message: "To see message log, please login first" });
        
    }
    
    
});
    
    
router.post('/deleteMsg/:index', function(req, res) {
  
    var index =  req.params.index;
    
    User.find({_id : req.session._id}, { _id: 0, message: 1 }).exec(function(err, msgArr){
        
     //   var index = req.params.index;
        var msgArr2 = msgArr[0].message;
        
        
    if(msgArr2) { 
        
            msgArr2.splice(index, 1);
    }
              
    User.update({_id : req.session._id}, { $set: {message : msgArr2}}).exec(function(err, result) {
            
            if(err) {
                throw err;
            }
            
            if(result) {
                
                console.log("result");
                 res.json({ result: true, message: " Message deleted "});
            
            } else {
                
                res.json({ result: false, message:"Please try again" });
            }
                       
        });
                
    });
    
});     
    
 
    
//last    
router.post('/sessionOut', function(req, res) {
    
    if(req.session._id) {
       //distroy session
        req.session.destroy();
        res.json({result: true, message:"Session destroyed"});
    } else {
        //print msg that user already logged out
        res.json({result: false, message: "Already logged out"});
    }    
});    
    
    
return router;    
        
}