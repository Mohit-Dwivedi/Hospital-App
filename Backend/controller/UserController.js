import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/erroemiddleware.js";
import {User} from '../models/userSchema.js'
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary"
 
export const patientRegister = catchAsyncError(async (req, res, next) => { 
  const { firstName, lastName, email, phone, gender, password, nic, dob} = req.body;

  // Check if all required fields are provided
  if (!firstName || !lastName || !email || !phone || !gender || !password || !nic || !dob) {
    return next(new ErrorHandler("Please fill out the entire form", 400));
  }

  // Check if user already exists 
  let check = await User.findOne({ email });
  if (check) {
    return next(new ErrorHandler("User already registered", 400));
  }
  // Create new user
 const user = await User.create({  firstName, lastName, email, phone, gender, password, nic, dob, role:"Patient" });

  // Generate token for the new user and send response 
  generateToken(user, "User registered successfully!", 200, res);
});

export const login = catchAsyncError(async(req,res,next) => {
    const {email, password, confirmPassword, role} = req.body
    if(!email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("Please Provide all detail!", 400))
    }
    if(password !== confirmPassword){
        return next(new ErrorHandler("Password And ConfirmPassword Do Not Matched!", 400))
    }
    const user = await User.findOne({email}) 
    if(!user){
        return next(new ErrorHandler("Invalid Password or Email!", 400))
    }
    // const isPasswordMatched = await user.comparePassword(password)
    // if(!isPasswordMatched){
    //     return next(new ErrorHandler("Invalid Password or Email", 400))
    // }
    if(role !== user.role){
        return next(new ErrorHandler("User With This Role Not Found!", 400))
    }
    generateToken(user, "user login!", 200, res)
})
 
export const addNewAdmin = catchAsyncError(async(req,res,next) => { 
    const {firstName, lastName, email, phone, gender, password, nic, dob} = req.body 
    if(!firstName || !lastName || !email || !phone || !gender || !password || !nic || !dob){
        return next(new ErrorHandler("Please fill full form!", 400))
    }  
    const isRegistered = await User.findOne({email}) 
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} with this email already exists!`))
    }  
    const admin = await User.create({firstName, lastName, email, phone, gender, password, nic, dob, role: "Admin"})  
    generateToken(admin, "New Admin Registered!", 200, res) 
})

export const getDoctor = catchAsyncError(async(req,res,next) => {
    const doctor = await User.find({role: "Doctor"})
    res.status(200).json({
        success: true,
        doctor
    })
}) 

export const getUserDetails = catchAsyncError(async(req,res,next) => {
    const user = req.user
    res.status(200).json({
        success:true,
        user,
    })
})

export const LogOutAdmin = catchAsyncError(async(req,res,next) => {
    res.status(200).cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Admin Loged Out!"
    })
})

export const LogOutPatient = catchAsyncError(async(req,res,next) => {
    res.status(200).cookie("patientToken", "", { 
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Patient Loged Out!"
    })
})

export const addNewDoctor = catchAsyncError(async (req, res, next) => {  
    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new ErrorHandler("Doctor Avatar Required!", 400));
    } 
    const { docAvtar } = req.files;
    // const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    // if (!allowedFormats.includes(docAvatar.mimetype)) {
    //   return next(new ErrorHandler("File Format Not Supported!", 400));
    // }
    const {
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password,
      doctorDepartment,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !nic ||
      !dob ||
      !gender ||
      !password ||
      !doctorDepartment ||
      !docAvtar
    ) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    } 
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return next(
        new ErrorHandler("Doctor With This Email Already Exists!", 400)
      );
    } 
    const cloudinaryResponse = await cloudinary.uploader.upload(
      docAvtar.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary Error:",
        cloudinaryResponse.error || "Unknown Cloudinary error"
      );
      return next(
        new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
      );
    } 
    const doctor = await User.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password,
      role: "Doctor",
      doctorDepartment,
      docAvtar: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });
    res.status(200).json({
      success: true,
      message: "New Doctor Registered",
      doctor,
    });
  });