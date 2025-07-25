# Bitespeed Identity Reconciliation API

A robust backend service for linking customer contacts across multiple purchases, built with Node.js, Express, TypeScript, and PostgreSQL.

## Features

- 🔗 **Identity Linking:** Automatically links customer contacts by shared email or phone number, maintaining a unified profile.
- 🏆 **Primary/Secondary Hierarchy:** Oldest contact becomes primary; newer related contacts are secondary.
- 🔄 **Smart Merging:** Merges separate contact chains when new info connects them.
- ✅ **Data Validation:** Validates email and phone formats for data quality.
- 📡 **API Endpoints:** Secure, scalable, and Docker-ready.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/faju-frq/bitespeed-identity-reconciliation.git
   cd bitespeed-identity-reconciliation
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   - Create a `.env` file in the root directory.
   - Add your PostgreSQL connection string and other configs:
     ```
      PORT=5000
      DB_HOST=localhost
      DB_USER=yourusername
      DB_PASSWORD=yourpassword
      DB_NAME=yourdbname
      DB_DIALECT=postgres
     ```


## Running the Application

- **Start the server:**

  ```bash
  npm run dev
  ```

  Or for production:

  ```bash
  npm run build
  npm start
  ```

- **Access the frontend:**
  Open `http://localhost:5000` in your browser.

## API Endpoints

### Health Check

- **GET** `/health`
  - Returns service status.

### Identity Reconciliation

- **POST** `/api/identify`
  - **Request Body:**
    ```json
    {
      "email": "customer@example.com", // optional
      "phoneNumber": "1234567890" // optional
    }
    ```
  - **Response:**
    ```json
    {
      "contact": {
        "primaryContactId": 1,
        "emails": ["customer@example.com"],
        "phoneNumbers": ["1234567890"],
        "secondaryContactIds": []
      }
    }
    ```

## Usage Examples

- **New Customer:** Send a POST request with a new email/phone to create a primary contact.
- **Returning Customer:** Send a POST request with an existing phone and new email to link as secondary.
- **Contact Merging:** Send a POST request that links two separate primary contacts; they will be merged.

## Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to change.

## License

MIT
