# AWS + Canvas Runbook

## Goal
To stand up, repair, and verify a working development environment of Canvas LMS on an AWS Academy Learner Lab EC2 instance via Remote SSH, establishing a clean baseline for feature implementation.

## AI Prompts Used (Summary)
I utilized an AI assistant to navigate the complex upstream setup environment. Key prompt sequences included:
1. *"I am SSH'd into an Ubuntu EC2 instance on AWS Learner Lab. I have cloned my Canvas LMS fork. What are the minimal Docker and Docker-Compose dependencies required to launch the development stack container environment?"*
2. *"The canvas asset compilation is failing with an out-of-memory error on my instance. Write a bash snippet to provision a temporary swap file to get through the build phase safely."*

## Learner Lab + EC2 Checklist
- [x] AWS Learner Lab active and running.
- [x] EC2 Instance launched (Ubuntu Server 22.04 LTS / t3.medium or equivalent recommended for compilation).
- [x] Security Group updated to allow SSH (Port 22) traffic from my current local IP address.
- [x] VS Code Remote-SSH configuration verified and successfully connected to the instance using the appropriate identity key pair file (`.pem`).

## Canvas LMS: Clone + Doc Path Followed
1. Cloned the custom repository fork onto the remote instance using:
   ```bash
   git clone [https://github.com/](https://github.com/)[your-username]/canvas-lms.git