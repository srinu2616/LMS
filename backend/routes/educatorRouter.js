import express from 'express'

import { updateRoleToEducator } from '../controllers/educatorController.js';

const educatorRouter=express.Router()

//Add Educator ROle

educatorRouter.get('/update-role',updateRoleToEducator)

export default educatorRouter;

