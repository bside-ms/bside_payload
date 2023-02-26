# Payload CMS

## Current Development Workflow
- First install dependencies with `npm install`. 
- Then add `mongodb://localhost:27017/payload` as `MONGODB_URI` to your `.env` file. 
- And run `docker compose up -d payload_mongo` to start the mongoDB instance.
- When database container is running, start the CMS `npm run dev`.
- The cms is available under http://localhost:3000.

## Notes for Production Deployment

### Permissions  
The `media`-Folder needs the following permissions: `1001:1001`.

### Image  
The `docker-compose.yml` needs to be changed to include the actual image.

### Database  
The mongoDB instance is not required to build this image.  
However, this image must be deployed and referenced in the `.env`-file of the NextJS project.
Otherwise, its build will fail.
