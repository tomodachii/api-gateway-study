# Simple API Gateway Demo

Simple homemade API Gateway demo using NGINX

### Components
- Auth service
- Post service
- User service
- API Gateway

### Request Handling
- All incoming requests first hit the API Gateway (NGINX) because it's acting as a reverse proxy for backend services.
- API Gateway check if the requested API endpoint requires authentication.
- If authentication required, the request is then routed to the Auth service for authentication.
NGINX forwards the request to the Auth service.
- If authentication is successful, the Auth service responds with an authentication token or a session ID, after that the request will be routed to the corresponding service 
- Else if the authentication failed, Auth service will respond with an authentication failure message.