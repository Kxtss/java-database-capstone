# Smart Clinic Management System

This project focuses on building a robust, secure, and scalable **Smart Clinic Management System**. It encompasses both frontend (HTML, CSS, JavaScript) and backend (Java with Spring Boot) development, database design, API implementation, authentication, containerization, and continuous integration.

## Project Overview

The Smart Clinic Management System aims to transform outpatient clinic operations by providing an intuitive online portal for doctors and patients to manage schedules and health information seamlessly. It addresses the need for modern software solutions in small and mid-sized clinics that still rely on outdated tools for appointments, patient records, and administrative tasks.

## Key Features & Modules

The system is developed through several key modules and functionalities:

### 1. Architecture Design
- **Three-Tier Web Architecture**: Separates the system into Presentation, Application, and Data layers.
- **Hybrid Data Storage**: Utilizes MySQL for relational data (e.g., patient records, appointments) and MongoDB for flexible document-based data (e.g., prescriptions, chat messages).
- **Backend Frameworks**: Leverages Spring MVC with Thymeleaf for admin/doctor dashboards and REST APIs for other modules.
- **Data Flow**: Traces the flow of data and control through controllers, services, and repositories.

### 2. User Stories
User stories are defined for three primary roles:
- **Administrators**: Manage system access and functionality.
- **Patients**: Book and manage appointments, view details.
- **Doctors**: Manage availability, appointments, and patient details.

### 3. Database Management
- **MySQL & MongoDB Initialization**: Creation and initialization of both MySQL and MongoDB databases.
- **Schema Design**: Designing SQL tables (e.g., patients, doctors, appointments, admin) with appropriate columns, data types, primary/foreign keys, and constraints. Designing MongoDB collections (e.g., prescriptions) with realistic JSON document examples.
- **Data Insertion**: Inserting sample data into relational tables and document-based collections.
- **Stored Procedures**: Implementing SQL stored procedures for automated report generation (daily appointments, doctor performance by month/year).

### 4. Backend Development (Spring Boot)
- **Model Building with Validations**: Creating Java model classes for key entities (Admin, Appointment, Doctor, Patient, Prescription) using JPA and Hibernate for relational mapping, and Spring Data MongoDB for document storage.
- **Data Integrity**: Applying validation annotations (`@NotNull`, `@JsonProperty`, `@Pattern`, `@Min`, `@Max`, `@Past`, `@Size`) to ensure data integrity and control JSON serialization.
- **Service Layer**: Implementing service classes to encapsulate business logic and manage API interactions.
- **REST Endpoints**: Building RESTful APIs using controllers for communication between the frontend and backend models/repositories. Handles request validation, error handling, and service delegation.
- **MVC for Login**: Integrating JWT-based authentication with Spring Boot and Thymeleaf to dynamically render views based on user roles (admin, doctor, patient) and token validation.

### 5. Frontend Development
- **Structured Files**: Organizing HTML, CSS, and JavaScript files for a scalable frontend project.
- **Responsive UI**: Designing responsive and interactive user interfaces.
- **Reusable Components**: Implementing reusable UI components (Header, Footer, Cards).
- **Dynamic Interactions**: Activating modals and managing page-level state using pure JavaScript.
- **Role-Based Login**: Handling role selection, login, and storing JWT tokens in localStorage for authentication.
- **Dynamic Data Loading**: Loading and filtering data dynamically using JavaScript for doctor and patient dashboards.

### 6. Containerization (Docker)
- **Multi-Stage Dockerfile**: Creating a multi-stage Dockerfile for the Java Spring Boot backend.
- **Image Building & Execution**: Building Docker images and running containers for the application, exposing necessary ports (e.g., 8080 for the application, 3306 for MySQL, 27017 for MongoDB).
- **Container Registry**: Uploading Docker images to a container registry (e.g., Docker Hub) for CI/CD pipelines.
- **Best Practices**: Applying Docker best practices for image optimization and security.
- **Docker Compose**: (Optional) Utilizing Docker Compose for multi-container configurations (e.g., Spring Boot application, MySQL, MongoDB).

### 7. Continuous Integration (GitHub Actions)
- **Automated Workflows**: Implementing automated CI checks using GitHub Actions.
- **Linting**:
    - HTML, CSS, and JavaScript files for frontend code quality.
    - Java code for the backend using Checkstyle.
    - Dockerfile using Hadolint for best practices and security.
- **Compilation**: Compiling the backend with Maven to verify build issues and dependencies.
- **Triggers**: Configuring workflows to activate on `push` and `pull_request` events to ensure continuous code quality.

## Technologies Used

- **Backend**: Java, Spring Boot, Spring Data JPA, Spring Data MongoDB
- **Databases**: MySQL, MongoDB
- **Frontend**: HTML, CSS, JavaScript, Thymeleaf
- **Containerization**: Docker, Docker Compose
- **CI/CD**: GitHub Actions, Maven, Checkstyle, Hadolint
- **Authentication**: JWT (JSON Web Tokens)
- **Version Control**: Git, GitHub

## Setup and Installation

*(Detailed setup instructions will depend on the specific project structure and environment. Below are general steps derived from the documentation.)*

1.  **Clone the Repository**:
    * Or use code template
    ```bash
    git clone https://github.com/Kxtss/java-database-capstone
    cd java-database-capstone
    ```

2.  **Database Setup**:
    * Ensure MySQL and MongoDB instances are running and accessible.
    * Configure database connection properties in `application.properties`:
        ```properties
        spring.datasource.url=jdbc:mysql://localhost:3306/cms
        spring.datasource.username=root
        spring.datasource.password=root

        spring.data.mongodb.uri=mongodb://localhost:27017/my_mongo_db
        ```
    * Execute SQL scripts to create the `cms` database and necessary tables.
    * Insert sample data as provided.

3.  **Build and Run the Spring Boot Application**:
    ```bash
    mvn clean install
    mvn spring-boot:run
    ```
    Access the application via port `8080` (e.g., `http://localhost:8080`).

4.  **Dockerize (Optional but Recommended)**:
    * Build the Docker image:
        ```bash
        docker build -t smart-clinic-backend .
        ```
    * Run the Docker container:
        ```bash
        docker run -p 8080:8080 smart-clinic-backend
        ```
    * For multi-service deployment, use Docker Compose (refer to `docker-compose.yml` if available).

5.  **GitHub CI Workflows**:
    * Ensure your `.github/workflows` directory contains the CI workflow files for linting and compilation (e.g., `frontend-lint.yml`, `backend-lint.yml`, `backend-build.yml`, `docker-lint.yml`).
    * Changes pushed to the repository or pull requests will automatically trigger these workflows. Monitor the "Actions" tab in your GitHub repository for results.

## Deliverables

The project deliverables typically include:
- A functional Spring Boot backend application.
- A functional frontend application with HTML, CSS, and JavaScript.
- Configured `application.properties` for database connections.
- SQL scripts for database and table creation, and sample data insertion.
- Java model classes with JPA and validation annotations.
- Functional REST endpoints and MVC controllers.
- A functional Dockerfile for the Spring Boot backend.
- Configured GitHub Actions workflows for CI (linting, compilation).
- A `schema-design.md` file detailing database schema.
- Publicly accessible links to the GitHub repository and relevant workflow files.
