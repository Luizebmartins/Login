import { UserPostgres } from '../../data/user/userData'
import { UsersRepository } from '../../repositories/Implementations/UsersRepository'
import { SignInController } from './SignInController'
import { SignInUseCase } from './SignInUseCase'

const usersRepository = new UsersRepository(new UserPostgres())
const signUpUseCase = new SignInUseCase(usersRepository)
const signInController = new SignInController(signUpUseCase)

export {signUpUseCase, signInController}
