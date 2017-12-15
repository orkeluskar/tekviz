# Welcome

## Getting Started
1. Clone the repo
2. Application structure
   ```
   - /
     - configs/
       - db.js
       - private_key.pem
       - public.key.pem
     - controllers/
       - auth/
         - verifyToken.js
         - login.js
       - user/
         - profile.js 
     - routes/
       - user.js
       - auth.js
     - .env
     - index.js
     - package.json
     - node_modules/
   ```


## To-do

[x] - Remove Null in profile view 
[] - Upload profile Image
[x] - Gender radio button clickability (?)
[x] - Update profile
[] - Admin panel, file upload changes
[x] - Sort Discussion by time
[] - Architecture Diagram
[] - PPT
[] - Remove delete from client portal
[] - profile in client side (kinda same as architect's)


## PPT topics
1. Overview
   - Why?
   - Current system inefficiency
   - System overview (summarize?)
2. Arch diagram
3. System flow diagram
   - link between entities (Admin - Architect - Client)
   - brief overview about the entities
4. TechStack
   - Reason behind selecting NodeJS/ReactJS etc.
   - Pros/Cons maybe?
5. Results
   - Better UI/UX (user experience through Material-ui/react)
   - Rest Arch & React Components aids future extendability to mobile/native Apps