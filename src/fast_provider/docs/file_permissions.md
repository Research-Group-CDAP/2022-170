### Run Shell file using `sudo`
sudo sh <shell_script_file_name>.sh
sudo /bin/bash <shell_script_file_name>.sh

### Give execute permission
chmod +x <shell_script_file_name>.sh

code ~/.profile

export GOPATH=$HOME/work
export PATH=$PATH:/usr/local/go/bin:$GOPATH/bin