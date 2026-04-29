export const linuxConcepts = [
  {
    id: 1,
    title: "Basic Navigation & File Operations",
    description: "Learn the essential commands to traverse the file system, manage directories, and create, move, or delete files.",
    icon: "Folder",
    summary: "Mastering the fundamental file system commands is the first step to becoming proficient in Linux. This covers listing directory contents, changing directories, creating hidden files, and structurally managing data.",
    interview_questions_summary: [
      "What is the difference between an absolute and relative path?",
      "How do you quickly return to your home directory?",
      "What does the '-p' flag do when using mkdir?",
      "What's the difference between `rm -r` and `rmdir`?"
    ],
    best_practices_checklist: [
      "Use `pwd` if you ever get lost in the directory tree.",
      "Always double-check your current directory before using `rm -rf`.",
      "Use descriptive names for directories to keep the filesystem tidy.",
      "Utilise tab-completion to prevent typos and speed up navigation."
    ],
    common_mistakes: [
      "Using `rm -rf` indiscriminately on root directories.",
      "Forgetting to use `-r` when trying to copy or delete a directory.",
      "Not adding a leading dot ('.') when trying to create a hidden file."
    ],
    optimization_techniques: [
      {
        name: "Tab Completion",
        savings: "Time",
        description: "Instead of typing out full file names, press Tab to let the terminal complete it automatically.",
        example: "cd /va[TAB]/lo[TAB] -> cd /var/log/"
      },
      {
        name: "Quick Return",
        savings: "Time",
        description: "Use cd - to immediately jump back to your previous working directory.",
        example: "cd -"
      }
    ],
    exercises: [
      {
        id: 1,
        title: "Home Sweet Home",
        difficulty: "Beginner",
        fileType: "bash",
        description: "Write the command that instantly navigates you to your home directory, regardless of where you currently are in the file system.",
        hints: [
          "It's the shortest possible navigation command.",
          "It involves two letters."
        ],
        solution: "cd ~",
        tags: ["cd", "navigation"],
        interview_questions: [
          "Besides `cd ~`, what other command exactly achieves the same result?"
        ],
        commands_to_practice: [
          "cd ~",
          "cd",
          "cd $HOME"
        ]
      },
      {
        id: 2,
        title: "Deep Directory Tree",
        difficulty: "Beginner",
        fileType: "bash",
        description: "You need to create a directory structure exactly like this: `project/src/components`. Write a single command that creates all three directories simultaneously if they don't already exist.",
        hints: [
          "You'll need `mkdir`.",
          "Look into the `-p` (parents) flag."
        ],
        solution: "mkdir -p project/src/components",
        tags: ["mkdir", "directories"],
        interview_questions: [
          "What happens if you run `mkdir src/components` when the `src` directory does not exist?"
        ],
        commands_to_practice: [
          "mkdir -p a/b/c",
          "mkdir -pv a/b/c"
        ]
      },
      {
        id: 3,
        title: "List All Details",
        difficulty: "Beginner",
        fileType: "bash",
        description: "Write the command to list all files in the current directory (including hidden files) in a detailed \"long\" format, making file sizes human-readable (KB, MB).",
        hints: [
          "Combine three flags for the `ls` command.",
          "`-l` for long, `-a` for all, and `-h` for human-readable."
        ],
        solution: "ls -lah",
        tags: ["ls", "listing", "hidden"],
        interview_questions: [
          "What does the first character of the `ls -l` output signify?",
          "How do you list files sorted by modification time?"
        ],
        commands_to_practice: [
          "ls -l",
          "ls -la",
          "ls -lah",
          "ls -lt"
        ]
      }
    ],
    bonus_challenge: {
      title: "Bulk Renaming Mission",
      description: "Write a command that copies all `.txt` files from `/var/tmp` to your home directory, then force removes the entire `/var/tmp/cache` directory.",
      requirements: [
        "Must use correct wildcards (*.txt)",
        "Must ensure absolute pathing",
        "Force recursive removal for the cache"
      ],
      success_metrics: [
        "No interactive prompts are triggered",
        "Only txt files are transferred"
      ],
      phases: [
        {
          phase: 1,
          name: "Transfer",
          tasks: ["cp /var/tmp/*.txt ~"]
        },
        {
          phase: 2,
          name: "Clean up",
          tasks: ["rm -rf /var/tmp/cache"]
        }
      ]
    }
  },
  {
    id: 2,
    title: "Text Processing & Search",
    description: "Learn commands like grep, awk, sed, and cat to powerful string manipulation and deep searching mechanisms.",
    icon: "FileText",
    summary: "Linux thrives on text streams. The tools to parse, filter, and modify text flow efficiently through pipelines are essential for reading logs, formatting output, and analyzing codebases.",
    interview_questions_summary: [
      "Explain what `grep -v` does.",
      "How would you replace all instances of 'foo' with 'bar' in a file?",
      "How do you print the 5th column of a CSV file using awk?",
      "What is the function of the pipe `|` operator?"
    ],
    best_practices_checklist: [
      "Use `less` to read large files safely without locking your terminal.",
      "Chain small, simple commands using pipes to compose complex behaviours.",
      "When using regex with sed/grep, single-quote the expression to prevent bash interpretation."
    ],
    common_mistakes: [
      "Forgetting `-i` in grep when doing case-insensitive searches.",
      "Using `cat` and pipping it to `grep`, e.g., `cat file | grep pattern` instead of `grep pattern file`."
    ],
    optimization_techniques: [
      {
        name: "Useless use of cat (UUOC)",
        savings: "Process Overhead",
        description: "Avoid piping cat into another command that accepts file arguments.",
        example: "Instead of `cat file.txt | grep 'error'`, use `grep 'error' file.txt`."
      }
    ],
    exercises: [
      {
        id: 4,
        title: "Find the Error Logs",
        difficulty: "Intermediate",
        fileType: "bash",
        description: "Use `grep` to find all lines containing the word \"ERROR\" (case-insensitive) in the file `/var/log/syslog`.",
        hints: [
          "Use the `-i` flag for case insensitivity.",
          "Target the absolute path of the file directly."
        ],
        solution: "grep -i \"ERROR\" /var/log/syslog",
        tags: ["grep", "search", "logs"],
        interview_questions: [
          "How would you grab 3 lines of context AFTER the matched pattern?",
          "How would you count the number of matching lines?"
        ],
        commands_to_practice: [
          "grep -i error file.log",
          "grep -c error file.log",
          "grep -A 3 error file.log"
        ]
      },
      {
        id: 5,
        title: "Stream Editor Replacement",
        difficulty: "Intermediate",
        fileType: "bash",
        description: "Using `sed`, replace every occurrence of the word 'docker' with 'podman' inside a file named `setup.sh`. Ensure changes are made recursively across the whole file and saved in place.",
        hints: [
          "Use `-i` for in-place editing.",
          "The substitution syntax is `s/original/new/g`."
        ],
        solution: "sed -i 's/docker/podman/g' setup.sh",
        tags: ["sed", "regex", "replacement"],
        interview_questions: [
          "What happens if you omit the `g` flag at the end of the sed substitution string?",
          "How would you back up the original file before modifying it in-place?"
        ],
        commands_to_practice: [
          "sed 's/foo/bar/' file.txt",
          "sed -i.bak 's/foo/bar/g' file.txt"
        ]
      },
      {
        id: 6,
        title: "Extracting Columns",
        difficulty: "Advanced",
        fileType: "bash",
        description: "You have a file `users.csv` where values are separated by a comma. Write an `awk` command to print ONLY the 3rd and 5th columns of the file.",
        hints: [
          "Set the field separator to a comma using `-F ','`.",
          "Use `{print $3, $5}` in the awk execute block."
        ],
        solution: "awk -F ',' '{print $3, $5}' users.csv",
        tags: ["awk", "csv", "data-extraction"],
        interview_questions: [
          "How would you achieve the same result using the `cut` command?",
          "How do you perform mathematical operations on columns in awk?"
        ],
        commands_to_practice: [
          "cut -d ',' -f 3,5 users.csv",
          "awk -F ':' '{print $1}' /etc/passwd"
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Process & System Monitoring",
    description: "Manage system resources, monitor top CPU consumers, and skillfully terminate background processes using top, ps, and kill.",
    icon: "Activity",
    summary: "A reliable sysadmin needs to effectively identify bottlenecks and misbehaving programs. Process management controls exactly how and when system tasks operate.",
    interview_questions_summary: [
      "What is a zombie process?",
      "How do you forcefully kill a process by name rather than its PID?",
      "What is the difference between `SIGTERM` and `SIGKILL`?",
      "How do you check current memory usage in megabytes?"
    ],
    best_practices_checklist: [
      "Always attempt a graceful shutdown (`kill -15`) before resorting to `kill -9`.",
      "Use `htop` (if installed) primarily for visual monitoring over `top`.",
      "Verify PIDs closely with `ps aux | grep <name>` before issuing any kill command."
    ],
    common_mistakes: [
      "Running `kill -9` randomly without understanding what the process handles (data corruption risk).",
      "Confusing memory vs disk space commands."
    ],
    optimization_techniques: [
      {
        name: "Quick Memory Check",
        savings: "Screen clutter",
        description: "Using the `free` command with the human-readable flag makes analyzing RAM constraints trivial.",
        example: "free -h"
      }
    ],
    exercises: [
      {
        id: 7,
        title: "Check System Memory",
        difficulty: "Beginner",
        fileType: "bash",
        description: "Write the command that quickly displays the system's current RAM usage (total, used, free, buffers) in human-readable formatting.",
        hints: [
          "The command name is synonymous with liberty.",
          "Append `-h` or `-m`."
        ],
        solution: "free -h",
        tags: ["free", "memory", "stats"],
        interview_questions: [
          "What does the 'buff/cache' column represent?"
        ],
        commands_to_practice: [
          "free -m",
          "free -g",
          "cat /proc/meminfo"
        ]
      },
      {
        id: 8,
        title: "Hunt Down process ID",
        difficulty: "Intermediate",
        fileType: "bash",
        description: "List all currently running processes associated with the user 'www-data' using the `ps` command.",
        hints: [
          "You can filter out users with the `-u` flag on `ps`."
        ],
        solution: "ps -u www-data",
        tags: ["ps", "processes", "users"],
        interview_questions: [
          "What does the `aux` flag combination mean in `ps aux`?",
          "How is `ps` different from `top`?"
        ],
        commands_to_practice: [
          "ps aux | grep nginx",
          "ps -ef",
          "pgrep nginx"
        ]
      },
      {
        id: 9,
        title: "Force Kill a Rogue Process",
        difficulty: "Intermediate",
        fileType: "bash",
        description: "A process with PID `9001` is completely frozen and not responding to standard kill signals. Send the specific signal flag to immediately forcefully terminate it.",
        hints: [
          "Use the `kill` command.",
          "The SIGKILL signal numeric code is 9."
        ],
        solution: "kill -9 9001",
        tags: ["kill", "signals", "processes"],
        interview_questions: [
          "Why is `kill -9` considered dangerous for some applications?",
          "How do you gracefully restart a service instead of killing it?"
        ],
        commands_to_practice: [
          "kill -15 9001",
          "kill -9 9001",
          "pkill node"
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Permissions & File Ownership",
    description: "Secure the file system through robust knowledge of octal/symbolic permissions with chmod, chown, and user groups.",
    icon: "Shield",
    summary: "Linux security heavily depends on granular file permissions. Understanding Read, Write, Execute values for Owner, Group, and Public scopes is fundamental.",
    interview_questions_summary: [
      "What does the permission `777` imply, and why is it dangerous?",
      "How do you change the group ownership of a file?",
      "What does the `sudo` command actually do?",
      "How do you recursively apply permissions to a directory?"
    ],
    best_practices_checklist: [
      "Abide by the principle of least privilege: assign only necessary permissions.",
      "Do not use `chmod 777` as a quick fix for web server permission issues.",
      "Web directories generally need `755` for folders, and `644` for files."
    ],
    common_mistakes: [
      "Changing ownership of a symlink using just `chown` (changes target). Need `chown -h`.",
      "Locking yourself out of an SSH directory by messing up the `.ssh` folder permissions (needs exactly `700` for dir, `600` for `authorized_keys`)."
    ],
    optimization_techniques: [
      {
        name: "Symbolic Chmod",
        savings: "Brainpower",
        description: "If you forget octal numbers, you can add execute privileges to user with symbolic notation.",
        example: "chmod u+x script.sh"
      }
    ],
    exercises: [
      {
        id: 10,
        title: "Make it Executable",
        difficulty: "Beginner",
        fileType: "bash",
        description: "You've written a shell script called `deploy.sh`. Write the command using symbolic notation that adds 'execute' permissions for the user (owner) without modifying group or other permissions.",
        hints: [
          "The category for user/owner is 'u'.",
          "The symbol for adding is '+'.",
          "The letter for execute is 'x'."
        ],
        solution: "chmod u+x deploy.sh",
        tags: ["chmod", "permissions", "executable"],
        interview_questions: [
          "What is the octal equivalent of `rwxr-xr-x`?",
          "Can you execute a script if the directory it's in doesn't have execute permissions?"
        ],
        commands_to_practice: [
          "chmod a+x script.sh",
          "chmod u=rwx script.sh",
          "ls -l deploy.sh"
        ]
      },
      {
        id: 11,
        title: "Absolute Safety",
        difficulty: "Intermediate",
        fileType: "bash",
        description: "Change the permissions of the file `secrets.key` so that the Owner can read and write to it, but Group and Others have absolutely no access at all. Use the 3-digit octal notation.",
        hints: [
          "Owner: Read (4) + Write (2) = 6.",
          "Group: 0.",
          "Others: 0."
        ],
        solution: "chmod 600 secrets.key",
        tags: ["chmod", "octal", "security"],
        interview_questions: [
          "Why do private SSH keys strictly require 600 or 400 permissions?",
          "What does setting the sticky bit do on a directory?"
        ],
        commands_to_practice: [
          "chmod 400 file.key",
          "chmod 600 id_rsa",
          "chmod 755 public_dir"
        ]
      },
      {
        id: 12,
        title: "Change of Ownership",
        difficulty: "Intermediate",
        fileType: "bash",
        description: "Change the user ownership of the `/var/www/html` directory and all of its contents recursively to the user 'nginx'.",
        hints: [
          "You will need the `-R` flag for recursion.",
          "Use the `chown` command."
        ],
        solution: "chown -R nginx /var/www/html",
        tags: ["chown", "ownership", "recursive"],
        interview_questions: [
          "How would you change both the User and the Group simultaneously?",
          "What user must you be to run chown successfully in typical scenarios?"
        ],
        commands_to_practice: [
          "sudo chown nginx config.js",
          "sudo chown -R ubuntu:ubuntu /app",
          "sudo chgrp admin /etc/files"
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Shell Scripting",
    description: "Automate repetitive tasks using bash scripts, variables, loops, conditionals, and functions.",
    icon: "Code",
    summary: "Shell scripting is the backbone of Linux automation. A well-written script can save hours of manual work by chaining commands, adding logic, and handling errors gracefully.",
    interview_questions_summary: [
      "What is the shebang line and why is it important?",
      "How do you make a shell variable read-only?",
      "What is the difference between `$@` and `$*`?",
      "How do you check if a file exists before operating on it in a script?"
    ],
    best_practices_checklist: [
      "Always start scripts with `#!/bin/bash` or `#!/usr/bin/env bash`.",
      "Use `set -euo pipefail` to catch errors early.",
      "Quote all variable expansions: `\"$var\"` instead of `$var`.",
      "Add comments for every non-obvious block of logic."
    ],
    common_mistakes: [
      "Forgetting spaces around brackets in `[ condition ]`.",
      "Using `==` instead of `-eq` for numeric comparisons.",
      "Not handling exit codes from critical commands."
    ],
    optimization_techniques: [
      {
        name: "Strict Mode",
        savings: "Debug Time",
        description: "Enable strict mode at the top of every script to exit on errors, unset variables, and pipe failures.",
        example: "set -euo pipefail"
      }
    ],
    exercises: [
      {
        id: 13,
        title: "Hello, Script!",
        difficulty: "Beginner",
        fileType: "bash",
        description: "Write the first line of any shell script (the shebang) that specifies bash as the interpreter, followed by a command to print 'Hello, Linux!' to standard output.",
        hints: [
          "The shebang starts with `#!`.",
          "The path to bash is typically `/bin/bash`.",
          "Use `echo` to print text."
        ],
        solution: "#!/bin/bash\necho 'Hello, Linux!'",
        tags: ["shebang", "echo", "basics"],
        interview_questions: [
          "Why is `#!/usr/bin/env bash` considered more portable than `#!/bin/bash`?"
        ],
        commands_to_practice: [
          "#!/bin/bash",
          "#!/usr/bin/env bash",
          "echo 'Hello World'"
        ]
      },
      {
        id: 14,
        title: "Looping Through Files",
        difficulty: "Intermediate",
        fileType: "bash",
        description: "Write a bash for-loop that iterates over all `.log` files in the current directory and prints each filename prefixed with 'Processing: '.",
        hints: [
          "Use a `for` loop with a wildcard glob pattern.",
          "Use `echo` with the loop variable."
        ],
        solution: "for f in *.log; do echo \"Processing: $f\"; done",
        tags: ["for-loop", "glob", "iteration"],
        interview_questions: [
          "What happens if there are no `.log` files and you use `*.log` in a for loop?",
          "How is a `while` loop different from a `for` loop in bash?"
        ],
        commands_to_practice: [
          "for f in *.txt; do echo $f; done",
          "for i in 1 2 3; do echo $i; done",
          "for i in $(seq 1 5); do echo $i; done"
        ]
      },
      {
        id: 15,
        title: "Conditional File Check",
        difficulty: "Intermediate",
        fileType: "bash",
        description: "Write a bash script snippet that checks if a file called `config.yml` exists in the current directory. If it does, print 'Config found'. If it does not, print 'Config missing'.",
        hints: [
          "Use `-f` in a bash `if` test to check for regular files.",
          "The structure is: `if [ condition ]; then ... else ... fi`."
        ],
        solution: "if [ -f config.yml ]; then echo 'Config found'; else echo 'Config missing'; fi",
        tags: ["if-else", "conditionals", "file-check"],
        interview_questions: [
          "What does `-d` check for in a bash conditional?",
          "What is the difference between `[ ]` and `[[ ]]` in bash?"
        ],
        commands_to_practice: [
          "if [ -f file.txt ]; then echo exists; fi",
          "if [ -d /etc ]; then echo dir; fi",
          "test -f file && echo yes || echo no"
        ]
      },
      {
        id: 16,
        title: "Script Arguments",
        difficulty: "Advanced",
        fileType: "bash",
        description: "Write a bash script that accepts a username as the first argument (`$1`) and prints a greeting. If no argument is provided, it should print 'Usage: script.sh <username>' and exit with a non-zero status code.",
        hints: [
          "Check if `$1` is empty with `-z \"$1\"`.",
          "Use `exit 1` for non-zero exit."
        ],
        solution: "if [ -z \"$1\" ]; then echo 'Usage: script.sh <username>'; exit 1; fi\necho \"Hello, $1!\"",
        tags: ["arguments", "exit-codes", "validation"],
        interview_questions: [
          "What does `$0` represent in a shell script?",
          "How do you handle an unknown number of arguments in a script?"
        ],
        commands_to_practice: [
          "echo \"$1 $2\"",
          "shift; echo $@",
          "[ -z \"$1\" ] && echo missing"
        ]
      }
    ],
    bonus_challenge: {
      title: "Backup Automation Script",
      description: "Write a script that creates a timestamped backup of a given directory by tarring it and saving it to `/tmp/backups/`.",
      requirements: [
        "Accept source directory as `$1`",
        "Create the `/tmp/backups/` directory if it doesn't exist",
        "Filename must include the current timestamp"
      ],
      success_metrics: [
        "Script exits gracefully if no argument is given",
        "Backup file is created in /tmp/backups/"
      ],
      phases: [
        {
          phase: 1,
          name: "Validation",
          tasks: ["Check $1 is provided and is a directory"]
        },
        {
          phase: 2,
          name: "Backup",
          tasks: ["mkdir -p /tmp/backups", "tar -czf /tmp/backups/$(basename $1)_$(date +%Y%m%d%H%M%S).tar.gz $1"]
        }
      ]
    }
  },
  {
    id: 6,
    title: "Networking Commands",
    description: "Diagnose network issues, inspect connections, transfer files, and understand how Linux manages network interfaces.",
    icon: "Globe",
    summary: "Networking is central to Linux administration. Knowing how to inspect, test, and configure connections is crucial for debugging and securing distributed systems.",
    interview_questions_summary: [
      "What does `netstat -tulpn` show you?",
      "How do you test if a remote port is reachable from the command line?",
      "What is the purpose of the `/etc/hosts` file?",
      "How do you display all network interfaces and their IP addresses?"
    ],
    best_practices_checklist: [
      "Use `ss` instead of `netstat` — it is faster and part of `iproute2`.",
      "Always test DNS resolution with `dig` or `nslookup` when debugging connectivity.",
      "Use `curl -I` to quickly inspect HTTP headers without downloading the body."
    ],
    common_mistakes: [
      "Confusing `ifconfig` (deprecated) with `ip addr show` (modern).",
      "Forgetting to open firewall ports using `ufw` or `iptables` after starting a service."
    ],
    optimization_techniques: [
      {
        name: "ss over netstat",
        savings: "Speed",
        description: "`ss` is the modern replacement for `netstat` with faster output and more filtering options.",
        example: "ss -tulpn | grep :8080"
      }
    ],
    exercises: [
      {
        id: 17,
        title: "Show All Open Ports",
        difficulty: "Beginner",
        fileType: "bash",
        description: "Write the command to list all TCP and UDP sockets that are currently listening, including the process name that opened each port.",
        hints: [
          "Use the `ss` command.",
          "The flags: `-t` TCP, `-u` UDP, `-l` listening, `-p` show process, `-n` numeric."
        ],
        solution: "ss -tulpn",
        tags: ["ss", "networking", "ports"],
        interview_questions: [
          "How would you check only for open TCP ports on port 443?",
          "What is the difference between LISTEN and ESTABLISHED in ss output?"
        ],
        commands_to_practice: [
          "ss -tulpn",
          "ss -tnp",
          "netstat -tulpn"
        ]
      },
      {
        id: 18,
        title: "Test Remote Port Connectivity",
        difficulty: "Beginner",
        fileType: "bash",
        description: "Write a command to test if port 5432 (PostgreSQL) is reachable on the remote host `db.example.com` using a tool available on most Linux systems.",
        hints: [
          "`nc` (netcat) or `telnet` can test port connectivity.",
          "For netcat: `nc -zv host port`."
        ],
        solution: "nc -zv db.example.com 5432",
        tags: ["nc", "netcat", "connectivity"],
        interview_questions: [
          "Explain what the `-z` and `-v` flags do in netcat.",
          "How would you use `curl` to test if an HTTP server is running on port 8080?"
        ],
        commands_to_practice: [
          "nc -zv localhost 80",
          "telnet db.example.com 5432",
          "curl -v http://localhost:8080"
        ]
      },
      {
        id: 19,
        title: "Display IP Addresses",
        difficulty: "Beginner",
        fileType: "bash",
        description: "Write the modern command to display all network interfaces and their assigned IP addresses on a Linux system.",
        hints: [
          "Use the `ip` command suite.",
          "The sub-command is `addr show` or just `addr`."
        ],
        solution: "ip addr show",
        tags: ["ip", "interfaces", "networking"],
        interview_questions: [
          "How do you bring a network interface down and back up?",
          "What is a loopback interface and what is its address?"
        ],
        commands_to_practice: [
          "ip addr show",
          "ip link show",
          "ifconfig -a"
        ]
      },
      {
        id: 20,
        title: "Trace a Network Route",
        difficulty: "Intermediate",
        fileType: "bash",
        description: "Write the command to trace the network route taken by packets from your machine to `8.8.8.8` (Google DNS), showing each hop along the way.",
        hints: [
          "The command starts with `traceroute`.",
          "On some systems it may be `tracepath`."
        ],
        solution: "traceroute 8.8.8.8",
        tags: ["traceroute", "routing", "diagnostics"],
        interview_questions: [
          "What does an asterisk (*) mean in traceroute output?",
          "How does traceroute differ from ping?"
        ],
        commands_to_practice: [
          "traceroute 8.8.8.8",
          "ping -c 4 google.com",
          "mtr google.com"
        ]
      }
    ]
  },
  {
    id: 7,
    title: "SSH & Remote Access",
    description: "Connect securely to remote servers, transfer files, set up key-based authentication, and configure SSH for production environments.",
    icon: "Lock",
    summary: "SSH is the standard for secure remote server management. Understanding key-based auth, port forwarding, and SSH config files is critical for any DevOps or Linux role.",
    interview_questions_summary: [
      "How does public key authentication work versus password authentication?",
      "What file stores authorized public keys for SSH login?",
      "How do you forward a remote port to your local machine?",
      "What is the purpose of the SSH config file at `~/.ssh/config`?"
    ],
    best_practices_checklist: [
      "Disable password-based SSH authentication in production (`PasswordAuthentication no`).",
      "Use `ssh-keygen -t ed25519` for modern key generation.",
      "Restrict SSH access to specific IP ranges using `AllowUsers` or firewall rules.",
      "Always set strict permissions: `chmod 700 ~/.ssh` and `chmod 600 ~/.ssh/authorized_keys`."
    ],
    common_mistakes: [
      "Leaving SSH running on default port 22 without additional security measures.",
      "Setting incorrect permissions on `.ssh/` directory, causing connection failures.",
      "Forgetting to add the public key (not private) to `authorized_keys`."
    ],
    optimization_techniques: [
      {
        name: "SSH Config Aliases",
        savings: "Typing time",
        description: "Create aliases in `~/.ssh/config` for frequently accessed servers to avoid typing long commands.",
        example: "Host myserver\n  HostName 192.168.1.10\n  User ubuntu\n  IdentityFile ~/.ssh/id_ed25519"
      }
    ],
    exercises: [
      {
        id: 21,
        title: "Connect to a Remote Server",
        difficulty: "Beginner",
        fileType: "bash",
        description: "Write the SSH command to connect to a remote server at IP `192.168.1.100` as the user `ubuntu` on the default SSH port.",
        hints: [
          "The command is `ssh`.",
          "Format: `ssh user@host`."
        ],
        solution: "ssh ubuntu@192.168.1.100",
        tags: ["ssh", "remote", "connection"],
        interview_questions: [
          "How do you connect to SSH on a non-default port (e.g., port 2222)?",
          "What does the `-i` flag do in the ssh command?"
        ],
        commands_to_practice: [
          "ssh ubuntu@192.168.1.100",
          "ssh -p 2222 ubuntu@192.168.1.100",
          "ssh -i ~/.ssh/mykey.pem ec2-user@1.2.3.4"
        ]
      },
      {
        id: 22,
        title: "Generate SSH Key Pair",
        difficulty: "Beginner",
        fileType: "bash",
        description: "Generate a new Ed25519 SSH key pair with a comment of 'my-server-key'. The output files should go to the default location.",
        hints: [
          "Use `ssh-keygen`.",
          "Specify the key type with `-t ed25519`.",
          "Add a comment with `-C`."
        ],
        solution: "ssh-keygen -t ed25519 -C 'my-server-key'",
        tags: ["ssh-keygen", "keys", "security"],
        interview_questions: [
          "Why is Ed25519 preferred over RSA for new SSH key generation?",
          "Where does ssh-keygen store the generated keys by default?"
        ],
        commands_to_practice: [
          "ssh-keygen -t ed25519",
          "ssh-keygen -t rsa -b 4096",
          "cat ~/.ssh/id_ed25519.pub"
        ]
      },
      {
        id: 23,
        title: "Copy File to Remote Server",
        difficulty: "Intermediate",
        fileType: "bash",
        description: "Copy a local file `backup.tar.gz` to the remote server `192.168.1.100` as user `ubuntu`, placing it in the remote home directory.",
        hints: [
          "Use `scp` (secure copy).",
          "Format: `scp local_file user@host:remote_path`.",
          "Use `~` or `.` for the remote home directory."
        ],
        solution: "scp backup.tar.gz ubuntu@192.168.1.100:~",
        tags: ["scp", "file-transfer", "remote"],
        interview_questions: [
          "How would you copy an entire directory recursively with scp?",
          "What is the advantage of `rsync` over `scp` for large directory transfers?"
        ],
        commands_to_practice: [
          "scp file.txt user@host:~/",
          "scp -r ./dir user@host:/tmp/",
          "rsync -avz ./dir user@host:/backup/"
        ]
      },
      {
        id: 24,
        title: "Local Port Forwarding",
        difficulty: "Advanced",
        fileType: "bash",
        description: "Create an SSH tunnel that forwards your local port `5432` to port `5432` on a remote database server `db-internal` (accessible via jump host `jump.example.com` as user `admin`). Use local port forwarding.",
        hints: [
          "Use `ssh -L local_port:target_host:target_port jump_user@jump_host`.",
          "The `-N` flag prevents executing a remote command (tunnel only)."
        ],
        solution: "ssh -L 5432:db-internal:5432 -N admin@jump.example.com",
        tags: ["port-forwarding", "tunneling", "advanced"],
        interview_questions: [
          "What is the difference between local and remote port forwarding?",
          "How do jump hosts (bastion hosts) improve security?"
        ],
        commands_to_practice: [
          "ssh -L 8080:localhost:80 user@server",
          "ssh -R 2222:localhost:22 user@server",
          "ssh -D 9090 user@server"
        ]
      }
    ]
  },
  {
    id: 8,
    title: "Package Management",
    description: "Install, update, search, and remove software packages using apt, yum/dnf, and snap on Linux distributions.",
    icon: "Package",
    summary: "Package managers are the standard way to install and maintain software on Linux. Understanding apt for Debian/Ubuntu and dnf/yum for RHEL/CentOS systems is essential.",
    interview_questions_summary: [
      "What is the difference between `apt install` and `apt-get install`?",
      "How do you list all installed packages on an Ubuntu system?",
      "What command would you run to fix broken package dependencies?",
      "How do you add a third-party PPA on Ubuntu?"
    ],
    best_practices_checklist: [
      "Always run `apt update` before installing new packages to refresh the package index.",
      "Use `apt upgrade` vs `apt full-upgrade` mindfully — the latter may remove packages.",
      "Remove unused packages with `apt autoremove` to keep disk space clean.",
      "Pin packages to specific versions in production to avoid unexpected upgrades."
    ],
    common_mistakes: [
      "Forgetting to run `apt update` before `apt install`, causing 'package not found' errors.",
      "Using `apt-get` and `apt` interchangeably in scripts without checking compatibility.",
      "Accidentally removing critical dependencies with `apt autoremove`."
    ],
    optimization_techniques: [
      {
        name: "Unattended Upgrades",
        savings: "Manual effort",
        description: "Configure automatic security updates to keep systems patched without manual intervention.",
        example: "apt install unattended-upgrades && dpkg-reconfigure unattended-upgrades"
      }
    ],
    exercises: [
      {
        id: 25,
        title: "Update & Upgrade",
        difficulty: "Beginner",
        fileType: "bash",
        description: "Write two commands: first, refresh the package index on an Ubuntu system, then upgrade all installed packages to their latest available versions.",
        hints: [
          "Both commands use `apt`.",
          "Update first, then upgrade.",
          "You may need `sudo`."
        ],
        solution: "sudo apt update && sudo apt upgrade -y",
        tags: ["apt", "update", "upgrade"],
        interview_questions: [
          "What is the difference between `apt upgrade` and `apt full-upgrade`?",
          "How do you prevent a specific package from being upgraded?"
        ],
        commands_to_practice: [
          "sudo apt update",
          "sudo apt upgrade -y",
          "sudo apt full-upgrade"
        ]
      },
      {
        id: 26,
        title: "Search and Install",
        difficulty: "Beginner",
        fileType: "bash",
        description: "Write the command to search for available packages matching the term 'nginx', then write the command to install the `nginx` package.",
        hints: [
          "Use `apt search` to find packages.",
          "Use `apt install` to install."
        ],
        solution: "apt search nginx",
        tags: ["apt", "search", "install"],
        interview_questions: [
          "How do you install a specific version of a package?",
          "What is a package repository and how do you add one?"
        ],
        commands_to_practice: [
          "apt search nginx",
          "sudo apt install nginx",
          "sudo apt install nginx=1.18.*"
        ]
      },
      {
        id: 27,
        title: "Remove a Package",
        difficulty: "Beginner",
        fileType: "bash",
        description: "Write the command to completely remove the `apache2` package along with all of its configuration files from the system.",
        hints: [
          "Use `apt purge` to remove the package AND its config files.",
          "`apt remove` only removes the binary, not the config."
        ],
        solution: "sudo apt purge apache2",
        tags: ["apt", "remove", "purge"],
        interview_questions: [
          "What is left behind after `apt remove` that `apt purge` would clean up?",
          "How do you clean up orphaned packages after removals?"
        ],
        commands_to_practice: [
          "sudo apt remove apache2",
          "sudo apt purge apache2",
          "sudo apt autoremove"
        ]
      },
      {
        id: 28,
        title: "List Installed Packages",
        difficulty: "Intermediate",
        fileType: "bash",
        description: "Write the command to list all installed packages on an Ubuntu/Debian system, then pipe the output to search for any packages containing the string 'python'.",
        hints: [
          "Use `dpkg -l` or `apt list --installed`.",
          "Pipe the result to `grep`."
        ],
        solution: "dpkg -l | grep python",
        tags: ["dpkg", "list", "grep"],
        interview_questions: [
          "How do you find which package owns a specific file on the system?",
          "What command shows package details including its dependencies?"
        ],
        commands_to_practice: [
          "dpkg -l | grep python",
          "apt list --installed",
          "dpkg -S /usr/bin/python3"
        ]
      }
    ]
  },
  {
    id: 9,
    title: "Disk & Storage Management",
    description: "Monitor disk space, manage partitions, mount filesystems, and work with disk utilities like df, du, fdisk, and lsblk.",
    icon: "HardDrive",
    summary: "Disk management is a critical skill for system administrators. Running out of disk space can bring down production services. Understanding how to monitor, analyze, and manage storage is essential.",
    interview_questions_summary: [
      "What is the difference between `df` and `du`?",
      "How do you find which directories are consuming the most disk space?",
      "What does mounting a filesystem mean in Linux?",
      "How do you check the disk usage of a specific directory?"
    ],
    best_practices_checklist: [
      "Set up disk space alerts (e.g., >80% usage) using monitoring tools.",
      "Use `du -sh *` and sort output to quickly identify space hogs.",
      "Always unmount a filesystem with `umount` before removing a drive.",
      "Avoid filling `/` (root) completely — always leave at least 5% free."
    ],
    common_mistakes: [
      "Using `du` on the root `/` directory without limiting depth, causing it to hang.",
      "Confusing `df -h` output (filesystem usage) with actual file sizes.",
      "Not unmounting a drive before hot-swapping (risk of data corruption)."
    ],
    optimization_techniques: [
      {
        name: "Find and Clean Old Logs",
        savings: "Disk space",
        description: "Find and delete log files older than 30 days to reclaim disk space on busy servers.",
        example: "find /var/log -name '*.log' -mtime +30 -delete"
      }
    ],
    exercises: [
      {
        id: 29,
        title: "Check Disk Usage Overview",
        difficulty: "Beginner",
        fileType: "bash",
        description: "Write the command to display the disk space usage of all mounted filesystems in a human-readable format (showing GB and MB instead of bytes).",
        hints: [
          "Use the `df` command.",
          "The `-h` flag makes sizes human-readable."
        ],
        solution: "df -h",
        tags: ["df", "disk", "storage"],
        interview_questions: [
          "What does the 'Use%' column in df output represent?",
          "How do you check disk usage for only a specific filesystem or mount point?"
        ],
        commands_to_practice: [
          "df -h",
          "df -h /var",
          "df -T"
        ]
      },
      {
        id: 30,
        title: "Find Space Hogs",
        difficulty: "Intermediate",
        fileType: "bash",
        description: "Write a command to display the total size of each item (files and subdirectories) in the `/var/log` directory, in human-readable format, sorted by size from largest to smallest.",
        hints: [
          "Use `du -sh /var/log/*` to get sizes.",
          "Pipe through `sort -rh` to sort by human-readable sizes, largest first."
        ],
        solution: "du -sh /var/log/* | sort -rh",
        tags: ["du", "sort", "disk-analysis"],
        interview_questions: [
          "How do you find the 10 largest files on the entire filesystem?",
          "What does the `-d` flag do in the `du` command?"
        ],
        commands_to_practice: [
          "du -sh /var/*",
          "du -sh * | sort -rh",
          "find / -type f -size +1G 2>/dev/null"
        ]
      },
      {
        id: 31,
        title: "Display Block Devices",
        difficulty: "Beginner",
        fileType: "bash",
        description: "Write the command to display all block devices (disks, partitions, and their mount points) in a tree-like output.",
        hints: [
          "Use the `lsblk` command.",
          "No flags needed for the basic tree view."
        ],
        solution: "lsblk",
        tags: ["lsblk", "block-devices", "partitions"],
        interview_questions: [
          "How do you identify the disk name for a new, unpartitioned drive in Linux?",
          "What is the difference between a block device and a character device?"
        ],
        commands_to_practice: [
          "lsblk",
          "lsblk -f",
          "fdisk -l"
        ]
      },
      {
        id: 32,
        title: "Find Large Files",
        difficulty: "Advanced",
        fileType: "bash",
        description: "Write a command to find all files larger than 500MB anywhere on the filesystem (starting from `/`), suppressing permission-denied errors, and display results sorted by size.",
        hints: [
          "Use the `find` command with `-size +500M`.",
          "Redirect stderr to `/dev/null` to hide permission errors.",
          "Pipe to `sort` or `ls` for size-sorted output."
        ],
        solution: "find / -type f -size +500M 2>/dev/null",
        tags: ["find", "large-files", "disk"],
        interview_questions: [
          "How do you delete all files larger than 1GB in a specific directory?",
          "What does redirecting stderr to `/dev/null` accomplish?"
        ],
        commands_to_practice: [
          "find / -type f -size +500M 2>/dev/null",
          "find /tmp -name '*.tmp' -delete",
          "find /var/log -mtime +30 -delete"
        ]
      }
    ],
    bonus_challenge: {
      title: "Disk Health Audit Script",
      description: "Write a script that checks available disk space on all mounted filesystems and sends an alert (echo a warning) if any partition exceeds 85% usage.",
      requirements: [
        "Use `df` output",
        "Parse the Use% column",
        "Print a warning for any partition above 85%"
      ],
      success_metrics: [
        "Script runs without errors on any Linux system",
        "Outputs warning lines for over-threshold partitions"
      ],
      phases: [
        {
          phase: 1,
          name: "Check",
          tasks: ["df -h | awk 'NR>1 {print $5, $6}'"]
        },
        {
          phase: 2,
          name: "Alert",
          tasks: ["df -h | awk 'NR>1 {gsub(/%/,\"\",$5); if($5>85) print \"WARNING:\", $6, \"is\", $5\"%\" full}'"]
        }
      ]
    }
  }
];

export const allLinuxExercises = linuxConcepts.flatMap((c) =>
  c.exercises.map((e) => ({ ...e, conceptId: c.id, conceptTitle: c.title }))
);
