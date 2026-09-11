# Acknowledgement

The frontend UI was developed with the help of AI assistance. I mainly focused on the application structure, API integration, backend logic, database design, usage tracking and billing implementation.

# Usage & Billing System

A simple resource usage and billing system built using **React, Node.js, Express.js and MongoDB**.

The application allows users to start using a shared resource, checks whether the resource has available capacity, and calculates the bill when the usage is stopped.

## Features

* Create and view users
* Create and view resources
* Define resource capacity and pricing
* Start a usage session
* Check resource capacity before starting usage
* View currently active usages
* Stop an active usage
* Automatically calculate usage duration
* Partial hours are rounded up to the next full hour
* Calculate the final bill based on the resource pricing
* View completed usage history

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Project Structure

```text
project/
│
├── backend/
│   ├── controllers/
│   │   ├── user.controller.js
│   │   ├── resource.controller.js
│   │   └── usage.controller.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Resource.js
│   │   └── Usage.js
│   │
│   ├── routes/
│   │   ├── user.routes.js
│   │   ├── resorce.routes.js
│   │   └── usage.routes.js
│   │
│   └── index.js
│
└── frontend/
    └── src/
        ├── api/
        │   └── api.js
        │
        ├── components/
        │   ├── UserForm.jsx
        │   ├── UserList.jsx
        │   ├── ResourceForm.jsx
        │   ├── ResourceList.jsx
        │   ├── StartUsage.jsx
        │   ├── ActiveUsage.jsx
        │   └── UsageHistory.jsx
        │
        ├── App.jsx
        └── main.jsx
```

## How the System Works

### 1. Create a User

A user can be created by providing:

* Name
* Email

The user is stored in MongoDB and can later be selected while starting a usage session.

### 2. Create a Resource

A resource contains:

* Name
* Capacity
* First hour rate
* Additional hour rate

For example:

```text
Resource: Meeting Room
Capacity: 3
First hour: ₹30
Additional hour: ₹10
```

This means up to 3 users can use the resource at the same time.

### 3. Start Usage

When a user starts using a resource, the backend first checks:

1. Whether the user exists
2. Whether the resource exists
3. How many active usages the resource currently has
4. Whether the current active usage count has reached the resource capacity

If the resource is full, the request is rejected.

Otherwise, a new usage record is created with the current time as `startTime`.

At this point, no bill is calculated.

### 4. Stop Usage

When the user stops using the resource:

1. The current time is stored as `endTime`
2. The total usage duration is calculated
3. Partial hours are rounded up
4. The bill is calculated using the resource's pricing rules
5. The usage status is changed from `ACTIVE` to `COMPLETED`

For example, if the resource has:

```text
First hour = ₹30
Additional hour = ₹10
```

Then:

```text
30 minutes  → 1 hour  → ₹30
1 hour      → 1 hour  → ₹30
1 hour 20m  → 2 hours → ₹40
2 hours 10m → 3 hours → ₹50
```

The billing formula used is:

```text
If hours <= 1:
    bill = firstHourRate

Otherwise:
    bill = firstHourRate
         + (hours - 1) × additionalHourRate
```

## Database Structure

The application uses three main collections.

### User

```text
User
├── name
└── email
```

### Resource

```text
Resource
├── name
├── capacity
├── firstHourRate
└── additionalHourRate
```

### Usage

```text
Usage
├── userId
├── resourceId
├── startTime
├── endTime
├── duration
├── bill
└── status
```

`userId` and `resourceId` are stored as MongoDB ObjectId references.

The `status` can be:

```text
ACTIVE
COMPLETED
```

## API Endpoints

### Users

| Method | Endpoint     | Description   |
| ------ | ------------ | ------------- |
| POST   | `/api/users` | Create a user |
| GET    | `/api/users` | Get all users |

### Resources

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| POST   | `/api/resources` | Create a resource |
| GET    | `/api/resources` | Get all resources |

### Usage

| Method | Endpoint             | Description                             |
| ------ | -------------------- | --------------------------------------- |
| POST   | `/api/usage/start`   | Start a usage session                   |
| POST   | `/api/usage/stop`    | Stop a usage session and calculate bill |
| GET    | `/api/usage/active`  | Get active usages                       |
| GET    | `/api/usage/history` | Get usage history                       |

## Example Requests

### Create User

```json
POST /api/users

{
  "name": "Nishant",
  "email": "nishant@gmail.com"
}
```

### Create Resource

```json
POST /api/resources

{
  "name": "Meeting Room A",
  "capacity": 3,
  "firstHourRate": 30,
  "additionalHourRate": 10
}
```

### Start Usage

```json
POST /api/usage/start

{
  "userId": "USER_ID",
  "resourceId": "RESOURCE_ID"
}
```

### Stop Usage

```json
POST /api/usage/stop

{
  "usageId": "USAGE_ID"
}
```

## Running the Project

### Backend

Go to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and add the MongoDB connection string:

```env
MONGO_URI=your_mongodb_connection_string
```

Start the backend:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### Frontend

Open another terminal and go to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

## Testing

The APIs can be tested using Postman.

A basic testing flow is:

```text
1. Create a user
        ↓
2. Create a resource
        ↓
3. Start usage
        ↓
4. Check active usage
        ↓
5. Stop usage
        ↓
6. Check usage history
```

The frontend also provides forms and lists for performing the same operations from the UI.

## Approach

The main logic is kept on the backend so that capacity checking and billing calculations are not dependent on the frontend.

During an active session, only the start time is stored. The application does not continuously calculate the bill.

The bill is calculated only when the usage is stopped. This keeps the usage tracking simple and avoids unnecessary calculations while a session is active.

For capacity checking, the backend counts the number of `ACTIVE` usage records for the selected resource and compares it with the resource capacity.

```text
active usages < capacity
        ↓
   usage allowed

active usages >= capacity
        ↓
   usage rejected
```

## Notes

* MongoDB is used for storing users, resources and usage records.
* Mongoose is used for defining schemas and communicating with MongoDB.
* Axios is used by the React frontend to communicate with the backend APIs.
* Billing is calculated when a usage session is stopped.
* Partial usage hours are always rounded up to the next full hour.
* A completed usage cannot be stopped again.




