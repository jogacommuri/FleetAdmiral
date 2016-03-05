var User = require('../models/user');
var Equipment = require('../models/equipment');
var config = require('../../config');

var secretKey = config.secretKey;

var jsonwebtoken = require('jsonwebtoken');

function createToken(user){
    var token = jsonwebtoken.sign({
        id: user._id,
        name:user.name,
        email: user.email
    },secretKey,{
        expiresInMinutes:1440
    });
    
    return token;
}

module.exports = function(app,express,io){
    var api = express.Router();
    
    api.get('/all_equipments', function(req,res){
		Equipment.find({})
		.populate('machine_type','manufacturer','model','machine_id','notes','address','machine_state')
		.exec(function(err, equipments){
			if(err){
				/*res.send(err);*/
				return next(err);
			}
			res.json(equipments);
		});
	});
    api.post('/signup',function(req,res){
        var user = new User({
            name:req.body.name,
            email:req.body.email,
            password: req.body.password
        });
        var token =  createToken(user);
        
        user.save(function(err){
            if(err){
                res.send(err);
                return;
            } else{
                res.json({
                    success: true,
					message:'User has been created!',
					token: token
                });
            }
        });
    });
    
    api.get('/users', function(req,res){
		User.find({}, function(err,users){
			if(err){
				res.send(err);
				return;
			}
			res.json(users);
		});
	});
    
    api.post('/login',function(req,res){
        User.findOne({
            email:req.body.email
        }).select('name email password').exec(function(err,user){
            if(err) throw err;
            if(!user){
                res.send({message:"user doesnot exist"});
            } else if(user){
                var validPassword = user.comparePassword(req.body.password);
                if(!validPassword){
                    res.send({message:"invalid password"});
                }else{
                    var token = createToken(user);
                    res.json({
                        success: true,
						message: "Successfully login!",
						token: token
                    });
                }
            }
        });
    });
    api.post('/getEquipment/:id',function(req,res,next){
        console.log(req.params.id);
        Equipment.findOne({_id:req.params.id}).exec(function(err,equip){
            if(err){
                next(err);
            }
            console.log(equip);
            res.json(equip);
            
        });
    });
    
    api.use(function(req, res,next){

		console.log("welcome to our app!");

		var token = req.body.token || req.param('token') || req.headers['x-access-token'];
		//check if token exists
		if(token){
			jsonwebtoken.verify(token, secretKey, function(err,decoded){
				if(err){
					res.status(403).send({success: false, message:"failed to authenticate user"});
				}else{
					//
					req.decoded = decoded;
					next();
				}
			});
		}else{

			res.status(403).send({success:false,message:"no token provided"});
		}

	});
    
    api.route('/')
		.post(function(req,res){
        /*console.log(req.body.machine_type.name);
        console.log(req.body.machine_type.img);
        
        console.log(req.body.machine_type);
        */
			var equipment = new Equipment({
				creator: req.decoded.id,
                img: req.body.machine_type.img,
				machine_type: req.body.machine_type.name,
                manufacturer:req.body.manufacturer.name,
                model:req.body.model,
                machine_id:req.body.machine_id,
                notes:req.body.notes,
                address:req.body.address,
                machine_state:req.body.machine_state
			});

			equipment.save(function(err, newEquipment){
				if(err){
					res.send(err);
					return;
				}
				io.emit('equipment', newEquipment)
				res.json({message:"New equipment created!"});
			});
		})
		.get(function(req,res){

			Equipment.find({creator:req.decoded.id},function(err,equipments){
				if(err){
					res.send(err);
					return;
				}
				res.json(equipments);
			});

		});
    api.post('/update',function(req,res,next){
        console.log(req.body._id);
        Equipment.findById(req.body._id,function(err,equip){
            if(err){
                next(err);
            }
            
           equip.model=req.body.model,
           equip.machine_id=req.body.machine_id,
                equip.notes=req.body.notes,
                equip.address=req.body.address,
                equip.machine_state=req.body.machine_state
            console.log(equip);
            
            equip.save(function(err){
                if (err)
                    res.send(err);

                res.json({ message: 'Bear updated!' });
            })
        });
    });
    
    api.get('/me', function(req, res){
			res.json(req.decoded);
		});

	return api;
};