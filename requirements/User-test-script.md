# User Functional Requirement Test Script

# Update
## Controller
- should return 400 and error if no data is provided
- should return 400 and error if no password is provided
- should return 401 and error if authorization token is missing
- should return 403 and error if user does not have permission
- should return true and status 300 if user is updated