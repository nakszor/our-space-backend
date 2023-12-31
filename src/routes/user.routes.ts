import { Router } from 'express'
import { createUserController, deleteUserController, listUsersController, retrieveUserController, updateUserController } from '../controllers/user.controllers'
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware'
import { createUserSchema, userUpdateSchema } from '../schemas/user.schemas'
import verifyUserAlreadyExists from '../middlewares/verifyEmailIsValidMiddleware'
import verifyTokenIsValidMiddleware from '../middlewares/verifyTokenIsValidMiddleware'
import { verifyUserPermissionMiddleware } from '../middlewares/verifyUserPermissionMiddleware'


const userRouter = Router()

userRouter.post('',  validateSchemaMiddleware(createUserSchema),verifyUserAlreadyExists,createUserController)
userRouter.get('/:id',  verifyTokenIsValidMiddleware, verifyUserPermissionMiddleware,retrieveUserController)
userRouter.patch('/:id', verifyTokenIsValidMiddleware,verifyUserPermissionMiddleware,validateSchemaMiddleware(userUpdateSchema),verifyUserAlreadyExists,updateUserController)
userRouter.delete('/:id', verifyTokenIsValidMiddleware,verifyUserPermissionMiddleware,deleteUserController)
userRouter.get('', verifyTokenIsValidMiddleware,listUsersController)

export default userRouter