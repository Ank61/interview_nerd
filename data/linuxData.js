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
  }
];

export const allLinuxExercises = linuxConcepts.flatMap((c) =>
  c.exercises.map((e) => ({ ...e, conceptId: c.id, conceptTitle: c.title }))
);
