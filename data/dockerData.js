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
      "Container lifecycle management",
      "Image layers & caching",
      "Container networking basics",
      "Resource limits & constraints"
    ],
    "exercises": [
      {
        "id": 1,
        "title": "Serve a Static HTML Page",
        "difficulty": "Beginner",
        "fileType": "Dockerfile",
        "description": "Create a Dockerfile that uses the official `nginx:alpine` image to serve a static HTML file. Copy `index.html` from the project root into Nginx's default HTML directory and expose port 80.",
        "hints": [
          "Use `nginx:alpine` as your base image — it's tiny and includes a working server.",
          "Nginx serves files from `/usr/share/nginx/html` by default.",
          "Use `COPY index.html /usr/share/nginx/html/index.html` to place the file.",
          "EXPOSE 80 so Docker knows which port the container listens on."
        ],
        "solution": "FROM nginx:alpine\nCOPY index.html /usr/share/nginx/html/index.html\nEXPOSE 80",
        "tags": ["FROM", "COPY", "EXPOSE", "nginx"],
        "interview_questions": [
          "What's the difference between `EXPOSE` and `-p`?",
          "Why use `alpine` variants? What are the trade-offs?",
          "How would you copy multiple static files efficiently?"
        ],
        "commands_to_practice": [
          "docker build -t static-site .",
          "docker run -d -p 8080:80 --name my-site static-site",
          "docker ps",
          "docker logs my-site",
          "docker stop my-site && docker rm my-site"
        ]
      },
      {
        "id": 2,
        "title": "Port-Mapped Node App",
        "difficulty": "Beginner",
        "fileType": "Dockerfile",
        "description": "Write a Dockerfile for a Node.js app whose entry point is `index.js` and that listens on port 3000. Use `node:20-alpine`. Make the image runnable with `docker run -p 3000:3000`.",
        "hints": [
          "Use `node:20-alpine` as the base image.",
          "Set `WORKDIR /app` so files land in a clean directory.",
          "Copy `package*.json` first, run `npm install`, then copy the rest of the source.",
          "EXPOSE 3000 and set `CMD [\"node\", \"index.js\"]`."
        ],
        "solution": "FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install --production\nCOPY . .\nEXPOSE 3000\nCMD [\"node\", \"index.js\"]",
        "tags": ["WORKDIR", "COPY", "RUN", "EXPOSE", "CMD"],
        "interview_questions": [
          "Why copy package.json separately before copying the rest of the app?",
          "What's the purpose of `--production` flag? When would you omit it?",
          "How would you handle environment variables in this setup?",
          "What's the difference between `CMD` and `ENTRYPOINT`?"
        ],
        "commands_to_practice": [
          "docker build -t node-app .",
          "docker run -d -p 3000:3000 --name node-app node-app",
          "docker logs node-app -f",
          "docker exec -it node-app sh",
          "docker stats node-app"
        ]
      },
      {
        "id": 3,
        "title": "Ubuntu Debug Container",
        "difficulty": "Beginner",
        "fileType": "Dockerfile",
        "description": "Build a lightweight debug image based on `ubuntu:22.04` that pre-installs `curl` and `vim`. The default command should drop the user into a bash shell.",
        "hints": [
          "Start from `ubuntu:22.04`.",
          "Run `apt-get update && apt-get install -y curl vim` in a single RUN to keep layers small.",
          "Clean up the apt cache with `rm -rf /var/lib/apt/lists/*` to reduce image size.",
          "Set `CMD [\"/bin/bash\"]` so running the image opens a shell."
        ],
        "solution": "FROM ubuntu:22.04\nRUN apt-get update && apt-get install -y \\\n    curl \\\n    vim \\\n  && rm -rf /var/lib/apt/lists/*\nCMD [\"/bin/bash\"]",
        "tags": ["FROM", "RUN", "CMD", "apt-get"],
        "interview_questions": [
          "Why combine multiple `RUN` commands? What problem does this solve?",
          "Why clean up apt cache? How does this affect image size?",
          "What's the difference between `/bin/bash` and `/bin/sh`?",
          "How would you add a non-root user to this image?"
        ],
        "commands_to_practice": [
          "docker build -t debug-ubuntu .",
          "docker run -it --rm debug-ubuntu",
          "docker images | grep debug-ubuntu",
          "docker history debug-ubuntu"
        ]
      },
      {
        "id": 9,
        "title": "Understanding Image Layers & Build Cache",
        "difficulty": "Beginner",
        "fileType": "Dockerfile",
        "description": "Create a Python application Dockerfile that demonstrates layer caching. Rebuild the image with and without code changes to understand when layers are reused vs rebuilt. Learn to optimize build time.",
        "hints": [
          "Order matters: put frequently changing instructions (like COPY source code) near the end",
          "Dependencies (requirements.txt) change less often than application code",
          "Use `docker build --no-cache` to force rebuild all layers",
          "Check layer sizes with `docker history <image>`"
        ],
        "solution": "FROM python:3.9-slim\n\nWORKDIR /app\n\n# Install system dependencies (rarely changes)\nRUN apt-get update && apt-get install -y --no-install-recommends \\\n    gcc \\\n    && rm -rf /var/lib/apt/lists/*\n\n# Copy and install Python dependencies (changes occasionally)\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\n# Copy application code (changes frequently)\nCOPY app/ ./app/\nCOPY main.py .\n\nEXPOSE 5000\nCMD [\"python\", \"main.py\"]",
        "tags": ["layer-caching", "build-optimization", "RUN", "COPY"],
        "interview_questions": [
          "What happens to the cache when you modify requirements.txt?",
          "How does Docker determine if a layer can be reused?",
          "Why put COPY operations for code at the end?",
          "What's the difference between image layers and container layers?"
        ],
        "commands_to_practice": [
          "docker build -t cache-demo .",
          "docker build -t cache-demo . # Second build uses cache",
          "docker build --no-cache -t cache-demo .",
          "docker history cache-demo",
          "docker images --filter dangling=true"
        ]
      },
      {
        "id": 10,
        "title": "Environment Variables & Configuration",
        "difficulty": "Beginner",
        "fileType": "Dockerfile",
        "description": "Build a containerized app that accepts environment variables for configuration (database URL, API keys, debug mode). Use ENV instruction, .env files, and runtime -e flags. Demonstrate different ways to pass configuration.",
        "hints": [
          "Use ENV in Dockerfile for default values",
          "Override with -e or --env-file at runtime",
          "Never hardcode secrets in Dockerfiles",
          "Use ARG for build-time variables, ENV for runtime"
        ],
        "solution": "FROM node:18-alpine\n\nWORKDIR /app\n\n# Build-time argument\nARG NODE_ENV=production\n\n# Runtime environment variables with defaults\nENV NODE_ENV=$NODE_ENV \\\n    PORT=3000 \\\n    LOG_LEVEL=info\n\nCOPY package*.json ./\nRUN npm ci --only=production\n\nCOPY . .\n\nEXPOSE $PORT\n\nCMD [\"node\", \"server.js\"]",
        "tags": ["ENV", "ARG", "configuration", "environment-variables"],
        "interview_questions": [
          "What's the difference between ARG and ENV?",
          "Why shouldn't you put secrets in ENV instructions?",
          "How do environment variables in Dockerfile differ from runtime -e flags?",
          "What's the precedence when the same variable is set multiple ways?"
        ],
        "commands_to_practice": [
          "docker build --build-arg NODE_ENV=development -t config-app .",
          "docker run -e PORT=8080 -e LOG_LEVEL=debug config-app",
          "docker run --env-file .env config-app",
          "docker inspect config-app | grep Env",
          "docker exec config-app env"
        ]
      },
      {
        "id": 11,
        "title": "Volume Basics - Data Persistence",
        "difficulty": "Beginner",
        "fileType": "docker-run",
        "description": "Create a PostgreSQL container with a named volume for data persistence. Demonstrate that data survives container deletion. Practice with bind mounts vs named volumes. Backup and restore volume data.",
        "hints": [
          "Use -v flag with named volumes: -v pgdata:/var/lib/postgresql/data",
          "Bind mounts use absolute paths: -v /host/path:/container/path",
          "Named volumes are managed by Docker and persisted in /var/lib/docker/volumes",
          "Test persistence by creating data, removing container, and recreating it"
        ],
        "solution": "# Create named volume\ndocker volume create pgdata\n\n# Run PostgreSQL with volume\ndocker run -d --name postgres \\\n  -e POSTGRES_PASSWORD=secret \\\n  -v pgdata:/var/lib/postgresql/data \\\n  postgres:15-alpine\n\n# Create some data\ndocker exec -it postgres psql -U postgres -c \"CREATE DATABASE testdb;\"\n\n# Stop and remove container\ndocker stop postgres && docker rm postgres\n\n# Recreate container - data persists!\ndocker run -d --name postgres \\\n  -e POSTGRES_PASSWORD=secret \\\n  -v pgdata:/var/lib/postgresql/data \\\n  postgres:15-alpine\n\n# Verify data exists\ndocker exec -it postgres psql -U postgres -c \"\\l\"",
        "tags": ["volumes", "persistence", "bind-mounts", "data-management"],
        "interview_questions": [
          "What's the difference between named volumes and bind mounts?",
          "Where does Docker store named volumes on the host?",
          "What happens to volume data when you run `docker rm`?",
          "How do you backup a Docker volume?"
        ],
        "commands_to_practice": [
          "docker volume create my-volume",
          "docker run -v my-volume:/data alpine",
          "docker run -v $(pwd):/app alpine # bind mount",
          "docker volume ls",
          "docker volume inspect my-volume",
          "docker volume rm my-volume"
        ]
      },
      {
        "id": 12,
        "title": "Container Lifecycle & Restart Policies",
        "difficulty": "Beginner",
        "fileType": "docker-run",
        "description": "Practice complete container lifecycle: create, start, stop, restart, pause, unpause, kill. Configure restart policies (no, always, unless-stopped, on-failure) and test behavior when containers crash or system reboots.",
        "hints": [
          "Restart policies: --restart=no|always|unless-stopped|on-failure[:max-retries]",
          "Use `docker pause` to freeze a running container",
          "Kill sends SIGKILL, stop sends SIGTERM then SIGKILL",
          "Test crash behavior with exit codes"
        ],
        "solution": "# Run with restart policy\ndocker run -d --name webapp \\\n  --restart=unless-stopped \\\n  nginx:alpine\n\n# Lifecycle commands\ndocker pause webapp      # Freeze the container\ndocker unpause webapp    # Resume\ndocker stop webapp       # Graceful shutdown (SIGTERM)\ndocker start webapp      # Start stopped container\ndocker restart webapp    # Stop then start\ndocker kill webapp       # Force kill (SIGKILL)\n\n# Test on-failure restart\ndocker run -d --name crasher \\\n  --restart=on-failure:3 \\\n  alpine sh -c \"echo 'Starting...'; sleep 5; exit 1\"\n\n# Watch restarts\ndocker logs -f crasher\ndocker inspect crasher | grep -A 5 RestartCount",
        "tags": ["lifecycle", "restart-policy", "docker-stop", "docker-start"],
        "interview_questions": [
          "What's the difference between `stop` and `kill`?",
          "When would you use `unless-stopped` vs `always`?",
          "What happens to containers with restart=always after system reboot?",
          "How does Docker handle the grace period during shutdown?"
        ],
        "commands_to_practice": [
          "docker run --restart=always nginx",
          "docker pause container_name",
          "docker unpause container_name",
          "docker stop -t 30 container_name",
          "docker kill -s SIGUSR1 container_name",
          "docker inspect container_name | grep RestartPolicy"
        ]
      },
      {
        "id": 13,
        "title": "Interactive vs Detached Containers",
        "difficulty": "Beginner",
        "fileType": "docker-run",
        "description": "Practice running containers interactively (-it), in detached mode (-d), and attaching/detaching from running containers. Execute commands in running containers with `docker exec`.",
        "hints": [
          "-it combines -i (interactive) and -t (TTY/terminal)",
          "-d runs in background (detached)",
          "Use Ctrl+P, Ctrl+Q to detach without stopping",
          "`docker attach` reconnects to main process",
          "`docker exec -it` runs new process in running container"
        ],
        "solution": "# Interactive container with shell\ndocker run -it --name interactive ubuntu bash\n# Inside container: run commands, exit to stop\n\n# Detached container\ndocker run -d --name background nginx:alpine\n\n# Attach to running container\ndocker attach background\n# Detach: Ctrl+P, Ctrl+Q (leaves it running)\n\n# Execute command in running container\ndocker exec -it background sh\n# Now you have a shell while nginx keeps running\n\n# Non-interactive exec\ndocker exec background ls /usr/share/nginx/html\n\n# Run temporary container (--rm removes after exit)\ndocker run -it --rm alpine sh",
        "tags": ["interactive", "detached", "docker-exec", "docker-attach"],
        "interview_questions": [
          "What's the difference between `docker attach` and `docker exec`?",
          "Why use `--rm` flag? When is it useful?",
          "What happens when you exit from `docker attach` vs `docker exec`?",
          "How do you keep a container running in detached mode?"
        ],
        "commands_to_practice": [
          "docker run -it alpine sh",
          "docker run -d --name web nginx",
          "docker attach web",
          "docker exec -it web bash",
          "docker run -it --rm ubuntu bash",
          "docker logs -f container_name"
        ]
      },
      {
        "id": 14,
        "title": "Working with Docker Registry",
        "difficulty": "Intermediate",
        "fileType": "docker-push",
        "description": "Tag and push custom images to Docker Hub. Pull specific versions. Practice semantic versioning. Set up a local Docker registry for private images. Understand image naming conventions.",
        "hints": [
          "Tag format: [registry/][username/]name[:tag]",
          "Use multiple tags: latest, version number, git commit SHA",
          "Login with `docker login`",
          "Default registry is Docker Hub (docker.io)",
          "Run local registry with official registry:2 image"
        ],
        "solution": "# Build and tag image\ndocker build -t myapp:1.0.0 .\n\n# Add multiple tags\ndocker tag myapp:1.0.0 myapp:latest\ndocker tag myapp:1.0.0 username/myapp:1.0.0\ndocker tag myapp:1.0.0 username/myapp:latest\n\n# Login to Docker Hub\ndocker login\n\n# Push to Docker Hub\ndocker push username/myapp:1.0.0\ndocker push username/myapp:latest\n\n# Pull specific version\ndocker pull username/myapp:1.0.0\n\n# Run local registry\ndocker run -d -p 5000:5000 --name registry registry:2\n\n# Tag for local registry\ndocker tag myapp:1.0.0 localhost:5000/myapp:1.0.0\n\n# Push to local registry\ndocker push localhost:5000/myapp:1.0.0",
        "tags": ["registry", "docker-hub", "tagging", "versioning"],
        "interview_questions": [
          "What's the difference between image name and tag?",
          "Why use multiple tags for the same image?",
          "How do you implement semantic versioning with Docker images?",
          "What are the security considerations when using public registries?",
          "How would you implement image scanning in your CI/CD pipeline?"
        ],
        "commands_to_practice": [
          "docker login",
          "docker tag source_image:tag target_image:tag",
          "docker push username/image:tag",
          "docker pull username/image:tag",
          "docker search ubuntu",
          "docker logout"
        ]
      },
      {
        "id": 4,
        "title": "Multi-Container WordPress Setup",
        "difficulty": "Intermediate",
        "fileType": "docker-compose.yml",
        "description": "Create a docker-compose.yml file that sets up WordPress with MySQL. WordPress should be accessible on port 8080, and MySQL data should persist using volumes. Both services should be on a custom network.",
        "hints": [
          "Use `wordpress:latest` and `mysql:8.0` images",
          "Set environment variables for MySQL root password, database name, and user",
          "Use volumes for MySQL data persistence",
          "Create a custom bridge network for inter-container communication",
          "Configure WordPress to use the MySQL service as the database host"
        ],
        "solution": "version: '3.8'\n\nservices:\n  db:\n    image: mysql:8.0\n    container_name: wordpress_db\n    restart: always\n    environment:\n      MYSQL_ROOT_PASSWORD: rootpass\n      MYSQL_DATABASE: wordpress\n      MYSQL_USER: wpuser\n      MYSQL_PASSWORD: wppass\n    volumes:\n      - db_data:/var/lib/mysql\n    networks:\n      - wp_network\n\n  wordpress:\n    image: wordpress:latest\n    container_name: wordpress_app\n    restart: always\n    ports:\n      - \"8080:80\"\n    environment:\n      WORDPRESS_DB_HOST: db:3306\n      WORDPRESS_DB_USER: wpuser\n      WORDPRESS_DB_PASSWORD: wppass\n      WORDPRESS_DB_NAME: wordpress\n    volumes:\n      - wp_data:/var/www/html\n    networks:\n      - wp_network\n    depends_on:\n      - db\n\nvolumes:\n  db_data:\n  wp_data:\n\nnetworks:\n  wp_network:\n    driver: bridge",
        "tags": ["docker-compose", "volumes", "networks", "environment-variables"],
        "interview_questions": [
          "What's the difference between `depends_on` and health checks?",
          "How do named volumes differ from bind mounts?",
          "What happens to the data when you run `docker-compose down` vs `docker-compose down -v`?",
          "How would you backup the WordPress database?",
          "Why use a custom network instead of default bridge?"
        ],
        "commands_to_practice": [
          "docker-compose up -d",
          "docker-compose ps",
          "docker-compose logs -f wordpress",
          "docker-compose exec db mysql -u root -p",
          "docker-compose down",
          "docker-compose down -v"
        ]
      },
      {
        "id": 5,
        "title": "Optimized Python App with Multi-stage Build",
        "difficulty": "Intermediate",
        "fileType": "Dockerfile",
        "description": "Create a multi-stage Dockerfile for a Python Flask application that uses a virtual environment. The final image should be minimal (using `python:3.9-slim`) and only include necessary runtime dependencies. Include health checks and proper signal handling.",
        "hints": [
          "First stage: use `python:3.9` for building dependencies",
          "Create and activate a virtual environment in the build stage",
          "Second stage: copy only the virtual environment and application code",
          "Add HEALTHCHECK instruction to verify app is running",
          "Use `exec` form for CMD to handle signals properly"
        ],
        "solution": "# Build stage\nFROM python:3.9 AS builder\n\nWORKDIR /app\n\n# Create virtual environment\nRUN python -m venv /opt/venv\nENV PATH=\"/opt/venv/bin:$PATH\"\n\n# Install dependencies\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\n# Final stage\nFROM python:3.9-slim\n\n# Copy virtual environment from builder\nCOPY --from=builder /opt/venv /opt/venv\nENV PATH=\"/opt/venv/bin:$PATH\"\n\nWORKDIR /app\nCOPY app.py .\n\n# Create non-root user\nRUN useradd --create-home appuser && \\\n    chown -R appuser:appuser /app\nUSER appuser\n\n# Health check\nHEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\\n  CMD python -c \"import requests; requests.get('http://localhost:5000/health')\" || exit 1\n\nEXPOSE 5000\n\n# Use exec form for proper signal handling\nCMD [\"python\", \"app.py\"]",
        "tags": ["multi-stage", "virtualenv", "healthcheck", "security", "optimization"],
        "interview_questions": [
          "What problem does multi-stage build solve?",
          "Why use a virtual environment even inside a container?",
          "What's the purpose of the HEALTHCHECK instruction?",
          "Why create a non-root user? What security risks does this mitigate?",
          "What's the difference between `CMD` and `ENTRYPOINT` with signal handling?"
        ],
        "commands_to_practice": [
          "docker build -t python-app .",
          "docker run -d -p 5000:5000 --name python-app python-app",
          "docker inspect python-app | grep -A 10 Health",
          "docker exec -it python-app ps aux",
          "docker kill -s SIGTERM python-app"
        ]
      },
      {
        "id": 6,
        "title": "Resource-Constrained Container",
        "difficulty": "Intermediate",
        "fileType": "docker-run",
        "description": "Run an Nginx container with strict resource limits (memory: 256MB, CPU: 0.5 cores). Verify the limits are applied and demonstrate how the container behaves under load. Use `docker stats` and `docker update` to modify limits at runtime.",
        "hints": [
          "Use `--memory` and `--cpus` flags with `docker run`",
          "Use `stress` tool inside container to test limits",
          "Check current limits with `docker inspect`",
          "Use `docker update` to modify limits on running container",
          "Monitor with `docker stats` in real-time"
        ],
        "solution": "# Run container with limits\ndocker run -d --name limited-nginx \\\n  --memory=\"256m\" \\\n  --cpus=\"0.5\" \\\n  --memory-swap=\"256m\" \\\n  nginx\n\n# Verify limits\ndocker inspect limited-nginx | grep -A 5 \"Memory\"\ndocker stats limited-nginx --no-stream\n\n# Update limits at runtime\ndocker update --memory=\"512m\" --cpus=\"1\" limited-nginx\n\n# Test with stress (inside container)\ndocker exec -it limited-nginx apt-get update\ndocker exec -it limited-nginx apt-get install -y stress\ndocker exec -it limited-nginx stress --vm 1 --vm-bytes 300M --timeout 10s",
        "tags": ["resource-limits", "cgroups", "docker-stats", "runtime"],
        "interview_questions": [
          "What happens when a container exceeds its memory limit?",
          "How does CPU limits work with Docker? What's the difference between shares and cores?",
          "What's the purpose of `--memory-swap` flag?",
          "How do resource limits affect container scheduling in orchestration platforms?",
          "What's the difference between user memory and kernel memory limits?"
        ],
        "commands_to_practice": [
          "docker run --memory=256m --cpus=0.5 nginx",
          "docker stats",
          "docker update --cpus=1 container_name",
          "docker inspect container_name | grep -E 'Memory|Cpu'",
          "cat /sys/fs/cgroup/memory/docker/[container-id]/memory.limit_in_bytes"
        ]
      },
      {
        "id": 7,
        "title": "Container Logging & Monitoring",
        "difficulty": "Intermediate",
        "fileType": "docker-run",
        "description": "Set up a container with custom logging drivers and log rotation. Configure JSON-file logging with max size of 10MB per log file, keeping 3 files. Demonstrate log rotation and explore different logging drivers.",
        "hints": [
          "Use `--log-driver` and `--log-opt` flags",
          "Configure max-size and max-file for log rotation",
          "Test by generating lots of logs",
          "Try different drivers: syslog, journald, fluentd",
          "Check current log configuration with `docker inspect`"
        ],
        "solution": "# Run with JSON-file logging and rotation\ndocker run -d --name logger \\\n  --log-driver json-file \\\n  --log-opt max-size=10m \\\n  --log-opt max-file=3 \\\n  busybox sh -c \"while true; do echo 'Log entry at $(date)'; sleep 1; done\"\n\n# Check log files\nls -la /var/lib/docker/containers/$(docker inspect -f '{{.Id}}' logger)/\n\n# Try syslog driver\ndocker run --rm --log-driver syslog ubuntu echo \"Test syslog\"\n\n# View current logs\ndocker logs --tail 50 logger\n\n# Follow logs\ndocker logs -f logger",
        "tags": ["logging", "log-rotation", "monitoring", "drivers"],
        "interview_questions": [
          "What are the different logging drivers available in Docker?",
          "Why is log rotation important in production?",
          "How do you centralize logs from multiple containers?",
          "What's the performance impact of different logging drivers?",
          "How would you handle logs in a container that crashes frequently?"
        ],
        "commands_to_practice": [
          "docker run --log-driver json-file --log-opt max-size=10m image",
          "docker logs container_name",
          "docker logs --since 1h container_name",
          "docker inspect container_name | grep LogPath",
          "docker run --log-driver none image"
        ]
      },
      {
        "id": 8,
        "title": "Custom Network with Service Discovery",
        "difficulty": "Intermediate",
        "fileType": "docker-network",
        "description": "Create a custom bridge network and run three containers (Redis, Python app, Nginx) on it. Demonstrate service discovery using container names as hostnames. Test connectivity between containers and simulate network isolation.",
        "hints": [
          "Create custom bridge network with `docker network create`",
          "Run containers with `--network` flag and give them names",
          "Test DNS resolution with `ping` or `nslookup`",
          "Demonstrate that containers on different networks can't communicate",
          "Connect a container to multiple networks"
        ],
        "solution": "# Create custom network\ndocker network create app-network\n\n# Run Redis\ndocker run -d --name redis --network app-network redis:alpine\n\n# Run Python app\ndocker run -d --name python-app --network app-network \\\n  -e REDIS_HOST=redis \\\n  python:3.9-slim sleep infinity\n\n# Run Nginx\ndocker run -d --name nginx --network app-network \\\n  -p 8080:80 \\\n  nginx:alpine\n\n# Test DNS resolution\ndocker exec python-app ping -c 3 redis\ndocker exec python-app nslookup redis\n\n# Demonstrate network isolation\ndocker network create isolated-network\ndocker run -d --name isolated --network isolated-network alpine sleep infinity\ndocker exec isolated ping python-app # This will fail\n\n# Connect container to multiple networks\ndocker network connect app-network isolated\ndocker exec isolated ping python-app # Now it works",
        "tags": ["networks", "dns", "service-discovery", "bridge"],
        "interview_questions": [
          "How does Docker's embedded DNS work?",
          "What's the difference between default bridge and custom bridge networks?",
          "How do you handle container name conflicts across networks?",
          "What's the difference between bridge, host, and overlay networks?",
          "How would you implement network policies for multi-tenant isolation?"
        ],
        "commands_to_practice": [
          "docker network create my-network",
          "docker run --network my-network --name container1 image",
          "docker network connect my-network container2",
          "docker network disconnect my-network container2",
          "docker network inspect my-network"
        ]
      },
      {
        "id": 15,
        "title": "Image Inspection & Troubleshooting",
        "difficulty": "Intermediate",
        "fileType": "docker-inspect",
        "description": "Master image and container inspection commands. Analyze image layers, find which layer added what files, debug why images are large. Use dive tool or docker history for deep analysis.",
        "hints": [
          "Use `docker history` to see layer sizes",
          "Use `docker inspect` for detailed JSON metadata",
          "Install dive tool for interactive layer exploration",
          "Look for large layers and optimize them",
          "Check for unnecessary files in layers"
        ],
        "solution": "# Inspect image layers and sizes\ndocker history nginx:alpine\n\n# Get detailed image information\ndocker inspect nginx:alpine\n\n# Format specific fields\ndocker inspect --format='{{.Config.Env}}' nginx:alpine\ndocker inspect --format='{{.Config.ExposedPorts}}' nginx:alpine\n\n# Compare image sizes\ndocker images nginx\n\n# Find large files in image\ndocker run --rm nginx:alpine du -sh /*\n\n# Save image to tar for analysis\ndocker save nginx:alpine -o nginx.tar\ntar -xvf nginx.tar\n\n# Using dive (install separately)\ndive nginx:alpine\n\n# Check container details\ndocker inspect container_name | jq '.[] | {State, RestartCount, LogPath}'",
        "tags": ["inspection", "debugging", "docker-history", "optimization"],
        "interview_questions": [
          "How do you identify which layer is causing an image to be large?",
          "What's the difference between image size and virtual size?",
          "How can you see what files a specific layer added?",
          "What's the purpose of `docker inspect`'s --format flag?",
          "How would you debug a container that keeps crashing?"
        ],
        "commands_to_practice": [
          "docker history image_name",
          "docker inspect image_name",
          "docker inspect --format='{{json .Config}}' image_name | jq",
          "docker images --filter dangling=true",
          "docker system df",
          "docker save image_name -o backup.tar"
        ]
      },
      {
        "id": 16,
        "title": "Container Resource Monitoring & Stats",
        "difficulty": "Intermediate",
        "fileType": "docker-stats",
        "description": "Monitor container resource usage in real-time. Set up alerts for high CPU/memory usage. Export metrics for external monitoring. Understand cgroups and how Docker enforces limits.",
        "hints": [
          "`docker stats` shows live metrics",
          "Use --format to customize output",
          "Combine with resource limits for testing",
          "Export to monitoring tools (Prometheus, Grafana)",
          "Check /sys/fs/cgroup for cgroup info"
        ],
        "solution": "# Real-time stats for all containers\ndocker stats\n\n# Stats for specific containers\ndocker stats nginx redis\n\n# Format output as table\ndocker stats --format \"table {{.Name}}\\t{{.CPUPerc}}\\t{{.MemUsage}}\\t{{.NetIO}}\"\n\n# One-time snapshot (no streaming)\ndocker stats --no-stream\n\n# Monitor container with limits\ndocker run -d --name limited \\\n  --memory=512m \\\n  --cpus=1.0 \\\n  nginx:alpine\n\ndocker stats limited\n\n# Check cgroup settings\ndocker inspect limited | grep -A 10 \"Memory\"\n\n# Export metrics (script example)\nwhile true; do\n  docker stats --no-stream --format '{{.Name}},{{.CPUPerc}},{{.MemUsage}}' >> metrics.csv\n  sleep 5\ndone",
        "tags": ["monitoring", "docker-stats", "metrics", "performance"],
        "interview_questions": [
          "What metrics does `docker stats` provide?",
          "How do you integrate Docker metrics with external monitoring?",
          "What's the difference between memory usage and memory limit?",
          "How can you monitor historical container performance?",
          "What are the limitations of docker stats for production monitoring?"
        ],
        "commands_to_practice": [
          "docker stats",
          "docker stats --no-stream",
          "docker stats --format 'table {{.Container}}\\t{{.CPUPerc}}'",
          "docker top container_name",
          "docker events",
          "docker inspect -f '{{.State.Status}}' container_name"
        ]
      },
      {
        "id": 17,
        "title": "Multi-Architecture Images",
        "difficulty": "Intermediate",
        "fileType": "Dockerfile",
        "description": "Build Docker images that work on multiple architectures (amd64, arm64). Use buildx for multi-platform builds. Understand manifest lists and platform-specific base images.",
        "hints": [
          "Enable buildx: docker buildx create --use",
          "Build for multiple platforms: --platform linux/amd64,linux/arm64",
          "Use manifest lists for automatic platform selection",
          "Test on different architectures with QEMU",
          "Consider platform-specific optimizations"
        ],
        "solution": "# Create and use buildx builder\ndocker buildx create --name multiarch --use\ndocker buildx inspect --bootstrap\n\n# Simple Dockerfile\nFROM --platform=$BUILDPLATFORM golang:1.21-alpine AS builder\nARG TARGETPLATFORM\nARG BUILDPLATFORM\nWORKDIR /app\nCOPY . .\nRUN go build -o app .\n\nFROM alpine:latest\nCOPY --from=builder /app/app /usr/local/bin/\nCMD [\"app\"]\n\n# Build for multiple platforms\ndocker buildx build \\\n  --platform linux/amd64,linux/arm64,linux/arm/v7 \\\n  -t username/myapp:latest \\\n  --push \\\n  .\n\n# Inspect manifest\ndocker buildx imagetools inspect username/myapp:latest",
        "tags": ["multi-arch", "buildx", "arm64", "cross-platform"],
        "interview_questions": [
          "What's a manifest list and why is it important?",
          "How does Docker choose the right image for your platform?",
          "What are the challenges of multi-architecture builds?",
          "When would you need platform-specific optimizations?",
          "How do you test multi-arch images without native hardware?"
        ],
        "commands_to_practice": [
          "docker buildx create --use",
          "docker buildx build --platform linux/amd64,linux/arm64 -t image .",
          "docker buildx imagetools inspect image",
          "docker manifest inspect image",
          "docker pull --platform linux/arm64 image"
        ]
      },
    ],
    "bonus_challenge": {
      "title": "Troubleshooting Production Container",
      "description": "You have a production container that's misbehaving - it's using too much memory and occasionally crashes. Using Docker commands, diagnose and fix the issue. Document your troubleshooting steps including:",
      "tasks": [
        "Identify the container's resource usage",
        "Check logs for error patterns",
        "Inspect container configuration",
        "Find what process is consuming resources",
        "Propose a solution (limit resources, fix app, adjust configuration)",
        "Demonstrate the fix"
      ],
      "tools_to_use": [
        "docker ps",
        "docker stats",
        "docker top",
        "docker logs",
        "docker inspect",
        "docker exec",
        "docker diff"
      ],
      "sample_scenario": "docker run -d --name faulty-app --memory=512m python:3.9 python -c \"import time; data = []; [data.append('x'*1000000) for _ in range(1000)]; time.sleep(3600)\""
    },
    "interview_questions_summary": [
      "Explain the difference between an image and a container",
      "What happens when you run `docker run`? (Pull, create, start process)",
      "How do Docker layers work and why are they important?",
      "What's the difference between CMD and ENTRYPOINT?",
      "How would you reduce Docker image size?",
      "Explain Docker's networking model",
      "What are volumes and when would you use bind mounts vs named volumes?",
      "How do you handle environment variables in Docker?",
      "What's the difference between `docker stop` and `docker kill`?",
      "How does Docker manage container isolation (namespaces, cgroups)?"
    ]
  },

  // ── 2 · Writing Dockerfiles ─────────────────────────────────────────────────
  {
    "id": 2,
    "level": "Beginner",
    "icon": "Layers",
    "title": "Writing Dockerfiles",
    "summary": "Master Dockerfile instructions: FROM, RUN, COPY, ADD, WORKDIR, ENV, EXPOSE, CMD and ENTRYPOINT. Understand layer caching and build context.",
    "topics": [
      "FROM, RUN, COPY, ADD",
      "WORKDIR & ENV",
      "CMD vs ENTRYPOINT",
      "Layer caching strategy",
      "docker build & tagging",
      "Multi-stage builds",
      "Build arguments & environment variables",
      "Image size optimization",
      ".dockerignore best practices",
      "Security considerations"
    ],
    "exercises": [
      {
        "id": 1,
        "title": "Python Flask API with Layer Optimization",
        "difficulty": "Beginner",
        "fileType": "Dockerfile",
        "description": "Containerize a Python Flask application with optimized layer caching. Dependencies are listed in `requirements.txt`. The app runs via `python app.py` and listens on port 5000. Set the `FLASK_ENV` environment variable to `production` and ensure development dependencies are excluded.",
        "hints": [
          "Use `python:3.11-slim` as the base image for smaller size.",
          "Copy `requirements.txt` before the rest of the source so the install layer is cached.",
          "Install with `pip install --no-cache-dir -r requirements.txt` to reduce image size.",
          "Use ENV to set `FLASK_ENV=production`.",
          "Create a `.dockerignore` file to exclude `__pycache__`, `.git`, and `*.pyc` files."
        ],
        "solution": "# Dockerfile\nFROM python:3.11-slim\n\nWORKDIR /app\n\n# Copy requirements first for better caching\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\n# Copy the rest of the application\nCOPY . .\n\n# Set production environment\nENV FLASK_ENV=production\nENV PYTHONUNBUFFERED=1\n\nEXPOSE 5000\n\n# Use exec form for proper signal handling\nCMD [\"python\", \"app.py\"]\n\n# .dockerignore file\n__pycache__\n*.pyc\n*.pyo\n*.pyd\n.Python\n*.so\n*.egg\n*.egg-info\ndist\nbuild\n.git\n.env\n.venv\nvenv\n*.log",
        "tags": ["ENV", "pip", "EXPOSE", "CMD", "layer caching", ".dockerignore"],
        "interview_questions": [
          "Why copy requirements.txt separately before copying the rest of the code?",
          "What's the purpose of `--no-cache-dir` in pip install?",
          "How does Docker's layer caching work? What invalidates a cache?",
          "Why use `slim` variants instead of full images? What are the trade-offs?",
          "What's the purpose of `PYTHONUNBUFFERED=1`?",
          "Why is it important to have a `.dockerignore` file?"
        ],
        "commands_to_practice": [
          "docker build -t flask-app .",
          "docker build --no-cache -t flask-app .",
          "docker images | grep flask-app",
          "docker history flask-app --no-trunc",
          "docker run -d -p 5000:5000 --name flask-app flask-app",
          "docker exec -it flask-app sh"
        ]
      },
      {
        "id": 2,
        "title": "CMD vs ENTRYPOINT Deep Dive",
        "difficulty": "Beginner",
        "fileType": "Dockerfile",
        "description": "Create three Dockerfiles demonstrating the differences between CMD, ENTRYPOINT, and their combination. First: a simple echo container with default message. Second: a ping utility with required target. Third: a Python script that accepts command-line arguments.",
        "hints": [
          "Use `alpine` as base for all examples",
          "Demonstrate shell vs exec forms of CMD/ENTRYPOINT",
          "Show how CMD arguments can be overridden",
          "Show how ENTRYPOINT with CMD allows both fixed command and variable arguments"
        ],
        "solution": "# Example 1: Simple echo with default message\nFROM alpine\nENTRYPOINT [\"echo\"]\nCMD [\"Hello, Docker!\"]\n# Usage: docker run echo-app\n# Override: docker run echo-app \"Custom message\"\n\n# Example 2: Ping utility with required target\nFROM alpine\nENTRYPOINT [\"ping\"]\nCMD [\"-c\", \"3\", \"localhost\"]\n# Usage: docker run ping-app\n# Override: docker run ping-app -c 5 google.com\n\n# Example 3: Python script with argument parsing\nFROM python:3.11-slim\nWORKDIR /app\nCOPY script.py .\nRUN chmod +x script.py\nENTRYPOINT [\"python\", \"script.py\"]\nCMD [\"--help\"]\n\n# script.py content:\n\"\"\"\nimport argparse\nparser = argparse.ArgumentParser()\nparser.add_argument('--name', default='World')\nargs = parser.parse_args()\nprint(f\"Hello, {args.name}!\")\n\"\"\"",
        "tags": ["ENTRYPOINT", "CMD", "alpine", "exec form", "shell form"],
        "interview_questions": [
          "What's the difference between shell form and exec form in CMD/ENTRYPOINT?",
          "How does ENTRYPOINT differ from CMD? When would you use each?",
          "What happens when you specify both ENTRYPOINT and CMD?",
          "How do you override ENTRYPOINT at runtime?",
          "What's the difference between `CMD command` and `CMD [\"command\"]`?",
          "How does signal handling differ between shell and exec forms?"
        ],
        "commands_to_practice": [
          "docker run echo-app",
          "docker run echo-app \"Custom greeting\"",
          "docker run ping-app",
          "docker run ping-app -c 1 8.8.8.8",
          "docker run --entrypoint sh alpine",
          "docker inspect image-name | grep -A 5 Entrypoint"
        ]
      },
      {
        "id": 9,
        "title": "WORKDIR Best Practices",
        "difficulty": "Beginner",
        "fileType": "Dockerfile",
        "description": "Create a Dockerfile demonstrating proper WORKDIR usage. Show how WORKDIR creates directories, affects relative paths in subsequent instructions, and impacts container entry points. Build a simple Node.js app with proper directory structure.",
        "hints": [
          "WORKDIR creates the directory if it doesn't exist",
          "All subsequent RUN, CMD, COPY, ADD use WORKDIR as base",
          "Use absolute paths for WORKDIR for clarity",
          "Avoid using 'cd' in RUN commands - use WORKDIR instead",
          "WORKDIR persists across build stages"
        ],
        "solution": "FROM node:18-alpine\n\n# Bad practice: using cd in RUN\n# RUN cd /app && npm install  # DON'T DO THIS\n\n# Good practice: use WORKDIR\nWORKDIR /app\n\n# Copy package files (relative to /app)\nCOPY package*.json ./\n\n# Install dependencies (runs in /app)\nRUN npm ci --only=production\n\n# Create additional directories\nWORKDIR /app/logs\nWORKDIR /app/uploads\n\n# Go back to main app directory\nWORKDIR /app\n\n# Copy application source\nCOPY . .\n\n# Create non-root user and set ownership\nRUN addgroup -g 1001 appgroup && \\\n    adduser -D -u 1001 -G appgroup appuser && \\\n    chown -R appuser:appgroup /app\n\nUSER appuser\n\nEXPOSE 3000\n\n# CMD will execute in /app directory\nCMD [\"node\", \"server.js\"]",
        "tags": ["WORKDIR", "directory-structure", "best-practices"],
        "interview_questions": [
          "What happens if WORKDIR points to a non-existent directory?",
          "Why is using WORKDIR better than RUN cd?",
          "How does WORKDIR affect COPY and ADD instructions?",
          "Can you use relative paths with WORKDIR?",
          "How do multiple WORKDIR commands interact?"
        ],
        "commands_to_practice": [
          "docker build -t workdir-demo .",
          "docker run --rm workdir-demo pwd",
          "docker run --rm workdir-demo ls -la",
          "docker exec -it container_name pwd",
          "docker inspect workdir-demo | grep WorkingDir"
        ]
      },
      {
        "id": 10,
        "title": "RUN Command Optimization Patterns",
        "difficulty": "Beginner",
        "fileType": "Dockerfile",
        "description": "Master RUN instruction optimization by creating a Dockerfile that demonstrates command chaining, apt-get best practices, cleaning up in the same layer, and using backslashes for readability. Compare optimized vs non-optimized approaches.",
        "hints": [
          "Chain commands with && to keep them in one layer",
          "Always run apt-get update && apt-get install in same RUN",
          "Clean up apt cache with rm -rf /var/lib/apt/lists/*",
          "Use \\ for multi-line readability",
          "Sort packages alphabetically for maintainability"
        ],
        "solution": "FROM ubuntu:22.04\n\n# ❌ BAD: Multiple RUN commands create unnecessary layers\n# RUN apt-get update\n# RUN apt-get install -y curl\n# RUN apt-get install -y vim\n# RUN apt-get install -y git\n# Each RUN = new layer = larger image\n\n# ❌ BAD: Not cleaning up in same layer\n# RUN apt-get update && apt-get install -y curl vim git\n# RUN rm -rf /var/lib/apt/lists/*  # This doesn't reduce previous layer size!\n\n# ✅ GOOD: Single RUN with cleanup\nRUN apt-get update && apt-get install -y --no-install-recommends \\\n    curl \\\n    git \\\n    vim \\\n    wget \\\n  && rm -rf /var/lib/apt/lists/* \\\n  && apt-get clean\n\n# ✅ GOOD: Installing build deps, using them, then removing\nRUN apt-get update && apt-get install -y --no-install-recommends \\\n    build-essential \\\n    python3-dev \\\n  && pip3 install some-package \\\n  && apt-get purge -y --auto-remove build-essential python3-dev \\\n  && rm -rf /var/lib/apt/lists/*\n\n# ✅ GOOD: Creating multiple directories in one RUN\nRUN mkdir -p /app/data /app/logs /app/config \\\n  && chmod 755 /app/data\n\n# ✅ GOOD: Setting up user in one layer\nRUN groupadd -r appgroup -g 1001 \\\n  && useradd -r -g appgroup -u 1001 appuser \\\n  && mkdir -p /home/appuser \\\n  && chown -R appuser:appgroup /home/appuser\n\nWORKDIR /app\n\nCMD [\"/bin/bash\"]",
        "tags": ["RUN", "layer-optimization", "apt-get", "cleanup"],
        "interview_questions": [
          "Why chain commands with && instead of multiple RUN instructions?",
          "What's the purpose of --no-install-recommends flag?",
          "Why must apt-get update and install be in the same RUN?",
          "What happens if you clean up apt cache in a separate RUN?",
          "How do you temporarily install build dependencies?",
          "What's the difference between apt-get clean and rm -rf /var/lib/apt/lists/*?"
        ],
        "commands_to_practice": [
          "docker build -t run-optimization .",
          "docker history run-optimization",
          "docker images | grep run-optimization",
          "docker run --rm run-optimization apt list --installed",
          "docker build --no-cache -t run-optimization ."
        ]
      },
      {
        "id": 11,
        "title": "Base Image Selection Strategy",
        "difficulty": "Beginner",
        "fileType": "Dockerfile",
        "description": "Create three variants of the same Python application using different base images: debian (full), alpine, and distroless. Compare image sizes, build times, and compatibility. Understand trade-offs of each approach.",
        "hints": [
          "Full images: better compatibility, larger size",
          "Alpine: smallest size, potential libc issues",
          "Distroless: security-focused, no shell",
          "Consider your dependencies and requirements",
          "Measure final image sizes with docker images"
        ],
        "solution": "# Variant 1: Debian-based (full compatibility)\nFROM python:3.11-slim AS debian-variant\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nCMD [\"python\", \"app.py\"]\n# Size: ~150MB, Full package ecosystem, Easy debugging\n\n# Variant 2: Alpine-based (minimal size)\nFROM python:3.11-alpine AS alpine-variant\nWORKDIR /app\n\n# Install build dependencies for packages with C extensions\nRUN apk add --no-cache --virtual .build-deps \\\n    gcc \\\n    musl-dev \\\n    linux-headers \\\n  && apk add --no-cache libffi-dev openssl-dev\n\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt \\\n  && apk del .build-deps\n\nCOPY . .\nCMD [\"python\", \"app.py\"]\n# Size: ~50MB, Potential compatibility issues, Slower builds\n\n# Variant 3: Distroless (security-focused)\nFROM python:3.11-slim AS builder\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --user --no-cache-dir -r requirements.txt\n\nFROM gcr.io/distroless/python3-debian11\nWORKDIR /app\nCOPY --from=builder /root/.local /root/.local\nCOPY . .\nENV PATH=/root/.local/bin:$PATH\nCMD [\"app.py\"]\n# Size: ~60MB, No shell (harder debugging), Better security\n\n# Comparison script\n# docker build --target debian-variant -t app:debian .\n# docker build --target alpine-variant -t app:alpine .\n# docker build -t app:distroless .\n# docker images | grep app",
        "tags": ["base-images", "alpine", "distroless", "debian", "optimization"],
        "interview_questions": [
          "What are the main differences between debian, alpine, and distroless images?",
          "When would you choose alpine over debian-slim?",
          "What are the security advantages of distroless images?",
          "What problems can arise with alpine-based Python images?",
          "How do you debug a distroless container that has no shell?",
          "What's the difference between python:3.11 and python:3.11-slim?"
        ],
        "commands_to_practice": [
          "docker images --format 'table {{.Repository}}:{{.Tag}}\\t{{.Size}}'",
          "docker run --rm app:alpine sh -c 'ldd /usr/local/bin/python'",
          "docker run --rm app:distroless # No shell available",
          "docker history app:debian --no-trunc",
          "docker scout cves app:alpine"
        ]
      },
      {
        "id": 12,
        "title": "LABEL and Metadata Best Practices",
        "difficulty": "Beginner",
        "fileType": "Dockerfile",
        "description": "Create a well-documented Docker image using LABEL instructions following OCI image spec standards. Include version info, maintainer details, source URLs, and build metadata. Implement label schemas for CI/CD integration.",
        "hints": [
          "Use OCI standard labels (org.opencontainers.image.*)",
          "Include version, revision, created date",
          "Add maintainer and documentation URLs",
          "Use ARG to inject dynamic values",
          "Keep labels organized and readable"
        ],
        "solution": "FROM node:18-alpine\n\n# Build arguments for dynamic metadata\nARG BUILD_DATE\nARG VCS_REF\nARG VERSION=1.0.0\n\n# OCI Standard Labels\nLABEL org.opencontainers.image.title=\"My Node.js Application\" \\\n      org.opencontainers.image.description=\"A sample Node.js microservice for demo purposes\" \\\n      org.opencontainers.image.version=\"${VERSION}\" \\\n      org.opencontainers.image.created=\"${BUILD_DATE}\" \\\n      org.opencontainers.image.revision=\"${VCS_REF}\" \\\n      org.opencontainers.image.authors=\"DevOps Team <devops@example.com>\" \\\n      org.opencontainers.image.vendor=\"Example Corp\" \\\n      org.opencontainers.image.licenses=\"MIT\" \\\n      org.opencontainers.image.url=\"https://example.com\" \\\n      org.opencontainers.image.source=\"https://github.com/example/myapp\" \\\n      org.opencontainers.image.documentation=\"https://docs.example.com/myapp\"\n\n# Custom labels for internal tooling\nLABEL com.example.department=\"engineering\" \\\n      com.example.team=\"backend\" \\\n      com.example.environment=\"production\" \\\n      com.example.release-id=\"${VERSION}\" \\\n      com.example.build-tool=\"docker-buildx\"\n\nWORKDIR /app\n\nCOPY package*.json ./\nRUN npm ci --only=production\n\nCOPY . .\n\nEXPOSE 3000\n\nCMD [\"node\", \"server.js\"]",
        "tags": ["LABEL", "metadata", "OCI", "documentation"],
        "interview_questions": [
          "Why use OCI-compliant label names?",
          "How do labels help with image management in production?",
          "What's the difference between LABEL and ENV?",
          "How do you query image labels at runtime?",
          "What information should always be in image labels?",
          "How do labels integrate with container orchestration platforms?"
        ],
        "commands_to_practice": [
          "docker build --build-arg VERSION=2.0.0 --build-arg BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') --build-arg VCS_REF=$(git rev-parse --short HEAD) -t myapp .",
          "docker inspect myapp | jq '.[0].Config.Labels'",
          "docker images --filter 'label=org.opencontainers.image.version=1.0.0'",
          "docker inspect --format='{{json .Config.Labels}}' myapp | jq",
          "docker image inspect myapp -f '{{.Config.Labels}}'"
        ]
      },
      {
        "id": 3,
        "title": "ARG & ENV Build Variables",
        "difficulty": "Intermediate",
        "fileType": "Dockerfile",
        "description": "Write a Dockerfile for a Node.js app that accepts build-time arguments for VERSION, BUILD_DATE, and NODE_ENV. Bake these into runtime environment variables and label the image with metadata. The app entry point is `server.js` on port 8080.",
        "hints": [
          "Use `node:20-alpine` as base.",
          "Declare ARGs with default values before using them.",
          "Set ENV variables using the ARG values.",
          "Use LABEL instruction to add metadata.",
          "Build with multiple build arguments."
        ],
        "solution": "FROM node:20-alpine\n\n# Build arguments with defaults\nARG NODE_ENV=production\nARG APP_VERSION=1.0.0\nARG BUILD_DATE\nARG VCS_REF\n\n# Set environment variables\nENV NODE_ENV=$NODE_ENV\nENV APP_VERSION=$APP_VERSION\n\n# Labels for metadata\nLABEL maintainer=\"dev@example.com\" \\\n      version=\"${APP_VERSION}\" \\\n      build-date=\"${BUILD_DATE}\" \\\n      vcs-ref=\"${VCS_REF}\" \\\n      description=\"Node.js application with build-time configuration\"\n\nWORKDIR /app\n\n# Copy package files and install dependencies\nCOPY package*.json ./\nRUN if [ \"$NODE_ENV\" = \"production\" ]; then \\\n        npm install --only=production --no-cache; \\\n    else \\\n        npm install --no-cache; \\\n    fi\n\n# Copy application source\nCOPY . .\n\n# Create non-root user\nRUN addgroup -g 1001 -S nodejs && \\\n    adduser -S nodejs -u 1001 && \\\n    chown -R nodejs:nodejs /app\nUSER nodejs\n\nEXPOSE 8080\n\n# Health check\nHEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\\n  CMD node -e \"require('http').get('http://localhost:8080/health', (r) => {r.statusCode === 200 ? process.exit(0) : process.exit(1)})\"\n\nCMD [\"node\", \"server.js\"]",
        "tags": ["ARG", "ENV", "LABEL", "node", "build-time variables", "security"],
        "interview_questions": [
          "What's the difference between ARG and ENV? When would you use each?",
          "How do you pass build arguments to `docker build`?",
          "Can ARG values be used in multiple stages?",
          "What happens to ARG values in the final image?",
          "How would you handle secrets in Docker builds?",
          "Why is it important to create a non-root user in the container?",
          "What's the purpose of HEALTHCHECK and how does it work?"
        ],
        "commands_to_practice": [
          "docker build --build-arg APP_VERSION=2.0.0 --build-arg BUILD_DATE=$(date -Iseconds) -t node-app .",
          "docker build --build-arg NODE_ENV=development -t node-app-dev .",
          "docker inspect node-app | grep -A 10 Labels",
          "docker run -e NODE_ENV=development node-app",
          "docker run --env-file .env node-app",
          "docker run --health-cmd='curl -f http://localhost:8080/health || exit 1' node-app"
        ]
      },
      {
        "id": 4,
        "title": "Multi-stage Build for Go Application",
        "difficulty": "Intermediate",
        "fileType": "Dockerfile",
        "description": "Create a multi-stage Dockerfile for a Go application. The first stage should compile the Go binary, and the final stage should be a minimal scratch image. Include build arguments for version and use layer caching effectively. Ensure the final image is as small as possible.",
        "hints": [
          "First stage: use `golang:1.20-alpine` for compilation",
          "Set CGO_ENABLED=0 for static binary",
          "Use `-ldflags` to embed version information",
          "Second stage: use `scratch` or `alpine` for runtime",
          "Copy only the compiled binary from builder stage",
          "Set appropriate timezone data if needed"
        ],
        "solution": "# Build stage\nFROM golang:1.20-alpine AS builder\n\n# Build arguments\nARG APP_VERSION=1.0.0\nARG BUILD_DATE\n\n# Install build dependencies\nRUN apk add --no-cache git ca-certificates tzdata\n\n# Set working directory\nWORKDIR /app\n\n# Copy go mod files first for caching\nCOPY go.mod go.sum ./\nRUN go mod download\n\n# Copy source code\nCOPY . .\n\n# Build the binary with version info\nRUN CGO_ENABLED=0 GOOS=linux go build \\\n    -ldflags=\"-w -s -X main.version=${APP_VERSION} -X main.buildDate=${BUILD_DATE}\" \\\n    -o /app/main \\\n    ./cmd/app\n\n# Final stage\nFROM scratch\n\n# Copy timezone data and certificates from builder\nCOPY --from=builder /usr/share/zoneinfo /usr/share/zoneinfo\nCOPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/\n\n# Copy the binary\nCOPY --from=builder /app/main /app/main\n\n# Create non-root user (scratch doesn't have user management, so use numeric IDs)\n# Note: For scratch, we can't create users, but we can set ownership\n\n# Expose port\nEXPOSE 8080\n\n# Set security options\nUSER 1000:1000\n\n# Health check (requires curl or wget, so skip for scratch)\n\n# Run the application\nENTRYPOINT [\"/app/main\"]\nCMD [\"--help\"]",
        "tags": ["multi-stage", "go", "scratch", "optimization", "security"],
        "interview_questions": [
          "What are the benefits of multi-stage builds?",
          "Why use scratch as a base image? What are the trade-offs?",
          "How do you handle dependencies in a multi-stage build?",
          "What's the purpose of `CGO_ENABLED=0`?",
          "How do you reduce image size in Go applications?",
          "What's the difference between `COPY --from` and `COPY`?",
          "How do you debug containers built from scratch?"
        ],
        "commands_to_practice": [
          "docker build --build-arg APP_VERSION=2.0.0 -t go-app .",
          "docker images | grep go-app",
          "docker run --rm go-app --version",
          "docker run --rm go-app --help",
          "docker history go-app --no-trunc",
          "docker run --user 1000:1000 go-app",
          "docker run --security-opt=no-new-privileges:true go-app"
        ]
      },
      {
        "id": 5,
        "title": "Optimized Python Image with Poetry",
        "difficulty": "Intermediate",
        "fileType": "Dockerfile",
        "description": "Create a Dockerfile for a Python application using Poetry for dependency management. Use multi-stage builds to separate dependencies installation from runtime. Optimize caching and ensure only production dependencies are installed in the final image.",
        "hints": [
          "First stage: install Poetry and dependencies",
          "Use `--no-root` flag to avoid installing the project itself",
          "Use `poetry export` to create requirements.txt for production stage",
          "Final stage: copy only needed files from builder",
          "Set `POETRY_VIRTUALENVS_CREATE=false` to install in system Python"
        ],
        "solution": "# Builder stage\nFROM python:3.11-slim AS builder\n\nWORKDIR /app\n\n# Install Poetry\nRUN pip install --no-cache-dir poetry==1.4.2\n\n# Copy dependency files\nCOPY pyproject.toml poetry.lock ./\n\n# Configure Poetry to not create virtual environment\nRUN poetry config virtualenvs.create false\n\n# Install dependencies (including dev for testing)\nRUN poetry install --no-interaction --no-ansi\n\n# Runtime stage\nFROM python:3.11-slim\n\n# Create non-root user\nRUN groupadd -r appuser && useradd -r -g appuser appuser\n\nWORKDIR /app\n\n# Copy installed packages from builder\nCOPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages\nCOPY --from=builder /usr/local/bin /usr/local/bin\n\n# Copy application code\nCOPY --chown=appuser:appuser . .\n\n# Set environment variables\nENV PYTHONUNBUFFERED=1 \\\n    PYTHONDONTWRITEBYTECODE=1\n\n# Switch to non-root user\nUSER appuser\n\nEXPOSE 8000\n\n# Health check\nHEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\\n    CMD python -c \"import requests; requests.get('http://localhost:8000/health')\" || exit 1\n\nCMD [\"uvicorn\", \"main:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]",
        "tags": ["poetry", "multi-stage", "python", "dependencies", "uvicorn"],
        "interview_questions": [
          "Why use Poetry over requirements.txt? What are the benefits?",
          "How does Poetry's lock file improve build reproducibility?",
          "Why use multi-stage builds with Poetry?",
          "What's the difference between `poetry install` with and without `--no-dev`?",
          "How would you handle private package repositories in Docker builds?",
          "Why set `PYTHONDONTWRITEBYTECODE=1`?"
        ],
        "commands_to_practice": [
          "docker build -t python-poetry-app .",
          "docker run -d -p 8000:8000 --name poetry-app python-poetry-app",
          "docker exec -it poetry-app pip list",
          "docker run --entrypoint poetry python-poetry-app show",
          "docker inspect poetry-app | grep -A 10 Health"
        ]
      },
      {
        "id": 6,
        "title": "COPY vs ADD Deep Dive",
        "difficulty": "Intermediate",
        "fileType": "Dockerfile",
        "description": "Create a Dockerfile that demonstrates the differences between COPY and ADD. Include examples of copying local files, adding remote URLs, extracting tar archives, and handling special characters. Discuss when to use each instruction.",
        "hints": [
          "Use ADD to extract tar archives automatically",
          "Use ADD to copy from remote URLs (though not recommended for production)",
          "Use COPY for simple local file copying",
          "Demonstrate both shell and glob patterns",
          "Include .dockerignore patterns to exclude unnecessary files"
        ],
        "solution": "# Dockerfile demonstrating COPY vs ADD\nFROM alpine:latest\n\nWORKDIR /app\n\n# COPY: Simple local file copying\nCOPY README.md ./README.md\nCOPY configs/*.conf ./configs/\n\n# COPY: With .dockerignore filtering\nCOPY . .\n\n# ADD: Auto-extracting tar archives\nADD archive.tar.gz ./\n\n# ADD: Copy from URL (avoid in production - use wget/curl in RUN)\nADD https://example.com/file.txt ./downloaded-file.txt\n\n# Better alternative for remote files\nRUN wget -q https://example.com/file.txt -O ./better-file.txt\n\n# ADD with special characters in filename\nADD 'file[special].txt' ./\n\n# Create sample files for demonstration\nRUN echo \"Sample content\" > sample.txt && \\\n    mkdir -p archive && \\\n    echo \"tar content\" > archive/tar-file.txt && \\\n    tar -czf archive.tar.gz archive/ && \\\n    rm -rf archive\n\n# .dockerignore file\n*.md\n.git\n__pycache__\n*.pyc\n.env\n.vscode\nnode_modules\n*.log",
        "tags": ["COPY", "ADD", ".dockerignore", "file operations"],
        "interview_questions": [
          "What's the difference between COPY and ADD? When should you use each?",
          "Why is ADD with remote URLs considered an anti-pattern?",
          "How does ADD handle tar archive extraction?",
          "What happens when you COPY a directory?",
          "How does .dockerignore affect COPY and ADD?",
          "What are the security implications of using ADD with URLs?"
        ],
        "commands_to_practice": [
          "docker build -t copy-vs-add .",
          "docker run --rm copy-vs-add ls -la /app",
          "docker run --rm copy-vs-add cat /app/sample.txt",
          "docker build --no-cache -t copy-vs-add .",
          "docker history copy-vs-add --no-trunc"
        ]
      },
      {
        "id": 7,
        "title": "Dockerfile Security Best Practices",
        "difficulty": "Advanced",
        "fileType": "Dockerfile",
        "description": "Create a secure Dockerfile for a Python application implementing all security best practices: non-root user, dropping capabilities, read-only root filesystem, secrets management, and using minimal base images. Include security scanning and content trust.",
        "hints": [
          "Use `python:3.11-slim` or `python:3.11-alpine` as base",
          "Create and use a non-root user",
          "Drop all capabilities and add only required ones",
          "Make root filesystem read-only",
          "Use multi-stage builds to exclude build tools",
          "Handle secrets using build secrets (BuildKit)",
          "Add security scanning labels"
        ],
        "solution": "# syntax=docker/dockerfile:1.4\nFROM python:3.11-slim AS builder\n\n# Install security updates\nRUN apt-get update && apt-get upgrade -y && \\\n    apt-get install -y --no-install-recommends build-essential && \\\n    apt-get clean && rm -rf /var/lib/apt/lists/*\n\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\n# Final stage\nFROM python:3.11-slim\n\n# Install runtime dependencies and security updates\nRUN apt-get update && apt-get upgrade -y && \\\n    apt-get install -y --no-install-recommends ca-certificates && \\\n    apt-get clean && rm -rf /var/lib/apt/lists/*\n\n# Create non-root user\nRUN groupadd -r appuser && useradd -r -g appuser appuser\n\n# Copy application files\nWORKDIR /app\nCOPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages\nCOPY --chown=appuser:appuser . .\n\n# Security settings\nENV PYTHONUNBUFFERED=1 \\\n    PYTHONDONTWRITEBYTECODE=1 \\\n    PATH=\"/app/bin:$PATH\"\n\n# Drop all capabilities and add only required ones\nRUN setcap 'cap_net_bind_service=+ep' /usr/local/bin/python3.11\n\n# Switch to non-root user\nUSER appuser\n\n# Make root filesystem read-only (except /tmp and /app)\n# Note: This requires running with --read-only flag at runtime\n\nEXPOSE 8000\n\n# Add security labels\nLABEL security.updated=\"$(date -u +'%Y-%m-%dT%H:%M:%SZ')\" \\\n      security.scanned=\"true\" \\\n      org.opencontainers.image.source=\"https://github.com/example/app\"\n\n# Health check (with appropriate permissions)\nHEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\\n    CMD python -c \"import urllib.request; urllib.request.urlopen('http://localhost:8000/health')\" || exit 1\n\n# Run with limited capabilities\nCMD [\"python\", \"app.py\"]",
        "tags": ["security", "non-root", "capabilities", "read-only", "best-practices"],
        "interview_questions": [
          "What are the security risks of running containers as root?",
          "What are Linux capabilities and how do they improve security?",
          "Why would you make the root filesystem read-only?",
          "How do you handle secrets in Docker builds?",
          "What's the difference between Docker secrets and build secrets?",
          "How do you scan Docker images for vulnerabilities?",
          "What is Docker Content Trust and how does it work?"
        ],
        "commands_to_practice": [
          "docker build --secret id=mysecret,src=secret.txt -t secure-app .",
          "docker run --read-only --tmpfs /tmp --user 1000:1000 --cap-drop=ALL --cap-add=NET_BIND_SERVICE secure-app",
          "docker scan secure-app",
          "docker trust inspect secure-app",
          "docker run --security-opt=no-new-privileges:true secure-app",
          "docker run --security-opt=seccomp=seccomp.json secure-app"
        ]
      },
      {
        "id": 8,
        "title": "Build Context Optimization",
        "difficulty": "Advanced",
        "fileType": ".dockerignore",
        "description": "Optimize the Docker build process by strategically using .dockerignore, .gitignore patterns, and build context management. Create a project structure with multiple Dockerfiles and demonstrate how to minimize build context size and improve build speed.",
        "hints": [
          "Use .dockerignore to exclude unnecessary files",
          "Consider splitting monolithic applications into services",
          "Use specific COPY instructions instead of COPY .",
          "Leverage build contexts from Git repositories",
          "Use Docker BuildKit for advanced features"
        ],
        "solution": "# Project structure\nproject/\n├── .dockerignore\n├── docker-compose.yml\n├── services/\n│   ├── api/\n│   │   ├── Dockerfile\n│   │   ├── .dockerignore\n│   │   └── src/\n│   ├── web/\n│   │   ├── Dockerfile\n│   │   └── public/\n│   └── worker/\n│       ├── Dockerfile\n│       └── app/\n└── shared/\n    └── common/\n\n# Root .dockerignore\n.git\n.gitignore\nREADME.md\n*.md\n.env\n.env.*\n*.log\nnode_modules/\n__pycache__/\n*.pyc\n.DS_Store\ndocker-compose*.yml\n.Dockerfile*\n\n# services/api/.dockerignore\n**/__pycache__\n**/*.pyc\n**/*.pyo\n**/*.pyd\n.Python\n*.so\n*.egg\n*.egg-info\ndist\nbuild\n*.log\n.env\n.venv\nvenv\n.coverage\nhtmlcov/\n.pytest_cache/\n\n# Build command with specific context\ndocker build -t api-service -f services/api/Dockerfile services/api\n\n# Using BuildKit for parallel builds\nexport DOCKER_BUILDKIT=1\ndocker build --progress=plain -t api-service -f services/api/Dockerfile services/api\n\n# Multi-context build\ndocker buildx build \\\n  --build-context api=./services/api \\\n  --build-context shared=./shared \\\n  -t app .\n\n# Dockerfile using multiple contexts\nFROM python:3.11-slim AS builder\nCOPY --from=api ./src /app/src\nCOPY --from=shared ./common /app/common\n\n# Optimized .dockerignore for Node.js projects\nnode_modules\nnpm-debug.log\nyarn-error.log\ncoverage\n.env\n.DS_Store\n.git\n.gitignore\nREADME.md\n.dockerignore\nDockerfile*\ndocker-compose*.yml\n*.log\n*.lock\n",
        "tags": [".dockerignore", "build-context", "optimization", "BuildKit"],
        "interview_questions": [
          "What is build context and why does it matter?",
          "How does .dockerignore differ from .gitignore?",
          "What's the impact of a large build context on CI/CD?",
          "How do you optimize Docker builds for monorepos?",
          "What is Docker BuildKit and what benefits does it provide?",
          "How do you use multiple build contexts?"
        ],
        "commands_to_practice": [
          "docker build -t app . 2>&1 | grep \"Sending build context\"",
          "docker build --no-cache -t app .",
          "export DOCKER_BUILDKIT=1 && docker build -t app .",
          "docker buildx create --use",
          "docker buildx build --platform linux/amd64,linux/arm64 -t app .",
          "docker system df"
        ]
      },
      {
        "id": 13,
        "title": "HEALTHCHECK Implementation",
        "difficulty": "Intermediate",
        "fileType": "Dockerfile",
        "description": "Implement comprehensive health checks for different application types: HTTP service, database, queue processor. Configure appropriate intervals, timeouts, and retry logic. Demonstrate how orchestrators use health check status.",
        "hints": [
          "HEALTHCHECK CMD runs inside the container",
          "Use --interval, --timeout, --start-period, --retries",
          "Exit code 0 = healthy, 1 = unhealthy",
          "Install curl/wget if needed for HTTP checks",
          "Consider startup time with --start-period"
        ],
        "solution": "# Example 1: HTTP API Health Check\nFROM node:18-alpine AS api-service\n\n# Install curl for health checks\nRUN apk add --no-cache curl\n\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\n\n# Comprehensive health check\nHEALTHCHECK --interval=30s \\\n            --timeout=10s \\\n            --start-period=40s \\\n            --retries=3 \\\n  CMD curl -f http://localhost:3000/health || exit 1\n\nEXPOSE 3000\nCMD [\"node\", \"server.js\"]\n\n# Example 2: Database Health Check\nFROM postgres:15-alpine AS database\n\nHEALTHCHECK --interval=10s \\\n            --timeout=5s \\\n            --start-period=30s \\\n            --retries=5 \\\n  CMD pg_isready -U postgres || exit 1\n\n# Example 3: Python Worker with Custom Check\nFROM python:3.11-slim AS worker\n\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\n\n# Custom health check script\nCOPY healthcheck.py /healthcheck.py\nRUN chmod +x /healthcheck.py\n\nHEALTHCHECK --interval=30s \\\n            --timeout=10s \\\n            --start-period=60s \\\n            --retries=3 \\\n  CMD python /healthcheck.py || exit 1\n\nCMD [\"python\", \"worker.py\"]\n\n# healthcheck.py example:\n\"\"\"\nimport sys\nimport redis\nimport psycopg2\n\ntry:\n    # Check Redis connection\n    r = redis.Redis(host='redis', port=6379)\n    r.ping()\n    \n    # Check database connection\n    conn = psycopg2.connect(\"dbname=mydb user=user host=db\")\n    conn.close()\n    \n    # Check if worker is processing\n    # Add your custom logic here\n    \n    sys.exit(0)  # Healthy\nexcept Exception as e:\n    print(f\"Health check failed: {e}\")\n    sys.exit(1)  # Unhealthy\n\"\"\"",
        "tags": ["HEALTHCHECK", "monitoring", "reliability"],
        "interview_questions": [
          "What's the difference between liveness and readiness probes?",
          "How do orchestrators like Kubernetes use HEALTHCHECK?",
          "What happens when a container fails health checks?",
          "Why use --start-period? When would you increase it?",
          "What's the best way to implement a health check endpoint?",
          "How do health checks affect container restarts?"
        ],
        "commands_to_practice": [
          "docker run -d --name api api-service",
          "docker inspect api | grep -A 20 Healthcheck",
          "watch -n 1 'docker inspect api | grep Health -A 10'",
          "docker ps # Shows health status",
          "docker events --filter event=health_status",
          "docker inspect --format='{{.State.Health.Status}}' api"
        ]
      },
      {
        "id": 14,
        "title": "Multi-stage Build for Java Spring Boot",
        "difficulty": "Intermediate",
        "fileType": "Dockerfile",
        "description": "Create an optimized multi-stage Dockerfile for a Java Spring Boot application using Maven. First stage builds the JAR, second stage runs it. Implement layer caching for Maven dependencies and minimize final image size using JRE instead of JDK.",
        "hints": [
          "Use maven:3.9-eclipse-temurin for build stage",
          "Copy pom.xml first and run dependency download for caching",
          "Use eclipse-temurin:17-jre-alpine for runtime",
          "Extract layers from Spring Boot JAR for better caching",
          "Run as non-root user"
        ],
        "solution": "# Build stage\nFROM maven:3.9-eclipse-temurin-17 AS builder\n\nWORKDIR /app\n\n# Copy pom.xml and download dependencies (cached layer)\nCOPY pom.xml .\nRUN mvn dependency:go-offline -B\n\n# Copy source and build\nCOPY src ./src\nRUN mvn clean package -DskipTests -B\n\n# Extract JAR layers for better caching\nRUN mkdir -p target/dependency && \\\n    cd target/dependency && \\\n    jar -xf ../*.jar\n\n# Runtime stage\nFROM eclipse-temurin:17-jre-alpine\n\n# Add necessary packages\nRUN apk add --no-cache curl\n\n# Create non-root user\nRUN addgroup -g 1001 appgroup && \\\n    adduser -D -u 1001 -G appgroup appuser\n\nWORKDIR /app\n\n# Copy layers from builder (in order of change frequency)\nCOPY --from=builder /app/target/dependency/BOOT-INF/lib ./lib\nCOPY --from=builder /app/target/dependency/META-INF ./META-INF\nCOPY --from=builder /app/target/dependency/BOOT-INF/classes ./\n\n# Alternatively, copy the entire JAR\n# COPY --from=builder /app/target/*.jar app.jar\n\nRUN chown -R appuser:appgroup /app\nUSER appuser\n\n# JVM tuning for containers\nENV JAVA_OPTS=\"-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -XX:+UseG1GC\"\n\nEXPOSE 8080\n\n# Health check\nHEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \\\n  CMD curl -f http://localhost:8080/actuator/health || exit 1\n\n# Run with extracted layers\nENTRYPOINT [\"java\", \"-cp\", \".:lib/*\", \"com.example.Application\"]\n\n# Or run with JAR\n# ENTRYPOINT [\"java\", \"-jar\", \"app.jar\"]",
        "tags": ["java", "spring-boot", "maven", "multi-stage", "jvm"],
        "interview_questions": [
          "Why separate dependency download from source compilation?",
          "What's the benefit of extracting JAR layers?",
          "Why use JRE instead of JDK in production?",
          "What do the JVM container flags do?",
          "How does Maven dependency caching work in Docker?",
          "What's the difference between ADD and COPY for JAR files?",
          "How do you handle Spring Boot actuator in containers?"
        ],
        "commands_to_practice": [
          "docker build -t spring-app .",
          "docker run -d -p 8080:8080 -m 512m --name spring-app spring-app",
          "docker logs -f spring-app",
          "docker exec spring-app java -XX:+PrintFlagsFinal -version | grep -i container",
          "docker stats spring-app",
          "curl http://localhost:8080/actuator/health"
        ]
      },
      {
        "id": 15,
        "title": "SHELL Instruction and Shell Forms",
        "difficulty": "Intermediate",
        "fileType": "Dockerfile",
        "description": "Understand and use the SHELL instruction to change the default shell. Demonstrate differences between shell form and exec form for RUN, CMD, and ENTRYPOINT. Show Windows vs Linux shell handling and PowerShell usage.",
        "hints": [
          "Default shell on Linux: [\"/bin/sh\", \"-c\"]",
          "SHELL changes default for subsequent instructions",
          "Exec form doesn't invoke a shell",
          "Shell form enables variable expansion and piping",
          "Consider signal handling differences"
        ],
        "solution": "# Example 1: Changing shell for RUN commands\nFROM ubuntu:22.04\n\n# Default shell is /bin/sh -c\nRUN echo \"Using default shell: $0\"\n\n# Change to bash for better features\nSHELL [\"/bin/bash\", \"-c\"]\n\nRUN echo \"Now using bash: $0\" && \\\n    [[ \"$0\" == *\"bash\"* ]] && echo \"Confirmed!\"\n\n# Use bash-specific features\nRUN source /etc/profile && \\\n    echo \"Process substitution: \" <(echo \"test\")\n\n# Example 2: Demonstrating exec vs shell form\nFROM alpine:latest\n\n# Shell form - invokes /bin/sh\nRUN echo \"This runs in shell: ps shows /bin/sh\"\n\n# Exec form - no shell\nRUN [\"echo\", \"Direct execution without shell\"]\n\n# Shell form with variable expansion\nENV NAME=World\nRUN echo \"Hello, $NAME\"  # Works\n\n# Exec form - no variable expansion\nRUN [\"echo\", \"Hello, $NAME\"]  # Prints literally \"Hello, $NAME\"\n\n# To use variables in exec form\nRUN [\"sh\", \"-c\", \"echo Hello, $NAME\"]  # Works\n\n# Example 3: Signal handling differences\nFROM node:18-alpine\n\nWORKDIR /app\nCOPY server.js .\n\n# ❌ Shell form - signals go to shell, not node\n# CMD node server.js\n\n# ✅ Exec form - signals go directly to node\nCMD [\"node\", \"server.js\"]\n\n# Example 4: Windows container with PowerShell\n# FROM mcr.microsoft.com/windows/servercore:ltsc2022\n# SHELL [\"powershell\", \"-Command\"]\n# RUN Write-Host \"Using PowerShell\"\n# RUN Get-ChildItem Env:",
        "tags": ["SHELL", "exec-form", "shell-form", "signals", "bash"],
        "interview_questions": [
          "What's the difference between shell form and exec form?",
          "How does SHELL instruction affect subsequent RUN commands?",
          "Why does signal handling differ between shell and exec forms?",
          "When would you need to change the default shell?",
          "How do environment variables work in exec vs shell form?",
          "What happens to signals in a shell form CMD?"
        ],
        "commands_to_practice": [
          "docker build -t shell-demo .",
          "docker run --rm shell-demo",
          "docker run --rm shell-demo sh -c 'echo $0'",
          "docker run shell-demo # Test signal handling with Ctrl+C",
          "docker inspect shell-demo | grep -A 3 Cmd"
        ]
      },
      {
        "id": 16,
        "title": "USER Instruction and Permissions",
        "difficulty": "Intermediate",
        "fileType": "Dockerfile",
        "description": "Master the USER instruction by creating containers that run as non-root users. Handle file permissions, understand UID/GID mapping, and implement security best practices. Demonstrate issues that arise from incorrect permissions.",
        "hints": [
          "Create user with specific UID/GID for consistency",
          "Set ownership before switching to USER",
          "Use numeric UIDs for better portability",
          "Consider volume mount permissions",
          "Root may still be needed for specific tasks"
        ],
        "solution": "FROM python:3.11-slim\n\n# Create user early in the build\nRUN groupadd -r -g 1001 appgroup && \\\n    useradd -r -u 1001 -g appgroup -m -d /home/appuser -s /bin/bash appuser\n\nWORKDIR /app\n\n# Install dependencies as root\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\n# Copy application files\nCOPY --chown=appuser:appgroup . .\n\n# Create directories that the app will write to\nRUN mkdir -p /app/logs /app/data && \\\n    chown -R appuser:appgroup /app/logs /app/data\n\n# Demonstrate permission handling\nRUN ls -la /app\n\n# Switch to non-root user\nUSER appuser\n\n# Verify current user\nRUN whoami && id\n\n# ❌ This would fail - no permission to install packages\n# RUN apt-get update && apt-get install -y vim\n\n# ✅ This works - writing to owned directory\nRUN echo \"test\" > /app/logs/build.log\n\nEXPOSE 8000\n\n# Alternative: Using numeric UID (better for k8s)\n# USER 1001:1001\n\n# For volumes, consider runtime permissions:\n# docker run -v /host/data:/app/data --user 1001:1001 app\n\nCMD [\"python\", \"app.py\"]\n\n# Example with specific capabilities\n# If you need to bind to privileged ports (<1024)\n# Keep USER root, or use:\n# RUN setcap 'cap_net_bind_service=+ep' /usr/local/bin/python3.11\n# USER appuser",
        "tags": ["USER", "permissions", "security", "non-root"],
        "interview_questions": [
          "Why run containers as non-root users?",
          "What problems can arise with USER and volume mounts?",
          "How do you handle files that need root permissions?",
          "What's the difference between numeric and named UIDs?",
          "How do USER permissions interact with COPY --chown?",
          "What are Linux capabilities and when would you use them?"
        ],
        "commands_to_practice": [
          "docker build -t user-demo .",
          "docker run --rm user-demo id",
          "docker run --rm user-demo whoami",
          "docker run --rm user-demo ls -la /app",
          "docker run --user 0 user-demo whoami",
          "docker run -v $(pwd)/data:/app/data user-demo ls -la /app/data"
        ]
      },
      {
        "id": 17,
        "title": "ONBUILD Triggers for Template Images",
        "difficulty": "Advanced",
        "fileType": "Dockerfile",
        "description": "Create a base image with ONBUILD instructions that automatically configure child images. Build a reusable Node.js base image that handles npm install, copying source code, and setting up the environment for any child image.",
        "hints": [
          "ONBUILD executes in child images, not the base",
          "Use for creating template/parent images",
          "Common in language-specific base images",
          "Be careful with ONBUILD - can make debugging harder",
          "Document ONBUILD triggers clearly"
        ],
        "solution": "# Parent Image: node-base with ONBUILD\n# File: Dockerfile.base\nFROM node:18-alpine\n\n# Install common dependencies\nRUN apk add --no-cache dumb-init curl\n\n# Set up working directory\nWORKDIR /app\n\n# ONBUILD triggers - execute when this image is used as FROM\nONBUILD COPY package*.json ./\nONBUILD RUN npm ci --only=production && npm cache clean --force\nONBUILD COPY . .\nONBUILD RUN if [ -f \"postinstall.sh\" ]; then sh postinstall.sh; fi\n\n# Create user\nRUN addgroup -g 1001 nodejs && \\\n    adduser -D -u 1001 -G nodejs nodejs && \\\n    chown -R nodejs:nodejs /app\n\nUSER nodejs\n\nEXPOSE 3000\n\n# Default command (can be overridden)\nCMD [\"dumb-init\", \"node\", \"index.js\"]\n\n# Build parent: docker build -f Dockerfile.base -t node-base .\n\n# ============================================\n# Child Image: Specific application\n# File: Dockerfile\nFROM node-base\n\n# ONBUILD triggers fire here automatically:\n# 1. COPY package*.json ./\n# 2. RUN npm ci --only=production\n# 3. COPY . .\n# 4. RUN postinstall.sh if exists\n\n# Child can add its own customization\nENV NODE_ENV=production\nEXPOSE 8080\n\n# Override default command if needed\nCMD [\"dumb-init\", \"node\", \"server.js\"]\n\n# Build child: docker build -t my-app .\n# The child Dockerfile is minimal but gets all ONBUILD behavior\n\n# ============================================\n# Example: Python ONBUILD base\n# FROM python:3.11-slim\n# WORKDIR /app\n# ONBUILD COPY requirements.txt .\n# ONBUILD RUN pip install --no-cache-dir -r requirements.txt\n# ONBUILD COPY . .\n# CMD [\"python\", \"app.py\"]",
        "tags": ["ONBUILD", "base-images", "templates", "inheritance"],
        "interview_questions": [
          "What is ONBUILD and when should you use it?",
          "Why is ONBUILD considered an anti-pattern by some?",
          "How do you debug issues caused by ONBUILD triggers?",
          "What's the order of execution for ONBUILD instructions?",
          "Can ONBUILD instructions be nested?",
          "How do you view ONBUILD triggers in an image?",
          "What are alternatives to ONBUILD for creating reusable base images?"
        ],
        "commands_to_practice": [
          "docker build -f Dockerfile.base -t node-base .",
          "docker inspect node-base | grep -A 10 OnBuild",
          "docker history node-base",
          "docker build -t my-app .",
          "docker history my-app | grep -i onbuild"
        ]
      },
      {
        "id": 18,
        "title": "Advanced .dockerignore Patterns",
        "difficulty": "Intermediate",
        "fileType": ".dockerignore",
        "description": "Master .dockerignore patterns for different project types. Create ignore files for monorepos, multi-language projects, and complex directory structures. Understand pattern matching, negation, and performance optimization.",
        "hints": [
          "Use ! to negate patterns (include exceptions)",
          "Patterns are relative to build context",
          "Order matters - later rules override earlier ones",
          "Use **/ for recursive matching",
          "Test with docker build --no-cache"
        ],
        "solution": "# .dockerignore for Full-Stack Monorepo\n\n# Git and version control\n.git\n.gitignore\n.gitattributes\n.github/\n\n# Documentation\n*.md\n!README.md  # Exception: keep README.md\nDOCS/\ndocs/\n\n# IDE and editor files\n.vscode/\n.idea/\n*.swp\n*.swo\n*~\n.DS_Store\n\n# Environment and secrets\n.env\n.env.*\n!.env.example  # Keep example env file\n*.key\n*.pem\n*.p12\n\n# Dependencies\nnode_modules/\n**/node_modules/\nvenv/\n.venv/\n**/__pycache__/\n*.pyc\n*.pyo\n*.egg-info/\nvendor/\n\n# Build outputs\nbuild/\ndist/\n*.log\n*.tgz\n*.zip\n\n# Testing\n.coverage\nhtmlcov/\n.pytest_cache/\njest.config.js\n*.test.js\n*.spec.js\n**/__tests__/\n**/__mocks__/\ncoverage/\n\n# Temporary files\n*.tmp\n*.temp\n.cache/\n\n# Database files\n*.db\n*.sqlite\n*.sqlite3\n\n# CI/CD\n.gitlab-ci.yml\n.travis.yml\nJenkinsfile\n.circleci/\n\n# Docker files (don't copy into themselves)\nDockerfile*\ndocker-compose*.yml\n.dockerignore\n\n# OS specific\nThumbs.db\n.DS_Store\n\n# Project specific\nscripts/local-dev/\ntools/\n\n# Large media (copy selectively)\n*.mp4\n*.mov\n*.avi\n\n# Keep specific files despite broader ignore\n!scripts/entrypoint.sh\n!config/production.json\n\n# ============================================\n# Example 2: Python-specific\n\n# Byte-compiled / optimized / DLL files\n__pycache__/\n*.py[cod]\n*$py.class\n\n# Distribution / packaging\n.Python\nbuild/\ndevelop-eggs/\ndist/\ndownloads/\neggs/\n.eggs/\nlib/\nlib64/\nparts/\nsdist/\nvar/\nwheels/\n*.egg-info/\n.installed.cfg\n*.egg\n\n# Testing\n.tox/\n.coverage\n.coverage.*\n.cache\nnosetests.xml\ncoverage.xml\n*.cover\n.pytest_cache/\n\n# Environments\n.env\n.venv\nenv/\nvenv/\nENV/\nenv.bak/\nvenv.bak/\n\n# ============================================\n# Example 3: Node.js specific\n\nnode_modules/\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\n.pnpm-debug.log*\n.yarn/\n\n# Testing\ncoverage/\n.nyc_output\n\n# Production\nbuild/\ndist/\n.next/\nout/\n\n# Misc\n.DS_Store\n*.pem\n\n# Local env files\n.env*.local",
        "tags": [".dockerignore", "patterns", "optimization", "monorepo"],
        "interview_questions": [
          "How does .dockerignore affect build context size?",
          "What's the difference between .gitignore and .dockerignore?",
          "How do you use ! for pattern negation?",
          "What happens if .dockerignore doesn't exist?",
          "How do you debug what files are being sent to build context?",
          "Can you have multiple .dockerignore files?",
          "How does .dockerignore impact build speed and layer caching?"
        ],
        "commands_to_practice": [
          "docker build --progress=plain -t app . 2>&1 | grep 'Sending build context'",
          "docker build --no-cache -t app .",
          "du -sh . # Check directory size before build",
          "docker system df -v",
          "tar -czf - . | docker build -t app -"
        ]
      }
    ],
    "bonus_challenge": {
      "title": "Troubleshooting Broken Dockerfiles",
      "description": "You're given a Dockerfile that has multiple issues: it's too large, has security vulnerabilities, has broken caching, and fails to build. Identify and fix all issues. Document your optimization process and explain the reasoning behind each change.",
      "tasks": [
        "Identify and fix layer caching issues",
        "Reduce final image size by at least 70%",
        "Fix security issues (root user, exposed secrets)",
        "Optimize build time",
        "Add proper health checks",
        "Implement multi-stage builds where appropriate",
        "Add .dockerignore file"
      ],
      "sample_broken_dockerfile": "# Broken Dockerfile\nFROM ubuntu:latest\n\nRUN apt-get update\nRUN apt-get install -y python3\nRUN apt-get install -y python3-pip\nRUN apt-get install -y git\nRUN apt-get install -y vim\nRUN apt-get install -y curl\n\nCOPY . /app\n\nWORKDIR /app\n\nRUN pip3 install -r requirements.txt\n\nENV SECRET_KEY=hardcoded_secret\n\nEXPOSE 5000\n\nCMD python3 app.py\n\nRUN rm -rf /var/lib/apt/lists/*",
      "tools_to_use": [
        "docker build --no-cache",
        "docker history",
        "docker scan",
        "docker images",
        "docker run --rm -it image sh",
        "dive (image analysis tool)",
        "hadolint (Dockerfile linter)"
      ],
      "optimization_goals": [
        "Image size: reduce from ~500MB to <100MB",
        "Build time: reduce from 2 minutes to <30 seconds",
        "Security: zero critical vulnerabilities",
        "Layers: optimize caching and layer count"
      ]
    },
    "interview_questions_summary": [
      "What's the difference between CMD and ENTRYPOINT? Give examples.",
      "How do you optimize Dockerfile layer caching?",
      "What's the difference between COPY and ADD? When would you use each?",
      "How do you reduce Docker image size? List 5 techniques.",
      "What are multi-stage builds and why are they useful?",
      "How do you handle secrets in Docker builds?",
      "What's the difference between ARG and ENV?",
      "Why should you run containers as non-root? How do you implement this?",
      "What is BuildKit and how does it improve Docker builds?",
      "How do you implement health checks in Dockerfiles?",
      "What's the purpose of .dockerignore? Give examples.",
      "Explain Docker's layer system and how it affects build caching.",
      "What are the security considerations when writing Dockerfiles?",
      "How do you debug a failing Docker build?",
      "What's the difference between shell form and exec form in CMD/ENTRYPOINT?"
    ],
    "best_practices_checklist": [
      "Use specific base image tags (not `latest`)",
      "Order layers from least to most frequently changing",
      "Use multi-stage builds for compiled languages",
      "Run containers as non-root user",
      "Use `.dockerignore` to exclude unnecessary files",
      "Combine RUN commands to reduce layers",
      "Clean up package manager caches in the same RUN layer",
      "Use `--no-cache` and `--no-install-recommends` where appropriate",
      "Set environment variables with `ENV` for configuration",
      "Use `COPY` instead of `ADD` unless auto-extraction is needed",
      "Add `HEALTHCHECK` for service containers",
      "Use `LABEL` for metadata and documentation",
      "Use `WORKDIR` instead of `RUN cd`",
      "Specify `EXPOSE` for documentation (even if not required)",
      "Use BuildKit for advanced features"
    ],
    "common_mistakes": [
      "Using `latest` tag for base images",
      "Not using `.dockerignore` and copying unnecessary files",
      "Running as root user",
      "Not combining RUN commands and creating too many layers",
      "Not cleaning up package caches",
      "Hardcoding secrets in Dockerfile",
      "Using ADD for remote URLs",
      "Not leveraging layer caching effectively",
      "Using shell form and missing signal handling",
      "Not setting WORKDIR and using absolute paths"
    ]
  },

  // ── 3 · Volumes & Bind Mounts ───────────────────────────────────────────────
  {
    "id": 3,
    "level": "Intermediate",
    "icon": "HardDrive",
    "title": "Volumes & Bind Mounts",
    "summary": "Persist data beyond container lifecycles with named volumes and bind mounts. Understand when to use each and how to manage them with the Docker CLI. Master volume drivers, backups, and migration strategies.",
    "topics": [
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
      "Environment variables & substitution",
      "docker compose up/down/logs/exec",
      "Profiles & multiple environments",
      "Resource limits & scaling",
      "Secrets management",
      "Compose extensions & merge strategies",
      "Production deployment patterns"
    ],
    "exercises": [
      {
        "id": 1,
        "title": "Full-Stack Application with Health Checks",
        "difficulty": "Intermediate",
        "fileType": "docker-compose.yml",
        "description": "Create a production-ready docker-compose.yml for a full-stack application: web service (Node.js), database (PostgreSQL), and cache (Redis). Implement proper health checks, service dependencies, and data persistence. Ensure web only starts when database is healthy.",
        "hints": [
          "Use healthcheck on PostgreSQL with pg_isready",
          "Implement condition-based depends_on with service_healthy",
          "Use named volumes for database persistence",
          "Set up proper environment variables for connections",
          "Add healthcheck for Redis and web services"
        ],
        "solution": "# docker-compose.yml\nversion: '3.8'\n\nservices:\n  web:\n    build:\n      context: ./web\n      dockerfile: Dockerfile\n      target: production\n    container_name: web-app\n    ports:\n      - \"3000:3000\"\n      - \"9229:9229\"  # Debug port\n    environment:\n      NODE_ENV: production\n      DATABASE_URL: postgresql://appuser:${DB_PASSWORD}@db:5432/appdb\n      REDIS_URL: redis://cache:6379\n      JWT_SECRET: ${JWT_SECRET}\n    volumes:\n      - uploads:/app/uploads\n      - logs:/app/logs\n    depends_on:\n      db:\n        condition: service_healthy\n      cache:\n        condition: service_healthy\n    healthcheck:\n      test: [\"CMD\", \"curl\", \"-f\", \"http://localhost:3000/health\"]\n      interval: 30s\n      timeout: 10s\n      retries: 3\n      start_period: 40s\n    networks:\n      - app-network\n    restart: unless-stopped\n    deploy:\n      resources:\n        limits:\n          cpus: '1'\n          memory: 512M\n        reservations:\n          cpus: '0.5'\n          memory: 256M\n\n  db:\n    image: postgres:15-alpine\n    container_name: postgres-db\n    environment:\n      POSTGRES_DB: appdb\n      POSTGRES_USER: appuser\n      POSTGRES_PASSWORD: ${DB_PASSWORD}\n      PGDATA: /var/lib/postgresql/data/pgdata\n    volumes:\n      - postgres_data:/var/lib/postgresql/data\n      - ./backups:/backups\n      - ./init-db:/docker-entrypoint-initdb.d\n    ports:\n      - \"5432:5432\"\n    healthcheck:\n      test: [\"CMD-SHELL\", \"pg_isready -U appuser -d appdb\"]\n      interval: 10s\n      timeout: 5s\n      retries: 5\n      start_period: 30s\n    networks:\n      - app-network\n    restart: unless-stopped\n    deploy:\n      resources:\n        limits:\n          cpus: '2'\n          memory: 1G\n\n  cache:\n    image: redis:7-alpine\n    container_name: redis-cache\n    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD}\n    volumes:\n      - redis_data:/data\n    ports:\n      - \"6379:6379\"\n    healthcheck:\n      test: [\"CMD\", \"redis-cli\", \"--raw\", \"incr\", \"ping\"]\n      interval: 10s\n      timeout: 5s\n      retries: 5\n    networks:\n      - app-network\n    restart: unless-stopped\n    deploy:\n      resources:\n        limits:\n          cpus: '0.5'\n          memory: 256M\n\n  nginx:\n    image: nginx:alpine\n    container_name: nginx-proxy\n    ports:\n      - \"80:80\"\n      - \"443:443\"\n    volumes:\n      - ./nginx.conf:/etc/nginx/nginx.conf:ro\n      - ./ssl:/etc/nginx/ssl:ro\n      - uploads:/var/www/uploads:ro\n    depends_on:\n      web:\n        condition: service_started\n    networks:\n      - app-network\n    restart: unless-stopped\n\n  adminer:\n    image: adminer:latest\n    container_name: adminer\n    ports:\n      - \"8080:8080\"\n    environment:\n      ADMINER_DESIGN: pepa-linha\n    networks:\n      - app-network\n    profiles:\n      - tools\n      - dev\n\nnetworks:\n  app-network:\n    driver: bridge\n    ipam:\n      config:\n        - subnet: 172.20.0.0/16\n\nvolumes:\n  postgres_data:\n    driver: local\n  redis_data:\n    driver: local\n  uploads:\n    driver: local\n  logs:\n    driver: local\n\n# .env file\nDB_PASSWORD=secure_password_here\nREDIS_PASSWORD=redis_secure_password\nJWT_SECRET=your_jwt_secret_key\n\n# healthcheck.sh\n#!/bin/bash\necho \"Waiting for services to be healthy...\"\nwhile ! docker-compose exec db pg_isready -U appuser; do\n  sleep 1\ndone\necho \"Database is ready!\"\n\n# test-health.sh\n#!/bin/bash\nfor service in web db cache; do\n  status=$(docker-compose ps --format json $service | jq -r '.Health')\n  echo \"$service: $status\"\ndone",
        "tags": ["healthcheck", "depends_on", "volumes", "resources", "networks"],
        "interview_questions": [
          "What's the difference between `depends_on` with `condition: service_healthy` vs `service_started`?",
          "How do health checks work and why are they important?",
          "What's the purpose of `start_period` in health checks?",
          "How do you handle database migrations in Docker Compose?",
          "What are the benefits of using profiles in Docker Compose?",
          "How do you implement graceful shutdown in Compose?",
          "What's the difference between `restart: always` and `restart: unless-stopped`?"
        ],
        "commands_to_practice": [
          "docker-compose up -d",
          "docker-compose ps",
          "docker-compose logs -f web",
          "docker-compose exec web node -e \"console.log(process.env)\"",
          "docker-compose down",
          "docker-compose down -v",
          "docker-compose config",
          "docker-compose top"
        ]
      },
      {
        "id": 2,
        "title": "Environment Variables & Configuration Management",
        "difficulty": "Intermediate",
        "fileType": "docker-compose.yml",
        "description": "Implement a comprehensive environment variable strategy for Docker Compose using .env files, environment substitution, and multiple configuration files. Support development, staging, and production environments with different configurations.",
        "hints": [
          "Use .env file for default values",
          "Create environment-specific .env files (.env.dev, .env.prod)",
          "Use variable substitution with defaults: ${VAR:-default}",
          "Implement secrets for sensitive data",
          "Use environment file with env_file directive"
        ],
        "solution": "# Project structure\n# .env (default)\nCOMPOSE_PROJECT_NAME=myapp\nNODE_ENV=production\nAPI_PORT=3000\nDB_PASSWORD=changeme\n\n# .env.dev\nNODE_ENV=development\nAPI_PORT=3001\nDEBUG=true\nLOG_LEVEL=debug\n\n# .env.prod\nNODE_ENV=production\nAPI_PORT=3000\nDEBUG=false\nLOG_LEVEL=info\n\n# docker-compose.yml\nversion: '3.8'\n\nservices:\n  api:\n    build: ./api\n    ports:\n      - \"${API_PORT:-3000}:3000\"\n    environment:\n      # Direct variable assignment\n      NODE_ENV: ${NODE_ENV:-production}\n      DEBUG: ${DEBUG:-false}\n      LOG_LEVEL: ${LOG_LEVEL:-info}\n      \n      # Using environment file\n      DB_HOST: db\n      DB_PORT: 5432\n      DB_USER: appuser\n      DB_PASSWORD: ${DB_PASSWORD}\n      DB_NAME: appdb\n      \n      # Complex variable with defaults\n      API_URL: ${API_URL:-http://localhost:${API_PORT:-3000}}\n      \n      # Using secrets as environment variables\n      JWT_SECRET_FILE: /run/secrets/jwt_secret\n      \n    env_file:\n      - ./config/common.env\n      - ./config/${ENVIRONMENT:-production}.env\n    \n    secrets:\n      - jwt_secret\n      - db_password\n    \n    volumes:\n      - ./config:/app/config:ro\n\n  db:\n    image: postgres:15\n    environment:\n      POSTGRES_DB: appdb\n      POSTGRES_USER: appuser\n      POSTGRES_PASSWORD_FILE: /run/secrets/db_password\n    secrets:\n      - db_password\n\nsecrets:\n  jwt_secret:\n    file: ./secrets/jwt_secret.txt\n  db_password:\n    file: ./secrets/db_password.txt\n\n# docker-compose.override.yml (development only)\nversion: '3.8'\n\nservices:\n  api:\n    environment:\n      NODE_ENV: development\n      DEBUG: \"express:*\"\n      LOG_LEVEL: debug\n    volumes:\n      - ./api:/app\n      - /app/node_modules\n    command: npm run dev\n\n# Production compose file\ndocker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d\n\n# Script to generate environment files\n#!/bin/bash\n# generate-env.sh\nENVIRONMENT=${1:-production}\n\ncat > .env.${ENVIRONMENT} << EOF\nNODE_ENV=${ENVIRONMENT}\nAPI_PORT=${API_PORT:-3000}\nLOG_LEVEL=${LOG_LEVEL:-info}\nDB_PASSWORD=$(openssl rand -base64 32)\nJWT_SECRET=$(openssl rand -base64 32)\nEOF\n\necho Generated .env.${ENVIRONMENT} file",
        "tags": [".env", "variable-substitution", "secrets", "env_file", "multiple-environments"],
        "interview_questions": [
          "How does Docker Compose handle variable substitution?",
          "What's the difference between `environment`, `env_file`, and `.env` files?",
          "How do you handle secrets in Docker Compose?",
          "What are the security implications of using environment variables?",
          "How do you override environment variables at runtime?",
          "What's the order of precedence for environment variables in Compose?",
          "How do you validate required environment variables before starting services?"
        ],
        "commands_to_practice": [
          "docker-compose config",
          "docker-compose config --services",
          "docker-compose config --volumes",
          "docker-compose run api env",
          "docker-compose exec api printenv",
          "docker-compose --env-file .env.prod up -d",
          "docker-compose config --resolve-image-digests"
        ]
      },
      {
        "id": 3,
        "title": "Development vs Production Overrides",
        "difficulty": "Advanced",
        "fileType": "docker-compose.yml",
        "description": "Create a sophisticated multi-environment Docker Compose setup with base configuration, development overrides, production optimizations, and testing configurations. Implement hot-reload for development and performance optimizations for production.",
        "hints": [
          "Create base docker-compose.yml with common configuration",
          "Use docker-compose.override.yml for development (auto-loaded)",
          "Create docker-compose.prod.yml for production overrides",
          "Implement profiles for optional services",
          "Use extends for configuration reuse"
        ],
        "solution": "# docker-compose.yml (Base Configuration)\nversion: '3.8'\n\nx-logging: &default-logging\n  driver: json-file\n  options:\n    max-size: \"10m\"\n    max-file: \"3\"\n\nx-resources: &default-resources\n  deploy:\n    resources:\n      limits:\n        cpus: '1'\n        memory: 512M\n      reservations:\n        cpus: '0.5'\n        memory: 256M\n\nservices:\n  app:\n    build:\n      context: .\n      dockerfile: Dockerfile\n    image: myapp:${TAG:-latest}\n    environment:\n      NODE_ENV: ${NODE_ENV:-production}\n    logging: *default-logging\n    networks:\n      - app-network\n    restart: unless-stopped\n\n  database:\n    image: postgres:15-alpine\n    environment:\n      POSTGRES_DB: myapp\n      POSTGRES_USER: myuser\n      POSTGRES_PASSWORD: ${DB_PASSWORD}\n    volumes:\n      - db-data:/var/lib/postgresql/data\n    logging: *default-logging\n    networks:\n      - app-network\n\nnetworks:\n  app-network:\n    driver: bridge\n\nvolumes:\n  db-data:\n\n# docker-compose.override.yml (Development - auto-loaded)\nversion: '3.8'\n\nservices:\n  app:\n    build:\n      target: development\n    environment:\n      NODE_ENV: development\n      DEBUG: \"app:*\"\n    volumes:\n      - .:/app\n      - /app/node_modules\n    ports:\n      - \"3000:3000\"\n      - \"9229:9229\"\n    command: npm run dev\n    <<: *default-resources\n\n  database:\n    ports:\n      - \"5432:5432\"\n    volumes:\n      - ./init-db:/docker-entrypoint-initdb.d\n\n  redis:\n    image: redis:7-alpine\n    ports:\n      - \"6379:6379\"\n    networks:\n      - app-network\n    profiles:\n      - dev\n      - full\n\n  mailhog:\n    image: mailhog/mailhog\n    ports:\n      - \"8025:8025\"\n      - \"1025:1025\"\n    networks:\n      - app-network\n    profiles:\n      - dev\n      - full\n\n  adminer:\n    image: adminer\n    ports:\n      - \"8080:8080\"\n    networks:\n      - app-network\n    profiles:\n      - tools\n\n# docker-compose.prod.yml (Production)\nversion: '3.8'\n\nservices:\n  app:\n    build:\n      target: production\n    environment:\n      NODE_ENV: production\n    ports:\n      - \"80:3000\"\n    deploy:\n      replicas: 3\n      update_config:\n        parallelism: 1\n        delay: 10s\n      restart_policy:\n        condition: any\n    logging:\n      driver: awslogs\n      options:\n        awslogs-group: myapp\n        awslogs-region: us-east-1\n        awslogs-stream: app\n\n  database:\n    deploy:\n      placement:\n        constraints:\n          - node.role == manager\n    volumes:\n      - db-data:/var/lib/postgresql/data\n      - ./backups:/backups\n\n  nginx:\n    image: nginx:alpine\n    ports:\n      - \"443:443\"\n    volumes:\n      - ./nginx.prod.conf:/etc/nginx/nginx.conf:ro\n      - ./ssl:/etc/nginx/ssl:ro\n    depends_on:\n      - app\n    networks:\n      - app-network\n    profiles:\n      - production\n\n# Dockerfile with multi-stage for different environments\n# Dockerfile\n# Development stage\nFROM node:20-alpine AS development\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE 3000\nCMD [\"npm\", \"run\", \"dev\"]\n\n# Build stage\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nRUN npm run build\n\n# Production stage\nFROM node:20-alpine AS production\nRUN apk add --no-cache tini\nWORKDIR /app\nCOPY --from=builder /app/dist ./dist\nCOPY --from=builder /app/node_modules ./node_modules\nCOPY package.json ./\nUSER node\nEXPOSE 3000\nENTRYPOINT [\"/sbin/tini\", \"--\"]\nCMD [\"node\", \"dist/index.js\"]\n\n# Usage Commands\n# Development\ndocker-compose up -d\n\n# Development with additional services\ndocker-compose --profile full up -d\n\n# Production\ndocker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d\n\n# Testing\ndocker-compose -f docker-compose.yml -f docker-compose.test.yml up --abort-on-container-exit\n\n# Environment-specific script\n#!/bin/bash\n# deploy.sh\nENVIRONMENT=${1:-development}\n\ncase $ENVIRONMENT in\n  development)\n    docker-compose up -d\n    docker-compose logs -f\n    ;;\n  staging)\n    docker-compose -f docker-compose.yml -f docker-compose.staging.yml up -d\n    ;;\n  production)\n    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d\n    ;;\n  test)\n    docker-compose -f docker-compose.yml -f docker-compose.test.yml run tests\n    ;;\n  *)\n    echo \"Unknown environment: $ENVIRONMENT\"\n    exit 1\n    ;;\nesac",
        "tags": ["override", "dev-vs-prod", "profiles", "extends", "multi-stage"],
        "interview_questions": [
          "How do you manage different configurations for development and production in Docker Compose?",
          "What's the difference between using override files vs profiles?",
          "How do you ensure production images are optimized and secure?",
          "What's the purpose of the `extends` directive in Compose?",
          "How do you handle database migrations in production deployments?",
          "What are the best practices for logging in different environments?",
          "How do you implement zero-downtime deployments with Compose?"
        ],
        "commands_to_practice": [
          "docker-compose config",
          "docker-compose --profile tools up -d",
          "docker-compose -f docker-compose.yml -f docker-compose.prod.yml config",
          "docker-compose up --scale app=3",
          "docker-compose exec app sh",
          "docker-compose run --rm test npm test"
        ]
      },
      {
        "id": 4,
        "title": "Service Scaling & Load Balancing",
        "difficulty": "Advanced",
        "fileType": "docker-compose.yml",
        "description": "Implement scalable microservices architecture with Docker Compose. Configure service scaling, load balancing, and session affinity. Demonstrate horizontal scaling and test load distribution across multiple instances.",
        "hints": [
          "Use `scale` or `deploy.replicas` for service scaling",
          "Implement reverse proxy with load balancing (Nginx/Traefik)",
          "Configure sticky sessions if needed",
          "Use environment variables for instance identification",
          "Implement health checks for load balancer targets"
        ],
        "solution": "# docker-compose.yml\nversion: '3.8'\n\nservices:\n  # Load Balancer\n  lb:\n    image: nginx:alpine\n    container_name: load-balancer\n    volumes:\n      - ./nginx-lb.conf:/etc/nginx/nginx.conf:ro\n    ports:\n      - \"80:80\"\n      - \"443:443\"\n    depends_on:\n      - app1\n      - app2\n      - app3\n    networks:\n      - public-net\n    restart: unless-stopped\n\n  # Application instances\n  app1:\n    build: .\n    image: myapp:latest\n    container_name: app-instance-1\n    environment:\n      INSTANCE_ID: \"1\"\n      REDIS_HOST: redis\n      DB_HOST: db\n    networks:\n      - app-net\n    healthcheck:\n      test: [\"CMD\", \"curl\", \"-f\", \"http://localhost:3000/health\"]\n      interval: 10s\n      timeout: 5s\n      retries: 3\n    restart: unless-stopped\n\n  app2:\n    build: .\n    image: myapp:latest\n    container_name: app-instance-2\n    environment:\n      INSTANCE_ID: \"2\"\n      REDIS_HOST: redis\n      DB_HOST: db\n    networks:\n      - app-net\n    healthcheck:\n      test: [\"CMD\", \"curl\", \"-f\", \"http://localhost:3000/health\"]\n      interval: 10s\n      timeout: 5s\n      retries: 3\n    restart: unless-stopped\n\n  app3:\n    build: .\n    image: myapp:latest\n    container_name: app-instance-3\n    environment:\n      INSTANCE_ID: \"3\"\n      REDIS_HOST: redis\n      DB_HOST: db\n    networks:\n      - app-net\n    healthcheck:\n      test: [\"CMD\", \"curl\", \"-f\", \"http://localhost:3000/health\"]\n      interval: 10s\n      timeout: 5s\n      retries: 3\n    restart: unless-stopped\n\n  # Database\n  db:\n    image: postgres:15-alpine\n    container_name: database\n    environment:\n      POSTGRES_DB: myapp\n      POSTGRES_USER: myuser\n      POSTGRES_PASSWORD: ${DB_PASSWORD}\n    volumes:\n      - db-data:/var/lib/postgresql/data\n    networks:\n      - app-net\n    healthcheck:\n      test: [\"CMD-SHELL\", \"pg_isready -U myuser\"]\n      interval: 10s\n      timeout: 5s\n      retries: 5\n    restart: unless-stopped\n\n  # Redis for session storage\n  redis:\n    image: redis:7-alpine\n    container_name: redis\n    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD}\n    volumes:\n      - redis-data:/data\n    networks:\n      - app-net\n    healthcheck:\n      test: [\"CMD\", \"redis-cli\", \"ping\"]\n      interval: 10s\n      timeout: 5s\n      retries: 3\n    restart: unless-stopped\n\n  # Monitoring\n  prometheus:\n    image: prom/prometheus\n    container_name: prometheus\n    volumes:\n      - ./prometheus.yml:/etc/prometheus/prometheus.yml\n      - prometheus-data:/prometheus\n    command:\n      - '--config.file=/etc/prometheus/prometheus.yml'\n      - '--storage.tsdb.path=/prometheus'\n    networks:\n      - monitoring-net\n    profiles:\n      - monitoring\n\n  grafana:\n    image: grafana/grafana\n    container_name: grafana\n    ports:\n      - \"3000:3000\"\n    volumes:\n      - grafana-data:/var/lib/grafana\n    networks:\n      - monitoring-net\n    profiles:\n      - monitoring\n\nnetworks:\n  public-net:\n    driver: bridge\n  app-net:\n    driver: bridge\n    internal: true\n  monitoring-net:\n    driver: bridge\n\nvolumes:\n  db-data:\n  redis-data:\n  prometheus-data:\n  grafana-data:\n\n# nginx-lb.conf\nuser nginx;\nworker_processes auto;\nevents {\n    worker_connections 1024;\n}\n\nhttp {\n    upstream myapp {\n        # Load balancing algorithms\n        # round_robin (default)\n        # least_conn\n        # ip_hash (sticky sessions)\n        # random\n        \n        least_conn;\n        \n        server app1:3000 max_fails=3 fail_timeout=30s;\n        server app2:3000 max_fails=3 fail_timeout=30s;\n        server app3:3000 max_fails=3 fail_timeout=30s;\n    }\n    \n    server {\n        listen 80;\n        \n        location / {\n            proxy_pass http://myapp;\n            proxy_set_header Host $host;\n            proxy_set_header X-Real-IP $remote_addr;\n            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n            proxy_set_header X-Forwarded-Proto $scheme;\n            \n            # Health check\n            proxy_next_upstream error timeout http_500 http_502 http_503;\n            proxy_next_upstream_tries 3;\n        }\n        \n        location /status {\n            stub_status;\n        }\n    }\n}\n\n# Scaling script\n#!/bin/bash\n# scale.sh\n\nSCALE_COUNT=${1:-5}\necho \"Scaling to $SCALE_COUNT instances\"\n\n# Create new instances\nfor i in $(seq 1 $SCALE_COUNT); do\n  docker-compose up -d --scale app=$i\ndone\n\n# Update load balancer configuration\ncat > nginx-lb.conf << EOF\nupstream myapp {\n    least_conn;\nEOF\n\nfor i in $(seq 1 $SCALE_COUNT); do\n  echo \"    server app$i:3000 max_fails=3 fail_timeout=30s;\" >> nginx-lb.conf\ndone\n\necho \"}\" >> nginx-lb.conf\n\n# Reload nginx\ndocker-compose exec lb nginx -s reload\n\n# Test load distribution\n#!/bin/bash\n# test-load-balancing.sh\n\necho \"Testing load balancing distribution...\"\n\nfor i in {1..100}; do\n  response=$(curl -s http://localhost/instance-id)\n  echo $response\ndone | sort | uniq -c\n\n# Performance test with wrk\nwrk -t12 -c400 -d30s http://localhost/\n\n# Session affinity test\nSESSION_COOKIE=$(curl -c - http://localhost/ | grep -o 'SESSION=.*')\ncurl -b \"$SESSION_COOKIE\" http://localhost/profile\n\n# Docker Compose with scale command\ndocker-compose up -d --scale app=5\n\n# Traefik alternative configuration\n# docker-compose with Traefik\nversion: '3.8'\n\nservices:\n  traefik:\n    image: traefik:v2.10\n    command:\n      - \"--api.insecure=true\"\n      - \"--providers.docker=true\"\n      - \"--providers.docker.exposedbydefault=false\"\n      - \"--entrypoints.web.address=:80\"\n    ports:\n      - \"80:80\"\n      - \"8080:8080\"\n    volumes:\n      - /var/run/docker.sock:/var/run/docker.sock:ro\n    networks:\n      - public-net\n\n  app:\n    build: .\n    labels:\n      - \"traefik.enable=true\"\n      - \"traefik.http.routers.app.rule=Host(`localhost`)\"\n      - \"traefik.http.services.app.loadbalancer.server.port=3000\"\n      - \"traefik.http.services.app.loadbalancer.sticky.cookie=true\"\n    networks:\n      - public-net\n      - app-net\n    deploy:\n      replicas: 3\n\n# Horizontal Pod Autoscaling simulation\n#!/bin/bash\n# auto-scale.sh\n\nwhile true; do\n  # Get current CPU usage\n  cpu_usage=$(docker stats --no-stream --format \"{{.CPUPerc}}\" | sed 's/%//' | awk '{sum+=$1} END {print sum}')\n  \n  # Get current number of instances\n  current_instances=$(docker-compose ps -q app | wc -l)\n  \n  # Scale up if CPU > 70%\n  if (( $(echo \"$cpu_usage > 70\" | bc -l) )); then\n    new_instances=$((current_instances + 1))\n    echo \"High CPU ($cpu_usage%). Scaling to $new_instances instances\"\n    docker-compose up -d --scale app=$new_instances\n  fi\n  \n  # Scale down if CPU < 30%\n  if (( $(echo \"$cpu_usage < 30\" | bc -l) )); then\n    new_instances=$((current_instances - 1))\n    if [ $new_instances -ge 1 ]; then\n      echo \"Low CPU ($cpu_usage%). Scaling down to $new_instances instances\"\n      docker-compose up -d --scale app=$new_instances\n    fi\n  fi\n  \n  sleep 30\ndone",
        "tags": ["scaling", "load-balancing", "nginx", "replicas", "performance"],
        "interview_questions": [
          "How do you scale services in Docker Compose?",
          "What are the different load balancing algorithms and when would you use each?",
          "How do you implement sticky sessions (session affinity) in a scaled environment?",
          "What's the difference between scaling in Swarm vs Compose?",
          "How do you handle database connections with multiple app instances?",
          "What's the role of a reverse proxy in a scaled architecture?",
          "How do you implement zero-downtime scaling?",
          "What metrics should you monitor for auto-scaling decisions?"
        ],
        "commands_to_practice": [
          "docker-compose up -d --scale app=5",
          "docker-compose up -d --scale app=3 --no-recreate",
          "docker-compose exec lb nginx -s reload",
          "docker-compose logs --tail=100 app1",
          "wrk -t12 -c400 -d30s http://localhost/",
          "docker stats $(docker-compose ps -q)"
        ]
      },
      {
        "id": 5,
        "title": "Advanced Networking & Service Discovery",
        "difficulty": "Advanced",
        "fileType": "docker-compose.yml",
        "description": "Configure complex networking scenarios in Docker Compose including multi-network setups, service discovery, network aliases, and external networks. Implement service mesh patterns and network policies.",
        "hints": [
          "Use multiple networks for service isolation",
          "Configure network aliases for service discovery",
          "Connect containers to external networks",
          "Use network policies for access control",
          "Implement service mesh with linkerd or consul"
        ],
        "solution": "# docker-compose.yml\nversion: '3.8'\n\nservices:\n  # Public-facing services\n  web:\n    build: ./web\n    networks:\n      - public\n      - backend\n    environment:\n      - API_URL=http://api.internal:8080\n    depends_on:\n      - api\n    deploy:\n      replicas: 2\n\n  api:\n    build: ./api\n    networks:\n      - backend\n      - database\n    environment:\n      - DB_HOST=database.db-network\n      - REDIS_HOST=cache.backend-network\n    networks:\n      backend:\n        aliases:\n          - api.internal\n          - api.backend\n      database:\n        aliases:\n          - api.db-consumer\n\n  # Database services\n  postgres:\n    image: postgres:15\n    networks:\n      database:\n        aliases:\n          - database.db-network\n          - postgres.internal\n    volumes:\n      - postgres-data:/var/lib/postgresql/data\n    environment:\n      - POSTGRES_DB=myapp\n      - POSTGRES_USER=myuser\n      - POSTGRES_PASSWORD=${DB_PASSWORD}\n\n  mysql:\n    image: mysql:8\n    networks:\n      database:\n        aliases:\n          - mysql.db-network\n    environment:\n      - MYSQL_DATABASE=analytics\n      - MYSQL_USER=analyst\n      - MYSQL_PASSWORD=${MYSQL_PASSWORD}\n\n  # Cache layer\n  redis:\n    image: redis:7\n    networks:\n      backend:\n        aliases:\n          - cache.backend-network\n          - redis.cache\n    command: redis-server --requirepass ${REDIS_PASSWORD}\n\n  # Message queue\n  rabbitmq:\n    image: rabbitmq:3-management\n    networks:\n      - backend\n      - message-bus\n    environment:\n      - RABBITMQ_DEFAULT_USER=guest\n      - RABBITMQ_DEFAULT_PASS=${RABBITMQ_PASSWORD}\n\n  # Workers\n  worker:\n    build: ./worker\n    networks:\n      - backend\n      - message-bus\n      - database\n    environment:\n      - REDIS_HOST=cache.backend-network\n      - RABBITMQ_HOST=rabbitmq\n      - DB_HOST=database.db-network\n    deploy:\n      replicas: 3\n\n  # Monitoring\n  prometheus:\n    image: prom/prometheus\n    networks:\n      - monitoring\n    volumes:\n      - ./prometheus.yml:/etc/prometheus/prometheus.yml\n      - prometheus-data:/prometheus\n\n  grafana:\n    image: grafana/grafana\n    networks:\n      - monitoring\n      - public\n    ports:\n      - \"3000:3000\"\n    environment:\n      - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_PASSWORD}\n\nnetworks:\n  public:\n    driver: bridge\n    ipam:\n      config:\n        - subnet: 172.21.0.0/16\n    driver_opts:\n      com.docker.network.bridge.name: br-public\n      \n  backend:\n    driver: bridge\n    ipam:\n      config:\n        - subnet: 172.22.0.0/16\n    internal: true\n    driver_opts:\n      com.docker.network.bridge.name: br-backend\n      \n  database:\n    driver: bridge\n    ipam:\n      config:\n        - subnet: 172.23.0.0/16\n    internal: true\n    labels:\n      environment: \"production\"\n      tier: \"data\"\n      \n  message-bus:\n    driver: bridge\n    ipam:\n      config:\n        - subnet: 172.24.0.0/16\n    internal: true\n    \n  monitoring:\n    driver: bridge\n    ipam:\n      config:\n        - subnet: 172.25.0.0/16\n\nvolumes:\n  postgres-data:\n  prometheus-data:\n\n# External network configuration\n# Create external network first\ndocker network create --driver bridge --subnet 192.168.100.0/24 external-net\n\n# docker-compose with external network\nversion: '3.8'\n\nservices:\n  app:\n    build: .\n    networks:\n      - default\n      - external\n\nnetworks:\n  default:\n    driver: bridge\n  external:\n    external: true\n    name: external-net\n\n# Service discovery with Consul\nversion: '3.8'\n\nservices:\n  consul:\n    image: consul:latest\n    command: agent -server -bootstrap-expect=1 -client=0.0.0.0\n    ports:\n      - \"8500:8500\"\n    networks:\n      - service-mesh\n\n  registrator:\n    image: gliderlabs/registrator:latest\n    command: consul://consul:8500\n    volumes:\n      - /var/run/docker.sock:/tmp/docker.sock\n    depends_on:\n      - consul\n    networks:\n      - service-mesh\n\n  app:\n    build: .\n    environment:\n      - SERVICE_NAME=myapp\n      - SERVICE_TAGS=production,web\n    networks:\n      - service-mesh\n    ports:\n      - \"3000\"\n    labels:\n      - \"SERVICE_3000_NAME=myapp\"\n      - \"SERVICE_3000_TAGS=web\"\n\nnetworks:\n  service-mesh:\n    driver: bridge\n\n# Network policies with iptables\n#!/bin/bash\n# network-policies.sh\n\n# Create network policies for isolation\nsetup_network_policies() {\n  # Allow only specific containers to communicate\n  iptables -A DOCKER-USER -i br-backend -o br-database -j DROP\n  iptables -A DOCKER-USER -i br-database -o br-backend -j DROP\n  \n  # Allow API to talk to database\n  iptables -A DOCKER-USER -i br-backend -o br-database \\\n    -m iprange --src-range 172.22.0.2-172.22.0.10 \\\n    -m iprange --dst-range 172.23.0.2-172.23.0.10 \\\n    -j ACCEPT\n  \n  # Allow workers to talk to message bus\n  iptables -A DOCKER-USER -i br-backend -o br-message-bus \\\n    -m iprange --src-range 172.22.0.100-172.22.0.200 \\\n    -j ACCEPT\n  \n  # Allow monitoring access\n  iptables -A DOCKER-USER -i br-monitoring -o br-public \\\n    -p tcp --dport 3000 -j ACCEPT\n}\n\n# Service discovery test\n#!/bin/bash\n# test-service-discovery.sh\n\necho \"Testing service discovery...\"\n\n# Test DNS resolution across networks\ndocker-compose exec web nslookup api.internal\ndocker-compose exec web nslookup database.db-network\ndocker-compose exec api nslookup cache.backend-network\ndocker-compose exec worker nslookup rabbitmq.message-bus\n\n# Test connectivity\ndocker-compose exec web curl -s http://api.internal:8080/health\ndocker-compose exec api ping -c 2 database.db-network\ndocker-compose exec worker redis-cli -h cache.backend-network ping\n\n# Network inspection\ndocker-compose exec api ip addr show\ndocker-compose exec api route -n\ndocker-compose exec api cat /etc/hosts",
        "tags": ["networks", "service-discovery", "dns", "network-policies", "aliases"],
        "interview_questions": [
          "How do you configure multiple networks in Docker Compose?",
          "What's the purpose of network aliases?",
          "How does service discovery work across different networks?",
          "What are the security implications of internal networks?",
          "How do you connect containers to external networks?",
          "How do you implement network policies for microservices?",
          "What's the difference between network aliases and container names?"
        ],
        "commands_to_practice": [
          "docker-compose exec web nslookup api.internal",
          "docker network inspect backend",
          "docker-compose exec api ping database.db-network",
          "docker-compose exec api cat /etc/resolv.conf",
          "docker network ls",
          "docker network connect external-net container-name"
        ]
      },
      {
        "id": 6,
        "title": "Data Persistence & Backup Strategies",
        "difficulty": "Advanced",
        "fileType": "docker-compose.yml",
        "description": "Implement comprehensive data persistence strategies in Docker Compose including database backups, volume snapshots, data migration, and disaster recovery. Configure automated backups and multi-volume setups.",
        "hints": [
          "Use named volumes for data persistence",
          "Implement backup containers with scheduled tasks",
          "Configure volume drivers for cloud storage",
          "Set up database replication for HA",
          "Implement point-in-time recovery"
        ],
        "solution": "# docker-compose.yml\nversion: '3.8'\n\nservices:\n  # Application services\n  app:\n    build: .\n    volumes:\n      - app-uploads:/app/uploads\n      - app-logs:/app/logs\n    depends_on:\n      - db\n      - redis\n    environment:\n      - DB_HOST=db\n      - REDIS_HOST=redis\n\n  # Database with automated backups\n  db:\n    image: postgres:15\n    volumes:\n      - postgres-data:/var/lib/postgresql/data\n      - ./backups:/backups\n      - ./init-db:/docker-entrypoint-initdb.d\n    environment:\n      POSTGRES_DB: myapp\n      POSTGRES_USER: myuser\n      POSTGRES_PASSWORD: ${DB_PASSWORD}\n      POSTGRES_INITDB_ARGS: \"--data-checksums\"\n    healthcheck:\n      test: [\"CMD-SHELL\", \"pg_isready -U myuser\"]\n      interval: 10s\n      timeout: 5s\n      retries: 5\n\n  # Backup service\n  backup:\n    image: alpine:latest\n    container_name: backup-service\n    volumes:\n      - postgres-data:/data:ro\n      - app-uploads:/uploads:ro\n      - ./backups:/backups\n    environment:\n      - BACKUP_RETENTION_DAYS=30\n      - BACKUP_SCHEDULE=\"0 2 * * *\"\n    command: |\n      sh -c '\n      apk add --no-cache postgresql-client\n      while true; do\n        TIMESTAMP=$(date +%Y%m%d_%H%M%S)\n        \n        # Database backup\n        PGPASSWORD=${DB_PASSWORD} pg_dump -h db -U myuser myapp | gzip > /backups/db_${TIMESTAMP}.sql.gz\n        \n        # Files backup\n        tar czf /backups/uploads_${TIMESTAMP}.tar.gz -C /uploads .\n        \n        # Delete old backups\n        find /backups -name \"*.sql.gz\" -mtime +${BACKUP_RETENTION_DAYS} -delete\n        find /backups -name \"*.tar.gz\" -mtime +${BACKUP_RETENTION_DAYS} -delete\n        \n        # Verify backups\n        if [ -f /backups/db_${TIMESTAMP}.sql.gz ] && [ -f /backups/uploads_${TIMESTAMP}.tar.gz ]; then\n          echo \"Backup completed successfully at ${TIMESTAMP}\"\n        else\n          echo \"Backup failed at ${TIMESTAMP}\" >&2\n        fi\n        \n        sleep 86400\n      done\n      '\n    depends_on:\n      db:\n        condition: service_healthy\n\n  # Cloud backup sync\n  cloud-backup:\n    image: amazon/aws-cli\n    container_name: cloud-backup\n    volumes:\n      - ./backups:/backups\n      - ~/.aws:/root/.aws:ro\n    environment:\n      - AWS_DEFAULT_REGION=us-east-1\n    command: |\n      sh -c '\n      while true; do\n        aws s3 sync /backups s3://myapp-backups/$(date +%Y/%m/%d)/\n        sleep 3600\n      done\n      '\n    profiles:\n      - production\n\n  # Volume snapshot service\n  snapshot:\n    image: alpine:latest\n    volumes:\n      - postgres-data:/data\n      - ./snapshots:/snapshots\n    command: |\n      sh -c '\n      apk add --no-cache lvm2\n      while true; do\n        TIMESTAMP=$(date +%Y%m%d_%H%M%S)\n        \n        # Create LVM snapshot\n        lvcreate -L 5G -s -n postgres_snap_${TIMESTAMP} /dev/vg/postgres_data\n        \n        # Mount snapshot\n        mkdir -p /snapshots/${TIMESTAMP}\n        mount /dev/vg/postgres_snap_${TIMESTAMP} /snapshots/${TIMESTAMP}\n        \n        # Tar snapshot\n        tar czf /snapshots/snapshot_${TIMESTAMP}.tar.gz -C /snapshots/${TIMESTAMP} .\n        \n        # Cleanup\n        umount /snapshots/${TIMESTAMP}\n        lvremove -f postgres_snap_${TIMESTAMP}\n        \n        sleep 86400\n      done\n      '\n    privileged: true\n    profiles:\n      - advanced\n\n  # Database replication for HA\n  db-replica:\n    image: postgres:15\n    container_name: db-replica\n    volumes:\n      - postgres-replica-data:/var/lib/postgresql/data\n    environment:\n      POSTGRES_DB: myapp\n      POSTGRES_USER: myuser\n      POSTGRES_PASSWORD: ${DB_PASSWORD}\n    command: |\n      sh -c '\n      until pg_basebackup -h db -D /var/lib/postgresql/data -U myuser -v -P --wal-method=stream; do\n        echo \"Waiting for master...\"\n        sleep 1\n      done\n      echo \"hot_standby = on\" >> /var/lib/postgresql/data/postgresql.conf\n      echo \"primary_conninfo = host=db port=5432 user=myuser password=${DB_PASSWORD}\" >> /var/lib/postgresql/data/postgresql.conf\n      postgres\n      '\n    depends_on:\n      - db\n    profiles:\n      - ha\n\n  # Data migration service\n  migrate:\n    build: ./migrate\n    container_name: db-migrate\n    environment:\n      - DB_HOST=db\n      - DB_USER=myuser\n      - DB_PASSWORD=${DB_PASSWORD}\n      - DB_NAME=myapp\n    volumes:\n      - ./migrations:/migrations\n    command: [\"npm\", \"run\", \"migrate\"]\n    depends_on:\n      db:\n        condition: service_healthy\n    profiles:\n      - migrate\n\nvolumes:\n  postgres-data:\n    driver: local\n    driver_opts:\n      type: none\n      device: /mnt/docker-volumes/postgres\n      o: bind\n  postgres-replica-data:\n  app-uploads:\n    driver: local\n  app-logs:\n    driver: local\n\n# Backup management script\n#!/bin/bash\n# manage-backups.sh\n\nACTION=${1:-list}\n\ncase $ACTION in\n  list)\n    echo \"=== Database Backups ===\"\n    ls -lh ./backups/*.sql.gz 2>/dev/null || echo \"No backups found\"\n    echo \"\"\n    echo \"=== File Backups ===\"\n    ls -lh ./backups/*.tar.gz 2>/dev/null || echo \"No backups found\"\n    ;;\n  \n  restore-db)\n    BACKUP_FILE=$2\n    if [ -z \"$BACKUP_FILE\" ]; then\n      echo \"Usage: $0 restore-db <backup_file>\"\n      exit 1\n    fi\n    \n    echo \"Restoring database from $BACKUP_FILE...\"\n    gunzip -c ./backups/$BACKUP_FILE | docker-compose exec -T db psql -U myuser myapp\n    echo \"Restore completed\"\n    ;;\n  \n  restore-files)\n    BACKUP_FILE=$2\n    if [ -z \"$BACKUP_FILE\" ]; then\n      echo \"Usage: $0 restore-files <backup_file>\"\n      exit 1\n    fi\n    \n    echo \"Restoring files from $BACKUP_FILE...\"\n    docker-compose run --rm -v app-uploads:/uploads backup-service sh -c \"\n      tar xzf /backups/$BACKUP_FILE -C /uploads\n    \"\n    echo \"Restore completed\"\n    ;;\n  \n  verify)\n    echo \"Verifying backups...\"\n    for backup in ./backups/*.sql.gz; do\n      if [ -f \"$backup\" ]; then\n        echo -n \"Testing $backup: \"\n        gunzip -t $backup && echo \"OK\" || echo \"CORRUPTED\"\n      fi\n    done\n    ;;\n  \n  clean)\n    find ./backups -name \"*.sql.gz\" -mtime +${RETENTION_DAYS:-30} -delete\n    find ./backups -name \"*.tar.gz\" -mtime +${RETENTION_DAYS:-30} -delete\n    echo \"Cleaned backups older than ${RETENTION_DAYS:-30} days\"\n    ;;\n  \n  *)\n    echo \"Unknown action: $ACTION\"\n    echo \"Usage: $0 {list|restore-db|restore-files|verify|clean}\"\n    ;;\nesac",
        "tags": ["volumes", "backup", "restore", "persistence", "disaster-recovery"],
        "interview_questions": [
          "How do you backup and restore Docker volumes?",
          "What's the difference between database-level backups and volume-level backups?",
          "How do you implement point-in-time recovery for databases?",
          "What are the strategies for migrating data between environments?",
          "How do you handle backup encryption and security?",
          "What's your approach to testing backup integrity?",
          "How do you implement database replication for high availability?"
        ],
        "commands_to_practice": [
          "docker-compose exec db pg_dump -U myuser myapp > backup.sql",
          "docker-compose exec -T db psql -U myuser myapp < backup.sql",
          "docker run --rm -v volume:/data -v $(pwd):/backup alpine tar czf /backup/backup.tar.gz -C /data .",
          "docker volume ls",
          "docker volume inspect postgres-data",
          "docker-compose exec backup ls -la /backups"
        ]
      },
      {
        "id": 7,
        "title": "Logging & Monitoring Stack",
        "difficulty": "Advanced",
        "fileType": "docker-compose.yml",
        "description": "Build a complete logging and monitoring stack with ELK (Elasticsearch, Logstash, Kibana) or EFK (Elasticsearch, Fluentd, Kibana) plus Prometheus and Grafana. Implement centralized logging, metrics collection, and alerting.",
        "hints": [
          "Configure structured logging (JSON format)",
          "Set up log aggregation with Elasticsearch",
          "Implement metrics collection with Prometheus",
          "Create dashboards in Grafana",
          "Configure alerting rules"
        ],
        "solution": "# docker-compose.yml\nversion: '3.8'\n\nx-logging: &default-logging\n  driver: fluentd\n  options:\n    fluentd-address: localhost:24224\n    tag: \"docker.{{.Name}}\"\n\nservices:\n  # Application services\n  app:\n    build: .\n    logging: *default-logging\n    environment:\n      - LOG_LEVEL=info\n      - LOG_FORMAT=json\n    labels:\n      - \"prometheus.job=app\"\n      - \"prometheus.port=3000\"\n      - \"prometheus.path=/metrics\"\n\n  # Fluentd for log aggregation\n  fluentd:\n    image: fluent/fluentd:latest\n    container_name: fluentd\n    volumes:\n      - ./fluentd.conf:/fluentd/etc/fluent.conf\n      - ./logs:/fluentd/log\n    ports:\n      - \"24224:24224\"\n      - \"24224:24224/udp\"\n    networks:\n      - logging\n\n  # Elasticsearch for log storage\n  elasticsearch:\n    image: docker.elastic.co/elasticsearch/elasticsearch:8.10.0\n    container_name: elasticsearch\n    environment:\n      - discovery.type=single-node\n      - ES_JAVA_OPTS=-Xms1g -Xmx1g\n      - xpack.security.enabled=false\n    volumes:\n      - elasticsearch-data:/usr/share/elasticsearch/data\n    ports:\n      - \"9200:9200\"\n    networks:\n      - logging\n    restart: unless-stopped\n\n  # Kibana for log visualization\n  kibana:\n    image: docker.elastic.co/kibana/kibana:8.10.0\n    container_name: kibana\n    environment:\n      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200\n    ports:\n      - \"5601:5601\"\n    networks:\n      - logging\n    depends_on:\n      - elasticsearch\n    restart: unless-stopped\n\n  # Prometheus for metrics\n  prometheus:\n    image: prom/prometheus\n    container_name: prometheus\n    volumes:\n      - ./prometheus.yml:/etc/prometheus/prometheus.yml\n      - prometheus-data:/prometheus\n    command:\n      - '--config.file=/etc/prometheus/prometheus.yml'\n      - '--storage.tsdb.path=/prometheus'\n      - '--storage.tsdb.retention.time=30d'\n    ports:\n      - \"9090:9090\"\n    networks:\n      - monitoring\n    restart: unless-stopped\n\n  # Node exporter for host metrics\n  node-exporter:\n    image: prom/node-exporter\n    container_name: node-exporter\n    volumes:\n      - /proc:/host/proc:ro\n      - /sys:/host/sys:ro\n      - /:/rootfs:ro\n    command:\n      - '--path.procfs=/host/proc'\n      - '--path.sysfs=/host/sys'\n      - '--path.rootfs=/rootfs'\n    ports:\n      - \"9100:9100\"\n    networks:\n      - monitoring\n    restart: unless-stopped\n\n  # cAdvisor for container metrics\n  cadvisor:\n    image: gcr.io/cadvisor/cadvisor:latest\n    container_name: cadvisor\n    volumes:\n      - /:/rootfs:ro\n      - /var/run:/var/run:ro\n      - /sys:/sys:ro\n      - /var/lib/docker/:/var/lib/docker:ro\n      - /dev/disk/:/dev/disk:ro\n    ports:\n      - \"8080:8080\"\n    networks:\n      - monitoring\n    restart: unless-stopped\n\n  # Grafana for visualization\n  grafana:\n    image: grafana/grafana\n    container_name: grafana\n    environment:\n      - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_PASSWORD}\n      - GF_INSTALL_PLUGINS=grafana-clock-panel,grafana-simple-json-datasource\n    volumes:\n      - grafana-data:/var/lib/grafana\n      - ./grafana/dashboards:/etc/grafana/dashboards\n      - ./grafana/datasources:/etc/grafana/datasources\n    ports:\n      - \"3000:3000\"\n    networks:\n      - monitoring\n    depends_on:\n      - prometheus\n    restart: unless-stopped\n\n  # Alertmanager for alerts\n  alertmanager:\n    image: prom/alertmanager\n    container_name: alertmanager\n    volumes:\n      - ./alertmanager.yml:/etc/alertmanager/alertmanager.yml\n    ports:\n      - \"9093:9093\"\n    networks:\n      - monitoring\n    command:\n      - '--config.file=/etc/alertmanager/alertmanager.yml'\n      - '--storage.path=/alertmanager'\n\n  # Loki for log aggregation alternative\n  loki:\n    image: grafana/loki:latest\n    container_name: loki\n    ports:\n      - \"3100:3100\"\n    command: -config.file=/etc/loki/local-config.yaml\n    networks:\n      - logging\n\n  # Promtail for log collection\n  promtail:\n    image: grafana/promtail:latest\n    container_name: promtail\n    volumes:\n      - /var/lib/docker/containers:/var/lib/docker/containers:ro\n      - /var/run/docker.sock:/var/run/docker.sock\n      - ./promtail.yml:/etc/promtail/promtail.yml\n    command: -config.file=/etc/promtail/promtail.yml\n    networks:\n      - logging\n\nnetworks:\n  logging:\n    driver: bridge\n  monitoring:\n    driver: bridge\n\nvolumes:\n  elasticsearch-data:\n  prometheus-data:\n  grafana-data:\n\n# fluentd.conf\n<source>\n  @type forward\n  port 24224\n  bind 0.0.0.0\n</source>\n\n<filter docker.**>\n  @type parser\n  key_name log\n  format json\n  replace_invalid_sequence true\n</filter>\n\n<match docker.**>\n  @type elasticsearch\n  host elasticsearch\n  port 9200\n  logstash_format true\n  logstash_prefix docker\n  flush_interval 5s\n</match>\n\n# prometheus.yml\nglobal:\n  scrape_interval: 15s\n  evaluation_interval: 15s\n\nscrape_configs:\n  - job_name: 'docker'\n    static_configs:\n      - targets: ['cadvisor:8080', 'node-exporter:9100']\n\n  - job_name: 'applications'\n    docker_sd_configs:\n      - host: unix:///var/run/docker.sock\n        refresh_interval: 10s\n        filters:\n          - name: label\n            values: [\"prometheus.enable=true\"]\n\n  - job_name: 'prometheus'\n    static_configs:\n      - targets: ['localhost:9090']\n\n# alertmanager.yml\nroute:\n  group_by: ['alertname']\n  group_wait: 10s\n  group_interval: 10s\n  repeat_interval: 1h\n  receiver: 'webhook'\nreceivers:\n  - name: 'webhook'\n    webhook_configs:\n      - url: 'http://alert-handler:8080/alerts'\n\n# Logging script\n#!/bin/bash\n# logging-setup.sh\n\n# Setup log rotation\ncat > /etc/logrotate.d/docker-containers << EOF\n/var/lib/docker/containers/*/*.log {\n    daily\n    rotate 7\n    compress\n    delaycompress\n    missingok\n    notifempty\n    copytruncate\n}\nEOF\n\n# Configure application logging\n# In application code\nimport logging\nimport json\n\nclass JSONFormatter(logging.Formatter):\n    def format(self, record):\n        log_entry = {\n            'timestamp': self.formatTime(record),\n            'level': record.levelname,\n            'message': record.getMessage(),\n            'module': record.module,\n            'function': record.funcName,\n            'line': record.lineno\n        }\n        if hasattr(record, 'extra_data'):\n            log_entry.update(record.extra_data)\n        return json.dumps(log_entry)\n\n# Query logs\n#!/bin/bash\n# query-logs.sh\n\n# Query Elasticsearch\ncurl -X GET \"localhost:9200/docker-*/_search?pretty\" -H 'Content-Type: application/json' -d'\n{\n  \"query\": {\n    \"bool\": {\n      \"must\": [\n        { \"match\": { \"container_name\": \"app\" } },\n        { \"range\": { \"@timestamp\": { \"gte\": \"now-1h\" } } }\n      ]\n    }\n  },\n  \"sort\": [{ \"@timestamp\": \"desc\" }],\n  \"size\": 100\n}\n'\n\n# Query Prometheus\ncurl 'http://localhost:9090/api/v1/query?query=container_memory_usage_bytes'\n\n# Get container logs with filters\ndocker-compose logs --tail=100 --since=1h app | jq 'select(.level == \"error\")'\n\n# Log analysis\ndocker-compose logs app | grep -i error | wc -l\ndocker-compose logs app | jq -r '.level' | sort | uniq -c",
        "tags": ["logging", "monitoring", "ELK", "prometheus", "grafana"],
        "interview_questions": [
          "How do you implement centralized logging for Docker containers?",
          "What's the difference between ELK and EFK stacks?",
          "How do you structure logs for better querying?",
          "What metrics are important to monitor in containerized environments?",
          "How do you set up alerting for container failures?",
          "What's the role of Fluentd vs Logstash?",
          "How do you handle log rotation and retention?"
        ],
        "commands_to_practice": [
          "docker-compose logs -f app",
          "docker-compose logs --tail=100 app | jq '.'",
          "curl http://localhost:9090/metrics",
          "curl http://localhost:9200/_cat/indices",
          "docker stats $(docker-compose ps -q)",
          "docker events --filter 'event=start'"
        ]
      },
      {
        "id": 8,
        "title": "Production Hardening & Security",
        "difficulty": "Advanced",
        "fileType": "docker-compose.yml",
        "description": "Harden Docker Compose deployments for production with security best practices: resource limits, security contexts, secrets management, network policies, and compliance requirements. Implement zero-trust security model.",
        "hints": [
          "Use security_opt and cap_drop for container hardening",
          "Implement secrets management with Docker secrets",
          "Configure resource limits to prevent DoS",
          "Use read-only root filesystems where possible",
          "Implement network security policies"
        ],
        "solution": "# docker-compose.prod.yml\nversion: '3.8'\n\nservices:\n  app:\n    build:\n      context: .\n      target: production\n    image: myapp:${VERSION:-latest}\n    \n    # Security hardening\n    security_opt:\n      - no-new-privileges:true\n      - seccomp:/etc/docker/seccomp.json\n      - apparmor:docker-default\n    \n    # Drop all capabilities, add only needed\n    cap_drop:\n      - ALL\n    cap_add:\n      - NET_BIND_SERVICE\n      - SETGID\n      - SETUID\n    \n    # Read-only root filesystem\n    read_only: true\n    tmpfs:\n      - /tmp:size=100M,noexec,nosuid\n      - /run:size=10M,noexec,nosuid\n    \n    # Resource limits\n    deploy:\n      resources:\n        limits:\n          cpus: '1'\n          memory: 512M\n        reservations:\n          cpus: '0.5'\n          memory: 256M\n    \n    # User namespace\n    user: \"1000:1000\"\n    \n    # Secrets\n    secrets:\n      - app_secrets\n      - db_password\n    \n    environment:\n      - NODE_ENV=production\n      - DB_PASSWORD_FILE=/run/secrets/db_password\n    \n    # Logging with rotation\n    logging:\n      driver: json-file\n      options:\n        max-size: \"10m\"\n        max-file: \"3\"\n    \n    # Health check\n    healthcheck:\n      test: [\"CMD\", \"curl\", \"-f\", \"http://localhost:3000/health\"]\n      interval: 30s\n      timeout: 10s\n      retries: 3\n      start_period: 40s\n    \n    # Restart policy\n    restart: unless-stopped\n    \n    # Network isolation\n    networks:\n      - internal\n      - public\n    \n    depends_on:\n      db:\n        condition: service_healthy\n      redis:\n        condition: service_healthy\n\n  db:\n    image: postgres:15-alpine\n    \n    # Security hardening\n    security_opt:\n      - no-new-privileges:true\n    \n    cap_drop:\n      - ALL\n    cap_add:\n      - SETGID\n      - SETUID\n      - CHOWN\n    \n    read_only: true\n    tmpfs:\n      - /tmp:size=100M,noexec,nosuid\n      - /var/run/postgresql:size=10M,noexec,nosuid\n    \n    # Data persistence (writable mount)\n    volumes:\n      - db-data:/var/lib/postgresql/data\n    \n    # Secrets for credentials\n    secrets:\n      - db_password\n    \n    environment:\n      POSTGRES_DB: myapp\n      POSTGRES_USER: appuser\n      POSTGRES_PASSWORD_FILE: /run/secrets/db_password\n    \n    healthcheck:\n      test: [\"CMD-SHELL\", \"pg_isready -U appuser\"]\n      interval: 30s\n      timeout: 10s\n      retries: 5\n    \n    networks:\n      - internal\n    \n    restart: unless-stopped\n\n  redis:\n    image: redis:7-alpine\n    \n    security_opt:\n      - no-new-privileges:true\n    \n    cap_drop:\n      - ALL\n    \n    read_only: true\n    tmpfs:\n      - /tmp:size=50M,noexec,nosuid\n    \n    volumes:\n      - redis-data:/data\n    \n    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD}\n    \n    healthcheck:\n      test: [\"CMD\", \"redis-cli\", \"ping\"]\n      interval: 30s\n      timeout: 10s\n      retries: 3\n    \n    networks:\n      - internal\n    \n    restart: unless-stopped\n\n  nginx:\n    image: nginx:alpine\n    \n    security_opt:\n      - no-new-privileges:true\n    \n    cap_drop:\n      - ALL\n    cap_add:\n      - NET_BIND_SERVICE\n    \n    read_only: true\n    tmpfs:\n      - /tmp:size=50M,noexec,nosuid\n      - /var/cache/nginx:size=100M,noexec\n      - /var/run:size=10M,noexec,nosuid\n    \n    volumes:\n      - ./nginx.conf:/etc/nginx/nginx.conf:ro\n      - ./ssl:/etc/nginx/ssl:ro\n    \n    ports:\n      - \"80:80\"\n      - \"443:443\"\n    \n    networks:\n      - public\n    \n    depends_on:\n      - app\n    \n    restart: unless-stopped\n\n# Secrets management\nsecrets:\n  app_secrets:\n    external: true\n    name: myapp_secrets_${ENVIRONMENT}\n  db_password:\n    file: ./secrets/db_password.txt\n\nnetworks:\n  public:\n    driver: bridge\n    driver_opts:\n      com.docker.network.bridge.enable_icc: \"false\"\n  internal:\n    driver: bridge\n    internal: true\n    driver_opts:\n      com.docker.network.bridge.enable_icc: \"false\"\n\nvolumes:\n  db-data:\n    driver: local\n    driver_opts:\n      type: none\n      device: /mnt/docker-volumes/postgres\n      o: bind\n  redis-data:\n    driver: local\n\n# Security scanning script\n#!/bin/bash\n# security-scan.sh\n\necho \"=== Security Scanning ===\"\n\n# 1. Scan images for vulnerabilities\ndocker scan myapp:latest\ndocker scan postgres:15-alpine\ndocker scan redis:7-alpine\n\n# 2. Check for privileged containers\necho \"Checking for privileged containers...\"\ndocker ps -q | xargs -I {} docker inspect {} | grep -q '\"Privileged\": true' && \\\n    echo \"WARNING: Privileged containers detected\"\n\n# 3. Check for exposed secrets\necho \"Checking for exposed secrets...\"\ndocker-compose config | grep -i -E '(password|secret|key|token)' | grep -v '^#'\n\n# 4. Check for writable root filesystems\necho \"Checking for writable root filesystems...\"\ndocker ps -q | xargs -I {} docker inspect {} | grep -A 5 '\"ReadonlyRootfs\"' | grep false\n\n# 5. Check for dangerous capabilities\necho \"Checking for dangerous capabilities...\"\ndocker ps -q | xargs -I {} docker inspect {} | grep -A 20 '\"CapAdd\"' | grep -E '(SYS_ADMIN|NET_ADMIN|SYS_PTRACE)'\n\n# 6. Check for insecure environment variables\necho \"Checking environment variables...\"\ndocker-compose config | grep environment -A 20\n\n# 7. Check network exposure\necho \"Checking exposed ports...\"\ndocker-compose ps | grep -E '(0.0.0.0:|:::)'\n\n# 8. Check for outdated base images\ndocker inspect myapp:latest | grep -A 5 '\"Image\"'\n\n# CIS Benchmark check\ndocker run --rm \\\n  -v /var/run/docker.sock:/var/run/docker.sock \\\n  docker/docker-bench-security\n\n# Seccomp profile\ncat > /etc/docker/seccomp.json << EOF\n{\n  \"defaultAction\": \"SCMP_ACT_ERRNO\",\n  \"architectures\": [\"SCMP_ARCH_X86_64\"],\n  \"syscalls\": [\n    {\n      \"names\": [\"accept\", \"accept4\", \"bind\", \"clone\", \"connect\"],\n      \"action\": \"SCMP_ACT_ALLOW\"\n    }\n  ]\n}\nEOF\n\n# AppArmor profile\ncat > /etc/apparmor.d/docker-app << EOF\n#include <tunables/global>\n\nprofile docker-app flags=(attach_disconnected,mediate_deleted) {\n  #include <abstractions/base>\n  \n  capability net_bind_service,\n  \n  network inet stream,\n  network inet6 stream,\n  \n  /usr/bin/node mr,\n  /app/** r,\n  /tmp/** rw,\n}\nEOF\n\n# Deploy with security\napparmor_parser -r /etc/apparmor.d/docker-app\ndocker run --security-opt apparmor=docker-app myapp:latest\n\n# Compliance verification\n#!/bin/bash\n# compliance-check.sh\n\ncheck_pci_dss() {\n  echo \"Checking PCI-DSS compliance...\"\n  \n  # Check encryption in transit\n  docker-compose exec nginx grep -q ssl_certificate /etc/nginx/nginx.conf || \\\n    echo \"FAIL: SSL not configured\"\n  \n  # Check logging\n  docker-compose logs --tail=10 app | grep -q \"audit\" || \\\n    echo \"WARNING: No audit logs found\"\n  \n  # Check access controls\n  docker ps -q | xargs -I {} docker exec {} whoami | grep -q root && \\\n    echo \"WARNING: Containers running as root\"\n}\n\ncheck_hipaa() {\n  echo \"Checking HIPAA compliance...\"\n  \n  # Check encryption at rest\n  docker volume inspect db-data | grep -q \"encrypted\" || \\\n    echo \"WARNING: Database volume not encrypted\"\n  \n  # Check audit logging\n  docker-compose logs app | grep -q \"access\" || \\\n    echo \"WARNING: No access logs found\"\n}\n\n# Run compliance checks\ncheck_pci_dss\ncheck_hipaa",
        "tags": ["security", "hardening", "secrets", "compliance", "production"],
        "interview_questions": [
          "How do you secure Docker containers in production?",
          "What are the best practices for managing secrets in Docker Compose?",
          "How do you implement principle of least privilege for containers?",
          "What's the difference between Docker secrets and environment variables?",
          "How do you implement compliance requirements (PCI-DSS, HIPAA) with Docker?",
          "What are the security implications of different network configurations?",
          "How do you perform security scanning for container images?"
        ],
        "commands_to_practice": [
          "docker scan myapp:latest",
          "docker run --security-opt=no-new-privileges:true myapp",
          "docker run --cap-drop=ALL --cap-add=NET_BIND_SERVICE myapp",
          "docker run --read-only --tmpfs /tmp myapp",
          "docker secret create db_password ./secrets/db_password.txt",
          "docker-compose config --no-interpolate"
        ]
      }
    ],
    "bonus_challenge": {
      "title": "Production Migration & Zero-Downtime Deployment",
      "description": "Migrate a legacy application running on a single server to a Docker Compose-based microservices architecture with zero-downtime deployment, blue-green deployment strategy, and full CI/CD integration.",
      "requirements": [
        "Zero-downtime deployment with blue-green strategy",
        "Database migration without downtime",
        "Rollback capability within 5 minutes",
        "Integration with CI/CD pipeline (GitLab CI or GitHub Actions)",
        "Health checks and automatic failover",
        "Monitoring and alerting setup",
        "Documentation of entire process"
      ],
      "phases": [
        {
          "phase": 1,
          "name": "Assessment & Planning",
          "tasks": [
            "Inventory existing services and dependencies",
            "Map out network topology",
            "Design database migration strategy",
            "Create deployment timeline and rollback plan"
          ]
        },
        {
          "phase": 2,
          "name": "Dockerization",
          "tasks": [
            "Create Dockerfiles for each service",
            "Write docker-compose.yml for development",
            "Set up local testing environment",
            "Optimize images for size and security"
          ]
        },
        {
          "phase": 3,
          "name": "CI/CD Pipeline",
          "tasks": [
            "Configure build pipeline with tests",
            "Set up image registry (Docker Hub / ECR)",
            "Implement automated security scanning",
            "Create deployment jobs for staging/production"
          ]
        },
        {
          "phase": 4,
          "name": "Deployment Strategy",
          "tasks": [
            "Implement blue-green deployment",
            "Configure load balancer (NGINX/Traefik)",
            "Set up database migration runner",
            "Create smoke test automation"
          ]
        },
        {
          "phase": 5,
          "name": "Monitoring & Observability",
          "tasks": [
            "Deploy ELK/EFK stack for logging",
            "Set up Prometheus + Grafana",
            "Configure alerts for critical services",
            "Create dashboards for team"
          ]
        },
        {
          "phase": 6,
          "name": "Migration Execution",
          "tasks": [
            "Create detailed runbook",
            "Perform staging migration",
            "Execute production migration",
            "Validate and monitor post-migration"
          ]
        }
      ],
      "deliverables": [
        "Complete Docker Compose files (dev/staging/prod)",
        "CI/CD pipeline configuration",
        "Monitoring dashboards and alerts",
        "Disaster recovery runbook",
        "Migration documentation",
        "Team training materials"
      ],
      "success_metrics": [
        "Zero downtime during migration",
        "< 5 minute rollback time",
        "100% test coverage for critical paths",
        "Container startup time < 30 seconds",
        "Monitoring coverage for all services",
        "Successful security scan with no critical vulnerabilities"
      ]
    },
    "interview_questions_summary": [
      "What's the difference between `docker-compose up` and `docker-compose run`?",
      "How do health checks work in Docker Compose and why are they important?",
      "What are the different ways to manage environment variables in Compose?",
      "How do you implement blue-green deployments with Docker Compose?",
      "What's the difference between `depends_on` with condition vs without?",
      "How do you handle database migrations in a Compose setup?",
      "What are the best practices for logging in Compose?",
      "How do you scale services in Docker Compose?",
      "What's the difference between `version: '2'` and `version: '3'`?",
      "How do you manage secrets in Docker Compose?",
      "What are profiles and when would you use them?",
      "How do you implement zero-downtime deployments?",
      "What's the purpose of `docker-compose config`?",
      "How do you debug issues in a multi-container setup?",
      "What are the limitations of Docker Compose in production?"
    ],
    "best_practices_checklist": [
      "Use version 3.8+ for production deployments",
      "Always specify container names for easier debugging",
      "Implement health checks for all services",
      "Use `depends_on` with `service_healthy` condition",
      "Use environment files for configuration",
      "Implement secrets for sensitive data",
      "Set resource limits for all services",
      "Use logging driver with rotation",
      "Implement multi-stage builds for smaller images",
      "Use networks for service isolation",
      "Profile optional services",
      "Use `.env` files for default values",
      "Implement health check scripts",
      "Use volumes for persistent data",
      "Document service dependencies and ports"
    ],
    "common_mistakes": [
      "Not using health checks and relying on `depends_on` only",
      "Hardcoding secrets in docker-compose.yml",
      "Using `latest` tag in production",
      "Not setting resource limits",
      "Using default bridge network",
      "Not implementing logging strategy",
      "Running containers as root",
      "Not using .dockerignore",
      "Not implementing backup strategy",
      "Using volumes without proper permissions",
      "Not testing rollback procedures",
      "Ignoring network security policies"
    ],
    "advanced_patterns": [
      {
        "name": "Sidecar Pattern",
        "description": "Run auxiliary containers alongside main application for logging, monitoring, or proxy",
        "example": "Running Envoy proxy as sidecar to application container"
      },
      {
        "name": "Ambassador Pattern",
        "description": "Proxy container that handles external connections with retry, circuit breaking",
        "example": "Container that proxies external database with connection pooling"
      },
      {
        "name": "Adapter Pattern",
        "description": "Transform output or logs to required format",
        "example": "Log adapter that converts JSON logs to syslog format"
      },
      {
        "name": "Initializer Pattern",
        "description": "Run one-time setup tasks before main services start",
        "example": "Database migration container that runs before app starts"
      }
    ]
  },
  // ── 6 · Multi-stage Builds & Optimisation ───────────────────────────────────
  {
    "id": 6,
    "level": "Advanced",
    "icon": "Wrench",
    "title": "Multi-stage Builds & Optimisation",
    "summary": "Dramatically reduce image sizes with multi-stage builds, .dockerignore, minimal base images (alpine, distroless, scratch) and BuildKit cache mounts. Master image optimization techniques for production deployments.",
    "topics": [
      "Multi-stage Dockerfile syntax",
      "Choosing a minimal base image",
      ".dockerignore best practices",
      "BuildKit & cache mounts",
      "Scanning images with Trivy",
      "Layer optimization strategies",
      "Distroless & scratch images",
      "Build arguments & labels",
      "Security scanning & SBOM",
      "CI/CD optimization patterns"
    ],
    "exercises": [
      {
        "id": 1,
        "title": "Multi-Stage React Application",
        "difficulty": "Intermediate",
        "fileType": "Dockerfile",
        "description": "Create an optimized multi-stage Dockerfile for a React application. The build stage should compile the React app, and the final stage should serve the static files using Nginx with gzip compression and security headers. Optimize layer caching and minimize final image size.",
        "hints": [
          "Use node:20-alpine for build stage to keep it small",
          "Copy package.json first to leverage layer caching",
          "Use npm ci instead of npm install for reproducible builds",
          "Add .dockerignore to exclude node_modules and build artifacts",
          "Use nginx:alpine for serving static files",
          "Configure nginx with custom config for gzip and caching",
          "Use multi-stage to exclude build dependencies from final image"
        ],
        "solution": "# syntax=docker/dockerfile:1\n\n# Build stage\nFROM node:20-alpine AS builder\n\n# Set working directory\nWORKDIR /app\n\n# Copy package files first for better caching\nCOPY package.json package-lock.json ./\n\n# Install dependencies (using ci for reproducible builds)\nRUN npm ci --only=production\n\n# Copy source code\nCOPY . .\n\n# Build the application\nRUN npm run build\n\n# Production stage\nFROM nginx:alpine\n\n# Install necessary packages for security\nRUN apk add --no-cache curl && \\\n    rm -rf /var/cache/apk/*\n\n# Copy custom nginx configuration\nCOPY nginx.conf /etc/nginx/nginx.conf\nCOPY security-headers.conf /etc/nginx/conf.d/security-headers.conf\n\n# Copy built assets from builder stage\nCOPY --from=builder /app/build /usr/share/nginx/html\n\n# Create non-root user for nginx\nRUN adduser -D -H -u 1000 -s /bin/sh www-data && \\\n    chown -R www-data:www-data /usr/share/nginx/html\n\n# Switch to non-root user\nUSER www-data\n\n# Expose port\nEXPOSE 80\n\n# Health check\nHEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\\n    CMD curl -f http://localhost/ || exit 1\n\n# Run nginx\nCMD [\"nginx\", \"-g\", \"daemon off;\"]\n\n# nginx.conf\nuser www-data;\nworker_processes auto;\nerror_log /dev/stdout warn;\npid /tmp/nginx.pid;\n\nevents {\n    worker_connections 1024;\n}\n\nhttp {\n    include /etc/nginx/mime.types;\n    default_type application/octet-stream;\n\n    # Logging to stdout/stderr\n    access_log /dev/stdout;\n    error_log /dev/stdout;\n\n    # Gzip compression\n    gzip on;\n    gzip_vary on;\n    gzip_min_length 1024;\n    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;\n\n    # Security headers\n    add_header X-Frame-Options \"SAMEORIGIN\" always;\n    add_header X-Content-Type-Options \"nosniff\" always;\n    add_header X-XSS-Protection \"1; mode=block\" always;\n\n    server {\n        listen 80;\n        server_name localhost;\n        root /usr/share/nginx/html;\n        index index.html;\n\n        # Cache static assets\n        location ~* \\.(jpg|jpeg|png|gif|ico|css|js)$ {\n            expires 1y;\n            add_header Cache-Control \"public, immutable\";\n        }\n\n        # Handle SPA routing\n        location / {\n            try_files $uri $uri/ /index.html;\n        }\n    }\n}\n\n# .dockerignore\nnode_modules\nnpm-debug.log\n.git\n.gitignore\n.env\n.env.*\n.DS_Store\nbuild\ncoverage\n.nyc_output\n*.log\nDockerfile\n.dockerignore\nREADME.md",
        "tags": ["multi-stage", "react", "nginx", "optimization", "security"],
        "interview_questions": [
          "Why use multi-stage builds for React applications?",
          "What's the difference between `npm install` and `npm ci` in Docker builds?",
          "How do you optimize layer caching for Node.js dependencies?",
          "What are the benefits of using nginx:alpine over a full nginx image?",
          "How would you implement caching strategies for static assets?",
          "What security headers should be added to production nginx?",
          "Why run nginx as non-root user in production?"
        ],
        "commands_to_practice": [
          "docker build -t react-app .",
          "docker build --no-cache -t react-app .",
          "docker images | grep react-app",
          "docker history react-app",
          "docker run -d -p 80:80 --name react-app react-app",
          "curl -I http://localhost",
          "docker exec react-app ps aux"
        ]
      },
      {
        "id": 2,
        "title": "Optimized Go Binary with Scratch",
        "difficulty": "Advanced",
        "fileType": "Dockerfile",
        "description": "Create an ultra-minimal Docker image for a Go application using multi-stage builds with scratch base. Optimize the binary size with compiler flags, handle timezone data, and ensure proper signal handling for graceful shutdown.",
        "hints": [
          "Use golang:1.22-alpine as builder",
          "Set CGO_ENABLED=0 for static binary",
          "Use -ldflags to strip debug info",
          "Consider using upx to compress binary",
          "Handle timezone data with zoneinfo",
          "Implement proper signal handling"
        ],
        "solution": "# syntax=docker/dockerfile:1\n\n# Build stage\nFROM golang:1.22-alpine AS builder\n\n# Install build dependencies\nRUN apk add --no-cache git ca-certificates tzdata upx\n\n# Set build arguments\nARG VERSION=1.0.0\nARG BUILD_DATE\nARG VCS_REF\n\nWORKDIR /app\n\n# Copy go mod files first for caching\nCOPY go.mod go.sum ./\nRUN go mod download\n\n# Copy source code\nCOPY . .\n\n# Build static binary with optimizations\nRUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build \\\n    -ldflags=\"-w -s \\\n        -X main.version=${VERSION} \\\n        -X main.buildDate=${BUILD_DATE} \\\n        -X main.gitCommit=${VCS_REF}\" \\\n    -a -installsuffix cgo \\\n    -o /app/app \\\n    ./cmd/server\n\n# Compress binary (optional, reduces size but increases startup time)\nRUN upx --best --lzma /app/app\n\n# Final stage - scratch\nFROM scratch\n\n# Copy timezone data from builder\nCOPY --from=builder /usr/share/zoneinfo /usr/share/zoneinfo\n\n# Copy CA certificates for HTTPS requests\nCOPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/\n\n# Copy the binary\nCOPY --from=builder /app/app /app\n\n# Copy static assets if any\nCOPY --from=builder /app/static /static\n\n# Expose port\nEXPOSE 8080\n\n# Set user (scratch doesn't have user management, but we can set numeric ID)\nUSER 1000:1000\n\n# Health check (requires curl, so skip for scratch or use minimal busybox)\n# Alternative: Use a minimal busybox image if health check is needed\n\n# Run the application\nENTRYPOINT [\"/app\"]\nCMD [\"--help\"]\n\n# Alternative with busybox (if health check needed)\n# FROM busybox:glibc\n# COPY --from=builder /app/app /app\n# EXPOSE 8080\n# HEALTHCHECK --interval=30s --timeout=3s CMD wget --spider http://localhost:8080/health\n# ENTRYPOINT [\"/app\"]\n\n# Multi-platform build\n# docker buildx build --platform linux/amd64,linux/arm64 -t go-app:latest .\n\n# Security scanning\n# trivy image --severity HIGH,CRITICAL go-app:latest\n\n# Image size comparison\n# docker images | grep go-app",
        "tags": ["scratch", "go", "static-binary", "ultra-minimal", "upx"],
        "interview_questions": [
          "Why use scratch as base image? What are the trade-offs?",
          "What's the purpose of CGO_ENABLED=0?",
          "How do -ldflags=\"-w -s\" affect binary size?",
          "What are the challenges of debugging scratch-based containers?",
          "How do you handle timezone data in scratch images?",
          "What's the impact of using UPX compression?",
          "How do you implement health checks for scratch images?"
        ],
        "commands_to_practice": [
          "docker build -t go-app .",
          "docker build --build-arg VERSION=2.0.0 -t go-app:v2 .",
          "docker images | grep go-app",
          "docker run --rm go-app --version",
          "docker history go-app",
          "docker run --rm --entrypoint sh go-app",
          "trivy image --severity HIGH go-app"
        ]
      },
      {
        "id": 3,
        "title": "BuildKit Cache Mount Optimization",
        "difficulty": "Advanced",
        "fileType": "Dockerfile",
        "description": "Implement advanced BuildKit cache mounts for multiple package managers (npm, pip, apt) to dramatically speed up CI/CD builds. Optimize layer caching and reduce build times by 50-80%.",
        "hints": [
          "Enable BuildKit with `DOCKER_BUILDKIT=1`",
          "Use cache mounts for package managers",
          "Implement mount type=cache for npm, pip, apt",
          "Use bind mounts for sharing between stages",
          "Implement cache persistence across builds"
        ],
        "solution": "# syntax=docker/dockerfile:1\n\n# Multi-stage with cache mounts\nFROM node:20-alpine AS node-base\nWORKDIR /app\n\n# Cache npm packages\nCOPY package*.json ./\nRUN --mount=type=cache,target=/root/.npm \\\n    npm ci --only=production\n\nFROM python:3.11-slim AS python-base\nWORKDIR /app\n\n# Cache pip packages\nCOPY requirements.txt ./\nRUN --mount=type=cache,target=/root/.cache/pip \\\n    pip install --no-cache-dir -r requirements.txt\n\nFROM ubuntu:22.04 AS apt-base\n\n# Cache apt packages\nRUN --mount=type=cache,target=/var/cache/apt,sharing=locked \\\n    --mount=type=cache,target=/var/lib/apt,sharing=locked \\\n    apt-get update && \\\n    apt-get install -y --no-install-recommends \\\n        curl \\\n        wget \\\n        git \\\n        build-essential && \\\n    rm -rf /var/lib/apt/lists/*\n\n# Full application with multiple caches\nFROM python:3.11-slim AS final\n\n# Enable BuildKit\nENV DOCKER_BUILDKIT=1\n\nWORKDIR /app\n\n# Copy package files\nCOPY package.json package-lock.json ./\nCOPY requirements.txt ./\n\n# Install dependencies with cache mounts\nRUN --mount=type=cache,target=/root/.npm \\\n    --mount=type=cache,target=/root/.cache/pip \\\n    npm ci --only=production && \\\n    pip install --no-cache-dir -r requirements.txt\n\n# Copy application code\nCOPY . .\n\n# Use cache mount for build step\nRUN --mount=type=cache,target=/app/.cache \\\n    --mount=type=bind,source=.,target=/app,ro \\\n    npm run build\n\n# Use secret mount for private repositories\nRUN --mount=type=secret,id=github_token \\\n    --mount=type=cache,target=/root/.cache/pip \\\n    GITHUB_TOKEN=$(cat /run/secrets/github_token) \\\n    pip install git+https://oauth2:${GITHUB_TOKEN}@github.com/private/repo.git\n\nEXPOSE 8000\n\nCMD [\"gunicorn\", \"app:app\", \"-b\", \"0.0.0.0:8000\"]\n\n# docker-compose with BuildKit\n# docker-compose.yml\nversion: '3.8'\n\nservices:\n  app:\n    build:\n      context: .\n      dockerfile: Dockerfile\n      args:\n        DOCKER_BUILDKIT: 1\n    environment:\n      DOCKER_BUILDKIT: 1\n    volumes:\n      - npm-cache:/root/.npm\n      - pip-cache:/root/.cache/pip\n\nvolumes:\n  npm-cache:\n  pip-cache:\n\n# Build script with cache optimization\n#!/bin/bash\n# build-with-cache.sh\n\n# Enable BuildKit\nexport DOCKER_BUILDKIT=1\n\n# Build with cache mounts\ndocker build \\\n  --progress=plain \\\n  --build-arg BUILDKIT_INLINE_CACHE=1 \\\n  --cache-from myapp:latest \\\n  -t myapp:latest \\\n  .\n\n# Use buildx for better caching\ndocker buildx build \\\n  --cache-to type=registry,ref=myregistry/myapp:cache,mode=max \\\n  --cache-from type=registry,ref=myregistry/myapp:cache \\\n  -t myapp:latest \\\n  .\n\n# Monitor cache usage\ndocker system df\ndocker builder du\n\n# Clean old cache\ndocker builder prune --keep-storage=10GB\n\n# BuildKit configuration\n# /etc/docker/daemon.json\n{\n  \"features\": {\n    \"buildkit\": true\n  },\n  \"builder\": {\n    \"gc\": {\n      \"enabled\": true,\n      \"defaultKeepStorage\": \"10GB\"\n    }\n  }\n}",
        "tags": ["BuildKit", "cache-mount", "optimization", "ci-cd"],
        "interview_questions": [
          "What is BuildKit and how does it improve Docker builds?",
          "How do cache mounts differ from layer caching?",
          "What's the difference between `--mount=type=cache` and `--mount=type=bind`?",
          "How do you share cache between CI/CD pipeline runs?",
          "What are the security implications of using cache mounts?",
          "How do you implement multi-stage builds with BuildKit cache mounts?",
          "What's the impact of `sharing=locked` vs `sharing=private`?"
        ],
        "commands_to_practice": [
          "DOCKER_BUILDKIT=1 docker build -t app .",
          "docker build --progress=plain -t app .",
          "docker builder prune",
          "docker system df",
          "docker buildx create --use",
          "docker buildx build --cache-to type=local,dest=/tmp/cache ."
        ]
      },
      {
        "id": 4,
        "title": "Distroless Images for Java Applications",
        "difficulty": "Advanced",
        "fileType": "Dockerfile",
        "description": "Create a secure, minimal Docker image for a Java Spring Boot application using Google's distroless Java base images. Implement multi-stage builds, optimize JVM settings, and ensure the image is production-ready.",
        "hints": [
          "Use eclipse-temurin as builder for compilation",
          "Use gcr.io/distroless/java17-debian11 as final base",
          "Configure JVM memory limits for containers",
          "Add health checks with exec probes",
          "Handle signal propagation properly"
        ],
        "solution": "# syntax=docker/dockerfile:1\n\n# Build stage\nFROM eclipse-temurin:17-jdk-alpine AS builder\n\nWORKDIR /app\n\n# Copy maven wrapper and pom files\nCOPY mvnw .\nCOPY .mvn .mvn\nCOPY pom.xml .\n\n# Download dependencies (cached layer)\nRUN ./mvnw dependency:go-offline -B\n\n# Copy source code\nCOPY src src\n\n# Build the application\nRUN ./mvnw package -DskipTests -B\n\n# Extract layers for better caching with distroless\nRUN java -Djarmode=layertools -jar target/*.jar extract\n\n# Final stage - Distroless\nFROM gcr.io/distroless/java17-debian11\n\n# Set environment variables for JVM\nENV JAVA_OPTS=\"-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -Djava.security.egd=file:/dev/./urandom\"\n\n# Copy layers from builder\nCOPY --from=builder /app/dependencies/ ./\nCOPY --from=builder /app/spring-boot-loader/ ./\nCOPY --from=builder /app/snapshot-dependencies/ ./\nCOPY --from=builder /app/application/ ./\n\n# Create non-root user (distroless doesn't have useradd, but runs as non-root by default)\n# Distroless images already run as non-root user (65532)\n\n# Expose port\nEXPOSE 8080\n\n# Health check using exec probe (distroless has no shell, so use exec form)\n# Note: Health check requires binary, so we rely on container orchestration\n\n# Run the application\nENTRYPOINT [\"java\", \"org.springframework.boot.loader.JarLauncher\"]\n\n# Alternative with custom JVM options\n# ENTRYPOINT [\"java\", \"-XX:+UseContainerSupport\", \"-XX:MaxRAMPercentage=75.0\", \"org.springframework.boot.loader.JarLauncher\"]\n\n# For debugging (if needed)\n# docker run --entrypoint /busybox/sh -it myapp\n\n# Multi-architecture build\n# docker buildx build --platform linux/amd64,linux/arm64 -t java-app:latest .\n\n# Security scanning\ndocker scan java-app:latest\ntrivy image --severity HIGH,CRITICAL java-app:latest\n\n# Docker Compose with JVM tuning\nversion: '3.8'\n\nservices:\n  app:\n    build: .\n    image: java-app:latest\n    ports:\n      - \"8080:8080\"\n    environment:\n      - JAVA_OPTS=-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0\n      - SPRING_PROFILES_ACTIVE=production\n    deploy:\n      resources:\n        limits:\n          memory: 512M\n          cpus: '1'\n        reservations:\n          memory: 256M\n          cpus: '0.5'\n\n# JVM optimization script\n#!/bin/bash\n# jvm-optimize.sh\n\necho \"Testing JVM memory usage...\"\n\n# Run with different memory limits\nfor mem in 128m 256m 512m 1g; do\n  echo \"Testing with memory limit: $mem\"\n  docker run --rm \\\n    --memory=$mem \\\n    java-app:latest \\\n    java -XX:+PrintFlagsFinal -version | grep MaxHeapSize\ndone\n\n# Calculate optimal heap size\nMAX_MEMORY=$(docker run --rm java-app:latest cat /sys/fs/cgroup/memory/memory.limit_in_bytes)\nHEAP_SIZE=$((MAX_MEMORY * 75 / 100))\necho \"Recommended heap size: $HEAP_SIZE bytes\"",
        "tags": ["distroless", "java", "spring-boot", "jvm", "security"],
        "interview_questions": [
          "What are distroless images and why are they more secure?",
          "How do distroless images differ from Alpine-based images?",
          "What are the trade-offs of using distroless images?",
          "How do you debug distroless containers?",
          "What JVM flags are important for containerized Java apps?",
          "How do you implement health checks for distroless images?",
          "What's the purpose of Spring Boot's layertools?"
        ],
        "commands_to_practice": [
          "docker build -t java-app .",
          "docker images | grep java-app",
          "docker run --rm -d -p 8080:8080 --name java-app java-app",
          "docker exec -it java-app /bin/sh",
          "docker run --entrypoint /busybox/sh -it java-app",
          "docker inspect java-app | grep -A 10 \"Config\""
        ]
      },
      {
        "id": 5,
        "title": "Layer Optimization & .dockerignore Mastery",
        "difficulty": "Advanced",
        "fileType": ".dockerignore",
        "description": "Master Docker layer optimization and .dockerignore patterns. Create a comprehensive .dockerignore file, optimize layer ordering, and reduce image size by 90%. Implement strategies for monorepos and large projects.",
        "hints": [
          "Order Dockerfile layers from least to most frequently changing",
          "Use .dockerignore to exclude unnecessary files",
          "Combine RUN commands to reduce layers",
          "Use multi-stage builds to exclude build tools",
          "Implement build-specific ignores for different environments"
        ],
        "solution": "# .dockerignore - Comprehensive version\n# Git\n.git/\n.gitignore\n.gitattributes\n.gitmodules\n\n# Version control\n.svn/\n.hg/\n\n# CI/CD\n.github/\n.gitlab/\n.ci/\n.travis.yml\ncircle.yml\n\n# Dependencies\nnode_modules/\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\npackage-lock.json\nbower_components/\n\n# Python\n__pycache__/\n*.py[cod]\n*$py.class\n*.so\n.Python\nenv/\nvenv/\n.venv/\n*.egg-info/\ndist/\nbuild/\n*.egg\n\n# Java\n*.class\n*.jar\n*.war\n*.ear\n*.log\n.idea/\ntarget/\nout/\n\n# Go\n*.exe\n*.exe~\n*.dll\n*.so\n*.dylib\n*.test\n*.out\nvendor/\n\n# Node\n*.log\n.pnpm-debug.log\nyarn-debug.log*\nyarn-error.log*\n\n# IDE\n.vscode/\n.idea/\n*.swp\n*.swo\n*~\n.DS_Store\n\n# Environment\n.env\n.env.*\n.env.local\n.env.production\n\n# Build outputs\ndist/\nbuild/\ncoverage/\n.nyc_output/\n*.min.js\n*.min.css\n\n# Docker\nDockerfile*\n.dockerignore\ndocker-compose*.yml\ndocker-compose*.yaml\n\n# Testing\ncoverage/\n.nyc_output/\ntest/\ntests/\n*.test.js\n*.spec.js\n*.test.ts\n*.spec.ts\n__tests__/\n\n# Logs\nlogs/\n*.log\nnpm-debug.log*\n\n# OS\n.DS_Store\nThumbs.db\nDesktop.ini\n\n# Temporary files\n*.tmp\n*.temp\n*.cache\n\n# Secrets\n*.pem\n*.key\n*.crt\n*.secret\nsecrets/\n\n# Documentation\nREADME.md\nREADME.rst\nCONTRIBUTING.md\nCHANGELOG.md\nLICENSE\nLICENSE.txt\n*.md\n!.github/README.md\n\n# Media (if not needed)\n*.psd\n*.ai\n*.sketch\n*.mp4\n*.mp3\n*.mov\n\n# Optimized Dockerfile with layer strategy\n# syntax=docker/dockerfile:1\n\n# Leverage build cache with optimal layer order\nFROM node:20-alpine AS deps\nWORKDIR /app\n\n# Layer 1: Copy only package files (changes rarely)\nCOPY package.json package-lock.json ./\n\n# Layer 2: Install dependencies (cached unless package files change)\nRUN --mount=type=cache,target=/root/.npm \\\n    npm ci --only=production\n\n# Layer 3: Copy source (changes frequently)\nFROM deps AS builder\nCOPY . .\nRUN npm run build\n\n# Layer 4: Final minimal image\nFROM nginx:alpine\n\n# Copy from builder\nCOPY --from=builder /app/build /usr/share/nginx/html\n\n# Layer optimization verification script\n#!/bin/bash\n# analyze-layers.sh\n\nIMAGE_NAME=${1:-myapp:latest}\n\necho \"=== Analyzing layers for $IMAGE_NAME ===\"\ndocker history $IMAGE_NAME --no-trunc --format \"table {{.CreatedBy}}\\t{{.Size}}\"\n\necho \"\"\necho \"=== Layer sizes ===\"\ndocker history $IMAGE_NAME --format \"{{.Size}}\" | awk '{sum+=$1} END {print \"Total: \" sum}'\n\necho \"\"\necho \"=== Cache efficiency ===\"\ndocker build --no-cache -t test:latest . 2>&1 | grep -c \"CACHED\"\n\n# Find largest files in image\ndocker run --rm --entrypoint sh $IMAGE_NAME -c \"find / -type f -size +10M 2>/dev/null | xargs ls -lh 2>/dev/null\"\n\n# Optimize image with docker-slim\n# docker-slim build myapp\n\n# Check for unnecessary files\n# docker run --rm -it myapp ls -la /usr/share/doc\n\n# Remove unnecessary packages\n# Use apt-get purge instead of remove\n\n# Combine RUN commands\n# Before\nRUN apt-get update\nRUN apt-get install -y package1\nRUN apt-get install -y package2\nRUN rm -rf /var/lib/apt/lists/*\n\n# After\nRUN apt-get update && \\\n    apt-get install -y --no-install-recommends package1 package2 && \\\n    apt-get clean && \\\n    rm -rf /var/lib/apt/lists/*\n\n# Use --no-install-recommends for apt\nRUN apt-get install -y --no-install-recommends curl\n\n# Clean package manager caches in same layer\nRUN pip install --no-cache-dir package\n\n# Use specific versions instead of latest\nFROM node:20-alpine\nFROM python:3.11-slim\n\n# Build script with optimization\n#!/bin/bash\n# optimize-build.sh\n\n# Build with compression\ndocker build -t myapp:latest .\n\n# Compare with original\ndocker images | grep myapp\n\n# Save and compress image\ndocker save myapp:latest | gzip > myapp.tar.gz\n\n# Analyze with dive\ndive myapp:latest\n\n# Check for vulnerabilities\ndocker scan myapp:latest\n\n# Multi-stage with .dockerignore verification\ncat .dockerignore | while read pattern; do\n  echo \"Checking pattern: $pattern\"\n  find . -path \"$pattern\" -type f | head -5\ndone",
        "tags": [".dockerignore", "layer-optimization", "caching", "image-size"],
        "interview_questions": [
          "What's the optimal order of instructions in a Dockerfile for caching?",
          "How does .dockerignore affect build context and cache?",
          "What's the difference between COPY and ADD for optimization?",
          "How do you reduce the number of layers in an image?",
          "What tools can you use to analyze image layers?",
          "How do you identify and remove unnecessary files from images?",
          "What's the impact of combining RUN commands on caching?"
        ],
        "commands_to_practice": [
          "docker history myapp:latest",
          "docker history --no-trunc myapp:latest",
          "docker build --no-cache -t test .",
          "docker images --digests",
          "dive myapp:latest",
          "docker run --rm myapp du -sh /",
          "docker system df"
        ]
      },
      {
        "id": 6,
        "title": "Security Scanning & SBOM Generation",
        "difficulty": "Advanced",
        "fileType": "ci-script",
        "description": "Implement comprehensive security scanning for Docker images using Trivy, Grype, and Snyk. Generate SBOM (Software Bill of Materials) and integrate security checks into CI/CD pipeline. Implement vulnerability management strategy.",
        "hints": [
          "Use Trivy for vulnerability scanning",
          "Generate SBOM with Syft or Trivy",
          "Implement fail-fast on critical vulnerabilities",
          "Create vulnerability reporting dashboard",
          "Set up automated patching workflow"
        ],
        "solution": "# .github/workflows/security-scan.yml\nname: Security Scan\n\non:\n  push:\n    branches: [ main, develop ]\n  pull_request:\n    branches: [ main ]\n  schedule:\n    - cron: '0 2 * * *'  # Daily scan\n\njobs:\n  security-scan:\n    runs-on: ubuntu-latest\n    \n    steps:\n      - name: Checkout code\n        uses: actions/checkout@v3\n      \n      - name: Build Docker image\n        run: docker build -t myapp:latest .\n      \n      - name: Run Trivy vulnerability scanner\n        uses: aquasecurity/trivy-action@master\n        with:\n          image-ref: myapp:latest\n          format: 'sarif'\n          output: 'trivy-results.sarif'\n          severity: 'CRITICAL,HIGH'\n      \n      - name: Upload Trivy results to GitHub Security\n        uses: github/codeql-action/upload-sarif@v2\n        with:\n          sarif_file: 'trivy-results.sarif'\n      \n      - name: Generate SBOM with Syft\n        run: |\n          syft myapp:latest -o spdx-json > sbom.json\n      \n      - name: Upload SBOM\n        uses: actions/upload-artifact@v3\n        with:\n          name: sbom\n          path: sbom.json\n      \n      - name: Run Snyk security scan\n        uses: snyk/actions/docker@master\n        env:\n          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}\n        with:\n          image: myapp:latest\n          args: --file=Dockerfile\n\n# Security scanning script\n#!/bin/bash\n# security-scan.sh\n\nIMAGE_NAME=${1:-myapp:latest}\n\necho \"=== Security Scanning for $IMAGE_NAME ===\"\n\n# 1. Trivy scan\necho \"Running Trivy scan...\"\ntrivy image --severity HIGH,CRITICAL --exit-code 1 --ignore-unfixed $IMAGE_NAME\n\n# 2. Generate SBOM\necho \"Generating SBOM...\"\ntrivy image --format cyclonedx --output sbom.json $IMAGE_NAME\n\n# 3. Grype scan\necho \"Running Grype scan...\"\ngrype $IMAGE_NAME --fail-on high\n\n# 4. Docker Scout\necho \"Running Docker Scout...\"\ndocker scout quickview $IMAGE_NAME\ndocker scout cves $IMAGE_NAME\n\n# 5. Check for outdated base images\necho \"Checking base image...\"\ndocker inspect $IMAGE_NAME | grep -A 5 \"Image\"\n\n# 6. Check for exposed secrets\necho \"Checking for secrets...\"\ndocker run --rm $IMAGE_NAME env | grep -i -E '(password|secret|key|token)' || echo \"No secrets found\"\n\n# 7. Check for unnecessary packages\necho \"Checking unnecessary packages...\"\ndocker run --rm $IMAGE_NAME which curl wget vim 2>/dev/null && echo \"WARNING: Development tools found\"\n\n# 8. Check for running as root\necho \"Checking user...\"\ndocker run --rm $IMAGE_NAME whoami | grep root && echo \"WARNING: Running as root\"\n\n# Dockerfile with security labels\n# syntax=docker/dockerfile:1\n\nFROM node:20-alpine AS builder\n\n# Add security labels\nLABEL maintainer=\"security@example.com\" \\\n      org.opencontainers.image.title=\"MyApp\" \\\n      org.opencontainers.image.version=\"1.0.0\" \\\n      org.opencontainers.image.created=\"2024-01-01T00:00:00Z\" \\\n      org.opencontainers.image.source=\"https://github.com/example/app\" \\\n      org.opencontainers.image.vendor=\"Example Corp\" \\\n      security.updated=\"2024-01-01T00:00:00Z\" \\\n      security.scanned=\"true\"\n\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\n\nFROM node:20-alpine\n\n# Copy security labels from builder\nCOPY --from=builder /app /app\n\n# Run as non-root\nUSER node\n\nEXPOSE 3000\n\nCMD [\"node\", \"server.js\"]\n\n# Vulnerability management dashboard\n#!/usr/bin/env python3\n# vuln-dashboard.py\n\nimport json\nimport subprocess\nfrom datetime import datetime\n\ndef scan_image(image_name):\n    \"\"\"Run security scan and return results\"\"\"\n    result = subprocess.run(\n        ['trivy', 'image', '--format', 'json', image_name],\n        capture_output=True,\n        text=True\n    )\n    return json.loads(result.stdout)\n\ndef generate_report(vulns):\n    \"\"\"Generate HTML report\"\"\"\n    html = f\"\"\"\n    <html>\n    <head><title>Security Scan Report</title></head>\n    <body>\n    <h1>Vulnerability Report</h1>\n    <p>Generated: {datetime.now()}</p>\n    \n    <h2>Critical Vulnerabilities</h2>\n    <ul>\n    \"\"\"\n    \n    for vuln in vulns.get('Results', []):\n        for v in vuln.get('Vulnerabilities', []):\n            if v['Severity'] == 'CRITICAL':\n                html += f\"\"\"\n                <li>\n                    <strong>{v['VulnerabilityID']}</strong>: {v['Title']}<br>\n                    Package: {v['PkgName']}<br>\n                    Severity: {v['Severity']}<br>\n                    Fixed Version: {v.get('FixedVersion', 'Not available')}<br>\n                </li>\n                \"\"\"\n    \n    html += \"\"\"\n    </ul>\n    </body>\n    </html>\n    \"\"\"\n    \n    with open('scan-report.html', 'w') as f:\n        f.write(html)\n\n# CI/CD integration\n# GitLab CI example\n# .gitlab-ci.yml\nstages:\n  - build\n  - scan\n  - deploy\n\nvariables:\n  DOCKER_IMAGE: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA\n\nbuild:\n  stage: build\n  script:\n    - docker build -t $DOCKER_IMAGE .\n\nsecurity-scan:\n  stage: scan\n  script:\n    - trivy image --severity HIGH,CRITICAL --exit-code 1 $DOCKER_IMAGE\n    - syft $DOCKER_IMAGE -o spdx-json > sbom.json\n  artifacts:\n    paths:\n      - sbom.json\n\nsnyk-scan:\n  stage: scan\n  script:\n    - snyk container test $DOCKER_IMAGE --file=Dockerfile\n  allow_failure: true\n\ndeploy:\n  stage: deploy\n  script:\n    - docker push $DOCKER_IMAGE\n  only:\n    - main",
        "tags": ["security", "scanning", "SBOM", "vulnerability", "trivy"],
        "interview_questions": [
          "What is SBOM and why is it important?",
          "How do you integrate security scanning into CI/CD?",
          "What's the difference between Trivy, Grype, and Snyk?",
          "How do you prioritize vulnerability fixes?",
          "What's the process for patching base images?",
          "How do you ensure compliance with security standards?",
          "What's the role of vulnerability management in DevOps?"
        ],
        "commands_to_practice": [
          "trivy image myapp:latest",
          "trivy image --severity HIGH,CRITICAL myapp:latest",
          "syft myapp:latest -o spdx-json > sbom.json",
          "docker scout quickview myapp:latest",
          "docker scan myapp:latest",
          "grype myapp:latest"
        ]
      },
      {
        "id": 7,
        "title": "CI/CD Pipeline Optimization",
        "difficulty": "Advanced",
        "fileType": "ci-script",
        "description": "Design and implement an optimized CI/CD pipeline for Docker builds with layer caching, parallel builds, and deployment strategies. Achieve sub-2-minute build times for large applications.",
        "hints": [
          "Use Docker BuildKit with cache mounts",
          "Implement remote build cache",
          "Use parallel stages for testing",
          "Implement image tagging strategy",
          "Use buildx for multi-platform builds"
        ],
        "solution": "# .github/workflows/ci-cd.yml\nname: CI/CD Pipeline\n\non:\n  push:\n    branches: [ main, develop ]\n    tags:\n      - 'v*'\n  pull_request:\n    branches: [ main ]\n\nenv:\n  REGISTRY: ghcr.io\n  IMAGE_NAME: ${{ github.repository }}\n\njobs:\n  build-and-test:\n    runs-on: ubuntu-latest\n    \n    steps:\n      - name: Checkout\n        uses: actions/checkout@v3\n      \n      - name: Set up Docker Buildx\n        uses: docker/setup-buildx-action@v2\n        with:\n          driver-opts: |\n            image=moby/buildkit:master\n            network=host\n      \n      - name: Cache Docker layers\n        uses: actions/cache@v3\n        with:\n          path: /tmp/.buildx-cache\n          key: ${{ runner.os }}-buildx-${{ github.sha }}\n          restore-keys: |\n            ${{ runner.os }}-buildx-\n      \n      - name: Build and test\n        uses: docker/build-push-action@v4\n        with:\n          context: .\n          target: test\n          load: true\n          tags: myapp:test\n          cache-from: type=local,src=/tmp/.buildx-cache\n          cache-to: type=local,dest=/tmp/.buildx-cache-new,mode=max\n      \n      - name: Run tests\n        run: |\n          docker run --rm myapp:test npm test\n      \n      - name: Build production image\n        if: github.event_name != 'pull_request'\n        uses: docker/build-push-action@v4\n        with:\n          context: .\n          target: production\n          push: false\n          tags: myapp:prod\n          cache-from: type=local,src=/tmp/.buildx-cache\n      \n      - name: Security scan\n        if: github.event_name != 'pull_request'\n        run: |\n          trivy image --severity HIGH,CRITICAL --exit-code 1 myapp:prod\n      \n      - name: Move cache\n        run: |\n          rm -rf /tmp/.buildx-cache\n          mv /tmp/.buildx-cache-new /tmp/.buildx-cache\n\n  build-and-push:\n    needs: build-and-test\n    if: github.event_name == 'push' && (github.ref == 'refs/heads/main' || startsWith(github.ref, 'refs/tags/v'))\n    runs-on: ubuntu-latest\n    \n    steps:\n      - name: Checkout\n        uses: actions/checkout@v3\n      \n      - name: Set up Docker Buildx\n        uses: docker/setup-buildx-action@v2\n      \n      - name: Log in to registry\n        uses: docker/login-action@v2\n        with:\n          registry: ${{ env.REGISTRY }}\n          username: ${{ github.actor }}\n          password: ${{ secrets.GITHUB_TOKEN }}\n      \n      - name: Extract metadata\n        id: meta\n        uses: docker/metadata-action@v4\n        with:\n          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}\n          tags: |\n            type=ref,event=branch\n            type=ref,event=pr\n            type=semver,pattern={{version}}\n            type=semver,pattern={{major}}.{{minor}}\n            type=sha\n            type=raw,value=latest,enable={{is_default_branch}}\n      \n      - name: Build and push\n        uses: docker/build-push-action@v4\n        with:\n          context: .\n          target: production\n          push: true\n          tags: ${{ steps.meta.outputs.tags }}\n          labels: ${{ steps.meta.outputs.labels }}\n          cache-from: type=gha\n          cache-to: type=gha,mode=max\n          platforms: linux/amd64,linux/arm64\n\n  deploy:\n    needs: build-and-push\n    runs-on: ubuntu-latest\n    \n    steps:\n      - name: Deploy to production\n        run: |\n          curl -X POST https://api.example.com/deploy \\\n            -H \"Authorization: Bearer ${{ secrets.DEPLOY_TOKEN }}\" \\\n            -H \"Content-Type: application/json\" \\\n            -d '{\"image\":\"${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}\"}'\n\n# Build cache optimization script\n#!/bin/bash\n# build-optimized.sh\n\nexport DOCKER_BUILDKIT=1\n\n# Use registry cache\ndocker build \\\n  --cache-from myregistry/myapp:latest \\\n  --cache-from myregistry/myapp:cache \\\n  -t myapp:latest \\\n  .\n\n# Use inline cache\ndocker build \\\n  --build-arg BUILDKIT_INLINE_CACHE=1 \\\n  -t myapp:latest \\\n  .\n\n# Push with cache\ndocker buildx build \\\n  --push \\\n  --cache-to type=registry,ref=myregistry/myapp:cache,mode=max \\\n  --cache-from type=registry,ref=myregistry/myapp:cache \\\n  -t myapp:latest \\\n  .\n\n# Parallel builds with matrix\nfor target in test lint build; do\n  docker build --target $target -t myapp:$target . &\ndone\nwait\n\n# Pre-build dependencies\ndocker build --target deps -t myapp:deps .\ndocker build --cache-from myapp:deps -t myapp:latest .\n\n# Build statistics\ntime docker build -t myapp:latest .\ndocker system df\ndocker builder du\n\n# Optimize CI/CD script\n#!/bin/bash\n# gitlab-ci-optimized.sh\n\n# Use buildx with registry cache\ndocker buildx build \\\n  --cache-from type=registry,ref=$CI_REGISTRY_IMAGE:cache \\\n  --cache-to type=registry,ref=$CI_REGISTRY_IMAGE:cache,mode=max \\\n  --build-arg BUILDKIT_INLINE_CACHE=1 \\\n  -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA \\\n  .\n\n# Parallel testing\ndocker run --rm $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA npm test &\ndocker run --rm $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA npm run lint &\ndocker run --rm $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA npm run audit &\nwait\n\n# Optimize layer caching\n# Use --mount=type=cache for CI\ndocker build --progress=plain -t myapp:latest . 2>&1 | tee build.log\n\n# Analyze cache hits\ngrep \"CACHED\" build.log | wc -l\n\n# Calculate savings\nCACHED_LAYERS=$(grep -c \"CACHED\" build.log)\nTOTAL_LAYERS=$(grep -c \"RUN\\|COPY\\|ADD\" Dockerfile)\necho \"Cache hit rate: $((CACHED_LAYERS * 100 / TOTAL_LAYERS))%\"",
        "tags": ["ci-cd", "pipeline", "github-actions", "buildx", "caching"],
        "interview_questions": [
          "How do you optimize Docker builds in CI/CD pipelines?",
          "What strategies do you use for build cache in CI/CD?",
          "How do you implement multi-platform builds in CI?",
          "What's the difference between inline cache and registry cache?",
          "How do you handle secrets in CI/CD Docker builds?",
          "What's the optimal tagging strategy for Docker images?",
          "How do you reduce build times for large monorepos?"
        ],
        "commands_to_practice": [
          "docker buildx create --use",
          "docker buildx build --push --platform linux/amd64,linux/arm64 -t myapp:latest .",
          "docker build --cache-from myapp:latest -t myapp:new .",
          "docker system prune -a --filter until=24h",
          "docker builder prune --keep-storage=10GB"
        ]
      },
      {
        "id": 8,
        "title": "Extreme Image Optimization Challenge",
        "difficulty": "Expert",
        "fileType": "Dockerfile",
        "description": "Take an existing bloated Docker image (500MB+) and optimize it to under 20MB using every optimization technique: multi-stage builds, minimal base images, binary stripping, compression, and removing unnecessary files. Document the optimization journey.",
        "hints": [
          "Start with alpine or distroless",
          "Use multi-stage builds to exclude build tools",
          "Strip debug symbols from binaries",
          "Remove package manager caches",
          "Combine layers and clean up in same RUN",
          "Use .dockerignore aggressively",
          "Consider scratch for static binaries",
          "Analyze with dive and docker history"
        ],
        "solution": "# Original bloated Dockerfile (500MB+)\n# FROM ubuntu:latest\n# RUN apt-get update && apt-get install -y python3 python3-pip\n# COPY . /app\n# RUN pip install -r requirements.txt\n# CMD [\"python3\", \"app.py\"]\n\n# Optimized version (<20MB)\n# syntax=docker/dockerfile:1\n\n# Stage 1: Builder\nFROM python:3.11-alpine AS builder\n\nWORKDIR /app\n\n# Install build dependencies\nRUN apk add --no-cache gcc musl-dev libffi-dev\n\n# Copy requirements and install\nCOPY requirements.txt .\nRUN pip install --no-cache-dir --user -r requirements.txt\n\n# Stage 2: Minimal runtime\nFROM python:3.11-alpine\n\n# Install only runtime dependencies\nRUN apk add --no-cache libffi\n\n# Create non-root user\nRUN addgroup -g 1000 appuser && \\\n    adduser -D -u 1000 -G appuser appuser\n\nWORKDIR /app\n\n# Copy installed packages from builder\nCOPY --from=builder --chown=appuser:appuser /root/.local /home/appuser/.local\n\n# Copy application\nCOPY --chown=appuser:appuser . .\n\n# Set PATH\nENV PATH=/home/appuser/.local/bin:$PATH\n\n# Switch to non-root user\nUSER appuser\n\n# Health check\nHEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\\n    CMD python -c \"import urllib.request; urllib.request.urlopen('http://localhost:8000/health')\"\n\nEXPOSE 8000\n\nCMD [\"python\", \"app.py\"]\n\n# Optimize with upx for compiled binaries\n# Dockerfile for Go\nFROM golang:1.22-alpine AS builder\n\nRUN apk add --no-cache upx\n\nWORKDIR /app\nCOPY . .\n\nRUN CGO_ENABLED=0 go build -ldflags=\"-w -s\" -o app .\nRUN upx --best --lzma app\n\nFROM scratch\nCOPY --from=builder /app/app /app\nCOPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/\nENTRYPOINT [\"/app\"]\n\n# Optimization script\n#!/bin/bash\n# extreme-optimize.sh\n\nIMAGE_NAME=${1:-myapp}\n\necho \"=== Extreme Optimization Challenge ===\"\n\n# 1. Analyze current image\necho \"Analyzing original image...\"\ndocker images | grep $IMAGE_NAME\ndocker history $IMAGE_NAME\n\n# 2. Find largest files\ndocker run --rm $IMAGE_NAME find / -type f -size +10M 2>/dev/null | head -20\n\n# 3. Check for unnecessary packages\ndocker run --rm $IMAGE_NAME which curl wget vim python3-pip 2>/dev/null\n\n# 4. Check for debug symbols\ndocker run --rm $IMAGE_NAME file /usr/bin/python3 | grep debug\n\n# 5. Optimize Dockerfile\ncat > Dockerfile.optimized << 'EOF'\n# syntax=docker/dockerfile:1\n\n# Build stage\nFROM alpine:3.19 AS builder\nRUN apk add --no-cache python3 py3-pip\nCOPY requirements.txt .\nRUN pip install --no-cache-dir --user -r requirements.txt\n\n# Runtime stage\nFROM alpine:3.19\nRUN apk add --no-cache python3\nCOPY --from=builder /root/.local /root/.local\nCOPY . .\nENV PATH=/root/.local/bin:$PATH\nCMD [\"python3\", \"app.py\"]\nEOF\n\n# 6. Build optimized image\nDOCKER_BUILDKIT=1 docker build -f Dockerfile.optimized -t $IMAGE_NAME:optimized .\n\n# 7. Compare sizes\nprintf \"\\n=== Size Comparison ===\\n\"\ndocker images | grep $IMAGE_NAME\n\n# 8. Compare layers\ndocker history $IMAGE_NAME:original\ndocker history $IMAGE_NAME:optimized\n\n# 9. Run dive analysis\ndive $IMAGE_NAME:original\ndive $IMAGE_NAME:optimized\n\n# 10. Check for vulnerabilities\ntrivy image $IMAGE_NAME:optimized\n\n# Optimization checklist\ncat > optimization-checklist.md << 'EOF'\n# Docker Image Optimization Checklist\n\n## ✅ Base Image\n- [ ] Use alpine or distroless instead of full OS\n- [ ] Use specific version tags\n- [ ] Consider scratch for static binaries\n\n## ✅ Multi-stage Builds\n- [ ] Separate build and runtime stages\n- [ ] Copy only necessary artifacts\n- [ ] Use --from to copy between stages\n\n## ✅ Layer Optimization\n- [ ] Combine RUN commands\n- [ ] Order layers by change frequency\n- [ ] Clean caches in same layer\n\n## ✅ Dependency Management\n- [ ] Use --no-cache for package managers\n- [ ] Use --no-install-recommends for apt\n- [ ] Remove unnecessary dev dependencies\n\n## ✅ Binary Optimization\n- [ ] Strip debug symbols (-ldflags=\"-w -s\")\n- [ ] Use UPX compression for binaries\n- [ ] Enable static linking when possible\n\n## ✅ .dockerignore\n- [ ] Exclude development files\n- [ ] Exclude version control files\n- [ ] Exclude test files and coverage\n\n## ✅ Security\n- [ ] Run as non-root user\n- [ ] Remove package managers from final image\n- [ ] Scan for vulnerabilities\n\n## ✅ Final Checks\n- [ ] Verify functionality\n- [ ] Check startup time\n- [ ] Test health checks\n- [ ] Document size reduction\nEOF\n\necho \"Optimization checklist created: optimization-checklist.md\"\n\n# Benchmark script\n#!/bin/bash\n# benchmark-optimization.sh\n\necho \"Benchmarking image optimization...\"\n\n# Original image\necho \"Original image:\"\ntime docker run --rm original-app npm test\ndocker images original-app --format \"{{.Size}}\"\n\n# Optimized image\necho \"Optimized image:\"\ntime docker run --rm optimized-app npm test\ndocker images optimized-app --format \"{{.Size}}\"\n\n# Startup time comparison\necho \"Startup time comparison:\"\ntime docker run --rm original-app echo \"Started\"\ntime docker run --rm optimized-app echo \"Started\"\n\n# Security comparison\necho \"Security comparison:\"\ntrivy image --severity HIGH original-app\ntrivy image --severity HIGH optimized-app",
        "tags": ["extreme-optimization", "challenge", "size-reduction", "best-practices"],
        "interview_questions": [
          "What's the smallest possible image size for your application?",
          "How do you approach extreme image optimization?",
          "What trade-offs are involved in extreme optimization?",
          "How do you balance security, size, and functionality?",
          "What tools do you use to analyze and optimize images?",
          "What's your process for optimizing a bloated image?",
          "How do you verify that an optimized image still works correctly?"
        ],
        "commands_to_practice": [
          "dive myapp:latest",
          "docker history myapp:latest --no-trunc",
          "docker run --rm myapp du -sh /",
          "docker images | sort -k7 -h",
          "docker system df",
          "docker build --progress=plain -t myapp . 2>&1 | tee build.log"
        ]
      }
    ],
    "bonus_challenge": {
      "title": "Enterprise Image Optimization Program",
      "description": "Design and implement an enterprise-wide Docker image optimization program. Create guidelines, automation tools, and metrics to reduce image sizes across the organization by 70% while maintaining security and performance.",
      "requirements": [
        "Create base images optimized for each language/framework",
        "Implement automated image scanning and optimization CI/CD",
        "Develop image size tracking dashboard",
        "Create optimization guidelines and best practices documentation",
        "Implement automated dependency updates and vulnerability patching",
        "Design multi-stage build templates for common use cases"
      ],
      "phases": [
        {
          "phase": 1,
          "name": "Assessment & Inventory",
          "tasks": [
            "Inventory all existing images across organization",
            "Analyze current sizes and layers",
            "Identify optimization opportunities",
            "Create baseline metrics"
          ]
        },
        {
          "phase": 2,
          "name": "Base Image Development",
          "tasks": [
            "Create optimized base images for Node.js, Python, Go, Java",
            "Implement security hardening",
            "Set up automated base image updates",
            "Document base image usage"
          ]
        },
        {
          "phase": 3,
          "name": "CI/CD Integration",
          "tasks": [
            "Add image size checks to CI pipelines",
            "Implement automated optimization suggestions",
            "Set up image size tracking",
            "Create optimization reports"
          ]
        },
        {
          "phase": 4,
          "name": "Migration & Training",
          "tasks": [
            "Migrate applications to optimized base images",
            "Provide training on Docker optimization",
            "Create internal workshops and documentation",
            "Establish optimization champions"
          ]
        },
        {
          "phase": 5,
          "name": "Monitoring & Continuous Improvement",
          "tasks": [
            "Track image size trends over time",
            "Monitor security vulnerabilities",
            "Automate dependency updates",
            "Regular optimization reviews"
          ]
        }
      ],
      "deliverables": [
        "Optimized base images for all languages",
        "CI/CD optimization pipeline",
        "Image size dashboard and metrics",
        "Optimization guidelines and best practices",
        "Training materials and workshops",
        "Monthly optimization reports"
      ],
      "success_metrics": [
        "70% reduction in average image size",
        "50% reduction in build times",
        "90% reduction in critical vulnerabilities",
        "100% of images scanned before deployment",
        "Zero images running as root in production",
        "$100K annual savings in registry storage costs"
      ]
    },
    "interview_questions_summary": [
      "What are multi-stage builds and why are they important?",
      "How do you reduce Docker image size? List 10 techniques.",
      "What's the difference between alpine, distroless, and scratch?",
      "How does BuildKit improve Docker builds?",
      "What are cache mounts and when would you use them?",
      "How do you optimize layer caching in Dockerfiles?",
      "What tools do you use for image security scanning?",
      "What's the purpose of .dockerignore and what should be in it?",
      "How do you implement multi-platform builds?",
      "What's the difference between COPY and ADD for optimization?",
      "How do you handle secrets in Docker builds?",
      "What's the impact of combining RUN commands?",
      "How do you optimize build times in CI/CD pipelines?",
      "What's the role of SBOM in container security?",
      "How do you implement image size monitoring and alerts?"
    ],
    "best_practices_checklist": [
      "Use multi-stage builds for all applications",
      "Choose the smallest possible base image",
      "Order Dockerfile layers for optimal caching",
      "Use .dockerignore to exclude unnecessary files",
      "Combine RUN commands and clean up in same layer",
      "Use BuildKit with cache mounts for package managers",
      "Strip debug symbols from binaries",
      "Remove package managers from final images",
      "Run containers as non-root user",
      "Add health checks to all services",
      "Scan images for vulnerabilities before deployment",
      "Generate SBOM for compliance",
      "Use specific version tags, never latest",
      "Implement image size tracking",
      "Optimize for multi-platform builds"
    ],
    "common_mistakes": [
      "Using latest tag as base image",
      "Not using .dockerignore and copying unnecessary files",
      "Installing build tools in final image",
      "Not combining RUN commands and creating too many layers",
      "Running as root in production",
      "Not cleaning package manager caches",
      "Using full OS images when alpine would suffice",
      "Not leveraging layer caching effectively",
      "Not using BuildKit features",
      "Forgetting to add health checks",
      "Not scanning images for vulnerabilities",
      "Using ADD when COPY is sufficient"
    ],
    "optimization_techniques": [
      {
        "name": "Multi-stage builds",
        "savings": "50-90%",
        "description": "Separate build dependencies from runtime",
        "example": "Build with full SDK, run with minimal runtime"
      },
      {
        "name": "Minimal base images",
        "savings": "40-80%",
        "description": "Use alpine, distroless, or scratch",
        "example": "Ubuntu: 70MB → Alpine: 5MB → Scratch: 2MB"
      },
      {
        "name": "Layer caching",
        "savings": "30-70% build time",
        "description": "Order layers by change frequency",
        "example": "Copy package files before source code"
      },
      {
        "name": "BuildKit cache mounts",
        "savings": "40-60% build time",
        "description": "Persist package caches across builds",
        "example": "Cache npm, pip, apt packages"
      },
      {
        "name": "Binary stripping",
        "savings": "30-50%",
        "description": "Remove debug symbols and unnecessary metadata",
        "example": "go build -ldflags=\"-w -s\""
      },
      {
        "name": "UPX compression",
        "savings": "50-70%",
        "description": "Compress binaries with UPX",
        "example": "upx --best --lzma binary"
      },
      {
        "name": "Dependency pruning",
        "savings": "20-40%",
        "description": "Remove unused dependencies",
        "example": "npm prune --production"
      }
    ]
  }
];

// ─── Global Exercises (shown on /docker-practice/exercises) ──────────────────
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
