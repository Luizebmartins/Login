# Sign-in Test Script

## Controller
- should return 400 if no name is provided
- should return 400 if no email is provided
- should return 400 if no valid email is provided
- should return 400 if no password is provided
- should return 400 if no confirmPassword is provided
- should return 400 if password and confirmation password do not match
- should return 500 if SignUpUseCase generate an error

## Use Case
- should return an error if user already exist
- should return a success message if the user is created