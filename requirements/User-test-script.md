# User Functional Requirement Test Script

# Update
## Controller
- should return 400 if no data is provided
- should return 400 if no password is provided
- should return 400 if password not match
- should return 401 if authorization token is missing
- should return 403 if user does not have permission
- should return 200 if user is updated
- should return true if user is updated