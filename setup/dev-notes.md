
## Developer notes

Quick and handy notes are written down here.

### Change text within a directory for linux

1. If you have to find and replace a keyword in all files within a directory, use the command `find /home/mohit/Github/mashed -type f -exec sed -i 's/test@gmail.com/admin@gmail.com/g' {} +`