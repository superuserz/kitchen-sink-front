# Kitchen Sink Frontend Application

This project is an Angular application that provides user authentication features, including sign-in and registration. It is designed to be easily integrated with any backend service in the future.

## Project Structure

The project is organized as follows:

```
kitchen-sink-front
├── src
│   ├── app
│   │   ├── app.component.html        # Main HTML template for the application
│   │   ├── app.component.ts          # Root component class
│   │   ├── app.module.ts             # Main application module
│   │   ├── auth
│   │   │   ├── auth.module.ts        # Module for authentication-related components and services
│   │   │   ├── components
│   │   │   │   ├── sign-in
│   │   │   │   │   ├── sign-in.component.html  # Sign-in component template
│   │   │   │   │   ├── sign-in.component.ts    # Sign-in component class
│   │   │   │   │   └── sign-in.component.css   # Styles for sign-in component
│   │   │   │   ├── register
│   │   │   │   │   ├── register.component.html  # Registration component template
│   │   │   │   │   ├── register.component.ts    # Registration component class
│   │   │   │   │   └── register.component.css   # Styles for registration component
│   │   │   ├── services
│   │   │   │   └── auth.service.ts     # Service for authentication logic
│   │   │   └── models
│   │   │       └── user.model.ts       # User model interface
│   │   ├── core
│   │   │   ├── core.module.ts          # Core module for singleton services
│   │   │   └── interceptors
│   │   │       └── auth.interceptor.ts # Interceptor for handling authentication tokens
│   │   └── shared
│   │       ├── shared.module.ts        # Shared module for common components
│   │       └── components
│   │           └── header
│   │               ├── header.component.html  # Header component template
│   │               ├── header.component.ts    # Header component class
│   │               └── header.component.css   # Styles for header component
├── angular.json                         # Angular CLI configuration
├── package.json                         # npm configuration
├── tsconfig.json                        # TypeScript configuration
└── README.md                            # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/superuserz/kitchen-sink-front.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application:**
   ```bash
   ng serve
   ```

4. **Build the application for production:**
   ```bash
   ng build --prod
   ```

## Features

- User authentication (sign-in and registration)
- Modular architecture for easy scalability
- Ready for backend integration
- Core and shared modules for reusable components and services