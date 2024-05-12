#!/bin/bash

# Update package list
sudo apt update

# Install curl
sudo apt install curl -y

# Install NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Source NVM script to load NVM into the shell
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # This loads nvm bash_completion

# Install latest LTS version of Node.js
nvm install --lts

# Install pnpm
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Source pnpm script to load pnpm into the shell
export PNPM_HOME="$HOME/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"
source ~/.bashrc

# Install dependencies using pnpm
pnpm i

# Check NVM version
nvm -v

# Check Node.js version
node -v

# Check pnpm version
pnpm -v
