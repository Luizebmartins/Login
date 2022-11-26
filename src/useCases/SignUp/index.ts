import { SignUpController } from './SignUpController'
import { SignUpUseCase } from './SignUpUseCase'
import { UsersRepository } from '../../repositories/Implementations/UsersRepository'
import { UserPostgres } from '../../data/user/userData'
import { StringValidator } from '../utils/helpers/string-validation-helper'

const usersRepository = new UsersRepository(new UserPostgres())
const stringValidator = new StringValidator()

const signUpUseCase = new SignUpUseCase(usersRepository)
const signUpController = new SignUpController(stringValidator, signUpUseCase)

export {signUpController, signUpUseCase}