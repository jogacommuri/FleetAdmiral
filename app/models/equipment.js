var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var EquipmentSchema = new Schema({
    creator: {
		type: Schema.Types.ObjectId, 
		ref:'User'
	},
    machine_type:{
        type:Object,
        required:true
    },
    img:{
        type:String,
        
    },
    manufacturer:{
        type:String,
    },
    model:{
        type:String,
    },
    machine_id:{
        type:String,
        required:true
    },
    notes:{
        type:String,
    },
    address:{
        type:String,
    },
    machine_state:{
        type:String,  
    },
    created: {
		type: Date,
		default: Date
	}
});

module.exports =mongoose.model('Equipment',EquipmentSchema);