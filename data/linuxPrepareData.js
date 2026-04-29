export const linuxPrepareData = {
  id: 15,
  category: "linux",
  themeBgColor: "#DCFCE7",
  textColor: "#166534",
  topicColor: "#16a34a",
  lightColor: "#f0fdf4",
  type: [
    {
      id: 1,
      label: "Beginner",
      concepts: [
        {
          topic: "Basic Navigation & File Operations",
          tags: ["linux"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Linux file system navigation is the foundation of command-line mastery. Every task — from deploying code to debugging servers — starts with knowing how to move through directories and manage files efficiently.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Essential Navigation Commands</h4>
<pre><code class="language-bash">pwd           # Print current working directory
ls -lah       # List all files (long format, human-readable sizes)
cd /var/log   # Change to absolute path
cd ..         # Go up one directory
cd -          # Jump back to previous directory
mkdir -p a/b  # Create nested directories at once
cp -r src dst # Copy directory recursively
mv old new    # Move or rename file/directory
rm -rf dir/   # Remove directory recursively (use with caution!)
find . -name "*.conf"  # Find files by name pattern</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Absolute vs Relative Paths</h4>
<p style="line-height: 1.75;">An <strong>absolute path</strong> starts from root: <code>/home/ubuntu/app</code>. A <strong>relative path</strong> starts from your current location: <code>./config</code> or <code>../logs</code>. Use <code>pwd</code> anytime you get disoriented in the directory tree.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Hidden Files & Wildcards</h4>
<p style="line-height: 1.75;">Files beginning with a dot (<code>.</code>) are hidden. Use <code>ls -a</code> to reveal them. Common hidden files: <code>.bashrc</code>, <code>.env</code>, <code>.ssh/</code>. Use wildcards like <code>*.log</code> to match multiple files at once.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Productivity Tips</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Press <strong>Tab</strong> to autocomplete file and directory names</li>
  <li>Use <code>cd -</code> to instantly switch between two directories</li>
  <li>Use <code>cd ~</code> or just <code>cd</code> to return home instantly</li>
  <li>Use <code>!!​</code> to repeat the last command, or <code>!$</code> for the last argument</li>
</ul>
</div>`,
          examples: [
            `# Navigate and inspect
pwd && ls -lah
cd /var/log && ls -lt | head -5

# Create a full directory tree with one command
mkdir -p /tmp/myproject/src/components

# Find config files anywhere (suppress permission errors)
find /etc -name "*.conf" 2>/dev/null | head -20

# Copy only log files to backup directory
cp /var/log/*.log /tmp/backup/`
          ],
          questions: [
            {
              question: "What is the difference between an absolute and relative path?",
              solution: "<p>An <strong>absolute path</strong> always starts from the root directory (<code>/</code>) and specifies the full path regardless of your current location. Example: <code>/home/ubuntu/app/index.js</code>. A <strong>relative path</strong> is relative to your current working directory. Example: <code>./app/index.js</code> or <code>../logs/</code>. Use <code>pwd</code> to find where you are when using relative paths.</p>"
            },
            {
              question: "What does the '-p' flag do when using mkdir?",
              solution: "<p>The <code>-p</code> flag (parents) tells mkdir to (1) create all necessary parent directories if they don't exist and (2) not throw an error if the directory already exists. For example, <code>mkdir -p project/src/components</code> creates all three directories in one command — without <code>-p</code>, mkdir would fail if <code>project/src</code> doesn't already exist.</p>"
            },
            {
              question: "What's the difference between `rm -r` and `rmdir`?",
              solution: "<p><code>rmdir</code> can only remove <strong>empty</strong> directories — it fails if the directory contains any files or subdirectories. <code>rm -r</code> (recursive) removes the directory and all of its contents. Adding <code>-f</code> (force) skips confirmation prompts. Always double-check the path before using <code>rm -rf</code> — there is no recycle bin.</p>"
            },
          ],
          links: [
            "https://linuxcommand.org/lc3_lts0020.php",
            "https://www.gnu.org/software/coreutils/manual/coreutils.html",
          ],
        },
        {
          topic: "Text Processing & Search",
          tags: ["linux"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Linux is text-centric by design. Mastering tools like <code>grep</code>, <code>sed</code>, <code>awk</code>, and <code>cut</code> allows you to search and transform data streams — essential for log analysis, config management, and automation.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">grep — Search Text</h4>
<pre><code class="language-bash">grep 'error' app.log           # Search for pattern
grep -i 'error' app.log        # Case-insensitive
grep -v 'debug' app.log        # Invert: lines NOT matching
grep -n 'fail' app.log         # Show line numbers
grep -r 'TODO' ./src/          # Recursive directory search
grep -A 3 'Exception' app.log  # 3 lines after match
grep -c 'error' app.log        # Count matching lines
grep -E 'error|warn' app.log   # Extended regex (OR)</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">sed — Stream Editor</h4>
<pre><code class="language-bash">sed 's/old/new/' file.txt       # Replace first match per line
sed 's/old/new/g' file.txt      # Replace ALL matches per line
sed -i 's/foo/bar/g' file.txt   # Edit file in place
sed -i.bak 's/x/y/g' file.txt  # Edit in place with backup
sed '/^#/d' config.txt         # Delete comment lines</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">awk — Column & Data Processor</h4>
<pre><code class="language-bash">awk '{print $1}' file.txt          # Print 1st column
awk -F ',' '{print $3}' data.csv   # Comma-separated: 3rd column
awk 'NR>1 {print $2, $5}' file.txt # Skip header row
awk 'NR%2==0' file.txt             # Print even lines</code></pre>
</div>`,
          examples: [
            `# Real-world log analysis pipeline
grep "$(date +%Y-%m-%d)" /var/log/nginx/access.log | \\
  grep -v '200' | \\
  awk '{print $1, $7, $9}' | \\
  sort | uniq -c | sort -rn | head -20

# Replace config value in place
sed -i 's/DEBUG=true/DEBUG=false/g' .env

# Extract unique IP addresses from access log, sorted by frequency
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -10`
          ],
          questions: [
            {
              question: "Explain what `grep -v` does.",
              solution: "<p><code>grep -v</code> inverts the match — it prints all lines that do <strong>NOT</strong> match the given pattern. For example, <code>grep -v 'debug' app.log</code> shows all log lines except debug messages. It's useful for filtering noise. You can chain it: <code>grep 'error' app.log | grep -v 'handled'</code> shows unhandled errors.</p>"
            },
            {
              question: "How would you replace all instances of 'foo' with 'bar' in a file?",
              solution: "<p>Use <code>sed</code> with the global flag: <code>sed -i 's/foo/bar/g' file.txt</code>. The <code>s</code> stands for substitute, the <code>g</code> at the end means global (all occurrences per line — without it, only the first occurrence per line is replaced), and <code>-i</code> edits the file in place. To make a backup: <code>sed -i.bak 's/foo/bar/g' file.txt</code> saves the original as <code>file.txt.bak</code>.</p>"
            },
            {
              question: "What is the function of the pipe | operator?",
              solution: "<p>The pipe operator (<code>|</code>) connects the <strong>stdout</strong> (standard output) of one command to the <strong>stdin</strong> (standard input) of the next. It allows you to compose small, focused commands into powerful pipelines without creating temporary files. Example: <code>ps aux | grep nginx | awk '{print $2}'</code> lists all nginx processes then extracts just their PIDs. This composability is a core Unix/Linux philosophy.</p>"
            },
          ],
          links: [
            "https://www.gnu.org/software/grep/manual/grep.html",
            "https://www.grymoire.com/Unix/Sed.html",
            "https://www.grymoire.com/Unix/Awk.html",
          ],
        },
        {
          topic: "Process & System Monitoring",
          tags: ["linux"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Understanding what's running on your system and how resources are being consumed is essential for diagnosing performance issues, identifying rogue processes, and maintaining server health.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Viewing Processes</h4>
<pre><code class="language-bash">ps aux                     # All running processes
ps -ef                     # All processes (System V style)
ps aux | grep nginx        # Filter by process name
top                        # Live interactive process monitor
htop                       # Enhanced live monitor (if installed)
pgrep nginx                # Get PID(s) by name
pidof nginx                # Alternative PID lookup</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Managing Processes</h4>
<pre><code class="language-bash">kill PID           # SIGTERM — graceful shutdown request
kill -9 PID        # SIGKILL — immediate force kill
kill -15 PID       # SIGTERM explicitly
pkill nginx        # Kill by process name
killall node       # Kill all processes named 'node'
nohup cmd &        # Run command immune to hangup, in background</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">System Resource Monitoring</h4>
<pre><code class="language-bash">free -h            # RAM usage in human-readable format
uptime             # System uptime and 1/5/15-min load averages
vmstat 1 5         # Virtual memory stats every 1 second, 5 times
iostat             # CPU and disk I/O statistics
lscpu              # CPU architecture info
uname -a           # Kernel and OS info</code></pre>
</div>`,
          examples: [
            `# Top 5 CPU-consuming processes
ps aux --sort=-%cpu | head -6

# Monitor memory every 2 seconds
watch -n 2 free -h

# Find and kill a stuck process by name
pgrep -f "node server.js" | xargs kill -9

# Check system load and uptime
uptime && cat /proc/loadavg

# List all zombie processes
ps aux | awk '$8 == "Z"'`
          ],
          questions: [
            {
              question: "What is a zombie process?",
              solution: "<p>A zombie process is a process that has <strong>finished executing</strong> but still has an entry in the process table because its parent process hasn't read its exit status yet (hasn't called <code>wait()</code>). Zombie processes don't consume CPU or memory but occupy a process table slot. They show as <code>Z</code> in <code>ps</code> output. You can't kill them directly — you must signal or kill the parent process to reap them.</p>"
            },
            {
              question: "What is the difference between SIGTERM and SIGKILL?",
              solution: "<p><strong>SIGTERM (signal 15)</strong>: Asks the process to terminate gracefully. The process can catch this signal, finish pending operations, flush I/O buffers, and then exit cleanly. Most well-behaved services respond to SIGTERM. <strong>SIGKILL (signal 9)</strong>: The kernel forcibly terminates the process immediately — no cleanup runs, no data flushing. This can corrupt databases or leave locks unreleased. Always try SIGTERM first. Use SIGKILL only when the process is completely unresponsive.</p>"
            },
            {
              question: "How do you forcefully kill a process by name rather than its PID?",
              solution: "<p>Use <code>pkill name</code> (kills by process name) or <code>pkill -f 'pattern'</code> (matches full command line). Examples: <code>pkill nginx</code>, <code>pkill -9 -f 'node server.js'</code>. Alternatively, combine <code>pgrep</code> and <code>kill</code>: <code>kill -9 $(pgrep nginx)</code>. Or use <code>killall nginx</code> which kills all processes with that exact name.</p>"
            },
          ],
          links: [
            "https://www.man7.org/linux/man-pages/man1/ps.1.html",
            "https://www.man7.org/linux/man-pages/man1/top.1.html",
          ],
        },
        {
          topic: "Permissions & File Ownership",
          tags: ["linux"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Linux uses a three-entity permissions model: <strong>Owner</strong>, <strong>Group</strong>, and <strong>Others</strong>. Each entity can have Read (r=4), Write (w=2), and Execute (x=1) permissions. Correct permissions are a critical security requirement.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Reading Permissions</h4>
<pre><code class="language-bash">ls -la                 # Show permissions

# Output example:
# -rwxr-xr-- 1 ubuntu www-data 1234 Jan 1 /app/deploy.sh
# │rwx│r-x│r--
# │   │   └── Others: read only
# │   └────── Group:  read + execute
# └────────── Owner:  read + write + execute</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">chmod — Change Permissions</h4>
<pre><code class="language-bash"># Octal notation
chmod 755 script.sh     # rwxr-xr-x
chmod 644 index.html    # rw-r--r--
chmod 600 id_rsa        # rw------- (private key)
chmod 400 secrets.key   # r-------- (read-only)

# Symbolic notation
chmod u+x deploy.sh     # Add execute for owner
chmod go-w config.txt   # Remove write from group and others
chmod a+r readme.txt    # Add read for all

# Recursive
chmod -R 755 /var/www/
find /var/www -type f -exec chmod 644 {} \;</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">chown — Change Ownership</h4>
<pre><code class="language-bash">chown ubuntu file.txt             # Change owner
chown ubuntu:www-data file.txt    # Change owner and group
chown -R www-data /var/www/html   # Recursively change ownership
sudo usermod -aG docker $USER     # Add user to group</code></pre>
</div>`,
          examples: [
            `# Secure SSH key (required or ssh rejects it)
chmod 600 ~/.ssh/id_rsa
chmod 700 ~/.ssh

# Standard web server permissions
sudo chown -R www-data:www-data /var/www/html
sudo find /var/www/html -type d -exec chmod 755 {} \\;
sudo find /var/www/html -type f -exec chmod 644 {} \\;

# Make a script executable
chmod u+x deploy.sh && ./deploy.sh

# Check what permissions a file has
stat -c "%a %n" /etc/passwd`
          ],
          questions: [
            {
              question: "What does the permission 777 imply, and why is it dangerous?",
              solution: "<p><code>chmod 777</code> grants <strong>full read, write, and execute</strong> permissions to the owner, group, AND all other users on the system. This is dangerous because: (1) Any user can modify, delete, or replace the file. (2) Any user can execute it as a script. (3) On web servers, compromised web processes can overwrite application files. Always apply the principle of least privilege — grant only the permissions actually needed.</p>"
            },
            {
              question: "Why do private SSH keys strictly require 600 or 400 permissions?",
              solution: "<p>SSH clients explicitly refuse to use private keys that are 'too permissive.' If your key file has permissions allowing group or others to read it (e.g., 644), the SSH client will refuse to proceed with: <code>Permissions 0644 for 'id_rsa' are too open.</code> This is a security feature — if others can read your private key, the key pair is compromised. Use <code>chmod 600 ~/.ssh/id_rsa</code> (owner read+write) or <code>chmod 400</code> (owner read-only).</p>"
            },
          ],
          links: [
            "https://www.man7.org/linux/man-pages/man1/chmod.1.html",
            "https://linuxize.com/post/linux-file-permissions/",
          ],
        },
        {
          topic: "Package Management",
          tags: ["linux"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Package managers are the standard way to install, update, and remove software on Linux. <code>apt</code> manages Debian/Ubuntu systems; <code>dnf</code>/<code>yum</code> manages RHEL/CentOS/Fedora.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">apt — Debian & Ubuntu</h4>
<pre><code class="language-bash">sudo apt update               # Refresh package index (always first!)
sudo apt upgrade -y           # Upgrade all installed packages
sudo apt full-upgrade         # Upgrade + remove blocking packages
sudo apt install nginx        # Install a package
sudo apt remove nginx         # Remove binary (keep config files)
sudo apt purge nginx          # Remove binary + config files
sudo apt autoremove           # Remove unused dependency packages
apt search redis              # Search for packages by name
apt show nodejs               # Show package details, dependencies
dpkg -l | grep python         # List installed packages matching python
dpkg -S /usr/bin/python3      # Find which package owns a file
sudo apt-mark hold nginx      # Prevent a package from being upgraded</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">dnf/yum — RHEL, CentOS, Fedora</h4>
<pre><code class="language-bash">sudo dnf update               # Update all packages
sudo dnf install nginx        # Install
sudo dnf remove nginx         # Remove
sudo dnf search redis         # Search
rpm -qa | grep python         # List installed RPM packages</code></pre>
</div>`,
          examples: [
            `# Full system maintenance cycle
sudo apt update && sudo apt full-upgrade -y && sudo apt autoremove -y

# Install multiple packages at once
sudo apt install -y git curl wget vim htop jq

# Find which package provides a binary
dpkg -S $(which curl)

# Install a specific version
sudo apt install nginx=1.18.*

# Add a PPA repository (Ubuntu)
sudo add-apt-repository ppa:nginx/stable
sudo apt update && sudo apt install nginx`
          ],
          questions: [
            {
              question: "What is the difference between apt remove and apt purge?",
              solution: "<p><code>apt remove</code> uninstalls the package binary and executables but leaves behind configuration files (usually in <code>/etc/</code>). This allows you to reinstall later and keep your previous settings. <code>apt purge</code> removes the binary AND all configuration files associated with the package, giving you a completely clean removal. Use <code>purge</code> when you want no trace of the package left behind.</p>"
            },
            {
              question: "Why must you always run apt update before apt install?",
              solution: "<p><code>apt update</code> refreshes the local package index — it downloads the current list of available packages and their versions from the configured repositories. Without running it first, apt works from a potentially stale cache and may report packages as 'not found' or install outdated versions. <code>apt update</code> never installs or upgrades anything — it only refreshes the metadata.</p>"
            },
          ],
          links: [
            "https://ubuntu.com/server/docs/package-management",
            "https://www.debian.org/doc/manuals/debian-reference/ch02.en.html",
          ],
        },
      ],
    },
    {
      id: 2,
      label: "Intermediate",
      concepts: [
        {
          topic: "Shell Scripting",
          tags: ["linux"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Shell scripting automates repetitive system tasks. A production-quality script should be robust, handle errors gracefully, and follow consistent conventions.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Script Foundations</h4>
<pre><code class="language-bash">#!/bin/bash
set -euo pipefail   # Strict mode: exit on error, unbound var, pipe fail

# Variables
NAME="$1"           # First argument
DATE=$(date +%Y-%m-%d)
echo "Hello $ {NAME}, today is $ {DATE}"

# Readonly constants
readonly MAX_RETRY=3</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Conditionals & Loops</h4>
<pre><code class="language-bash"># File existence check
if [ -f "/etc/nginx/nginx.conf" ]; then
  echo "Nginx installed"
else
  echo "Nginx not found"
fi

# For loop over files
for file in *.log; do
  echo "Processing: $file"
done

# For loop with sequence
for i in $(seq 1 5); do
  echo "Iteration $i"
done

# While loop
COUNT=0
while [ $COUNT -lt 3 ]; do
  echo "Count: $COUNT"; ((COUNT++))
done</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Functions & Error Handling</h4>
<pre><code class="language-bash">log()   { echo "[$(date '+%H:%M:%S')] INFO: $1"; }
error() { echo "[$(date '+%H:%M:%S')] ERROR: $1" >&2; exit 1; }

# Validate arguments
[ -z "$1" ] && error "Usage: $0 <username>"

deploy() {
  local service="$1"
  log "Deploying $service..."
  systemctl restart "$service" || error "Failed to restart $service"
  log "$service restarted successfully"
}</code></pre>
</div>`,
          examples: [
            `#!/bin/bash
set -euo pipefail

# Timestamped backup script
log()   { echo "[$(date '+%H:%M:%S')] $1"; }
error() { echo "ERROR: $1" >&2; exit 1; }

SOURCE="$ {1:-}"
[ -z "$SOURCE" ] && error "Usage: $0 <source_directory>"
[ ! -d "$SOURCE" ] && error "Not a directory: $SOURCE"

BACKUP_DIR="/tmp/backups"
mkdir -p "$BACKUP_DIR"

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
DEST="$BACKUP_DIR/$(basename $SOURCE)_$TIMESTAMP.tar.gz"

log "Backing up $SOURCE to $DEST"
tar -czf "$DEST" "$SOURCE"
log "Done! Size: $(du -sh $DEST | cut -f1)"`
          ],
          questions: [
            {
              question: "What is the shebang line and why is it important?",
              solution: "<p>The shebang (<code>#!</code>) is the very first line of a script specifying the interpreter to use. <code>#!/bin/bash</code> uses bash from a fixed path. <code>#!/usr/bin/env bash</code> searches PATH for bash, making scripts more portable (e.g., on macOS bash may be in a different location). Without a shebang, the system uses the current user's default shell, which may not be bash — causing subtle compatibility bugs.</p>"
            },
            {
              question: "What does set -euo pipefail do?",
              solution: "<p><code>-e</code>: Exit immediately when any command returns a non-zero exit code. <code>-u</code>: Treat references to unset variables as errors (catches typos like <code>$USRE</code> instead of silently expanding to empty). <code>-o pipefail</code>: A pipeline's exit code is the exit code of the last command that failed — without this, <code>false | true</code> returns 0 (success). Together these form 'strict mode' and catch many silent bugs.</p>"
            },
            {
              question: "What is the difference between $@ and $*?",
              solution: "<p>Both represent all positional parameters, but differ when quoted: <code>\"$@\"</code> expands each argument as a separate, properly quoted word — safe for arguments with spaces. <code>\"$*\"</code> expands all arguments as a single string joined by the first character of IFS (usually a space). Always use <code>\"$@\"</code> when passing arguments to another command to preserve quoting.</p>"
            },
          ],
          links: [
            "https://www.shellscript.sh/",
            "https://google.github.io/styleguide/shellguide.html",
            "https://www.shellcheck.net/",
          ],
        },
        {
          topic: "Networking Commands",
          tags: ["linux"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Network troubleshooting is a daily task for DevOps engineers and sysadmins. Knowing which tool to reach for — whether checking ports, testing connectivity, or tracing routes — reduces mean time to resolution significantly.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Port & Socket Inspection</h4>
<pre><code class="language-bash">ss -tulpn                    # All TCP/UDP listening sockets + process
ss -tnp | grep ESTABLISHED   # Active connections
lsof -i :8080                # What is using port 8080?
netstat -tulpn               # Legacy alternative to ss</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Connectivity Testing</h4>
<pre><code class="language-bash">ping -c 4 google.com                              # ICMP reachability
nc -zv db.example.com 5432                        # TCP port check
curl -I https://example.com                       # HTTP headers only
curl -o /dev/null -s -w "%{http_code}" https://api.example.com
traceroute 8.8.8.8                                # Trace network hops
mtr google.com                                    # Interactive traceroute</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Interfaces, Routing & DNS</h4>
<pre><code class="language-bash">ip addr show                # All network interfaces + IP addresses
ip route show               # Routing table
dig google.com              # DNS lookup with details
nslookup google.com         # Alternative DNS lookup
cat /etc/resolv.conf        # Configured DNS nameservers
cat /etc/hosts              # Local hostname overrides</code></pre>
</div>`,
          examples: [
            `# Check what's listening on port 443
sudo ss -tulpn | grep ':443'

# Test DB connectivity before deploying
nc -zv postgres.internal 5432 \\
  && echo "DB is reachable" \\
  || { echo "DB unreachable!"; exit 1; }

# Measure HTTP response time
curl -o /dev/null -s -w \\
  "DNS: %{time_namelookup}s Connect: %{time_connect}s Total: %{time_total}s\\n" \\
  https://api.example.com

# Show top source IPs from nginx access log
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -10`
          ],
          questions: [
            {
              question: "What does netstat -tulpn show you?",
              solution: "<p>It shows all active network sockets: <code>-t</code> TCP, <code>-u</code> UDP, <code>-l</code> listening only, <code>-p</code> process name and PID, <code>-n</code> numeric addresses (no DNS reverse lookups). Use this to verify which services are listening and on which ports. The modern replacement is <code>ss -tulpn</code> which is faster since it reads directly from kernel space.</p>"
            },
            {
              question: "What is the purpose of the /etc/hosts file?",
              solution: "<p><code>/etc/hosts</code> maps hostnames to IP addresses <strong>locally</strong>, checked before DNS. Common uses: (1) Override DNS during development — point <code>api.myapp.local</code> to <code>127.0.0.1</code>. (2) Block sites by mapping them to <code>0.0.0.0</code>. (3) In Docker/Kubernetes, internal container hostnames are often injected here. Resolution order is controlled by <code>/etc/nsswitch.conf</code> (usually: files → dns).</p>"
            },
            {
              question: "How do you display all network interfaces and their IP addresses?",
              solution: "<p>Use <code>ip addr show</code> (or the shorthand <code>ip a</code>) — this is the modern command from the <code>iproute2</code> package. The older <code>ifconfig</code> command is deprecated on most distributions. To see just the primary IP: <code>hostname -I | awk '{print $1}'</code>. To filter a specific interface: <code>ip addr show eth0</code>.</p>"
            },
          ],
          links: [
            "https://www.man7.org/linux/man-pages/man8/ss.8.html",
            "https://curl.se/docs/manpage.html",
            "https://www.man7.org/linux/man-pages/man8/ip.8.html",
          ],
        },
        {
          topic: "SSH & Remote Access",
          tags: ["linux"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  SSH (Secure Shell) is the standard protocol for secure remote server access. It encrypts all traffic and supports key-based authentication, tunneling, and file transfers.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Connecting</h4>
<pre><code class="language-bash">ssh user@hostname                   # Default port 22
ssh -p 2222 user@hostname           # Custom port
ssh -i ~/.ssh/mykey.pem user@host   # Specify private key
ssh -v user@host                    # Verbose debug output</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Key Management</h4>
<pre><code class="language-bash">ssh-keygen -t ed25519 -C "my-key"   # Generate Ed25519 key pair
ssh-copy-id user@host               # Install public key on server
cat ~/.ssh/id_ed25519.pub           # View public key to copy</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">File Transfer</h4>
<pre><code class="language-bash">scp file.txt user@host:~/           # Copy file to remote home
scp -r ./dir user@host:/tmp/        # Copy directory recursively
rsync -avz ./src/ user@host:/app/   # Sync (only changed files)
rsync --delete -avz src/ user@host:/app/  # Mirror (delete extras)</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">SSH Config & Tunneling</h4>
<pre><code class="language-bash"># ~/.ssh/config
Host prod
  HostName 10.0.1.5
  User ubuntu
  IdentityFile ~/.ssh/prod_key

Host dev-db
  HostName 192.168.1.10
  User admin
  ProxyJump prod

# Local port forwarding: access remote DB locally
ssh -L 5432:rds.internal:5432 -N ubuntu@bastion

# Run remote command without interactive shell
ssh ubuntu@server 'systemctl restart nginx'</code></pre>
</div>`,
          examples: [
            `# Generate key, copy to server, test connection
ssh-keygen -t ed25519 -C "$(whoami)-$(date +%Y%m%d)" -f ~/.ssh/myserver_key
ssh-copy-id -i ~/.ssh/myserver_key ubuntu@192.168.1.100
ssh -i ~/.ssh/myserver_key ubuntu@192.168.1.100 'uname -a'

# Deploy with rsync (exclude node_modules and .git)
rsync -avz --exclude='node_modules' --exclude='.git' \\
  ./app/ ubuntu@prod.example.com:/var/www/app/ && \\
  ssh ubuntu@prod.example.com 'pm2 restart app'

# Create DB tunnel then connect locally
ssh -L 5432:rds.amazonaws.com:5432 -N -f ubuntu@bastion.example.com
psql -h localhost -U myuser -d mydb`
          ],
          questions: [
            {
              question: "How does public key authentication work versus password authentication?",
              solution: "<p>Password auth: you send your password over the (encrypted) channel — susceptible to brute force and phishing. Public key auth uses asymmetric cryptography: (1) You generate a private key (secret, on your machine) and public key (shared). (2) Your public key goes into <code>~/.ssh/authorized_keys</code> on the server. (3) On connect, the server challenges you with data encrypted by your public key. (4) You prove you hold the private key by decrypting it correctly — your private key never leaves your machine.</p>"
            },
            {
              question: "What is local port forwarding and when would you use it?",
              solution: "<p><code>ssh -L local_port:target:target_port user@jump</code> tunnels traffic from your local port through the SSH connection to the target. Use cases: (1) Access a cloud database (e.g., RDS) only reachable from a bastion host. (2) Access internal web services behind a firewall from your laptop. (3) Securely test staging APIs. Example: <code>ssh -L 5432:postgres.internal:5432 -N admin@bastion</code> lets you run <code>psql -h localhost -p 5432</code> locally while connecting to the remote DB.</p>"
            },
            {
              question: "What file stores authorized public keys for SSH login?",
              solution: "<p><code>~/.ssh/authorized_keys</code> on the <strong>server</strong> stores public keys of users allowed to connect via key-based auth. Each line contains one public key. Critical permissions: <code>chmod 700 ~/.ssh</code> and <code>chmod 600 ~/.ssh/authorized_keys</code> — SSH will refuse to use the file if permissions are too open. The server's SSH daemon reads this file during authentication to verify that the client holds the matching private key.</p>"
            },
          ],
          links: [
            "https://www.ssh.com/academy/ssh/keygen",
            "https://www.digitalocean.com/community/tutorials/ssh-essentials-working-with-ssh-servers-clients-and-keys",
          ],
        },
        {
          topic: "Disk & Storage Management",
          tags: ["linux"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Disk space exhaustion is one of the most common causes of production outages. Proactively monitoring and managing storage prevents downtime and data loss.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Checking Disk Usage</h4>
<pre><code class="language-bash">df -h                     # All filesystems (human-readable)
df -h /var                # Specific mount point
df -i                     # Inode usage (can "fill" without filling bytes!)
du -sh /var/log           # Directory total size
du -sh /var/log/*         # Each item inside a directory
du -sh * | sort -rh       # Current dir items sorted by size
du --max-depth=1 /var     # One level deep in /var</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Finding Large Files</h4>
<pre><code class="language-bash">find / -type f -size +500M 2>/dev/null         # Files larger than 500MB
find /var/log -name "*.log" -mtime +30 -delete  # Delete logs > 30 days old
ls -lhS /var/log/*.log | head -10              # Largest log files
ncdu /var                                       # Interactive TUI (if installed)</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Block Devices & Mounting</h4>
<pre><code class="language-bash">lsblk                     # List block devices (tree view)
lsblk -f                  # Show filesystem types and UUIDs
fdisk -l                  # Partition tables
blkid                     # Device UUIDs
mount | column -t         # All mounted filesystems
sudo mount /dev/sdb1 /mnt/data   # Mount a device</code></pre>
</div>`,
          examples: [
            `# Disk health monitoring script
df -h | awk 'NR>1 {
  gsub(/%/, "", $5)
  if ($5+0 > 85) print "⚠ WARNING:", $6, "is at", $5"% — action needed!"
}'

# Find top 10 largest files on the system
find / -type f -printf "%s %p\\n" 2>/dev/null | \\
  sort -rn | head -10 | \\
  awk '{printf "%.0fMB %s\\n", $1/1024/1024, $2}'

# Clean up Docker disk usage
docker system df          # See how much space Docker uses
docker system prune -af   # Remove all stopped containers, images, volumes

# Compress old log files
find /var/log -name "*.log" -mtime +7 -exec gzip {} \\;`
          ],
          questions: [
            {
              question: "What is the difference between df and du?",
              solution: "<p><code>df</code> (disk free) shows <strong>filesystem-level</strong> statistics — how much space is used and available per mounted partition. It reads fast from filesystem metadata. <code>du</code> (disk usage) walks the directory tree and sums up actual file sizes — slower but tells you what's consuming space. The numbers can differ because <code>df</code> counts filesystem overhead (reserved blocks, metadata). Use <code>df -h</code> for a quick overview; use <code>du -sh dir/ | sort -rh</code> to drill down.</p>"
            },
            {
              question: "How do you find which directories are consuming the most disk space?",
              solution: "<p>Use <code>du -sh * | sort -rh</code> in the directory you want to analyze. For system-wide: <code>du -sh /* 2>/dev/null | sort -rh | head -10</code> to find the top-level directories. Then drill down: <code>du -sh /var/* | sort -rh</code>, etc. The <code>ncdu</code> tool provides an interactive TUI for this. For finding specific large files: <code>find / -type f -size +500M 2>/dev/null</code>.</p>"
            },
            {
              question: "What does mounting a filesystem mean in Linux?",
              solution: "<p>Mounting attaches a storage device or filesystem to a <strong>directory path</strong> (mount point) within the Linux unified directory tree. For example, <code>mount /dev/sdb1 /mnt/data</code> makes the partition accessible at <code>/mnt/data/</code>. Everything in Linux — physical drives, USB sticks, network shares (NFS/SMB), and even virtual filesystems like <code>/proc</code>, <code>/sys</code>, and <code>/dev</code> — is accessed through mount points in the single unified hierarchy.</p>"
            },
          ],
          links: [
            "https://www.man7.org/linux/man-pages/man1/df.1.html",
            "https://www.man7.org/linux/man-pages/man1/du.1.html",
            "https://www.man7.org/linux/man-pages/man8/mount.8.html",
          ],
        },
      ],
    },
  ],
};
