# Docker Deployment Guide 🐳

Complete guide to deploy Stremify using Docker and Docker Compose.

---

## 📋 Prerequisites

- Docker 20.10+ installed
- Docker Compose 2.0+ installed
- 4GB+ RAM available
- 10GB+ disk space

### Install Docker

**Windows/Mac**: Download [Docker Desktop](https://www.docker.com/products/docker-desktop/)

**Linux**:
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

---

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/Dhruv-Mali/Streming_Max.git
cd Streming_Max
```

### 2. Configure Environment
```bash
# Copy environment template
cp .env.docker .env

# Edit .env with your values
nano .env  # or use any text editor
```

### 3. Start All Services
```bash
docker-compose up -d
```

This will start:
- **MongoDB** on port 27017
- **Backend API** on port 3001
- **Frontend** on port 3000

### 4. Access Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **MongoDB**: mongodb://localhost:27017

---

## 🛠️ Docker Commands

### Start Services
```bash
# Start all services
docker-compose up -d

# Start specific service
docker-compose up -d frontend
docker-compose up -d backend
docker-compose up -d mongodb
```

### Stop Services
```bash
# Stop all services
docker-compose down

# Stop and remove volumes (deletes data)
docker-compose down -v
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f mongodb
```

### Restart Services
```bash
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart backend
```

### Rebuild Images
```bash
# Rebuild all images
docker-compose build

# Rebuild specific service
docker-compose build frontend

# Rebuild and start
docker-compose up -d --build
```

### Check Status
```bash
# View running containers
docker-compose ps

# View resource usage
docker stats
```

---

## 🔧 Configuration

### Environment Variables

Edit `.env` file in project root:

```env
# JWT Secret (REQUIRED)
JWT_SECRET=your_strong_random_secret_key_here

# AWS SES (Optional - for emails)
AWS_SES_USER_ACCESS_KEY=AKIA...
AWS_SES_USER_SECRET_ACCESS_KEY=wJal...
AWS_SES_REGION=us-east-1
SENDER_EMAIL=noreply@yourdomain.com

# AWS S3 (Optional - for file storage)
USE_S3=false
AWS_S3_ACCESS_KEY=AKIA...
AWS_S3_SECRET_KEY=wJal...
AWS_S3_REGION=us-east-1
AWS_S3_BUCKET=stremify-uploads
```

### Port Configuration

To change ports, edit `docker-compose.yml`:

```yaml
services:
  frontend:
    ports:
      - "8080:3000"  # Change 8080 to your desired port
  
  backend:
    ports:
      - "8081:3001"  # Change 8081 to your desired port
```

---

## 📦 Individual Service Deployment

### Frontend Only
```bash
cd Frontend
docker build -t stremify-frontend .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://localhost:3001 stremify-frontend
```

### Backend Only
```bash
cd video_straming_system-main
docker build -t stremify-backend .
docker run -p 3001:3001 \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/stream_db \
  -e JWT_SECRET=your_secret \
  stremify-backend
```

---

## 🔍 Troubleshooting

### Port Already in Use
```bash
# Find process using port
# Windows
netstat -ano | findstr :3000

# Linux/Mac
lsof -i :3000

# Kill process or change port in docker-compose.yml
```

### Container Won't Start
```bash
# Check logs
docker-compose logs backend

# Check container status
docker-compose ps

# Restart container
docker-compose restart backend
```

### MongoDB Connection Failed
```bash
# Check MongoDB is running
docker-compose ps mongodb

# Check MongoDB logs
docker-compose logs mongodb

# Restart MongoDB
docker-compose restart mongodb
```

### Frontend Build Fails
```bash
# Clear build cache
docker-compose build --no-cache frontend

# Check Node.js version
docker run --rm node:18-alpine node --version
```

### Permission Denied (Linux)
```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Logout and login again
```

---

## 🗄️ Data Persistence

### MongoDB Data
Data is stored in Docker volume `mongodb_data`:

```bash
# Backup MongoDB
docker exec stremify-mongodb mongodump --out /backup
docker cp stremify-mongodb:/backup ./mongodb-backup

# Restore MongoDB
docker cp ./mongodb-backup stremify-mongodb:/backup
docker exec stremify-mongodb mongorestore /backup
```

### Uploaded Files
Files are stored in `video_straming_system-main/uploads/`:

```bash
# Backup uploads
tar -czf uploads-backup.tar.gz video_straming_system-main/uploads/

# Restore uploads
tar -xzf uploads-backup.tar.gz
```

---

## 🚀 Production Deployment

### 1. Use Production Environment
```bash
# Create production .env
cp .env.docker .env.production

# Edit with production values
nano .env.production
```

### 2. Enable HTTPS
Use Nginx reverse proxy with SSL:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com;

    ssl_certificate /etc/ssl/certs/cert.pem;
    ssl_certificate_key /etc/ssl/private/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 3. Security Checklist
- [ ] Change default JWT_SECRET
- [ ] Use strong passwords
- [ ] Enable firewall
- [ ] Use HTTPS only
- [ ] Regular backups
- [ ] Update Docker images regularly

---

## 📊 Monitoring

### Resource Usage
```bash
# Real-time stats
docker stats

# Container health
docker-compose ps
```

### Logs
```bash
# Follow logs
docker-compose logs -f --tail=100

# Export logs
docker-compose logs > logs.txt
```

---

## 🔄 Updates

### Update Application
```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

### Update Docker Images
```bash
# Pull latest base images
docker-compose pull

# Rebuild
docker-compose up -d --build
```

---

## 🧹 Cleanup

### Remove Containers
```bash
# Stop and remove containers
docker-compose down

# Remove containers and volumes
docker-compose down -v
```

### Remove Images
```bash
# Remove project images
docker rmi stremify-frontend stremify-backend

# Remove unused images
docker image prune -a
```

### Full Cleanup
```bash
# Remove everything (careful!)
docker-compose down -v
docker system prune -a --volumes
```

---

## 💡 Tips

1. **Development**: Use `docker-compose up` (without `-d`) to see logs in real-time
2. **Production**: Always use `-d` flag to run in background
3. **Debugging**: Use `docker exec -it stremify-backend sh` to access container shell
4. **Performance**: Allocate at least 4GB RAM to Docker Desktop
5. **Backups**: Schedule regular backups of MongoDB and uploads

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Docker Guide](https://nextjs.org/docs/deployment#docker-image)
- [Node.js Docker Best Practices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)

---

## 🆘 Need Help?

- Check logs: `docker-compose logs -f`
- Restart services: `docker-compose restart`
- Rebuild: `docker-compose up -d --build`
- Full reset: `docker-compose down -v && docker-compose up -d`

---

**Happy Dockerizing! 🐳**
