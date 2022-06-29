import mongoose from "mongoose";

const UserSchema=mongoose.Schema(
    {
        username:{
            type:String,
           
        },
        password:{
            type:String,
           
        },
        email:{
          type:String,
         
        },
        phone:{
          type:String,
         
        },
        isAdmin:{
            type:Boolean,
            default:false

        },
        privacyPolicy:{
            type:Boolean,
            default:false
        }
        
    },
    {timestamps:true}
)

const UserModel=mongoose.model("Users",UserSchema);

export default UserModel;