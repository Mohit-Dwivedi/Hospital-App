import express from "express"
import { deletAppointment, getAllAppointment, postAppointment, updateAppointmentStatus } from "../controller/appointmentController.js"
import { isAdminAuthentication, isPatientAuthentication } from "../middleware/auth.js"

const router = express.Router()

router.post('/post', isPatientAuthentication, postAppointment)
router.get('/getall', isAdminAuthentication, getAllAppointment)
router.put('/update/:id', isAdminAuthentication, updateAppointmentStatus)
router.delete('/delete/:id', isAdminAuthentication, deletAppointment)

export default router 