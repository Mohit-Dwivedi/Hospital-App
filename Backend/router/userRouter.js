import express from 'express'
import { LogOutAdmin, LogOutPatient, addNewAdmin, addNewDoctor, getDoctor, getUserDetails, login, patientRegister } from '../controller/UserController.js'
import { isAdminAuthentication, isPatientAuthentication } from '../middleware/auth.js'
const router = express.Router()
// import multer from 'multer'

// // image storage engine
// const storage = multer.diskStorage({
//     destination:"uploads",
//     filename:(req,file,cb)=>{
//         return cb(null, `${Date.now()}${file.originalname}`)
//     }
// }) 

// const upload = multer({storage: storage})


router.post('/patient/register', patientRegister)
router.post('/login', login)
router.post('/admin/addnew', addNewAdmin) 
router.post('/doctor/addNew', isAdminAuthentication , addNewDoctor)
router.get('/doctors', getDoctor) 
router.get('/patient/me', isPatientAuthentication, getUserDetails)
router.get('/admin/me', isAdminAuthentication, getUserDetails)
router.get('/patient/logout', isPatientAuthentication, LogOutPatient)
router.get('/admin/logout', isAdminAuthentication, LogOutAdmin)

export default router 