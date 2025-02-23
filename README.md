# Compliance Assistant & Risk Analyzer

Welcome to the **Compliance Assistant & Risk Analyzer** project! This repository hosts a full-stack application that provides:

- **Interactive Compliance Chat:** Ask questions about your legal documents and receive detailed responses with advanced legal terminology.  
- **Automated Risk Analysis:** Identify potential risks in your NDAs, contracts, and policies, along with recommended remediation steps.  
- **Fictitious Legal Excerpts:** Experience simulated legal document quotes and excerpts that mimic real-world legal language.

## Prerequisites

Please ensure you have the following installed on your development machine:
- [Node.js](https://nodejs.org/en/) (v14 or higher)  
- [npm](https://www.npmjs.com/)

## Installation

1. **Clone the Repository:**

    ```
    git clone https://github.com/SerchDavila98/ibm-granite-compliance.git
    cd ibm-granite-compliance
    ```

2. **Install Dependencies:**

    ```
    npm install
    ```

3. **Start the Development Server:**

    ```
    npm start
    ```

   Once the server is running, open [http://localhost:3000](http://localhost:3000) in your browser to access the Compliance Assistant.

## Project Structure

- **/src/components** – React components for the Compliance Chat and Risk Analysis interfaces  
- **/src/hooks** – Custom React hooks used throughout the project  
- **/src/api** – API routes and handlers for processing analysis requests  
- **/public** – Public assets and static files

## Running Tests

To run the project’s tests:

```
npm test
```

This command executes unit and integration tests, providing results upon completion.

## Contributing

We welcome contributions! If you'd like to contribute to this project:

1. Fork the repository.
2. Create your feature branch:

    ```
    git checkout -b feature/YourFeature
    ```

3. Commit your changes:

    ```
    git commit -m "Add some feature"
    ```

4. Push to the branch:

    ```
    git push origin feature/YourFeature
    ```

5. Open a pull request describing your changes.

## Troubleshooting

- **Installation Issues:** If you encounter problems during `npm install`, verify that your Node.js and npm versions meet the prerequisites.  
- **Development Server Not Starting:** Check for error messages in the terminal. If you suspect dependency issues, try removing the `node_modules` folder and reinstalling:

  ```
  rm -rf node_modules
  npm install
  ```
## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for using the **Compliance Assistant & Risk Analyzer**! We hope this tool helps streamline your document review process by providing valuable insights into legal compliance risks.
