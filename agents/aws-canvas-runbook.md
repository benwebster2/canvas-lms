# AWS + Canvas Runbook

## Goal
To stand up, repair, and verify a working development environment of Canvas LMS on an AWS Academy Learner Lab EC2 instance via Remote SSH, establishing a clean baseline for feature implementation.

## AI Prompts Used (Summary)
I utilized an AI assistant to navigate the complex upstream setup environment. Key prompt sequences included:
1. *"I am SSH'd into an Ubuntu EC2 instance on AWS Learner Lab. I have cloned my Canvas LMS fork. What are the minimal Docker and Docker-Compose dependencies required to launch the development stack container environment?"*
2. *"The canvas asset compilation is failing with an out-of-memory error on my instance. Write a bash snippet to provision a temporary swap file to get through the build phase safely."*

## Learner Lab + EC2 Checklist
* **Instance ID:** `i-0192190e4c0c3f791`
* **Instance Type:** `t3.micro`
* **Availability Zone:** `us-east-1b`
* **Public IP Address:** `100.52.247.215`
* **Public DNS:** `ec2-100-52-247-215.compute-1.amazonaws.com`
* **Security Group:** `launch-wizard-1` (Configured to allow inbound SSH on port 22 from my current local IP, alongside development web ports).
* **Key Pair Type:** `RSA` (.pem format)
* **Launch Timestamp:** 2026/07/09 10:39 GMT-6
* **Status:** Running (3/3 checks passed)

## Canvas LMS: Clone + Doc Path Followed
1. Connected to the remote instance from the local terminal using the verified SSH path:
   ```bash
   ssh -i /path/to/your-key-pair.pem ubuntu@100.52.247.215
