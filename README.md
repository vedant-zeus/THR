#  HR - WorkFlow

### *Design. Automate. Scale.*

**HR - WorkFlow** is a premium, visual studio designed for modern HR teams to orchestrate and automate their internal processes. Whether it's onboarding a new hire, managing leave approvals, or triggering automated email sequences, this tool provides a drag-and-drop interface to build complex logic without writing a single line of code.

---

##  Key Features

### 1. Drag-and-Drop Designer
Build your workflows using specialized nodes:
- **Start Node**: The entry point for your process.
- **Task Node**: Assign human tasks to specific team members.
- **Approval Node**: Set up decision points for managers.
- **Automated Step**: Trigger API actions like sending emails or generating documents.
- **End Node**: Mark the successful completion of a workflow.

### 2. Workflow Persistence
Never lose your work. The **Workflows Tab** allows you to:
- Name and **Save** snapshots of your canvas designs.
- **Load** any saved workflow back onto the canvas instantly.
- Manage a library of different process versions.

### 3. Real-time Simulation & Logs
Test your workflows before they go live:
- Run a **Simulation Engine** that traverses your graph.
- View **Live Audit Logs** with exact timestamps for every process.
- **Visual Validation**: The canvas automatically highlights errors (like broken paths or infinite loops) with red borders and alerts.

### 4. Theme Toggle
Accessible from everywhere! Toggle the mood of your workspace from the top-right corner of any page.

---


## 🛠️ Tech Stack

Built with a modern, high-performance stack for a smooth user experience:

- **Frontend**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Visual Programming**: [React Flow](https://reactflow.dev/) (Industry standard for node-based UIs)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (Lightweight and reactive)
- **Styling**: [Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) (Custom-built design system with modern CSS variables)
- **Icons**: [Lucide React](https://lucide.dev/) (Beautiful and consistent iconography)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strictly typed for reliability)

---

## 📂 Project Architecture

We take pride in a clean, modular, and scalable folder structure that separates concerns and makes the codebase a joy to work with.

```text
src/
├── components/          # 🧩 Reusable UI Components
│   ├── common/          # Global elements (ThemeToggle)
│   ├── config-panel/    # Node detail editor
│   ├── flow/            # Core React Flow canvas logic
│   ├── landing/         # Premium entry page
│   ├── nodes/           # Custom node definitions (Task, Approval, etc.)
│   ├── sandbox/         # Workflow simulation area
│   └── sidebar/         # Drag-source & Saved workflows
├── hooks/               # Custom React Hooks (useSimulation, validation)
├── services/            # API calls & Simulation logic
├── store/               # Zustand State Management
├── types/               # TypeScript Interfaces
└── index.css            # Global Design System & Variables
```

---

## 📸 In Action

### The Designer Studio
| Dark Mode | Light Mode |
|-----------|------------|
| ![Designer Dark](./screenshots/designer_dark.png) | ![Designer Light](./screenshots/designer_light.png) |

### Simulation & Error Detection
| Simulation Logs | Error Detection |
|-----------------|-----------------|
| ![Simulation](./screenshots/simulation.png) | ![Error Detection](./screenshots/error_detection.png) |

---

##  Getting Started

1. **Clone the repo**
2. **Install dependencies**: `npm install`
3. **Run locally**: `npm run dev`
4. **Build for production**: `npm run build`

---

##  What would I do with more time in hand?

If I had more time, I would transform this project into a **Full-Stack Enterprise Application**. My roadmap would include:

- **End-to-End Automation**: Converting the mock simulation into a real engine that interacts with live services (e.g., sending real automated emails to selected interns via SendGrid or AWS SES).
- **Persistent Backend**: Building a dedicated backend API (Node.js/Go) to handle business logic and workflow state.
- **Scalable Databases**: Storing all workflow graphs, member data, and audit logs in a distributed database like **Cloudflare** or **Aiven Cloud** for permanent persistence.
- **Team Collaboration**: Adding multi-user support with real-time editing and role-based access control (RBAC).

That would have been my definite course of action to take this from a powerful studio to a production-ready HR automation platform.

---

Built for **HR Team Efficiency** by **Vedant Sanjay Amrutkar**.
