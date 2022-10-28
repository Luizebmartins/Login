# Sign-in Test Script

## Controller
- should return 400 if no email is provided
- should return 400 if no password is provided
- should return 500 if SignInUseCase generate an error
- should return 200 if successful login
## Use case
- should return an error if the user does not exist
- should return an error if password is incorrect
