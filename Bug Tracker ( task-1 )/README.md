# Bug Tracker - Sync

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
- [Usage](#usage)
  - [Logging Bugs](#logging-bugs)
  - [Prioritizing and Testing](#prioritizing-and-testing)
  - [Deploying Fixes](#deploying-fixes)


## Introduction

Welcome to the Bug Tracker repository Which is the first task in sync intern, a comprehensive bug tracking system designed to help software development teams efficiently manage and resolve bugs and errors in their projects. This system has been developed as part of an internship project with Sync, aiming to streamline the bug tracking process and improve collaboration among team members.

A bug tracking system is a crucial tool for any software project, enabling teams to:

1. Log errors and issues promptly.
2. Assign tasks to team members for resolution.
3. Prioritize and test bug fixes.
4. Deploy fixes to enhance software quality.

This README will guide you through the steps to set up and utilize the Bug Tracker system effectively.

## Features

- User-friendly web interface for bug tracking.
- Seamless bug logging and assignment to team members.
- Flexible bug prioritization and testing features.
- Efficient deployment of bug fixes.
- Detailed bug tracking.

## Getting Started

### Installation

To set up the Bug Tracker system on your local machine, follow these steps:

-  Clone the Bug Tracker repository to your local environment:
-  Install the project dependencies:
  npm install
-  Configure your environment variables:
Create a .env file in the project root and define the following variables:
```
PORT=4000
PG_PW=your_postgresql_password
```
Replace `your_postgresql_password` with the actual password for your PostgreSQL database.
4- Start Server 
npm run dev

### Usage

#### Logging Bugs

1. Log in to Bug Tracker using your credentials.
2. Click on the "New Bug" button to create a new bug report.
3. Provide detailed information about the bug, including its description, steps to reproduce, and expected vs. actual results.
4. Assign the bug to the appropriate team member responsible for fixing it.

#### Prioritizing and Testing

1. Review the list of logged bugs on the Bug Tracker dashboard.
2. Prioritize bugs based on their severity and impact on the project.
3. Assign testing tasks to team members to verify bug fixes.
4. Update bug statuses and priorities as needed.

#### Deploying Fixes

1. Once a bug has been fixed and tested, change its fixed status to "True."
2. Collaborate with your team to ensure the fix aligns with the project's release schedule.
3. Deploy the bug fix in the next software release.

