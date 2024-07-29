import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/erroemiddleware.js";
import {Appointment} from "../models/appointmentSchema.js"
import {User} from "../models/userSchema.js"

export const postAppointment = catchAsyncError(async(req,res,next) => {
    console.log(req.body)
    const {firstName, lastName, email, phone, gender, nic, dob, Department, appointment_date, doctor_firstName, doctor_lastName, hasVisited, address} = req.body

    if(!firstName || !lastName || !email || !phone || !gender || !nic || !dob || !Department || !appointment_date || !doctor_firstName || !doctor_lastName || !address){
        return next(new ErrorHandler("Please Provide Fill Full Form!", 400))
    }
 
    const isConflict = await User.find({
        firstName: doctor_firstName, 
        lastName: doctor_lastName,
        role: "Doctor",
        doctorDepartment: Department
    })

    if(isConflict.length === 0){
        return next(new ErrorHandler("Doctor Not Found!", 404))
    }

    if(isConflict.length > 1){
        return next(new ErrorHandler("Doctors Conflict PLease Contact Though Email or Phone!", 404))
    }

     const doctorId = isConflict[0]._id
     const patientId = req.user._id
     const appointment = await Appointment.create({firstName, lastName, email, phone, gender, nic, dob, Department, doctor:{firstName: doctor_firstName, lastName: doctor_lastName} , appointment_date, hasVisited, address, doctorId, patientId})

     res.status(200).json({
        success: true,
        message: "Appointment Send Successfully!",
        appointment
     })
})

export const getAllAppointment = catchAsyncError(async(req,res,next) => {
    const appointments = await Appointment.find({})
    res.status(200).json({
        success: true,
        appointments
    })
})

export const updateAppointmentStatus = catchAsyncError(async(req,res,next) => {
    const {id} = req.params
    let appointment = await Appointment.findById(id)
    if(!appointment){
        return next(new ErrorHandler("Appointment Not Found", 404))
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidator: true,
        useFindAndModify: false
    }) 
    res.status(200).json({
        success: true,
        message: "Appointment Status Updated",
        appointment
    })
})

export const deletAppointment = catchAsyncError(async(req,res,next) => {
    const {id} = req.params
    let appointment = await Appointment.findById(id)
    if(!appointment){
        return next(new ErrorHandler("Appointment Not Found!"), 404)
    }
    await appointment.findByIdAndDelete(id)
    res.status(200).josn({
        success: true,
        message: "Appointment has been deleted",
    })
})