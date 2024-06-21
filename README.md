# MuscleUp - Gym Plan Generator Application

This application generates personalized gym plans using AI models based on user information. It consists of a frontend built with React, TypeScript, and Tailwind CSS, and a backend implemented with Hono, TypeScript, Groq-SDK for AI inference, and Cloudflare Workers for serverless operations.

## Features

- **Personalized Gym Plans**: Generate custom gym plans tailored to user input.
- **AI Models**: Utilize AI models for intelligent gym plan recommendations.
- **Authentication**: Secure user authentication powered by Firebase.
- **Serverless Backend**: Scalable backend operations leveraging Cloudflare Workers.

## Technologies Used

- **Frontend**:
  - React
  - TypeScript
  - Tailwind CSS

- **Backend**:
  - Hono
  - TypeScript
  - Groq-SDK
  - Cloudflare Workers

- **Authentication**:
  - Firebase

## Installation

**Clone the repository:**
```bash
git clone <repository-url>
cd <project-folder>
```

**Install dependencies:**
```bash
npm install
```

**Set up Firebase:**
- Configure Firebase authentication in your Firebase console.
- Update Firebase configuration in your frontend (`src/firebaseConfig.ts`).

**Set up Environment Variables:**
- Create a `.env` file in the root directory and configure necessary environment variables.
- Example `.env` file:
  ```plaintext
  REACT_APP_BACKEND_URL=https://your-backend-url
  ```

## Usage

**Run the application locally:**
```bash
npm start
```
This command starts the development server at `http://localhost:3000`.

**Access the application:**
Open your web browser and go to `http://localhost:3000` to access the application.

**Deploy Backend:**
Deploy the backend using Cloudflare Workers or your preferred serverless platform.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/my-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/my-feature`).
6. Create a new Pull Request.
