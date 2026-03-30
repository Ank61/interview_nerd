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
  {
    id: 1,
    level: "Beginner",
    icon: "Container",
    title: "Images & Containers",
    summary:
      "Understand the difference between Docker images (read-only templates) and containers (running instances). Learn `docker pull`, `docker run`, `docker ps`, and `docker stop`.",
    topics: [
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
    ],
  },
  {
    id: 4,
    level: "Intermediate",
    icon: "Network",
    title: "Networking",
    summary:
      "Explore Docker's built-in network drivers: bridge, host and none. Create custom networks so containers can communicate securely by name.",
    topics: [
      "Bridge, host & none networks",
      "Creating custom networks",
      "Container DNS resolution",
      "Exposing vs publishing ports",
      "docker network commands",
    ],
  },
  {
    id: 5,
    level: "Intermediate",
    icon: "Terminal",
    title: "Docker Compose",
    summary:
      "Define and run multi-container applications with a single `docker-compose.yml`. Services, networks, volumes and environment variables — all declaratively.",
    topics: [
      "docker-compose.yml structure",
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
//   description    {string}  – scenario description shown to user
//   hints          {string[]}– ordered list of hints (revealed on demand)
//   solution       {string}  – reference Dockerfile (revealed on demand)
//   tags           {string[]}– instruction/topic badges
// ─────────────────────────────────────────────────────────────────────────────
export const dockerExercises = [
  {
    id: 1,
    title: "Basic Node.js App",
    difficulty: "Beginner",
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
  // ── Add more exercises below this line ──────────────────────────────────────
  // {
  //   id: 6,
  //   title: "Your Exercise Title",
  //   difficulty: "Beginner" | "Intermediate" | "Advanced",
  //   description: "Describe the scenario...",
  //   hints: ["Hint 1", "Hint 2"],
  //   solution: `FROM ...`,
  //   tags: ["TAG1"],
  // },
];
