## Install Transcrypt

# virtualenv

Used to create a local python environment

- Install virutalenv globally
  `sudo pip install virtualenv`
- Create a env directory in your project
  `cd <project>`
  `virtualenv env`
  Note : add the directory created to the `.gitignore``
- Install your packages
  `env/bin/pip install <pkg>`  
  or
  `source env/bin/activate` one time and then `pip install <pkg>` for all your pkg
