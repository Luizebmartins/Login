import { SignUpController } from './SignUpController'
import { SignUpUseCase } from './SignUpUseCase'
import { UsersRepository } from '../../repositories/Implementations/UsersRepository'
import { UsersFirebase } from '../../infra/firebase/methods/UsersFirebase'
import { firebaseAdmin } from '../../infra/firebase/connection/firebase'
import { StringValidator } from '../utils/helpers/string-validation-helper'

const usersRef = firebaseAdmin.firestore().collection('users');
const usersFirebase = new UsersFirebase(usersRef)


const usersRepository = new UsersRepository(usersFirebase)

const signUpUseCase = new SignUpUseCase(usersRepository)
const stringValidator = new StringValidator()

const signUpController = new SignUpController(stringValidator, signUpUseCase)

export {signUpController, signUpUseCase}