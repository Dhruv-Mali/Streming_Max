# Production Deployment Checklist

## Pre-Deployment

### Security
- [ ] Change JWT_SECRET to a strong random string (min 32 characters)
- [ ] Update MongoDB credentials (if using managed service)
- [ ] Remove or secure AWS SES credentials
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure firewall rules
- [ ] Set NODE_ENV=production

### Environment Variables

#### Backend
- [ ] Update MONGODB_URI to production database
- [ ] Set strong JWT_SECRET
- [ ] Configure FRONTEND_URL to production domain
- [ ] Set up AWS SES credentials (for email)
- [ ] Verify PORT configuration

#### Frontend
- [ ] Update NEXT_PUBLIC_API_URL to production API URL
- [ ] Verify all environment variables are set

### Database
- [ ] Backup existing data
- [ ] Create production database
- [ ] Set up database indexes
- [ ] Configure database backups
- [ ] Test database connection

### Infrastructure
- [ ] Set up reverse proxy (Nginx/Apache)
- [ ] Configure SSL/TLS certificates (Let's Encrypt)
- [ ] Set up CDN for static assets (optional)
- [ ] Configure file storage (S3/CloudFlare R2 for uploads)
- [ ] Set up monitoring (PM2, New Relic, DataDog)
- [ ] Configure logging (Winston, Morgan)

## Deployment Steps

### Option 1: Docker Deployment
```bash
# 1. Update .env file with production values
# 2. Build and start containers
docker-compose up -d --build

# 3. Check logs
docker-compose logs -f

# 4. Verify services are running
docker-compose ps
```

### Option 2: Manual Deployment

#### Backend
```bash
cd video_straming_system-main
npm install --production
npm start
# Or use PM2: pm2 start src/index.js --name stremify-api
```

#### Frontend
```bash
cd stremify-FE-main
npm install
npm run build
npm start
# Or use PM2: pm2 start npm --name stremify-frontend -- start
```

### Option 3: Cloud Deployment

#### AWS
- [ ] Deploy backend to EC2/ECS/Elastic Beanstalk
- [ ] Deploy frontend to Amplify/Vercel/EC2
- [ ] Use RDS for MongoDB (DocumentDB)
- [ ] Use S3 for file uploads
- [ ] Configure CloudFront CDN

#### DigitalOcean
- [ ] Deploy to Droplet or App Platform
- [ ] Use Managed MongoDB
- [ ] Configure Spaces for file storage

#### Vercel + Railway
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Railway
- [ ] Use Railway MongoDB or Atlas

## Post-Deployment

### Testing
- [ ] Test user registration
- [ ] Test user login/logout
- [ ] Test movie CRUD operations
- [ ] Test file uploads
- [ ] Test subscription management
- [ ] Load testing
- [ ] Security testing

### Monitoring
- [ ] Set up uptime monitoring
- [ ] Configure error tracking (Sentry)
- [ ] Set up performance monitoring
- [ ] Configure log aggregation
- [ ] Set up alerts

### Backup
- [ ] Verify database backups
- [ ] Backup uploaded files
- [ ] Document recovery procedures

### Documentation
- [ ] Update API documentation
- [ ] Document deployment process
- [ ] Create runbook for common issues
- [ ] Update README with production URLs

## Performance Optimization

- [ ] Enable gzip compression
- [ ] Configure caching headers
- [ ] Optimize images
- [ ] Enable CDN
- [ ] Database query optimization
- [ ] Implement rate limiting
- [ ] Add Redis for session storage (optional)

## Security Hardening

- [ ] Enable CORS properly
- [ ] Implement rate limiting
- [ ] Add helmet.js for security headers
- [ ] Sanitize user inputs
- [ ] Implement CSRF protection
- [ ] Regular security audits
- [ ] Keep dependencies updated

## Scaling Considerations

- [ ] Horizontal scaling strategy
- [ ] Load balancer configuration
- [ ] Database replication
- [ ] Caching strategy (Redis)
- [ ] CDN for static assets
- [ ] Microservices architecture (future)

## Maintenance

- [ ] Schedule regular backups
- [ ] Monitor disk space
- [ ] Update dependencies regularly
- [ ] Review logs periodically
- [ ] Performance optimization
- [ ] Security patches

## Rollback Plan

- [ ] Document rollback procedure
- [ ] Keep previous version accessible
- [ ] Database migration rollback plan
- [ ] Test rollback process
