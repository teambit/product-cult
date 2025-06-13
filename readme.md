# Product Cult 🗳️ A Hope AI Example Project 

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Welcome to **Product Cult**! This is a fully functional example application generated using [**Hope AI**](https://bit.cloud) and refined by humans. It demonstrates how to compose a modern web application from independent, reusable components. The app itself is a fun platform where users can vote for their favorite next-generation product ideas.

This project serves as a practical guide to showcase AI-driven development, modular architecture, and rapid delivery with Hope AI.

Browse the components on the [Bit Cloud example organization](https://bit.cloud/infinity) for browsing live preview and of the platform components and business capabilities.

---

## ✨ Features

* **Design system:** Browse the platform design system. Each as standalone reusable package.
* **User Authentication:** Secure sign-up and login to enable voting and submissions.
* **Real-Time Voting:** Cast your vote for product ideas and see the results update instantly.
* **Product Submissions:** Submit your own innovative product ideas for the community to vote on.
* **Community Discussions:** Engage in threaded discussions on each product page.
* **User Profiles:** Manage your profile and track your submissions and voting history.

---

## 🛠️ Tech Stack

This project is built with a modern, component-oriented technology stack:

* **Monorepo:** [Bit](https://bit.dev) - For creating, versioning, and composing the platform packages.
* **Core Platform:** [Harmony](https://bit.dev/docs/harmony-intro) - Used Harmony for composing and integrating the application's services and logic.
* **Frontend:** [React](https://reactjs.org/) - For building interactive and reusable UI components.
* **Styling:** CSS Modules - For locally scoped and conflict-free component styles.
* **Backend:** NodeJS backend with GraphQL data fetching. Data persisted to MongoDB. 

---

## 🚀 Getting Started

Follow these steps to get the Product Cult platform running on your local machine.

### Prerequisites

Make sure you have [Bit](https://bit.dev/docs/getting-started/installing-bit/installing-bit) installed globally on your system.

### Installation & Setup

1.  **Clone the repository** (or get the source code).
2.  **Navigate into the project directory:**
    ```bash
    cd path/to/product-cult
    ```
3.  **Install dependencies** for all components in the workspace:
    ```bash
    bit install
    ```

## Running the App

You can run the full application or view individual components in the Bit workspace.
This command builds and runs the main `product-cult` application, showing you the final, composed product.

```bash
bit run product-cult
```
Now, open your browser to the specified local port to see the app live!

### Start the Workspace Preview

This command launches the Bit development server, where you can see, test, and interact with each component in isolation. It's great for development and debugging.

```bash
bit start
```

## 📂 Project Structure

This project follows a component-driven architecture. The directory structure is organized by components, not by file type. This makes the codebase more modular, scalable, and easier to maintain.
