# B-Side Payload CMS

Backend system for the B-Side website, built with Payload CMS v3 and Next.js.

**Repository**: [https://github.com/bside-ms/bside_payload](https://github.com/bside-ms/bside_payload)

## 🎯 Overview

This project is the Content Management System (CMS) for the B-Side website. It enables the management of events, circles, organizations, news, pages, and media content. The system supports multilingual content (German/English) and provides a role-based permission system.

## 📦 Prerequisites

- Node.js
- Yarn
- Docker (for MongoDB)

## 🚀 Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/bside-ms/bside_payload.git
   cd bside_payload
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Configure environment variables**
   
   Copy the `.env.skel` file to `.env` and fill in the required values:
   ```bash
   cp .env.skel .env
   ```
   
   Then edit `.env` and provide values for:
   - `MONGODB_URI` - MongoDB connection string (e.g., `mongodb://localhost:27017/bside_payload`)
   - `PAYLOAD_SECRET` - A random secret key for Payload CMS
   - `NEXT_PUBLIC_OAUTH_SERVER` - Your Keycloak server URL
   - `CLIENT_ID` - OAuth2 client ID
   - `CLIENT_SECRET` - OAuth2 client secret
   - `REVALIDATION_KEY` - Optional revalidation key for Next.js

4. **Start the database** (with Docker)
   ```bash
   docker-compose up -d
   ```

5. **Start the development server**
   ```bash
   yarn dev
   ```

   The server runs on `http://localhost:3000` by default.

## ⚙️ Configuration

The main configuration is located in `src/payload.config.ts`. The following settings can be configured:

- **Collections**: Data structure management
- **Globals**: Global settings
- **Plugins**: Extended functionality
- **Localization**: Language settings
- **Access Control**: Permissions

### Localization

The system supports German (`de`) and English (`en`) by default. The default language is German.

### Production Build

The project includes a `Dockerfile` for production builds:

```bash
docker build -t bside-payload .
docker run -p 3000:3000 bside-payload
```

## 📜 Scripts

The project provides several npm scripts for development and maintenance:

- **`yarn dev`** - Starts the development server with hot-reload. The server runs on `http://localhost:3000` by default, and the admin interface is accessible at `/admin`.

- **`yarn build`** - Creates an optimized production build of the application. This compiles TypeScript, bundles assets, and prepares the application for deployment.

- **`yarn start`** - Starts the production server using the previously built application. Use this after running `yarn build` to test the production build locally.

- **`yarn ts-check`** - Runs TypeScript type checking without emitting files. This is useful for catching type errors during development without triggering a full build.

- **`yarn ts-check:watch`** - Runs TypeScript type checking in watch mode, automatically rechecking files when they change.

- **`yarn lint`** - Runs ESLint to check code quality and catch potential errors. This helps maintain consistent code style across the project.

- **`yarn lint:fix`** - Automatically fixes ESLint errors that can be auto-fixed. This command modifies files in place to resolve linting issues.

- **`yarn prettier`** - Checks if the code formatting matches Prettier's configuration. This command only reports issues without fixing them.

- **`yarn prettier:fix`** - Automatically formats all code files according to the Prettier configuration. Use this to ensure consistent formatting across the codebase.

- **`yarn generate:types`** - Generates TypeScript type definitions from the Payload CMS configuration. This creates the `payload-types.ts` file with all collection and global types.

- **`yarn generate:importmap`** - Generates the import map required by Payload CMS for the admin interface. This must be run after adding or modifying custom components.

- **`yarn payload`** - Runs the Payload CLI command. Use this to access Payload's command-line tools and utilities.

- **`yarn copyfiles`** - Copies static files (HTML, CSS, fonts, images) to the dist directory. This is used during the build process.

## 🗄 Database Migrations

Migrations are located in `src/migrations/`. Payload automatically runs migrations when the schema changes.
