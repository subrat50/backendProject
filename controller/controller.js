const contactModel=require("../model/model.js")
const validator=require("validator")

//  __________________________________-----validation ----------__________________________________________
const isValid = function (value) {   
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;

}
let validName = /^[a-zA-Z ]{3,30}$/
// ------------------------------------------------ create contact API-----------------------------------

exports.createContact= async function (req,res){
     data= req.body
     if (Object.keys(req.body) === 0) {
        return res.status(400).send({ status: false, message: "Kindly enter all attribute key value pair " })
    }
    let  {first_name,last_name,email,mobile_number}=data
if(!isValid(first_name)){
    return res.status(400).send({ status: false, message: "Kindly enter first name in req body" })
}
if(!validName.test(first_name)){
    return res.status(400).send({ status: false, message: "Kindly enter first name invalid format and it should only conatin alphabets" })
}
if(!isValid(last_name)){
    return res.status(400).send({ status: false, message: "Kindly enter last name in req body" })
}
if(!validName.test(last_name)){
    return res.status(400).send({ status: false, message: "Kindly enter last name invalid format and it should only conatin alphabets" })
}

if (!isValid(email)) {
    res.status(400).send({ status: false, msg: " email is required" });
    return
}
if (!validator.isEmail(email)) {
    return res.status(400).send({ status: false, msg: "Enter a valid email" })
}
let uniqueEmail = await contactModel.findOne({ email: email });
if (uniqueEmail) {
    return res.status(400).send({ status: false, msg: "email  already Used" })
}


if (!isValid(mobile_number)) {
    return  res.status(400).send({ status: false, msg: "mobile_number is required" });
    
}
if (!/^[6-9]\d{9}$/.test(mobile_number)) {
    res.status(400).send({ status: false, message: "Please provide valid  indian mobile number" });
    return;
}


let uniqueMobile = await contactModel.findOne({ mobile_number: mobile_number });
if (uniqueMobile) {
    return res.status(400).send({ status: false, msg: "mobile no. already Used" })
}
     const contactCreated= await contactModel.create(data)
      return res.status(201).send({status:true,message:"succesfully created",data:contactCreated})
}


// -------------------------------------------------- get Api-------------------------------------------------


exports.getContact= async function (req,res){

    contactId=req.params.contactId
  
    if (!contactId) return res.status(400).send({ Status: "false", msg: "contactId Is Needed" })

    if (!validator.isMongoId(contactId)) {
        return res.status(400).send({ status: false, message: "Invalid contactId" })
    }


    const conatactData=await contactModel.findOne({_id:contactId,isDeleted:false})
    if(!conatactData){
        return res.status(404).send({ status: false, message: " contact data not found or data is deleted" })
    }

    return res.status(200).send({status:true,message:"success",data:conatactData})
}



// -----------------------------------------  update APi-------------------------------------------
exports.updateContact=async function(req,res){
    contactId=req.params.contactId
    data=req.body


    
    if (!contactId) {
        return res.status(400).send({ status: false, message: "contactId is not provided." })
    }
    if (!validator.isMongoId(contactId)) {
        return res.status(400).send({ status: false, message: "Invalid contactId" })
    }
    const deleteOfId = await contactModel.findById(contactId)
    if (!deleteOfId) {
        return res.status(400).send({ status: false, message: "contact not found" })
    }
    if (deleteOfId.isDeleted == true) {
        return res.status(404).send({ status: false, message: "contact is already deleted." })
    }

  
  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({ status: false, message: "No details provided. So nothing to update." })
}
let  {first_name,last_name,email,mobile_number} = data


if(first_name){


    if (first_name== "") {
        return res.status(400).send({ status: false, message: "first_name should not be empty" })
    }
    if(!validName.test(first_name)){
        return res.status(400).send({ status: false, message: "Kindly enter first name invalid format and it should only conatin alphabets" })
       }

    }
if(last_name){

    if (last_name== "") {
        return res.status(400).send({ status: false, message: "last_name should not be empty" })
    }
    if(!validName.test(last_name)){
        return res.status(400).send({ status: false, message: "Kindly enter last_name invalid format and it should only conatin alphabets" })
       }
   
    }


if(email){

    
    if (email=="") {
        return res.status(400).send({ status: false, msg: "please enter email as a value" });
       
    }
    if (!validator.isEmail(email)) {
        return res.status(400).send({ status: false, msg: "Enter a valid email" })
    }
    let uniqueEmail = await contactModel.findOne({ email: email });
    if (uniqueEmail) {
        return res.status(400).send({ status: false, msg: "email to update is already there." })
    }
}

if (mobile_number == "") {
    return res.status(400).send({ status: false, message: "please   enter mobile_number" })
  }
  if (mobile_number) {
    if (!mobile_number.match(/^[6789][0-9]{9}$/)) {
      return res.status(400).send({ status: false, message: "please enter indian phone number" })
    }
 
  }
  
  const updatedData=await contactModel.findOneAndUpdate({_id:contactId,isDeleted:false},{first_name:first_name,last_name:last_name,email:email,mobile_number:mobile_number},{new:true}) 
  
  return res.status(200).send({status:true,message:"success",data:updatedData})
  }

  
  
  // -----------------------------------------  delete API ----------------------------------
  
  
  exports.deleteContact= async function(req,res){
      contactId=req.params.contactId
      
      if (!(contactId)) {
          return res.status(400).send({ status: false, msg: "please enter contact id" })
      }
      if (!validator.isMongoId(contactId)) {
          return res.status(400).send({ status: false, msg: " contact id is not valid" })
      }
      let contact = await contactModel.findById(contactId);
      if (!contact) return res.status(404).send({ status: false, msg: "  contact not found" })
  
  
      if (contact.isDeleted === true) {
          return res.status(404).send({ status: false, msg: "contact is already deleted" })
      }
      const deleted=await contactModel.findOneAndUpdate({_id:contactId},{ $set: {
          isDeleted: true, deletedAt: Date()
      }},{new:true})
  
      return res.status(200).send({status:true,message:"successfully deleted",data:deleted})
  }