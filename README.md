# NextEra Workforce

NextEra Workforce is an AI-driven employee management system for SMEs with AI-powered scheduling, real-time communication, and self-service features.

## Project Structure

The project is organized into two main parts:

- **Frontend**: React/TypeScript application built with Vite
- **Backend**: Python/FastAPI application with MongoDB database

## Getting Started

### Prerequisites

- Node.js (v16+)
- Python (v3.9+)
- MongoDB (v4.4+)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows:
     ```
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```
     source venv/bin/activate
     ```

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Start the backend server:
   ```
   python main.py
   ```

The API will be available at http://localhost:8000.

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

The frontend will be available at http://localhost:3000.

## Features

### Must-Have Features (Implemented)

- User Management and Authentication
  - Role-based user accounts (Employee, Manager, Administrator)
  - Secure authentication with password policies
  - User account management
  - Session management with automatic timeout

- Employee Self-Service Portal
  - Schedule viewing
  - Time-off request submission
  - Personal information management
  - Schedule change notifications

## License

This project is licensed under the MIT License - see the LICENSE file for details.
