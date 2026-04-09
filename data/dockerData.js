// ─────────────────────────────────────────────────────────────────────────────
// dockerData.js
//
// Central data file for all Docker Practice pages.
// ➜ To add a new CONCEPT:  push an entry into `dockerConcepts`.
// ➜ To add a new EXERCISE: push an entry into `dockerExercises`.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Concept Cards (shown on /docker-practice/concepts) ──────────────────────
// Each object supports:
//   id           {number}  – unique, used as React key
//   level        {string}  – "Beginner" | "Intermediate" | "Advanced"
//   icon         {string}  – lucide-react icon name (string key used by ConceptIcon resolver)
//   title        {string}  – card heading
//   summary      {string}  – 1-2 sentence overview
//   topics       {string[]}– bullet list of sub-topics
// ─────────────────────────────────────────────────────────────────────────────
export const dockerConcepts = [
  // ── 1 · Images & Containers ─────────────────────────────────────────────────
  {
    "id": 1,
    "level": "Beginner",
    "icon": "Container",
    "title": "Images & Containers",
    "summary": "Understand the difference between Docker images (read-only templates) and containers (running instances). Learn `docker pull`, `docker run`, `docker ps`, and `docker stop`.",
    "topics": [
      "What is a Docker image?",
      "Running & stopping containers",
      "Port mapping with -p flag",
      "Detached mode (-d)",
      "Viewing logs with docker logs",
    ],
  },
  {
    id: 2,
    level: "Beginner",
    icon: "Layers",
    title: "Writing Dockerfiles",
    summary:
      "Master Dockerfile instructions: FROM, RUN, COPY, ADD, WORKDIR, ENV, EXPOSE, CMD and ENTRYPOINT. Understand layer caching and build context.",
    topics: [
      "FROM, RUN, COPY, ADD",
      "WORKDIR & ENV",
      "CMD vs ENTRYPOINT",
      "Layer caching strategy",
      "docker build & tagging",
    ],
  },
  {
    id: 3,
    level: "Intermediate",
    icon: "HardDrive",
    title: "Volumes & Bind Mounts",
    summary:
      "Persist data beyond container lifecycles with named volumes and bind mounts. Understand when to use each and how to manage them with the Docker CLI.",
    topics: [
      "Named volumes vs bind mounts",
      "docker volume create/inspect/rm",
      "Mounting with -v and --mount",
      "Read-only mounts",
      "Volume drivers",
      "Volume backup & restore",
      "tmpfs mounts",
      "Volume permissions & ownership",
      "Volume pruning & cleanup",
      "Volume sharing between containers"
    ],
    "exercises": [
      {
        "id": 1,
        "title": "Persistent PostgreSQL with Named Volumes",
        "difficulty": "Intermediate",
        "fileType": "docker-run",
        "description": "Create and manage a PostgreSQL database with named volumes for persistence. Implement backup, restore, and migration strategies. Demonstrate data persistence across container removal and volume inspection.",
        "hints": [
          "Create a named volume before running the container",
          "Use `--mount` with volume for better readability",
          "Set environment variables for database configuration",
          "Test persistence by creating data, removing container, and creating new container with same volume",
          "Demonstrate volume backup and restore using temporary containers"
        ],
        "solution": "# Create named volume\ndocker volume create postgres_data\n\n# Run PostgreSQL with named volume\ndocker run -d \\\n  --name postgres-db \\\n  -e POSTGRES_DB=appdb \\\n  -e POSTGRES_USER=appuser \\\n  -e POSTGRES_PASSWORD=secretpass \\\n  -e POSTGRES_INITDB_ARGS=\"--data-checksums\" \\\n  -p 5432:5432 \\\n  --mount source=postgres_data,target=/var/lib/postgresql/data \\\n  postgres:15\n\n# Verify volume is mounted\ndocker inspect postgres-db | grep -A 10 Mounts\n\n# Create test data\ndocker exec -it postgres-db psql -U appuser -d appdb -c \"CREATE TABLE test (id SERIAL, name VARCHAR(100));\"\ndocker exec -it postgres-db psql -U appuser -d appdb -c \"INSERT INTO test (name) VALUES ('test-data');\"\n\n# Backup the database\ndocker exec postgres-db pg_dump -U appuser appdb > backup.sql\n\n# Remove container (data persists in volume)\ndocker stop postgres-db\ndocker rm postgres-db\n\n# Create new container with same volume\ndocker run -d \\\n  --name postgres-db-new \\\n  -e POSTGRES_DB=appdb \\\n  -e POSTGRES_USER=appuser \\\n  -e POSTGRES_PASSWORD=secretpass \\\n  --mount source=postgres_data,target=/var/lib/postgresql/data \\\n  postgres:15\n\n# Verify data persists\ndocker exec postgres-db-new psql -U appuser -d appdb -c \"SELECT * FROM test;\"\n\n# Volume inspection\ndocker volume inspect postgres_data\ndocker volume ls\n\n# Backup volume data\ndocker run --rm \\\n  --mount source=postgres_data,target=/data \\\n  -v $(pwd):/backup \\\n  alpine tar czf /backup/postgres_backup.tar.gz -C /data .\n\n# Restore volume data\ndocker run --rm \\\n  --mount source=postgres_data,target=/data \\\n  -v $(pwd):/backup \\\n  alpine tar xzf /backup/postgres_backup.tar.gz -C /data\n\n# Clean up\ndocker stop postgres-db-new\ndocker rm postgres-db-new\ndocker volume rm postgres_data",
        "tags": ["volumes", "named-volumes", "postgres", "persistence", "backup", "restore"],
        "interview_questions": [
          "What's the difference between named volumes and anonymous volumes?",
          "How do you backup and restore Docker volumes?",
          "What happens to data when you remove a container with a named volume?",
          "How do you share volumes between containers?",
          "What's the purpose of `POSTGRES_INITDB_ARGS=\"--data-checksums\"`?",
          "How would you migrate volume data between different hosts?",
          "What are volume drivers and when would you use them?"
        ],
        "commands_to_practice": [
          "docker volume create myvolume",
          "docker volume ls",
          "docker volume inspect myvolume",
          "docker run -v myvolume:/data alpine",
          "docker run --mount source=myvolume,target=/data alpine",
          "docker volume prune",
          "docker volume rm myvolume"
        ]
      },
      {
        "id": 2,
        "title": "Node.js Dev Environment with Hot-Reload",
        "difficulty": "Intermediate",
        "fileType": "docker-compose.yml",
        "description": "Create a Dockerized Node.js development environment with hot-reload using bind mounts and named volume for node_modules. Implement nodemon for auto-restart and ensure optimal performance on both macOS and Linux.",
        "hints": [
          "Use node:20-alpine as base",
          "Mount source code as bind mount for live updates",
          "Use named volume for node_modules to prevent host/container conflicts",
          "Configure nodemon to watch for file changes",
          "Handle permissions issues on different OSes"
        ],
        "solution": "# Dockerfile\nFROM node:20-alpine\n\n# Install nodemon globally\nRUN npm install -g nodemon\n\nWORKDIR /app\n\n# Copy package files\nCOPY package*.json ./\n\n# Install dependencies\nRUN npm install\n\n# Copy source (will be overridden by bind mount in development)\nCOPY . .\n\nEXPOSE 3000\n\n# Use nodemon for development\nCMD [\"nodemon\", \"--legacy-watch\", \"index.js\"]\n\n# docker-compose.yml\nversion: '3.8'\n\nservices:\n  app:\n    build: .\n    container_name: node-dev\n    ports:\n      - \"3000:3000\"\n    environment:\n      - NODE_ENV=development\n      - NODE_OPTIONS=--max-old-space-size=2048\n    volumes:\n      # Bind mount source code for hot-reload\n      - .:/app\n      # Named volume to preserve node_modules\n      - node_modules:/app/node_modules\n      # Exclude specific directories from bind mount\n      - /app/.git\n      - /app/node_modules\n    env_file:\n      - .env.development\n    networks:\n      - dev-network\n    restart: unless-stopped\n\nnetworks:\n  dev-network:\n    driver: bridge\n\nvolumes:\n  node_modules:\n\n# .dockerignore\nnode_modules\nnpm-debug.log\n.git\n.env\n.DS_Store\ncoverage\n.nyc_output\ndist\nbuild\n\n# For macOS performance, use :cached flag\n# volumes:\n#   - .:/app:cached\n#   - node_modules:/app/node_modules",
        "tags": ["bind-mounts", "volumes", "nodejs", "hot-reload", "development"],
        "interview_questions": [
          "Why use a named volume for node_modules instead of a bind mount?",
          "What are the performance implications of bind mounts on macOS vs Linux?",
          "How do you handle file permissions when using bind mounts?",
          "What's the purpose of the `:cached` flag on macOS?",
          "How would you optimize bind mount performance for large monorepos?",
          "What's the difference between `-v` and `--mount` flags?",
          "How do you debug container file system issues?"
        ],
        "commands_to_practice": [
          "docker-compose up -d",
          "docker-compose logs -f app",
          "docker-compose exec app sh",
          "docker-compose exec app ls -la /app/node_modules",
          "docker-compose down",
          "docker-compose down -v",
          "docker run -v $(pwd):/app -v node_modules:/app/node_modules node:20-alpine ls"
        ]
      },
      {
        "id": 3,
        "title": "Volume Backup & Disaster Recovery",
        "difficulty": "Advanced",
        "fileType": "shell-script",
        "description": "Create a comprehensive backup and recovery strategy for Docker volumes. Implement automated backups, point-in-time recovery, and cross-host migration using volume drivers and backup containers.",
        "hints": [
          "Use a backup container with volume mounts",
          "Implement compression and encryption for backups",
          "Create backup rotation strategy",
          "Test recovery process",
          "Use volume drivers for cloud backups"
        ],
        "solution": "#!/bin/bash\n# backup-volume.sh - Backup Docker volume to S3 or local storage\n\nVOLUME_NAME=$1\nBACKUP_PATH=${2:-./backups}\nTIMESTAMP=$(date +%Y%m%d_%H%M%S)\nBACKUP_FILE=\"${VOLUME_NAME}_${TIMESTAMP}.tar.gz\"\n\n# Function to backup volume\nbackup_volume() {\n    echo \"Backing up volume: $VOLUME_NAME\"\n    \n    # Create backup using alpine container\n    docker run --rm \\\n        --mount source=$VOLUME_NAME,target=/data \\\n        -v $BACKUP_PATH:/backup \\\n        alpine tar czf /backup/$BACKUP_FILE -C /data .\n    \n    if [ $? -eq 0 ]; then\n        echo \"Backup created: $BACKUP_PATH/$BACKUP_FILE\"\n        \n        # Create backup metadata\n        echo \"{\n            \\\"volume\\\": \\\"$VOLUME_NAME\\\",\n            \\\"timestamp\\\": \\\"$TIMESTAMP\\\",\n            \\\"size\\\": $(stat -f%z $BACKUP_PATH/$BACKUP_FILE 2>/dev/null || stat -c%s $BACKUP_PATH/$BACKUP_FILE),\n            \\\"backup_file\\\": \\\"$BACKUP_FILE\\\"\n        }\" > $BACKUP_PATH/${VOLUME_NAME}_${TIMESTAMP}.json\n    else\n        echo \"Backup failed!\"\n        exit 1\n    fi\n}\n\n# Function to restore volume\nrestore_volume() {\n    BACKUP_FILE=$1\n    \n    if [ ! -f \"$BACKUP_PATH/$BACKUP_FILE\" ]; then\n        echo \"Backup file not found: $BACKUP_FILE\"\n        exit 1\n    fi\n    \n    echo \"Restoring volume $VOLUME_NAME from $BACKUP_FILE\"\n    \n    # Create volume if it doesn't exist\n    docker volume create $VOLUME_NAME 2>/dev/null\n    \n    # Restore data\n    docker run --rm \\\n        --mount source=$VOLUME_NAME,target=/data \\\n        -v $BACKUP_PATH:/backup \\\n        alpine sh -c \"rm -rf /data/* && tar xzf /backup/$BACKUP_FILE -C /data\"\n    \n    if [ $? -eq 0 ]; then\n        echo \"Volume restored successfully\"\n    else\n        echo \"Restore failed!\"\n        exit 1\n    fi\n}\n\n# Function to list backups\nlist_backups() {\n    echo \"Available backups for volume $VOLUME_NAME:\"\n    ls -lh $BACKUP_PATH/${VOLUME_NAME}_*.tar.gz 2>/dev/null || echo \"No backups found\"\n}\n\n# Function to rotate backups (keep last 7 days)\nrotate_backups() {\n    echo \"Rotating backups older than 7 days...\"\n    find $BACKUP_PATH -name \"${VOLUME_NAME}_*.tar.gz\" -mtime +7 -delete\n    find $BACKUP_PATH -name \"${VOLUME_NAME}_*.json\" -mtime +7 -delete\n    echo \"Rotation complete\"\n}\n\n# Main script logic\ncase \"$3\" in\n    backup)\n        backup_volume\n        ;;\n    restore)\n        restore_volume $4\n        ;;\n    list)\n        list_backups\n        ;;\n    rotate)\n        rotate_backups\n        ;;\n    *)\n        echo \"Usage: $0 <volume_name> <backup_path> {backup|restore|list|rotate} [backup_file]\"\n        exit 1\n        ;;\nesac\n\n# docker-compose with automated backups\nversion: '3.8'\n\nservices:\n  app:\n    image: postgres:15\n    volumes:\n      - db_data:/var/lib/postgresql/data\n    environment:\n      POSTGRES_DB: appdb\n    \n  backup:\n    image: alpine\n    container_name: db-backup\n    volumes:\n      - db_data:/data:ro\n      - ./backups:/backup\n    environment:\n      - BACKUP_SCHEDULE=\"0 2 * * *\"\n    command: |\n      sh -c '\n      while true; do\n        sleep 86400\n        TIMESTAMP=$$(date +%Y%m%d_%H%M%S)\n        tar czf /backup/db_$${TIMESTAMP}.tar.gz -C /data .\n        find /backup -name \"db_*.tar.gz\" -mtime +7 -delete\n      done\n      '\n\nvolumes:\n  db_data:",
        "tags": ["backup", "restore", "disaster-recovery", "automation"],
        "interview_questions": [
          "How do you implement automated volume backups in production?",
          "What's your strategy for disaster recovery with Docker volumes?",
          "How would you migrate volumes between different cloud providers?",
          "What are the challenges with backing up databases in containers?",
          "How do you test backup integrity without restoring to production?",
          "What's the difference between volume-level and application-level backups?"
        ],
        "commands_to_practice": [
          "docker run --rm -v volume_name:/data -v $(pwd):/backup alpine tar czf /backup/backup.tar.gz -C /data .",
          "docker run --rm -v volume_name:/data -v $(pwd):/backup alpine tar xzf /backup/backup.tar.gz -C /data",
          "docker run --rm -v volume_name:/data -v $(pwd):/backup alpine sh -c 'ls -la /data'",
          "docker run --rm -v volume_name:/data alpine du -sh /data"
        ]
      },
      {
        "id": 4,
        "title": "Nginx with Read-Only Root and Writeable Volumes",
        "difficulty": "Intermediate",
        "fileType": "docker-run",
        "description": "Run Nginx with a read-only root filesystem while allowing write access to specific directories (logs, cache, temp). Implement proper volume mounts for configuration, static content, and logs.",
        "hints": [
          "Use `--read-only` flag for root filesystem",
          "Create tmpfs mounts for temporary directories",
          "Mount volumes for logs and configuration",
          "Handle nginx user permissions",
          "Use custom nginx.conf for log paths"
        ],
        "solution": "# Custom nginx.conf with log paths configured\nuser nginx;\nworker_processes auto;\nerror_log /var/log/nginx/error.log warn;\npid /var/run/nginx.pid;\n\nevents {\n    worker_connections 1024;\n}\n\nhttp {\n    include /etc/nginx/mime.types;\n    default_type application/octet-stream;\n    \n    access_log /var/log/nginx/access.log;\n    \n    # Cache path\n    proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=mycache:10m;\n    \n    server {\n        listen 80;\n        server_name localhost;\n        \n        location / {\n            root /usr/share/nginx/html;\n            index index.html;\n        }\n        \n        location /api {\n            proxy_pass http://backend:8080;\n            proxy_cache mycache;\n        }\n    }\n}\n\n# Run Nginx with read-only root\n# Create required directories\ndocker volume create nginx-config\ndocker volume create nginx-logs\ndocker volume create nginx-cache\ndocker volume create nginx-html\n\n# Copy config to volume\ndocker run --rm -v nginx-config:/config alpine cp /path/to/nginx.conf /config/\n\n# Run nginx with security settings\ndocker run -d \\\n  --name nginx-secure \\\n  --read-only \\\n  --tmpfs /var/run \\\n  --tmpfs /var/cache/nginx:exec,size=256m \\\n  --tmpfs /var/log/nginx:size=100m \\\n  --mount source=nginx-config,target=/etc/nginx/conf.d,readonly \\\n  --mount source=nginx-html,target=/usr/share/nginx/html \\\n  --mount source=nginx-logs,target=/var/log/nginx \\\n  --mount source=nginx-cache,target=/var/cache/nginx \\\n  -p 80:80 \\\n  nginx:alpine\n\n# Verify read-only root\ndocker exec nginx-secure touch /test 2>&1 || echo \"Cannot write to root - good!\"\n\n# Check mounted volumes\ndocker inspect nginx-secure | grep -A 15 \"Mounts\"\n\n# docker-compose version\nversion: '3.8'\n\nservices:\n  nginx:\n    image: nginx:alpine\n    container_name: nginx-secure\n    read_only: true\n    tmpfs:\n      - /var/run\n      - /var/cache/nginx:size=256m,exec\n      - /var/log/nginx:size=100m\n    volumes:\n      - nginx-config:/etc/nginx/conf.d:ro\n      - nginx-html:/usr/share/nginx/html\n      - nginx-logs:/var/log/nginx\n      - nginx-cache:/var/cache/nginx\n    ports:\n      - \"80:80\"\n    security_opt:\n      - no-new-privileges:true\n\nvolumes:\n  nginx-config:\n  nginx-html:\n  nginx-logs:\n  nginx-cache:",
        "tags": ["read-only", "tmpfs", "nginx", "security", "volumes"],
        "interview_questions": [
          "Why would you run a container with read-only root filesystem?",
          "What are tmpfs mounts and when should you use them?",
          "How do you handle logging when the root filesystem is read-only?",
          "What security benefits does `--read-only` provide?",
          "How do you balance security and functionality in container configuration?",
          "What's the purpose of `no-new-privileges` flag?"
        ],
        "commands_to_practice": [
          "docker run --read-only --tmpfs /tmp alpine sh -c 'echo test > /tmp/file && cat /tmp/file'",
          "docker run --read-only alpine touch /test",
          "docker run --tmpfs /tmp:size=100m alpine df -h /tmp",
          "docker run --security-opt=no-new-privileges:true alpine"
        ]
      },
      {
        "id": 5,
        "title": "Volume Drivers & Cloud Storage Integration",
        "difficulty": "Advanced",
        "fileType": "docker-volume",
        "description": "Configure and use volume drivers for cloud storage integration. Implement AWS EBS, Azure Disk, or NFS volumes for multi-host persistent storage. Demonstrate volume migration and high availability setups.",
        "hints": [
          "Install and configure volume drivers (e.g., vieux/sshfs, rexray, local-persist)",
          "Use volume plugins for cloud providers",
          "Implement NFS volumes for shared storage",
          "Configure volume replication for HA",
          "Handle performance implications"
        ],
        "solution": "# Install SSHFS volume driver\ndocker plugin install --grant-all-permissions vieux/sshfs\n\n# Create SSHFS volume\ndocker volume create \\\n  --driver vieux/sshfs \\\n  -o sshcmd=user@host:/remote/path \\\n  -o password=secret \\\n  -o allow_other \\\n  ssh-volume\n\n# Use the volume\ndocker run -d \\\n  --name app \\\n  -v ssh-volume:/data \\\n  nginx\n\n# NFS volume setup\n# Create NFS export on server\n# /etc/exports:\n# /export *(rw,sync,no_subtree_check,no_root_squash)\n\n# Create NFS volume\ndocker volume create \\\n  --driver local \\\n  --opt type=nfs \\\n  --opt o=addr=192.168.1.100,rw,nfsvers=4 \\\n  --opt device=:/export \\\n  nfs-volume\n\n# Docker Compose with NFS\nversion: '3.8'\n\nservices:\n  app:\n    image: nginx\n    volumes:\n      - nfs-data:/usr/share/nginx/html\n    deploy:\n      replicas: 3\n      placement:\n        constraints:\n          - node.role == worker\n\nvolumes:\n  nfs-data:\n    driver: local\n    driver_opts:\n      type: nfs\n      o: addr=192.168.1.100,rw,nfsvers=4\n      device: \":/export\"\n\n# REX-Ray for cloud storage\n# Install REX-Ray\ndocker plugin install rexray/ebs EBS_ACCESSKEY=xxx EBS_SECRETKEY=xxx\n\n# Create EBS volume\ndocker volume create -d rexray/ebs --name ebs-volume\n\n# Run container with EBS volume\ndocker run -d \\\n  -v ebs-volume:/data \\\n  --volume-driver=rexray/ebs \\\n  postgres\n\n# Volume backup to cloud storage\ndocker run --rm \\\n  -v app_data:/data \\\n  -e AWS_ACCESS_KEY_ID=xxx \\\n  -e AWS_SECRET_ACCESS_KEY=xxx \\\n  amazon/aws-cli s3 sync /data s3://mybucket/backups/\n\n# Volume migration script\n#!/bin/bash\n# migrate-volume.sh - Migrate volume between hosts\n\nSOURCE_HOST=$1\nVOLUME_NAME=$2\nTARGET_HOST=$3\n\n# On source host\ndocker run --rm \\\n  -v $VOLUME_NAME:/data \\\n  -v $(pwd):/backup \\\n  alpine tar czf /backup/${VOLUME_NAME}.tar.gz -C /data .\n\n# Transfer to target host\nscp ${VOLUME_NAME}.tar.gz $TARGET_HOST:/tmp/\n\n# On target host\nssh $TARGET_HOST << EOF\n  docker volume create $VOLUME_NAME\n  docker run --rm \\\n    -v $VOLUME_NAME:/data \\\n    -v /tmp:/backup \\\n    alpine tar xzf /backup/${VOLUME_NAME}.tar.gz -C /data\nEOF",
        "tags": ["volume-drivers", "cloud-storage", "nfs", "migration", "high-availability"],
        "interview_questions": [
          "What are volume drivers and when would you use them?",
          "How do you handle persistent storage in a multi-host Docker environment?",
          "What are the trade-offs between different volume drivers?",
          "How do you ensure data consistency with NFS volumes?",
          "What's the difference between local and remote volume drivers?",
          "How do you handle volume encryption in transit and at rest?",
          "What are the performance implications of using cloud storage volumes?"
        ],
        "commands_to_practice": [
          "docker plugin install rexray/ebs",
          "docker volume create -d vieux/sshfs -o sshcmd=user@host:/path",
          "docker volume create --driver local --opt type=nfs --opt o=addr=192.168.1.100,rw",
          "docker run --volume-driver=rexray/ebs -v myvolume:/data nginx",
          "docker volume inspect myvolume"
        ]
      },
      {
        "id": 6,
        "title": "Volume Permissions & Ownership Management",
        "difficulty": "Intermediate",
        "fileType": "Dockerfile",
        "description": "Create a Dockerfile that properly handles volume permissions and ownership. Implement init containers or entrypoint scripts to fix ownership when volumes are mounted. Support running as non-root user with proper volume access.",
        "hints": [
          "Use entrypoint script to fix permissions",
          "Create user with specific UID/GID",
          "Use `chown` in entrypoint for mounted volumes",
          "Consider using `gosu` for dropping privileges",
          "Support UID/GID environment variables"
        ],
        "solution": "# Dockerfile with entrypoint for permission management\nFROM alpine:latest\n\n# Install gosu for dropping privileges\nRUN apk add --no-cache gosu\n\n# Create app user with configurable UID/GID\nENV APP_USER=appuser \\\n    APP_UID=1000 \\\n    APP_GID=1000\n\nRUN addgroup -g ${APP_GID} ${APP_USER} && \\\n    adduser -D -u ${APP_UID} -G ${APP_USER} ${APP_USER}\n\nWORKDIR /app\n\n# Copy application\nCOPY app.sh /app/app.sh\nRUN chmod +x /app/app.sh\n\n# Copy entrypoint script\nCOPY docker-entrypoint.sh /usr/local/bin/\nRUN chmod +x /usr/local/bin/docker-entrypoint.sh\n\n# Volume for data\nVOLUME [\"/data\"]\n\nENTRYPOINT [\"docker-entrypoint.sh\"]\nCMD [\"app.sh\"]\n\n# docker-entrypoint.sh\n#!/bin/sh\nset -e\n\n# Fix ownership of mounted volumes\nif [ -d \"/data\" ]; then\n    echo \"Fixing permissions on /data...\"\n    chown -R ${APP_USER}:${APP_USER} /data\n    chmod 755 /data\nfi\n\n# Execute the command as app user\nif [ \"$1\" = 'app.sh' ]; then\n    exec gosu ${APP_USER} \"$@\"\nfi\n\nexec \"$@\"\n\n# app.sh\n#!/bin/sh\nwhile true; do\n    echo \"Writing to volume...\"\n    echo \"$(date): Data written\" >> /data/app.log\n    sleep 10\ndone\n\n# Docker Compose with UID/GID configuration\nversion: '3.8'\n\nservices:\n  app:\n    build: .\n    environment:\n      - APP_UID=${UID:-1000}\n      - APP_GID=${GID:-1000}\n    volumes:\n      - app-data:/data\n    user: root  # Entrypoint will drop privileges\n\nvolumes:\n  app-data:\n\n# Testing permissions\ndocker-compose up -d\n\n# Verify file ownership matches host\ndocker exec app ls -la /data\n\n# Check that container process runs as non-root\ndocker exec app ps aux | grep app.sh\n\n# Solution for existing volumes\n# Fix permissions on volume without running main container\ndocker run --rm \\\n  -v app-data:/data \\\n  alpine sh -c \"chown -R 1000:1000 /data && chmod 755 /data\"\n\n# Use with docker-compose\nversion: '3.8'\n\nservices:\n  init:\n    image: alpine\n    volumes:\n      - app-data:/data\n    command: sh -c \"chown -R 1000:1000 /data && chmod 755 /data\"\n  \n  app:\n    image: myapp\n    volumes:\n      - app-data:/data\n    depends_on:\n      - init\n    user: \"1000:1000\"\n\nvolumes:\n  app-data:",
        "tags": ["permissions", "ownership", "entrypoint", "security", "uid", "gid"],
        "interview_questions": [
          "Why do volume permissions matter in Docker?",
          "How do you handle UID/GID mismatches between container and host?",
          "What's the purpose of using gosu vs su or sudo?",
          "How would you fix permissions on an existing volume?",
          "What's the security implication of running entrypoint as root?",
          "How do you handle volume permissions in Kubernetes?",
          "What's the difference between `chown` in Dockerfile vs entrypoint?"
        ],
        "commands_to_practice": [
          "docker run --user 1000:1000 -v volume:/data alpine touch /data/test",
          "docker run --rm -v volume:/data alpine sh -c 'chown -R 1000:1000 /data'",
          "docker run --rm --user root -v volume:/data alpine chown -R 1000:1000 /data",
          "docker run --entrypoint sh -it alpine -c 'ls -la /data'"
        ]
      },
      {
        "id": 7,
        "title": "tmpfs Mounts for Sensitive Data",
        "difficulty": "Advanced",
        "fileType": "docker-run",
        "description": "Implement tmpfs mounts for storing sensitive data like secrets, session tokens, or temporary files. Configure size limits, permissions, and understand the security implications of in-memory storage.",
        "hints": [
          "Use `--tmpfs` for ephemeral storage",
          "Set size limits to prevent memory exhaustion",
          "Configure noexec, nosuid options for security",
          "Use for session storage, cache, or secrets",
          "Understand that tmpfs data is lost on container stop"
        ],
        "solution": "# Run container with tmpfs mounts for sensitive data\ndocker run -d \\\n  --name app-secure \\\n  --tmpfs /tmp:rw,noexec,nosuid,size=100m \\\n  --tmpfs /run/secrets:rw,noexec,nosuid,size=10m \\\n  --tmpfs /var/cache:rw,size=200m \\\n  -v app-data:/data \\\n  nginx:alpine\n\n# Application with tmpfs for sessions\nFROM node:20-alpine\n\nWORKDIR /app\n\n# Install dependencies\nCOPY package*.json ./\nRUN npm install\n\nCOPY . .\n\n# Create tmpfs mount points (will be overridden at runtime)\nRUN mkdir -p /tmp/sessions /tmp/uploads\n\n# Use environment variables for paths\nENV SESSION_STORAGE=/tmp/sessions \\\n    UPLOAD_TEMP=/tmp/uploads\n\nEXPOSE 3000\n\nCMD [\"node\", \"app.js\"]\n\n# docker-compose with tmpfs\nversion: '3.8'\n\nservices:\n  app:\n    build: .\n    tmpfs:\n      - /tmp/sessions:rw,noexec,nosuid,size=50m\n      - /tmp/uploads:rw,size=100m\n      - /run/secrets:rw,noexec,nosuid,size=10m\n    volumes:\n      - app-data:/app/data\n    environment:\n      - NODE_ENV=production\n      - SESSION_SECRET=${SESSION_SECRET}\n    security_opt:\n      - no-new-privileges:true\n\nvolumes:\n  app-data:\n\n# Test tmpfs performance and limits\ndocker run --rm \\\n  --tmpfs /tmp:size=10m \\\n  alpine sh -c 'dd if=/dev/zero of=/tmp/test bs=1M count=11 2>&1 || echo \"Size limit exceeded - good!\"'\n\n# Security testing - cannot run executables from tmpfs with noexec\ndocker run --rm \\\n  --tmpfs /tmp:noexec \\\n  alpine sh -c 'echo \"#!/bin/sh\" > /tmp/test.sh && chmod +x /tmp/test.sh && /tmp/test.sh' 2>&1 || echo \"Cannot execute - good!\"\n\n# Monitoring tmpfs usage\ndocker run -d \\\n  --name monitoring \\\n  --tmpfs /monitor:size=100m \\\n  alpine sh -c 'while true; do df -h /monitor; sleep 5; done'\n\n# Clean up sensitive data on container stop\n# Use --rm flag for temporary containers with secrets\ndocker run --rm \\\n  --tmpfs /secrets \\\n  -e API_KEY=secret123 \\\n  alpine sh -c 'echo $API_KEY > /secrets/key && cat /secrets/key'\n\n# Application using tmpfs for session storage\n# Node.js example with express-session\nconst session = require('express-session');\nconst FileStore = require('session-file-store')(session);\n\napp.use(session({\n  store: new FileStore({\n    path: process.env.SESSION_STORAGE || '/tmp/sessions',\n    ttl: 86400\n  }),\n  secret: process.env.SESSION_SECRET,\n  resave: false,\n  saveUninitialized: false\n}));",
        "tags": ["tmpfs", "security", "memory", "secrets", "performance"],
        "interview_questions": [
          "What are tmpfs mounts and when should you use them?",
          "What security benefits do tmpfs mounts provide?",
          "How do tmpfs mounts differ from volumes?",
          "What are the performance characteristics of tmpfs?",
          "How do you limit memory usage of tmpfs mounts?",
          "What happens to tmpfs data when a container is stopped?",
          "What's the purpose of noexec, nosuid options?",
          "How would you use tmpfs for session storage in a production app?"
        ],
        "commands_to_practice": [
          "docker run --tmpfs /tmp:rw,noexec,nosuid,size=100m alpine",
          "docker run --tmpfs /tmp:size=10m alpine dd if=/dev/zero of=/tmp/test bs=1M count=11",
          "docker run --tmpfs /tmp:noexec alpine sh -c 'echo test > /tmp/test && chmod +x /tmp/test'",
          "df -h | grep tmpfs"
        ]
      },
      {
        "id": 8,
        "title": "Volume Monitoring & Performance Tuning",
        "difficulty": "Advanced",
        "fileType": "shell-script",
        "description": "Implement comprehensive volume monitoring including space usage, I/O metrics, and performance optimization. Create alerting thresholds and automated cleanup policies for Docker volumes.",
        "hints": [
          "Monitor volume usage with `docker system df`",
          "Track I/O with `docker stats` and container monitoring",
          "Implement log rotation policies",
          "Use volume labels for tracking",
          "Create automated cleanup scripts"
        ],
        "solution": "#!/bin/bash\n# volume-monitor.sh - Monitor Docker volumes\n\n# Function to check volume usage\ncheck_volume_usage() {\n    echo \"=== Volume Space Usage ===\"\n    docker system df -v | grep -A 10 \"Volumes\"\n    \n    # Detailed per-volume usage\n    for volume in $(docker volume ls -q); do\n        size=$(docker run --rm -v $volume:/data alpine du -sh /data 2>/dev/null | cut -f1)\n        echo \"$volume: $size\"\n    done\n}\n\n# Function to monitor container I/O\nmonitor_container_io() {\n    echo \"=== Container I/O Stats ===\"\n    docker stats --no-stream --format \"table {{.Name}}\\t{{.BlockIO}}\\t{{.MemUsage}}\"\n}\n\n# Function to find unused volumes\nfind_unused_volumes() {\n    echo \"=== Unused Volumes ===\"\n    docker volume ls -qf dangling=true\n}\n\n# Function to cleanup old volumes\ncleanup_old_volumes() {\n    echo \"Cleaning up volumes older than $1 days...\"\n    \n    # Get volumes older than specified days\n    docker volume ls -q | while read volume; do\n        # Get volume creation time\n        created=$(docker volume inspect $volume --format '{{.CreatedAt}}')\n        created_epoch=$(date -d \"$created\" +%s)\n        current_epoch=$(date +%s)\n        age_days=$(( ($current_epoch - $created_epoch) / 86400 ))\n        \n        if [ $age_days -gt $1 ]; then\n            # Check if volume is in use\n            in_use=$(docker ps -q --filter volume=$volume)\n            if [ -z \"$in_use\" ]; then\n                echo \"Removing old volume: $volume (created: $created)\"\n                docker volume rm $volume\n            else\n                echo \"Volume $volume is in use, skipping...\"\n            fi\n        fi\n    done\n}\n\n# Function to optimize volume performance\noptimize_volume_performance() {\n    echo \"=== Performance Optimization ===\"\n    \n    # Check for volumes with many small files\n    for volume in $(docker volume ls -q); do\n        file_count=$(docker run --rm -v $volume:/data alpine find /data -type f 2>/dev/null | wc -l)\n        if [ $file_count -gt 10000 ]; then\n            echo \"WARNING: $volume has $file_count files - may impact performance\"\n        fi\n    done\n    \n    # Recommend compression for volumes\n    echo \"\"\n    echo \"Recommendations:\"\n    echo \"- Use named volumes instead of bind mounts for better performance\"\n    echo \"- Avoid storing many small files in volumes\"\n    echo \"- Use tmpfs for temporary data\"\n    echo \"- Implement log rotation for volumes with logs\"\n}\n\n# Prometheus metrics exporter for volumes\n# volume-metrics-exporter.py\n#!/usr/bin/env python3\nimport docker\nimport time\nimport prometheus_client\n\nclient = docker.from_env()\n\n# Create metrics\nvolume_usage = prometheus_client.Gauge('docker_volume_usage_bytes', 'Volume usage in bytes', ['volume'])\nvolume_count = prometheus_client.Gauge('docker_volume_count', 'Number of volumes')\n\nwhile True:\n    volumes = client.volumes.list()\n    volume_count.set(len(volumes))\n    \n    for volume in volumes:\n        # Get volume size using temporary container\n        try:\n            container = client.containers.run(\n                'alpine',\n                f'du -sb /data | cut -f1',\n                volumes=[f'{volume.name}:/data'],\n                remove=True\n            )\n            size = int(container.decode().strip())\n            volume_usage.labels(volume=volume.name).set(size)\n        except:\n            pass\n    \n    time.sleep(60)\n\n# docker-compose with monitoring\nversion: '3.8'\n\nservices:\n  volume-monitor:\n    image: alpine\n    volumes:\n      - /var/run/docker.sock:/var/run/docker.sock:ro\n      - ./monitor.sh:/monitor.sh:ro\n    command: sh -c 'while true; do /monitor.sh; sleep 3600; done'\n\n  prometheus:\n    image: prom/prometheus\n    volumes:\n      - ./prometheus.yml:/etc/prometheus/prometheus.yml\n      - prometheus-data:/prometheus\n    ports:\n      - \"9090:9090\"\n\n  grafana:\n    image: grafana/grafana\n    volumes:\n      - grafana-data:/var/lib/grafana\n    ports:\n      - \"3000:3000\"\n\nvolumes:\n  prometheus-data:\n  grafana-data:",
        "tags": ["monitoring", "performance", "cleanup", "metrics", "optimization"],
        "interview_questions": [
          "How do you monitor Docker volume usage in production?",
          "What metrics are important for volume monitoring?",
          "How do you identify volumes that are consuming too much space?",
          "What's your strategy for volume cleanup and retention?",
          "How do you measure volume I/O performance?",
          "What are the common performance bottlenecks with Docker volumes?",
          "How would you implement volume monitoring in a CI/CD pipeline?"
        ],
        "commands_to_practice": [
          "docker system df -v",
          "docker volume ls",
          "docker volume inspect myvolume",
          "docker run --rm -v myvolume:/data alpine du -sh /data",
          "docker run --rm -v myvolume:/data alpine find /data -type f | wc -l"
        ]
      }
    ],
    "bonus_challenge": {
      "title": "Production Volume Migration & HA Setup",
      "description": "Design and implement a production-ready volume setup for a stateful application with high availability requirements. Include volume replication, automated backups, monitoring, and disaster recovery.",
      "tasks": [
        "Design volume architecture for 3-node Docker Swarm cluster",
        "Implement volume replication across nodes",
        "Create automated backup schedule with retention policy",
        "Set up monitoring with alerts for volume usage",
        "Create volume migration plan for zero-downtime updates",
        "Document disaster recovery procedures"
      ],
      "sample_scenario": "You have a PostgreSQL database running in production with 100GB of data. Requirements:\n- RPO: 15 minutes\n- RTO: 4 hours\n- Cross-region replication\n- Encryption at rest and in transit\n- 30-day backup retention",
      "deliverables": [
        "docker-compose or swarm stack file",
        "Backup automation scripts",
        "Monitoring configuration",
        "Disaster recovery runbook",
        "Volume performance benchmarks"
      ],
      "tools_to_use": [
        "Docker Swarm or Kubernetes",
        "Volume drivers (REX-Ray, Portworx)",
        "Prometheus + Grafana",
        "Velero for backups",
        "rsync for replication"
      ]
    },
    "interview_questions_summary": [
      "What's the difference between volumes, bind mounts, and tmpfs?",
      "When would you use named volumes vs bind mounts?",
      "How do you backup and restore Docker volumes?",
      "What are volume drivers and when would you use them?",
      "How do you handle volume permissions and ownership?",
      "What's the difference between `-v` and `--mount` flags?",
      "How do you share volumes between containers?",
      "What are the performance implications of different volume types?",
      "How do you implement volume migration between hosts?",
      "What's the purpose of tmpfs mounts and when should you use them?",
      "How do you monitor volume usage in production?",
      "What's the difference between anonymous and named volumes?",
      "How do you clean up unused volumes?",
      "What are the security considerations with volumes?",
      "How do you handle volume encryption?"
    ],
    "best_practices_checklist": [
      "Use named volumes for production data persistence",
      "Use bind mounts for development (not recommended for production)",
      "Always specify volume driver options explicitly",
      "Implement volume backup and restore procedures",
      "Use tmpfs for sensitive data that shouldn't be persisted",
      "Set size limits on tmpfs mounts",
      "Use read-only mounts where appropriate",
      "Label volumes for easier management",
      "Regularly prune unused volumes",
      "Monitor volume usage and set alerts",
      "Use volume drivers for multi-host environments",
      "Handle permissions with entrypoint scripts",
      "Document volume requirements in Dockerfile",
      "Use `--mount` for better readability and features",
      "Consider performance implications of volume drivers"
    ],
    "common_mistakes": [
      "Using bind mounts in production without proper backup",
      "Not handling volume permissions correctly",
      "Running out of disk space due to unbounded volumes",
      "Using anonymous volumes by accident",
      "Not cleaning up unused volumes",
      "Using default volume driver when specialized driver is needed",
      "Storing logs in volumes without rotation",
      "Not encrypting sensitive data in volumes",
      "Using tmpfs without size limits",
      "Not considering volume migration in disaster recovery plan"
    ]
  },

  // ── 4 · Networking ──────────────────────────────────────────────────────────
  {
    "id": 4,
    "level": "Intermediate",
    "icon": "Network",
    "title": "Networking",
    "summary": "Explore Docker's built-in network drivers: bridge, host, overlay, and macvlan. Create custom networks, understand container DNS resolution, service discovery, network isolation, and load balancing. Master container-to-container communication and network security best practices.",
    "topics": [
      "Bridge, host & none networks",
      "Creating custom networks",
      "Container DNS resolution & service discovery",
      "Exposing vs publishing ports",
      "docker network commands",
      "Overlay networks for Swarm/Kubernetes",
      "Network policies & isolation",
      "Network troubleshooting",
      "Load balancing & service mesh",
      "Network security & encryption"
    ],
    "exercises": [
      {
        "id": 1,
        "title": "Two-Container Application with Service Discovery",
        "difficulty": "Intermediate",
        "fileType": "docker-compose.yml",
        "description": "Create a docker-compose setup with a Node.js API and Redis database. Configure custom network, service discovery, and demonstrate that containers can communicate using service names. Test DNS resolution and network connectivity.",
        "hints": [
          "Define custom bridge network for service isolation",
          "Use container names as hostnames for service discovery",
          "Test DNS resolution with nslookup or dig",
          "Demonstrate that containers on same network can communicate",
          "Show that containers on different networks cannot communicate"
        ],
        "solution": "# docker-compose.yml\nversion: '3.8'\n\nservices:\n  api:\n    build: ./api\n    container_name: node-api\n    ports:\n      - \"4000:4000\"\n    environment:\n      - REDIS_HOST=redis\n      - REDIS_PORT=6379\n    networks:\n      - app-network\n    depends_on:\n      - redis\n    healthcheck:\n      test: [\"CMD\", \"curl\", \"-f\", \"http://localhost:4000/health\"]\n      interval: 30s\n      timeout: 10s\n      retries: 3\n\n  redis:\n    image: redis:7-alpine\n    container_name: redis-cache\n    networks:\n      - app-network\n    volumes:\n      - redis-data:/data\n    command: redis-server --appendonly yes\n    healthcheck:\n      test: [\"CMD\", \"redis-cli\", \"ping\"]\n      interval: 10s\n      timeout: 5s\n      retries: 5\n\n  redis-commander:\n    image: rediscommander/redis-commander:latest\n    container_name: redis-commander\n    environment:\n      - REDIS_HOSTS=local:redis:6379\n    ports:\n      - \"8081:8081\"\n    networks:\n      - app-network\n    depends_on:\n      - redis\n\nnetworks:\n  app-network:\n    driver: bridge\n    ipam:\n      config:\n        - subnet: 172.20.0.0/16\n          gateway: 172.20.0.1\n\nvolumes:\n  redis-data:\n\n# Dockerfile for API\n# ./api/Dockerfile\nFROM node:20-alpine\n\nRUN apk add --no-cache curl\n\nWORKDIR /app\n\nCOPY package*.json ./\nRUN npm install\n\nCOPY . .\n\nEXPOSE 4000\n\n# Simple API app.js\n# ./api/app.js\nconst express = require('express');\nconst Redis = require('ioredis');\n\nconst app = express();\nconst redis = new Redis({\n  host: process.env.REDIS_HOST || 'localhost',\n  port: process.env.REDIS_PORT || 6379,\n});\n\napp.get('/', async (req, res) => {\n  const visits = await redis.incr('visits');\n  res.json({ message: `Hello! You are visitor number ${visits}` });\n});\n\napp.get('/health', (req, res) => {\n  res.json({ status: 'healthy', redis: redis.status });\n});\n\napp.listen(4000, () => {\n  console.log('API listening on port 4000');\n});",
        "tags": ["bridge", "DNS", "service-discovery", "docker-compose", "networks"],
        "interview_questions": [
          "How does Docker's embedded DNS work for service discovery?",
          "What's the difference between default bridge and custom bridge networks?",
          "How does DNS resolution work with container names?",
          "What happens to DNS when containers are restarted?",
          "How do you troubleshoot network connectivity between containers?",
          "What's the purpose of the `depends_on` directive?",
          "How would you implement health checks for service dependencies?"
        ],
        "commands_to_practice": [
          "docker-compose up -d",
          "docker exec node-api nslookup redis",
          "docker exec node-api ping redis",
          "docker exec node-api cat /etc/resolv.conf",
          "docker network inspect networking_app-network",
          "docker-compose logs api",
          "docker-compose exec api sh"
        ]
      },
      {
        "id": 2,
        "title": "Network Isolation & Security Zones",
        "difficulty": "Advanced",
        "fileType": "docker-compose.yml",
        "description": "Create a multi-tier application with strict network isolation: public frontend, private backend, and database tiers. Implement proper network segmentation where each tier can only communicate with specific services. Demonstrate network security policies.",
        "hints": [
          "Create multiple networks for different security zones",
          "Frontend should only communicate with backend API, not database",
          "Backend can communicate with both frontend and database",
          "Database should be completely isolated from frontend",
          "Use network aliases for flexible service discovery"
        ],
        "solution": "# docker-compose.yml\nversion: '3.8'\n\nservices:\n  # Public tier - external facing\n  nginx:\n    image: nginx:alpine\n    container_name: public-nginx\n    ports:\n      - \"80:80\"\n      - \"443:443\"\n    volumes:\n      - ./nginx.conf:/etc/nginx/nginx.conf:ro\n      - ./ssl:/etc/nginx/ssl:ro\n    networks:\n      - public-network\n    depends_on:\n      - frontend\n    restart: unless-stopped\n\n  # Frontend tier - application layer\n  frontend:\n    build: ./frontend\n    container_name: react-frontend\n    environment:\n      - API_URL=http://backend:5000\n    networks:\n      - public-network\n      - backend-network\n    depends_on:\n      - backend\n    restart: unless-stopped\n\n  # Backend tier - business logic\n  backend:\n    build: ./backend\n    container_name: python-backend\n    environment:\n      - DB_HOST=database\n      - DB_NAME=appdb\n      - DB_USER=appuser\n      - DB_PASSWORD=${DB_PASSWORD}\n    networks:\n      - backend-network\n      - database-network\n    depends_on:\n      - database\n    restart: unless-stopped\n    healthcheck:\n      test: [\"CMD\", \"curl\", \"-f\", \"http://localhost:5000/health\"]\n      interval: 30s\n      timeout: 10s\n      retries: 3\n\n  # Database tier - data layer (completely isolated)\n  database:\n    image: postgres:15-alpine\n    container_name: postgres-db\n    environment:\n      - POSTGRES_DB=appdb\n      - POSTGRES_USER=appuser\n      - POSTGRES_PASSWORD=${DB_PASSWORD}\n    volumes:\n      - postgres-data:/var/lib/postgresql/data\n    networks:\n      - database-network\n    restart: unless-stopped\n    healthcheck:\n      test: [\"CMD-SHELL\", \"pg_isready -U appuser\"]\n      interval: 10s\n      timeout: 5s\n      retries: 5\n\n  # Redis cache - additional isolation example\n  redis:\n    image: redis:7-alpine\n    container_name: redis-cache\n    networks:\n      - backend-network\n    volumes:\n      - redis-data:/data\n    command: redis-server --requirepass ${REDIS_PASSWORD}\n    restart: unless-stopped\n\nnetworks:\n  public-network:\n    driver: bridge\n    ipam:\n      config:\n        - subnet: 172.21.0.0/16\n    labels:\n      zone: \"public\"\n      \n  backend-network:\n    driver: bridge\n    ipam:\n      config:\n        - subnet: 172.22.0.0/16\n    labels:\n      zone: \"backend\"\n      \n  database-network:\n    driver: bridge\n    ipam:\n      config:\n        - subnet: 172.23.0.0/16\n    labels:\n      zone: \"database\"\n      internal: \"true\"\n\nvolumes:\n  postgres-data:\n  redis-data:\n\n# Network security verification script\n# test-network-isolation.sh\n#!/bin/bash\necho \"Testing network isolation...\"\n\n# Frontend should NOT reach database directly\necho \"Testing: Frontend -> Database (should fail)\"\ndocker exec react-frontend ping -c 1 database 2>&1 | grep -q \"bad address\" && echo \"✅ Isolation works\" || echo \"❌ Isolation failed\"\n\n# Backend should reach database\necho \"Testing: Backend -> Database (should succeed)\"\ndocker exec python-backend ping -c 1 database && echo \"✅ Backend can reach database\"\n\n# Frontend should reach backend\necho \"Testing: Frontend -> Backend (should succeed)\"\ndocker exec react-frontend ping -c 1 backend && echo \"✅ Frontend can reach backend\"\n\n# Database should not have external network access\necho \"Testing: Database external access (should be isolated)\"\ndocker exec postgres-db ping -c 1 8.8.8.8 2>&1 | grep -q \"Network is unreachable\" && echo \"✅ Database isolated from internet\" || echo \"⚠️ Database has internet access\"",
        "tags": ["network-isolation", "security", "multi-network", "zones"],
        "interview_questions": [
          "How do you implement network segmentation in Docker?",
          "What are the security benefits of using multiple networks?",
          "How would you prevent a compromised frontend container from accessing the database?",
          "What's the difference between network isolation and container isolation?",
          "How do you implement zero-trust networking in Docker?",
          "What's the role of network policies in container security?",
          "How would you audit network connections between containers?"
        ],
        "commands_to_practice": [
          "docker network ls",
          "docker network inspect public-network",
          "docker network inspect backend-network",
          "docker network inspect database-network",
          "docker exec frontend ip addr",
          "docker exec frontend route -n",
          "docker exec backend nslookup database",
          "docker network prune"
        ]
      },
      {
        "id": 3,
        "title": "Host Network & Performance Optimization",
        "difficulty": "Advanced",
        "fileType": "docker-run",
        "description": "Compare and contrast bridge, host, and macvlan network drivers. Implement a high-performance web server using host networking. Measure network performance differences and understand when to use each driver.",
        "hints": [
          "Host network removes network namespace isolation",
          "Use `--network host` for maximum performance",
          "Macvlan allows containers to have their own MAC addresses",
          "Measure latency and throughput differences",
          "Understand security implications of host networking"
        ],
        "solution": "# Compare network performance with Apache Bench\n#!/bin/bash\n\n# Test 1: Default bridge network\necho \"=== Testing Bridge Network Performance ===\"\ndocker run -d --name nginx-bridge -p 8080:80 nginx:alpine\nsleep 2\nab -n 1000 -c 10 http://localhost:8080/ > bridge-results.txt\ndocker stop nginx-bridge && docker rm nginx-bridge\n\n# Test 2: Host network\necho \"=== Testing Host Network Performance ===\"\ndocker run -d --name nginx-host --network host nginx:alpine\nsleep 2\nab -n 1000 -c 10 http://localhost:80/ > host-results.txt\ndocker stop nginx-host && docker rm nginx-host\n\n# Test 3: Macvlan network (requires physical network)\necho \"=== Testing Macvlan Network ===\"\ndocker network create -d macvlan \\\n  --subnet=192.168.1.0/24 \\\n  --gateway=192.168.1.1 \\\n  --ip-range=192.168.1.240/28 \\\n  -o parent=eth0 \\\n  macvlan-net\n\ndocker run -d \\\n  --name nginx-macvlan \\\n  --network macvlan-net \\\n  --ip=192.168.1.241 \\\n  nginx:alpine\n\n# Test 4: Custom bridge with network optimization\ndocker network create \\\n  --driver bridge \\\n  --opt com.docker.network.bridge.name=br-opt \\\n  --opt com.docker.network.bridge.enable_icc=true \\\n  --opt com.docker.network.bridge.enable_ip_masquerade=true \\\n  --opt com.docker.network.driver.mtu=1500 \\\n  optimized-net\n\ndocker run -d \\\n  --name nginx-optimized \\\n  --network optimized-net \\\n  -p 8081:80 \\\n  nginx:alpine\n\n# Performance comparison script\n# network-benchmark.py\n#!/usr/bin/env python3\nimport docker\nimport time\nimport subprocess\nimport json\n\nclient = docker.from_env()\n\nnetworks = ['bridge', 'host', 'macvlan']\nresults = {}\n\nfor network in networks:\n    print(f\"Testing {network} network...\")\n    \n    # Run container\n    if network == 'host':\n        container = client.containers.run(\n            'nginx:alpine',\n            detach=True,\n            network_mode='host',\n            name=f'test-{network}'\n        )\n        url = 'http://localhost'\n    else:\n        container = client.containers.run(\n            'nginx:alpine',\n            detach=True,\n            ports={'80/tcp': None},\n            network=network,\n            name=f'test-{network}'\n        )\n        container.reload()\n        port = container.attrs['NetworkSettings']['Ports']['80/tcp'][0]['HostPort']\n        url = f'http://localhost:{port}'\n    \n    time.sleep(2)\n    \n    # Run benchmark\n    result = subprocess.run(\n        ['ab', '-n', '1000', '-c', '10', f'{url}/'],\n        capture_output=True,\n        text=True\n    )\n    \n    # Parse results\n    for line in result.stdout.split('\\n'):\n        if 'Requests per second' in line:\n            rps = float(line.split()[3])\n            results[network] = rps\n    \n    container.stop()\n    container.remove()\n\nprint(\"\\n=== Performance Results ===\")\nfor net, rps in results.items():\n    print(f\"{net}: {rps:.2f} requests/second\")\n\n# Host vs Bridge Network Comparison Table\n# | Aspect | Bridge | Host | Macvlan |\n# |--------|--------|------|---------|\n# | Performance | Medium | High | High |\n# | Isolation | High | None | Medium |\n# | Port Conflicts | None | Yes | None |\n# | IP Assignment | Internal | Host IP | Physical IP |\n# | Use Case | Default | High Performance | Physical Network Integration |\n\n# Docker Compose with host network\nversion: '3.8'\n\nservices:\n  nginx:\n    image: nginx:alpine\n    network_mode: host\n    restart: unless-stopped\n    # Note: ports mapping not needed with host network\n    \n  prometheus:\n    image: prom/prometheus\n    network_mode: host\n    volumes:\n      - ./prometheus.yml:/etc/prometheus/prometheus.yml\n    restart: unless-stopped\n\n# Macvlan for physical network integration\ndocker network create -d macvlan \\\n  --subnet=192.168.1.0/24 \\\n  --gateway=192.168.1.1 \\\n  --ip-range=192.168.1.192/27 \\\n  -o parent=eth0 \\\n  -o macvlan_mode=bridge \\\n  physical-net\n\ndocker run -d \\\n  --name iot-device \\\n  --network physical-net \\\n  --ip=192.168.1.200 \\\n  --mac-address=02:42:ac:11:00:02 \\\n  alpine sleep 3600",
        "tags": ["host-network", "macvlan", "performance", "optimization"],
        "interview_questions": [
          "What are the trade-offs between bridge and host networking?",
          "When would you use host network mode in production?",
          "What security implications does host networking have?",
          "How does macvlan differ from bridge networking?",
          "What's the performance impact of Docker's network virtualization?",
          "How do you optimize Docker network performance?",
          "What's the difference between macvlan and ipvlan drivers?",
          "How do you handle port conflicts with host networking?"
        ],
        "commands_to_practice": [
          "docker run --network host nginx:alpine",
          "docker network create -d macvlan --subnet=192.168.1.0/24 -o parent=eth0 macvlan-net",
          "docker network inspect host",
          "docker run --network none alpine ping google.com",
          "ss -tulpn | grep docker",
          "iptables -L -n -t nat | grep DOCKER"
        ]
      },
      {
        "id": 4,
        "title": "Overlay Networks & Multi-Host Communication",
        "difficulty": "Advanced",
        "fileType": "docker-swarm",
        "description": "Set up a Docker Swarm cluster and implement overlay networks for multi-host container communication. Demonstrate service discovery across nodes, load balancing, and encrypted overlay networks for security.",
        "hints": [
          "Initialize Docker Swarm on manager node",
          "Create overlay network with encryption",
          "Deploy services across multiple nodes",
          "Demonstrate service discovery across hosts",
          "Implement rolling updates with network considerations"
        ],
        "solution": "# Initialize Swarm cluster\ndocker swarm init --advertise-addr 192.168.1.100\n\n# Create encrypted overlay network\ndocker network create \\\n  --driver overlay \\\n  --opt encrypted \\\n  --attachable \\\n  --subnet 10.0.9.0/24 \\\n  app-overlay\n\n# Verify network\ndocker network ls | grep overlay\ndocker network inspect app-overlay\n\n# Deploy stack with overlay network\n# docker-stack.yml\nversion: '3.8'\n\nservices:\n  web:\n    image: nginx:alpine\n    networks:\n      - app-network\n    deploy:\n      replicas: 3\n      placement:\n        constraints:\n          - node.role == worker\n      update_config:\n        parallelism: 1\n        delay: 10s\n      restart_policy:\n        condition: any\n    ports:\n      - \"80:80\"\n\n  api:\n    image: myapp:latest\n    networks:\n      - app-network\n    environment:\n      - REDIS_HOST=redis\n    deploy:\n      replicas: 2\n      resources:\n        limits:\n          cpus: '0.5'\n          memory: 512M\n\n  redis:\n    image: redis:7-alpine\n    networks:\n      - app-network\n    deploy:\n      replicas: 1\n      placement:\n        constraints:\n          - node.role == manager\n    volumes:\n      - redis-data:/data\n\nnetworks:\n  app-network:\n    external: true\n    name: app-overlay\n\nvolumes:\n  redis-data:\n    driver: local\n\n# Deploy stack\ndocker stack deploy -c docker-stack.yml myapp\n\n# Verify overlay network\ndocker service ls\ndocker service ps myapp_web\ndocker network inspect app-overlay\n\n# Test cross-host communication\ndocker service logs myapp_web\n\n# Simulate node failure\ndocker node update --availability drain node2\n\n# Service discovery across hosts\ndocker run --rm \\\n  --network app-overlay \\\n  alpine \\\n  nslookup tasks.myapp_web\n\n# Encrypted overlay network verification\ndocker network inspect app-overlay | grep -A 5 \"Encrypted\"\n\n# Load balancing test\nfor i in {1..10}; do\n  curl -s http://localhost | grep \"Server\"\ndone\n\n# Network performance in overlay\n# overlay-benchmark.sh\n#!/bin/bash\necho \"Testing overlay network performance...\"\n\n# Deploy test service\ndocker service create \\\n  --name network-test \\\n  --network app-overlay \\\n  --replicas 2 \\\n  alpine sleep infinity\n\n# Get container IDs\nCONTAINER1=$(docker ps -q --filter label=com.docker.swarm.service.name=network-test | head -1)\nCONTAINER2=$(docker ps -q --filter label=com.docker.swarm.service.name=network-test | tail -1)\n\n# Test latency\ndocker exec $CONTAINER1 ping -c 10 $CONTAINER2\n\n# Test throughput\ndocker exec $CONTAINER1 iperf -s &\ndocker exec $CONTAINER2 iperf -c $CONTAINER1\n\n# Cleanup\ndocker service rm network-test\n\n# Multi-region overlay (with labels)\ndocker node update --label-add region=us-east node1\ndocker node update --label-add region=us-west node2\n\n# Deploy with placement constraints\nversion: '3.8'\nservices:\n  database:\n    image: postgres:15\n    networks:\n      - app-overlay\n    deploy:\n      placement:\n        constraints:\n          - node.labels.region == us-east\n      \n  cache:\n    image: redis:7\n    networks:\n      - app-overlay\n    deploy:\n      placement:\n        constraints:\n          - node.labels.region == us-west\n\nnetworks:\n  app-overlay:\n    driver: overlay\n    driver_opts:\n      encrypted: \"true\"",
        "tags": ["overlay", "swarm", "multi-host", "load-balancing", "encryption"],
        "interview_questions": [
          "How do overlay networks work in Docker Swarm?",
          "What's the difference between overlay and bridge networks?",
          "How does service discovery work across multiple hosts?",
          "What's the performance overhead of encrypted overlay networks?",
          "How do you troubleshoot overlay network issues?",
          "What's the role of VXLAN in overlay networks?",
          "How does load balancing work with overlay networks?",
          "What are the limitations of overlay networks?"
        ],
        "commands_to_practice": [
          "docker network create -d overlay --attachable my-overlay",
          "docker service create --network my-overlay --replicas 3 nginx",
          "docker network inspect my-overlay",
          "docker service ps service_name",
          "docker service logs service_name",
          "docker node ls",
          "docker stack deploy -c stack.yml myapp"
        ]
      },
      {
        "id": 5,
        "title": "Network Troubleshooting & Debugging",
        "difficulty": "Advanced",
        "fileType": "troubleshooting",
        "description": "Create a comprehensive troubleshooting guide and tools for Docker networking issues. Simulate common network problems and practice debugging techniques including packet capture, connection testing, and performance analysis.",
        "hints": [
          "Use nsenter for network namespace debugging",
          "Capture packets with tcpdump",
          "Check iptables rules",
          "Use docker network inspect for configuration",
          "Simulate network failures for testing"
        ],
        "solution": "#!/bin/bash\n# network-troubleshooter.sh - Comprehensive Docker Network Debugging\n\n# Function to check network connectivity\ncheck_connectivity() {\n    local container=$1\n    local target=$2\n    local port=$3\n    \n    echo \"Testing connectivity from $container to $target:$port\"\n    \n    # DNS resolution test\n    docker exec $container nslookup $target 2>&1\n    \n    # Ping test\n    docker exec $container ping -c 3 $target 2>&1\n    \n    # Port connectivity test\n    docker exec $container nc -zv $target $port 2>&1\n}\n\n# Function to capture network traffic\ncapture_traffic() {\n    local container=$1\n    local interface=$2\n    local output=$3\n    \n    echo \"Capturing traffic from $container on $interface\"\n    \n    # Get container PID for nsenter\n    PID=$(docker inspect -f '{{.State.Pid}}' $container)\n    \n    # Capture packets\n    nsenter -t $PID -n tcpdump -i $interface -w /tmp/$output.pcap &\n    TCPDUMP_PID=$!\n    \n    echo \"Capturing to /tmp/$output.pcap (PID: $TCPDUMP_PID)\"\n    echo \"Press Ctrl+C to stop...\"\n    wait $TCPDUMP_PID\n}\n\n# Function to inspect iptables rules\ncheck_iptables() {\n    echo \"=== Docker iptables Rules ===\"\n    iptables -L DOCKER -n -v\n    iptables -L DOCKER-USER -n -v\n    iptables -t nat -L DOCKER -n -v\n}\n\n# Function to check network namespace\ncheck_netns() {\n    local container=$1\n    PID=$(docker inspect -f '{{.State.Pid}}' $container)\n    \n    echo \"=== Network Namespace for $container (PID: $PID) ===\"\n    ls -la /proc/$PID/ns/net\n    \n    # Show network interfaces\n    nsenter -t $PID -n ip addr show\n    \n    # Show routing table\n    nsenter -t $PID -n route -n\n    \n    # Show ARP table\n    nsenter -t $PID -n arp -n\n}\n\n# Function to simulate network issues\nsimulate_issue() {\n    local container=$1\n    local issue=$2\n    \n    case $issue in\n        \"packet-loss\")\n            echo \"Simulating 50% packet loss...\"\n            docker exec $container tc qdisc add dev eth0 root netem loss 50%\n            ;;\n        \"latency\")\n            echo \"Simulating 200ms latency...\"\n            docker exec $container tc qdisc add dev eth0 root netem delay 200ms\n            ;;\n        \"bandwidth-limit\")\n            echo \"Limiting bandwidth to 1mbps...\"\n            docker exec $container tc qdisc add dev eth0 root tbf rate 1mbit latency 50ms burst 10k\n            ;;\n        *)\n            echo \"Unknown issue: $issue\"\n            ;;\n    esac\n}\n\n# Function to clear network issues\nclear_issues() {\n    local container=$1\n    docker exec $container tc qdisc del dev eth0 root 2>/dev/null\n    echo \"Network issues cleared for $container\"\n}\n\n# Docker Compose with debugging tools\nversion: '3.8'\n\nservices:\n  debug-tools:\n    image: nicolaka/netshoot:latest\n    container_name: network-debug\n    network_mode: host\n    pid: host\n    privileged: true\n    volumes:\n      - /var/run/docker.sock:/var/run/docker.sock\n      - /proc:/proc:ro\n    command: sleep infinity\n\n  app:\n    image: nginx:alpine\n    container_name: test-app\n    networks:\n      - test-network\n\n  client:\n    image: curlimages/curl\n    container_name: test-client\n    networks:\n      - test-network\n    command: sleep infinity\n\nnetworks:\n  test-network:\n    driver: bridge\n\n# Common troubleshooting scenarios\n\n# Scenario 1: Container can't reach another container\ndocker exec client ping app\ndocker exec client nslookup app\ndocker network inspect test-network\n\n# Scenario 2: Port publishing not working\ndocker port app\ndocker inspect app | grep -A 10 \"PortBindings\"\nnetstat -tulpn | grep docker-proxy\n\n# Scenario 3: DNS resolution issues\ndocker exec client cat /etc/resolv.conf\ndocker exec client nslookup google.com\n\n# Scenario 4: Bridge network configuration\ndocker network inspect bridge\niptables -L -n -t nat | grep DOCKER\n\n# Advanced debugging with nsenter\n# Get container PID\nPID=$(docker inspect -f '{{.State.Pid}}' app)\n\n# Enter network namespace\nnsenter -t $PID -n bash\n\n# Use tcpdump inside container network namespace\nnsenter -t $PID -n tcpdump -i any -n\n\n# Check socket statistics\nnsenter -t $PID -n ss -tulpn\n\n# Trace network path\nnsenter -t $PID -n traceroute google.com\n\n# Monitoring network metrics\n# Install cAdvisor for network metrics\ndocker run -d \\\n  --name cadvisor \\\n  --volume=/:/rootfs:ro \\\n  --volume=/var/run:/var/run:ro \\\n  --volume=/sys:/sys:ro \\\n  --volume=/var/lib/docker/:/var/lib/docker:ro \\\n  --publish=8080:8080 \\\n  google/cadvisor:latest\n\n# Prometheus network metrics\n# prometheus.yml\nscrape_configs:\n  - job_name: 'docker'\n    static_configs:\n      - targets: ['localhost:9323']\n\n# Enable Docker daemon metrics\n# /etc/docker/daemon.json\n{\n  \"metrics-addr\": \"0.0.0.0:9323\",\n  \"experimental\": true\n}\n\n# Restart Docker\nsystemctl restart docker\n\n# Query network metrics\ncurl http://localhost:9323/metrics | grep docker_network",
        "tags": ["troubleshooting", "debugging", "packet-capture", "network-tools"],
        "interview_questions": [
          "How do you debug DNS resolution issues in containers?",
          "What tools would you use to capture network traffic between containers?",
          "How do you check iptables rules affecting Docker networks?",
          "What's the process for troubleshooting port publishing issues?",
          "How do you simulate network failures for testing?",
          "What's nsenter and how does it help with network debugging?",
          "How do you monitor container network metrics?",
          "What are common Docker network misconfigurations?"
        ],
        "commands_to_practice": [
          "docker exec container ping target",
          "docker exec container nslookup target",
          "docker network inspect bridge",
          "iptables -L DOCKER -n -v",
          "docker run --rm -it nicolaka/netshoot bash",
          "tcpdump -i docker0",
          "nsenter -t PID -n ip addr",
          "docker events --filter 'type=network'"
        ]
      },
      {
        "id": 6,
        "title": "IPv6 & Advanced Network Configuration",
        "difficulty": "Advanced",
        "fileType": "docker-daemon",
        "description": "Configure Docker for IPv6 networking, dual-stack support, and advanced network features. Implement IPv6-only networks, configure static IPv6 addresses, and understand IPv6 implications for container networking.",
        "hints": [
          "Enable IPv6 in Docker daemon configuration",
          "Configure IPv6 subnet for custom networks",
          "Set up dual-stack (IPv4+IPv6) networks",
          "Test IPv6 connectivity between containers",
          "Configure IPv6 NAT and routing"
        ],
        "solution": "# Enable IPv6 in Docker daemon\n# /etc/docker/daemon.json\n{\n  \"ipv6\": true,\n  \"fixed-cidr-v6\": \"2001:db8:1::/64\",\n  \"experimental\": true,\n  \"ip6tables\": true,\n  \"default-address-pools\": [\n    {\n      \"base\": \"172.17.0.0/16\",\n      \"size\": 24\n    },\n    {\n      \"base\": \"2001:db8:2::/64\",\n      \"size\": 112\n    }\n  ]\n}\n\n# Restart Docker daemon\nsystemctl restart docker\n\n# Create IPv6-enabled network\ndocker network create \\\n  --driver bridge \\\n  --ipv6 \\\n  --subnet=172.20.0.0/16 \\\n  --ip-range=172.20.0.0/24 \\\n  --gateway=172.20.0.1 \\\n  --subnet=2001:db8:20::/64 \\\n  --gateway=2001:db8:20::1 \\\n  ipv6-network\n\n# Run container with IPv6\ndocker run -d \\\n  --name ipv6-nginx \\\n  --network ipv6-network \\\n  --ip6=2001:db8:20::100 \\\n  nginx:alpine\n\n# Test IPv6 connectivity\ndocker exec ipv6-nginx ping6 -c 4 2001:db8:20::1\n\n# Dual-stack application\n# docker-compose.yml with IPv6\nversion: '3.8'\n\nservices:\n  web:\n    image: nginx:alpine\n    networks:\n      dual-stack-net:\n        ipv4_address: 172.20.0.10\n        ipv6_address: 2001:db8:20::10\n    ports:\n      - \"80:80\"\n      - \"[::]:80:80\"\n\n  app:\n    build: .\n    networks:\n      dual-stack-net:\n        ipv4_address: 172.20.0.20\n        ipv6_address: 2001:db8:20::20\n    environment:\n      - LISTEN_ADDR=::\n      - LISTEN_PORT=8080\n\nnetworks:\n  dual-stack-net:\n    enable_ipv6: true\n    driver: bridge\n    ipam:\n      config:\n        - subnet: 172.20.0.0/16\n          gateway: 172.20.0.1\n        - subnet: 2001:db8:20::/64\n          gateway: 2001:db8:20::1\n\n# IPv6 routing configuration\n# Enable IPv6 forwarding\nsysctl -w net.ipv6.conf.all.forwarding=1\n\n# Add IPv6 NAT (if needed)\nip6tables -t nat -A POSTROUTING -s 2001:db8:20::/64 -j MASQUERADE\n\n# Test IPv6 connectivity from outside\ndocker run --rm \\\n  --network ipv6-network \\\n  alpine \\\n  sh -c \"apk add curl && curl -6 http://[2001:db8:20::100]\"\n\n# IPv6-only network\ndocker network create \\\n  --driver bridge \\\n  --ipv6 \\\n  --subnet=2001:db8:30::/64 \\\n  --gateway=2001:db8:30::1 \\\n  --opt com.docker.network.bridge.enable_ip_masquerade=false \\\n  ipv6-only\n\n# Run IPv6-only container\ndocker run -d \\\n  --name ipv6-only-app \\\n  --network ipv6-only \\\n  alpine \\\n  sh -c \"ip addr && sleep 3600\"\n\n# Verify no IPv4 address\ndocker exec ipv6-only-app ip addr | grep inet\n\n# IPv6 network inspection\ndocker network inspect ipv6-network | grep -A 10 \"IPAM\"\n\n# IPv6 firewall rules\nip6tables -L DOCKER -n -v\nip6tables -t nat -L POSTROUTING -n -v\n\n# Monitoring IPv6 traffic\nip -6 neigh show\ntcpdump -i docker0 ip6\n\n# Advanced: IPv6 with macvlan\ndocker network create -d macvlan \\\n  --ipv6 \\\n  --subnet=192.168.1.0/24 \\\n  --gateway=192.168.1.1 \\\n  --subnet=2001:db8:1::/64 \\\n  --gateway=2001:db8:1::1 \\\n  -o parent=eth0 \\\n  macvlan-ipv6\n\n# IPv6 service discovery\ndocker run --rm \\\n  --network ipv6-network \\\n  alpine \\\n  nslookup ipv6-nginx\n\n# Test IPv6 connectivity to external services\ndocker run --rm \\\n  --network ipv6-network \\\n  alpine \\\n  sh -c \"apk add curl && curl -6 http://ipv6.google.com\"",
        "tags": ["ipv6", "dual-stack", "advanced-networking", "routing"],
        "interview_questions": [
          "How do you enable IPv6 in Docker? What configuration is required?",
          "What are the challenges of using IPv6 with containers?",
          "How do you set up dual-stack networking (IPv4+IPv6)?",
          "What's the difference between IPv6 NAT and native IPv6 routing?",
          "How does IPv6 affect service discovery?",
          "What are the security implications of IPv6 in containers?",
          "How do you troubleshoot IPv6 connectivity issues?"
        ],
        "commands_to_practice": [
          "docker network create --ipv6 --subnet=2001:db8:1::/64 ipv6-net",
          "docker run --network ipv6-net alpine ping6 google.com",
          "sysctl net.ipv6.conf.all.forwarding",
          "ip -6 addr show",
          "ip6tables -L -n",
          "tcpdump -i any ip6"
        ]
      },
      {
        "id": 7,
        "title": "Network Security & Firewall Configuration",
        "difficulty": "Advanced",
        "fileType": "docker-run",
        "description": "Implement comprehensive network security for Docker containers including firewall rules, network policies, traffic encryption, and access control. Configure Docker daemon security settings and implement zero-trust networking principles.",
        "hints": [
          "Configure Docker daemon with iptables rules",
          "Implement network policies for container isolation",
          "Use TLS for Docker daemon communication",
          "Configure network encryption with IPSec",
          "Implement rate limiting and DDoS protection"
        ],
        "solution": "# Docker daemon security configuration\n# /etc/docker/daemon.json\n{\n  \"iptables\": true,\n  \"icc\": false,\n  \"userland-proxy\": false,\n  \"ip-forward\": true,\n  \"iptables-forward\": true,\n  \"experimental\": true,\n  \"seccomp-profile\": \"/etc/docker/seccomp.json\",\n  \"tls\": true,\n  \"tlscert\": \"/etc/docker/certs/server-cert.pem\",\n  \"tlskey\": \"/etc/docker/certs/server-key.pem\",\n  \"tlsverify\": true,\n  \"hosts\": [\"tcp://0.0.0.0:2376\", \"unix:///var/run/docker.sock\"]\n}\n\n# Create custom iptables rules\n# /etc/systemd/system/docker-firewall.service\n[Unit]\nDescription=Docker Firewall Rules\nAfter=docker.service\n\n[Service]\nType=oneshot\nExecStart=/usr/local/bin/docker-firewall.sh\nRemainAfterExit=yes\n\n[Install]\nWantedBy=multi-user.target\n\n# /usr/local/bin/docker-firewall.sh\n#!/bin/bash\n\n# Flush existing DOCKER-USER chain\niptables -F DOCKER-USER\niptables -A DOCKER-USER -j RETURN\n\n# Allow established connections\niptables -A DOCKER-USER -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT\n\n# Rate limiting for SSH\niptables -A DOCKER-USER -p tcp --dport 22 -m limit --limit 10/min --limit-burst 5 -j ACCEPT\niptables -A DOCKER-USER -p tcp --dport 22 -j DROP\n\n# Rate limiting for HTTP/HTTPS\niptables -A DOCKER-USER -p tcp -m multiport --dports 80,443 -m limit --limit 100/min --limit-burst 50 -j ACCEPT\niptables -A DOCKER-USER -p tcp -m multiport --dports 80,443 -j DROP\n\n# Block specific IP ranges\niptables -A DOCKER-USER -s 10.0.0.0/8 -j DROP\niptables -A DOCKER-USER -s 172.16.0.0/12 -j DROP\n\n# Allow only specific IP to access container\niptables -A DOCKER-USER -p tcp --dport 8080 -s 192.168.1.100 -j ACCEPT\niptables -A DOCKER-USER -p tcp --dport 8080 -j DROP\n\n# Enable logging for dropped packets\niptables -A DOCKER-USER -j LOG --log-prefix \"DOCKER-DROP: \" --log-level 4\n\n# Network policy implementation with docker-compose\nversion: '3.8'\n\nservices:\n  # Public service with rate limiting\n  web:\n    image: nginx:alpine\n    networks:\n      - public-net\n    deploy:\n      resources:\n        limits:\n          cpus: '0.5'\n          memory: 256M\n    labels:\n      - \"traefik.enable=true\"\n      - \"traefik.http.routers.web.entrypoints=web\"\n\n  # Internal service with strict access\n  api:\n    image: myapp:latest\n    networks:\n      - backend-net\n    environment:\n      - API_KEY=${API_KEY}\n    security_opt:\n      - no-new-privileges:true\n    cap_drop:\n      - ALL\n    cap_add:\n      - NET_BIND_SERVICE\n\n  # Database with no external access\n  db:\n    image: postgres:15\n    networks:\n      - db-net\n    volumes:\n      - db-data:/var/lib/postgresql/data\n    environment:\n      - POSTGRES_PASSWORD=${DB_PASSWORD}\n    security_opt:\n      - no-new-privileges:true\n\nnetworks:\n  public-net:\n    driver: bridge\n    driver_opts:\n      com.docker.network.bridge.enable_icc: \"false\"\n  backend-net:\n    driver: bridge\n    internal: true\n  db-net:\n    driver: bridge\n    internal: true\n\nvolumes:\n  db-data:\n\n# TLS certificate generation for Docker daemon\n#!/bin/bash\n# generate-docker-certs.sh\n\nCA_PASS=${1:-password}\nHOST=${2:-localhost}\n\n# Generate CA key and certificate\nopenssl genrsa -aes256 -out ca-key.pem -passout pass:$CA_PASS 4096\nopenssl req -new -x509 -days 365 -key ca-key.pem -sha256 -out ca.pem \\\n  -passin pass:$CA_PASS -subj \"/CN=docker-ca\"\n\n# Generate server key and certificate\nopenssl genrsa -out server-key.pem 4096\nopenssl req -subj \"/CN=$HOST\" -sha256 -new -key server-key.pem -out server.csr\n\necho subjectAltName = DNS:$HOST,IP:127.0.0.1 > extfile.cnf\necho extendedKeyUsage = serverAuth >> extfile.cnf\n\nopenssl x509 -req -days 365 -sha256 -in server.csr \\\n  -CA ca.pem -CAkey ca-key.pem -CAcreateserial \\\n  -out server-cert.pem -extfile extfile.cnf -passin pass:$CA_PASS\n\n# Generate client key and certificate\nopenssl genrsa -out client-key.pem 4096\nopenssl req -subj '/CN=client' -new -key client-key.pem -out client.csr\n\necho extendedKeyUsage = clientAuth > extfile-client.cnf\n\nopenssl x509 -req -days 365 -sha256 -in client.csr \\\n  -CA ca.pem -CAkey ca-key.pem -CAcreateserial \\\n  -out client-cert.pem -extfile extfile-client.cnf -passin pass:$CA_PASS\n\n# Set permissions\nchmod 0400 ca-key.pem server-key.pem client-key.pem\nchmod 0444 ca.pem server-cert.pem client-cert.pem\n\n# Network policy with Cilium (Kubernetes-style)\n# cilium-network-policy.yaml\napiVersion: \"cilium.io/v2\"\nkind: CiliumNetworkPolicy\nmetadata:\n  name: api-policy\nspec:\n  endpointSelector:\n    matchLabels:\n      app: api\n  ingress:\n  - fromEndpoints:\n    - matchLabels:\n        app: web\n    toPorts:\n    - ports:\n      - port: \"8080\"\n        protocol: TCP\n  egress:\n  - toEndpoints:\n    - matchLabels:\n        app: database\n    toPorts:\n    - ports:\n      - port: \"5432\"\n        protocol: TCP\n\n# Network encryption with WireGuard\n# docker-compose with WireGuard sidecar\nversion: '3.8'\n\nservices:\n  app:\n    image: myapp:latest\n    network_mode: service:wireguard\n    depends_on:\n      - wireguard\n\n  wireguard:\n    image: linuxserver/wireguard\n    cap_add:\n      - NET_ADMIN\n      - SYS_MODULE\n    volumes:\n      - ./wg0.conf:/config/wg0.conf:ro\n    ports:\n      - \"51820:51820/udp\"\n\n# Security scanning for networks\n#!/bin/bash\n# network-security-scan.sh\n\necho \"=== Network Security Scan ===\"\n\n# Check for exposed Docker daemon\nif netstat -tulpn | grep -q 2375; then\n    echo \"WARNING: Docker daemon exposed on port 2375 without TLS!\"\nfi\n\n# Check for default bridge network usage\nif docker network inspect bridge | grep -q '\"Containers\": {}'; then\n    echo \"No containers on default bridge network\"\nelse\n    echo \"WARNING: Containers running on default bridge network\"\nfi\n\n# Check for privileged containers\ndocker ps -q | xargs -I {} docker inspect {} | grep -q '\"Privileged\": true' && \\\n    echo \"WARNING: Privileged containers detected\"\n\n# Check for exposed ports\ndocker ps --format \"table {{.Names}}\\t{{.Ports}}\" | grep -v \"^CONTAINER\"\n\n# Check for networks with inter-container communication enabled\nfor net in $(docker network ls -q); do\n    icc=$(docker network inspect $net | grep -A 5 \"com.docker.network.bridge.enable_icc\")\n    if [[ $icc == *\"true\"* ]]; then\n        echo \"Network $net allows inter-container communication\"\n    fi\ndone",
        "tags": ["security", "firewall", "iptables", "tls", "network-policies"],
        "interview_questions": [
          "How do you secure Docker networks in production?",
          "What iptables rules does Docker create and how do they work?",
          "How do you implement network segmentation for multi-tenant environments?",
          "What's the difference between userland proxy and iptables for port publishing?",
          "How do you secure the Docker daemon API?",
          "What are the security implications of `icc=false`?",
          "How do you implement rate limiting for container networks?",
          "What's the role of seccomp and AppArmor in network security?"
        ],
        "commands_to_practice": [
          "iptables -L DOCKER-USER -n -v",
          "iptables -t nat -L DOCKER -n -v",
          "docker run --cap-drop=ALL --cap-add=NET_BIND_SERVICE nginx",
          "docker run --security-opt=seccomp=/path/to/profile.json nginx",
          "docker -H tcp://localhost:2376 --tlsverify ps",
          "netstat -tulpn | grep docker"
        ]
      },
      {
        "id": 8,
        "title": "Load Balancing & Service Mesh",
        "difficulty": "Advanced",
        "fileType": "docker-compose",
        "description": "Implement load balancing for Docker containers using multiple strategies: Docker's built-in load balancer, Nginx reverse proxy, Traefik, and service mesh with Linkerd or Istio. Compare different approaches and understand their trade-offs.",
        "hints": [
          "Use Docker's internal load balancer with multiple replicas",
          "Configure Nginx as reverse proxy with upstream",
          "Implement Traefik with automatic service discovery",
          "Set up Linkerd for service mesh capabilities",
          "Test load balancing with different algorithms"
        ],
        "solution": "# Docker Compose with built-in load balancing\nversion: '3.8'\n\nservices:\n  load-balancer:\n    image: nginx:alpine\n    ports:\n      - \"80:80\"\n    volumes:\n      - ./nginx.conf:/etc/nginx/nginx.conf:ro\n    depends_on:\n      - app1\n      - app2\n      - app3\n\n  app1:\n    image: myapp:latest\n    environment:\n      - INSTANCE_ID=1\n    networks:\n      - app-network\n\n  app2:\n    image: myapp:latest\n    environment:\n      - INSTANCE_ID=2\n    networks:\n      - app-network\n\n  app3:\n    image: myapp:latest\n    environment:\n      - INSTANCE_ID=3\n    networks:\n      - app-network\n\nnetworks:\n  app-network:\n    driver: bridge\n\n# nginx.conf with load balancing\n# upstream backend {\n#     least_conn;\n#     server app1:3000 max_fails=3 fail_timeout=30s;\n#     server app2:3000 max_fails=3 fail_timeout=30s;\n#     server app3:3000 max_fails=3 fail_timeout=30s;\n# }\n#\n# server {\n#     listen 80;\n#     location / {\n#         proxy_pass http://backend;\n#         proxy_next_upstream error timeout http_500;\n#         proxy_set_header X-Real-IP $remote_addr;\n#     }\n# }\n\n# Traefik with Docker provider\n# docker-compose.yml\nversion: '3.8'\n\nservices:\n  traefik:\n    image: traefik:v2.10\n    command:\n      - \"--api.insecure=true\"\n      - \"--providers.docker=true\"\n      - \"--providers.docker.exposedbydefault=false\"\n      - \"--entrypoints.web.address=:80\"\n      - \"--entrypoints.websecure.address=:443\"\n    ports:\n      - \"80:80\"\n      - \"443:443\"\n      - \"8080:8080\"\n    volumes:\n      - /var/run/docker.sock:/var/run/docker.sock:ro\n    networks:\n      - traefik-net\n\n  app:\n    image: myapp:latest\n    labels:\n      - \"traefik.enable=true\"\n      - \"traefik.http.routers.app.rule=Host(`app.example.com`)\"\n      - \"traefik.http.services.app.loadbalancer.server.port=3000\"\n      - \"traefik.http.services.app.loadbalancer.sticky.cookie=true\"\n    networks:\n      - traefik-net\n    deploy:\n      replicas: 3\n\n  whoami:\n    image: traefik/whoami\n    labels:\n      - \"traefik.enable=true\"\n      - \"traefik.http.routers.whoami.rule=Host(`whoami.example.com`)\"\n    networks:\n      - traefik-net\n\nnetworks:\n  traefik-net:\n    driver: overlay\n    attachable: true\n\n# HAProxy load balancer\n# haproxy.cfg\nglobal\n    daemon\n    maxconn 4096\n\ndefaults\n    mode http\n    timeout connect 5000ms\n    timeout client 50000ms\n    timeout server 50000ms\n\nfrontend http-in\n    bind *:80\n    default_backend servers\n\nbackend servers\n    balance roundrobin\n    option httpchk GET /health\n    server app1 app1:3000 check inter 5000 rise 2 fall 3\n    server app2 app2:3000 check inter 5000 rise 2 fall 3\n    server app3 app3:3000 check inter 5000 rise 2 fall 3\n\n# Docker Swarm with built-in load balancing\ndocker service create \\\n  --name web \\\n  --replicas 5 \\\n  --publish mode=host,target=80,published=80 \\\n  --network swarm-net \\\n  nginx:alpine\n\n# Test load balancing distribution\nfor i in {1..100}; do\n  curl -s http://localhost | grep \"Server\"\ndone | sort | uniq -c\n\n# Linkerd service mesh\n# Install Linkerd CLI\ncurl -sL https://run.linkerd.io/install | sh\nexport PATH=$PATH:$HOME/.linkerd2/bin\n\n# Install Linkerd on cluster\nlinkerd install | kubectl apply -f -\n\n# Inject sidecar proxy\ndocker run --rm \\\n  -v /var/run/docker.sock:/var/run/docker.sock \\\n  linkerd/docker:latest inject app.yaml | kubectl apply -f -\n\n# Performance testing with wrk\n# Install wrk\napt-get install wrk\n\n# Test load balancing performance\nwrk -t12 -c400 -d30s http://localhost/\n\n# Load balancing algorithms comparison\n#!/bin/bash\n# load-balancer-benchmark.sh\n\necho \"Testing Round Robin\"\nwrk -t4 -c100 -d30s http://localhost:8000/\n\necho \"Testing Least Connections\"\nwrk -t4 -c100 -d30s http://localhost:8001/\n\necho \"Testing IP Hash (Sticky Sessions)\"\nwrk -t4 -c100 -d30s http://localhost:8002/\n\n# Sticky sessions with Redis\n# docker-compose with session affinity\nversion: '3.8'\n\nservices:\n  nginx:\n    image: nginx:alpine\n    volumes:\n      - ./nginx-sticky.conf:/etc/nginx/nginx.conf:ro\n    ports:\n      - \"80:80\"\n\n  redis:\n    image: redis:alpine\n    networks:\n      - app-net\n\n  app:\n    image: myapp:latest\n    networks:\n      - app-net\n    environment:\n      - REDIS_HOST=redis\n    deploy:\n      replicas: 3\n\nnetworks:\n  app-net:\n\n# nginx-sticky.conf with stickiness\n# upstream backend {\n#     hash $remote_addr consistent;\n#     server app1:3000;\n#     server app2:3000;\n#     server app3:3000;\n# }\n\n# Service mesh observability\n# Deploy Jaeger for tracing\ndocker run -d \\\n  --name jaeger \\\n  -p 16686:16686 \\\n  -p 4317:4317 \\\n  jaegertracing/all-in-one:latest\n\n# Deploy Prometheus for metrics\nversion: '3.8'\n\nservices:\n  prometheus:\n    image: prom/prometheus\n    volumes:\n      - ./prometheus.yml:/etc/prometheus/prometheus.yml\n    ports:\n      - \"9090:9090\"\n\n  grafana:\n    image: grafana/grafana\n    ports:\n      - \"3000:3000\"\n    environment:\n      - GF_SECURITY_ADMIN_PASSWORD=admin\n\n# prometheus.yml\nscrape_configs:\n  - job_name: 'traefik'\n    static_configs:\n      - targets: ['traefik:8080']\n  - job_name: 'docker'\n    docker_sd_configs:\n      - host: unix:///var/run/docker.sock\n        refresh_interval: 5s",
        "tags": ["load-balancing", "traefik", "nginx", "service-mesh", "performance"],
        "interview_questions": [
          "How does Docker's built-in load balancing work?",
          "What are the different load balancing algorithms and when would you use each?",
          "How do you implement sticky sessions (session affinity) in Docker?",
          "What's the difference between Layer 4 and Layer 7 load balancing?",
          "How does Traefik compare to Nginx for container load balancing?",
          "What are the benefits of service mesh over traditional load balancers?",
          "How do you handle service discovery in dynamic environments?",
          "What metrics should you monitor for load balancer health?"
        ],
        "commands_to_practice": [
          "docker service create --replicas 3 --publish 80:80 nginx",
          "docker service scale web=10",
          "docker service update --replicas 5 web",
          "docker service inspect web --pretty",
          "docker service ps web",
          "docker service logs web"
        ]
      }
    ],
    "bonus_challenge": {
      "title": "Production Network Architecture Design",
      "description": "Design a production-grade network architecture for a microservices application with 20+ services, 3 environments (dev, staging, prod), multi-region deployment, and strict security requirements. Include network segmentation, service discovery, load balancing, monitoring, and disaster recovery.",
      "requirements": [
        "Zero-trust network model",
        "Multi-tenancy with network isolation",
        "Service mesh with mTLS encryption",
        "Global load balancing across regions",
        "Network performance SLA (99.9% availability, <50ms latency)",
        "Comprehensive monitoring and alerting",
        "Disaster recovery with <15min RTO",
        "Compliance with PCI-DSS or HIPAA"
      ],
      "deliverables": [
        "Network architecture diagram",
        "Docker network configuration files",
        "Service mesh configuration",
        "Load balancer configuration",
        "Network security policies",
        "Monitoring dashboards",
        "Disaster recovery runbook"
      ],
      "tools_to_evaluate": [
        "Docker Swarm vs Kubernetes",
        "Traefik vs Nginx vs HAProxy",
        "Linkerd vs Istio vs Cilium",
        "Prometheus vs Datadog",
        "Calico vs Cilium for network policies",
        "VXLAN vs IPSec for encryption"
      ]
    },
    "interview_questions_summary": [
      "What are the different Docker network drivers and when would you use each?",
      "How does Docker's embedded DNS work for service discovery?",
      "What's the difference between exposing and publishing ports?",
      "How do you isolate networks for security in Docker?",
      "What's the performance difference between bridge and host networking?",
      "How do overlay networks work in multi-host environments?",
      "What are the common network troubleshooting techniques?",
      "How do you implement load balancing for Docker containers?",
      "What are the security implications of different network configurations?",
      "How does Docker's network compare to Kubernetes networking?",
      "How do you configure IPv6 for Docker containers?",
      "What's the role of iptables in Docker networking?",
      "How do you implement network policies for container isolation?",
      "What metrics are important for network monitoring?",
      "How do you handle network failures and disaster recovery?"
    ],
    "best_practices_checklist": [
      "Use custom bridge networks instead of default bridge",
      "Implement network segmentation based on security zones",
      "Use overlay networks for multi-host communication",
      "Enable network encryption for sensitive traffic",
      "Implement rate limiting and DDoS protection",
      "Use service mesh for mTLS and observability",
      "Configure proper DNS settings for containers",
      "Monitor network metrics and set up alerts",
      "Document network architecture and dependencies",
      "Use network policies for zero-trust security",
      "Implement health checks for load balancers",
      "Use read-only root filesystems with proper network mounts",
      "Regularly audit network configurations",
      "Test network failure scenarios",
      "Use network namespaces for isolation testing"
    ],
    "common_mistakes": [
      "Using default bridge network with hardcoded IPs",
      "Not implementing network isolation between tiers",
      "Exposing unnecessary ports to host",
      "Not configuring DNS properly for service discovery",
      "Using host networking without understanding security implications",
      "Not setting resource limits on network bandwidth",
      "Ignoring IPv6 configuration",
      "Not implementing network monitoring",
      "Overlooking network performance in multi-host setups",
      "Not testing network failure scenarios"
    ],
    "advanced_concepts": [
      {
        "name": "VXLAN Overlay Networks",
        "description": "Virtual Extensible LAN for network virtualization across hosts",
        "use_cases": ["Multi-host communication", "Cloud networking", "Network segmentation"]
      },
      {
        "name": "eBPF Networking",
        "description": "Extended Berkeley Packet Filter for high-performance networking",
        "use_cases": ["Network observability", "Security policies", "Load balancing"]
      },
      {
        "name": "Service Mesh",
        "description": "Dedicated infrastructure layer for service-to-service communication",
        "use_cases": ["mTLS encryption", "Traffic management", "Observability"]
      },
      {
        "name": "Network Service Mesh",
        "description": "L2/L3 networking for cloud-native applications",
        "use_cases": ["Multi-cluster networking", "Network function virtualization"]
      }
    ]
  },
  // ── 5 · Docker Compose ──────────────────────────────────────────────────────
  {
    "id": 5,
    "level": "Intermediate",
    "icon": "Terminal",
    "title": "Docker Compose",
    "summary": "Define and run multi-container applications with a single `docker-compose.yml`. Master service orchestration, networking, volumes, environment variables, and production-ready configurations. Understand development to production workflows.",
    "topics": [
      "docker-compose.yml structure & versioning",
      "Services, volumes & networks",
      "depends_on & healthcheck",
      "Environment variables",
      "docker compose up/down/logs",
    ],
  },
  {
    id: 6,
    level: "Advanced",
    icon: "Wrench",
    title: "Multi-stage Builds & Optimisation",
    summary:
      "Dramatically reduce image sizes with multi-stage builds, .dockerignore, minimal base images (alpine, distroless, scratch) and BuildKit cache mounts.",
    topics: [
      "Multi-stage Dockerfile syntax",
      "Choosing a minimal base image",
      ".dockerignore best practices",
      "BuildKit & cache mounts",
      "Scanning images with Trivy",
    ],
  },
];

// ─── Exercises (shown on /docker-practice/exercises) ─────────────────────────
// Each object supports:
//   id             {number}  – unique, used as React key
//   title          {string}  – exercise heading
//   difficulty     {string}  – "Beginner" | "Intermediate" | "Advanced"
//   fileType       {string}  – "Dockerfile" | "docker-compose.yml"
//   description    {string}  – scenario description shown to user
//   hints          {string[]}– ordered list of hints (revealed on demand)
//   solution       {string}  – reference file (revealed on demand)
//   tags           {string[]}– instruction/topic badges
// ─────────────────────────────────────────────────────────────────────────────
export const dockerExercises = [
  {
    id: 1,
    title: "Basic Node.js App",
    difficulty: "Beginner",
    fileType: "Dockerfile",
    description:
      "Write a Dockerfile that containerises a Node.js application. The app lives in the current directory, its entry point is `server.js`, and it listens on port 3000.",
    hints: [
      "Use the official `node:18-alpine` base image.",
      "Set a WORKDIR so files land in `/app`.",
      "Copy `package*.json` first, then run `npm install`, then copy the rest.",
      "Expose port 3000 and use `CMD [\"node\", \"server.js\"]`.",
    ],
    solution: `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]`,
    tags: ["COPY", "RUN", "EXPOSE", "CMD", "WORKDIR"],
  },
  {
    id: 2,
    title: "Python Flask API",
    difficulty: "Beginner",
    fileType: "Dockerfile",
    description:
      "Containerise a Python Flask application. Dependencies are listed in `requirements.txt`. The app runs via `python app.py` and listens on port 5000.",
    hints: [
      "Use `python:3.11-slim` as the base image.",
      "Install dependencies with `pip install --no-cache-dir -r requirements.txt`.",
      "Set the `FLASK_ENV` environment variable to `production`.",
      "Expose port 5000 and run `python app.py`.",
    ],
    solution: `FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
ENV FLASK_ENV=production
EXPOSE 5000
CMD ["python", "app.py"]`,
    tags: ["ENV", "pip", "EXPOSE", "CMD"],
  },
  {
    id: 3,
    title: "Multi-Stage React Build",
    difficulty: "Intermediate",
    fileType: "Dockerfile",
    description:
      "Write a multi-stage Dockerfile that builds a React app with Node and then serves the static output using Nginx. Keep the final image as small as possible.",
    hints: [
      "Stage 1: use `node:18-alpine`, run `npm run build`.",
      "Stage 2: use `nginx:alpine` as the final stage.",
      "Copy the build output from stage 1 with `COPY --from=builder`.",
      "The default Nginx serve directory is `/usr/share/nginx/html`.",
    ],
    solution: `# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`,
    tags: ["Multi-stage", "COPY --from", "nginx", "Build optimisation"],
  },
  {
    id: 4,
    title: "PostgreSQL with Custom Init",
    difficulty: "Intermediate",
    fileType: "Dockerfile",
    description:
      "Create a Dockerfile based on the official Postgres image that automatically runs a custom SQL init script (`init.sql`) when the container first starts.",
    hints: [
      "Use `postgres:15` as the base image.",
      "Postgres auto-runs `.sql` files placed in `/docker-entrypoint-initdb.d/`.",
      "Set `POSTGRES_DB`, `POSTGRES_USER`, and `POSTGRES_PASSWORD` via ENV.",
      "Expose the default Postgres port 5432.",
    ],
    solution: `FROM postgres:15
ENV POSTGRES_DB=mydb
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=secret
COPY init.sql /docker-entrypoint-initdb.d/
EXPOSE 5432`,
    tags: ["ENV", "COPY", "postgres", "Init scripts"],
  },
  {
    id: 5,
    title: "Optimised Go Binary",
    difficulty: "Advanced",
    fileType: "Dockerfile",
    description:
      "Write a multi-stage Dockerfile for a Go application that produces the smallest possible final image. The main package is located at `./cmd/server`.",
    hints: [
      "Build stage: use `golang:1.22-alpine`, set `CGO_ENABLED=0` to produce a static binary.",
      "Final stage: use `scratch` (empty base image) or `gcr.io/distroless/static`.",
      "Copy only the compiled binary into the final stage.",
      "Use `ENTRYPOINT` rather than `CMD` for a single-binary container.",
    ],
    solution: `# Build stage
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o server ./cmd/server

# Final stage
FROM scratch
COPY --from=builder /app/server /server
EXPOSE 8080
ENTRYPOINT ["/server"]`,
    tags: ["scratch", "CGO_ENABLED", "ENTRYPOINT", "Minimal image"],
  },
  // ── Add more global exercises below this line ──────────────────────────────
];
