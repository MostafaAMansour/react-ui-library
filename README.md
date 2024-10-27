# React UI Library Automation

## Overview

This project streamlines the management of a React UI library for internal company use, enhancing communication between UI library developers and tool developers. It aims to ensure timely updates and minimize issues related to broken components or missing dependencies.

## Project Setup

### Initialize React Application

To start, create a new React application using TypeScript:

```bash
npx create-react-app ui-library --template typescript
```

### Directory Structure

Navigate into the project directory:

```bash
cd ui-library
```

### `package.json` Configuration

Replace the existing `package.json` with the following configuration:

```json
{
  "name": "@mostafaamansour-org/react-ui-library",
  "version": "0.0.0-development",
  "private": false,
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.112",
    "@types/react": "^18.3.10",
    "@types/react-dom": "^18.3.0",
    "execa": "^9.4.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "semantic-release": "semantic-release"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest",
      "plugin:storybook/recommended"
    ]
  },
  "devDependencies": {
    "@chromatic-com/storybook": "^1.9.0",
    "@semantic-release/changelog": "^6.0.0",
    "@semantic-release/git": "^10.0.0",
    "@semantic-release/npm": "^9.0.0",
    "@storybook/addon-essentials": "^8.3.4",
    "@storybook/addon-interactions": "^8.3.4",
    "@storybook/addon-links": "^8.3.4",
    "@storybook/addon-onboarding": "^8.3.4",
    "@storybook/addon-webpack5-compiler-swc": "^1.0.5",
    "@storybook/blocks": "^8.3.4",
    "@storybook/react": "^8.3.4",
    "@storybook/react-webpack5": "^8.3.4",
    "@storybook/test": "^8.3.4",
    "eslint-plugin-storybook": "^0.9.0",
    "semantic-release": "^19.0.2",
    "storybook": "^8.3.4"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/MostafaAMansour/react-ui-library.git"
  },
  "publishConfig": {
    "registry": "https://registry.npmjs.org/",
    "tag": "latest",
    "access": "public"
  }
}
```

This configuration supports development, testing, and publishing.

## Configuration Files

### `.releaserc`

This file configures the **semantic-release** process for automated versioning, changelog generation, and publishing.

```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    {
      "preset": "conventionalcommits",
      "releaseRules": [
        { "type": "feat", "release": "minor" },
        { "type": "fix", "release": "patch" },
        { "type": "BREAKING CHANGE", "release": "major" }
      ]
    },
    "@semantic-release/release-notes-generator",
    ["@semantic-release/changelog", { "changelogFile": "CHANGELOG.md" }],
    ["@semantic-release/npm", { "npmPublish": true, "tarballDir": "dist" }],
    ["@semantic-release/git", { "assets": ["CHANGELOG.md"] }],
    "@semantic-release/github"
  ]
}
```

### `renovate.json`

**Renovate** automates dependency updates:

```json
{
  "extends": ["config:base"]
}
```

### `ci.yml`

The CI/CD workflow defined here runs on GitHub Actions and automates:

- Code checkout
- Node.js setup
- Dependency management
- Testing
- Building and release

```yaml
name: CI

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      issues: write
      pull-requests: write
      id-token: write
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18.6.0'

      - name: Update dependencies
        run: npm update

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test

      - name: Build project
        run: npm run build

      - name: Release
        id: release_step
        run: |
          npx semantic-release > release-log.txt || echo "No release published" > release-log.txt
          if grep -q "Published release" release-log.txt; then
            echo "new_release=true" >> $GITHUB_ENV
            echo "release_notes=$(cat release-log.txt | grep -A 5 "Published release")" >> $GITHUB_ENV
          else
            echo "new_release=false" >> $GITHUB_ENV
          fi
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}

      - name: Send Email Notification
        if: env.new_release == 'true'
        uses: dawidd6/action-send-mail@v3
        with:
          server_address: smtp.gmail.com
          server_port: 465
          username: ${{ secrets.EMAIL_USERNAME }}
          password: ${{ secrets.EMAIL_PASSWORD }}
          subject: "UI Library Update - Release ${GITHUB_REF##*/}"
          body: |
            The following changes were included in this release:
            ${{ env.release_notes }}
          to: toota353535@gmail.com
          from: mo.abdallah3535@gmail.com
```

## Additional Integrations

### Storybook Integration

Storybook enables interactive component development and testing.

```bash
npx sb init --type react
```

### Email Notifications

Email notifications are sent only when a new version is published, ensuring stakeholders are informed of updates.

### Monorepo Support with Lerna

To support multiple packages, a monorepo structure can be initialized with **Lerna**:

```json
{
  "packages": ["packages/*"],
  "version": "independent"
}
```

Run:

```bash
npx lerna init
```

Update `package.json` with:

```json
"publish": "lerna publish from-package"
```

## Continuous Integration and Deployment

Using **GitHub Actions**, the workflow performs:

- Code checkout
- Node.js setup
- Dependency updates and installation
- Running tests
- Building the project
- Automated versioning and release notifications via Semantic Release

## Running on Red Hat 8

For Red Hat 8 OS, either self-hosted runners or Docker containers with Node.js can be used.

### Example Dockerfile

```dockerfile
# Use the Red Hat Universal Base Image
FROM redhat/ubi8:latest

# Set the working directory
WORKDIR /app

# Install Node.js and other necessary packages
RUN yum install -y nodejs npm
```

## Tokens and Secrets

Tokens are configured to securely interact with GitHub, npm, and Gmail:

1. **GitHub Token**: Stored as `GITHUB_TOKEN`.
2. **NPM Token**: Stored as `NPM_TOKEN`.
3. **Gmail Credentials**: Stored as `EMAIL_USERNAME` and `EMAIL_PASSWORD`.

## Conclusion

This project automates the development and release process of a React UI library, ensuring efficient dependency management, automated versioning, and streamlined communication among developers.

- **Repository**: [GitHub](https://github.com/MostafaAMansour/react-ui-library)
- **npm Package**: [@mostafaamansour-org/react-ui-library](https://www.npmjs.com/package/@mostafaamansour-org/react-ui-library)
