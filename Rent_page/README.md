# Project README

## Overview

The project is a reservation and management system for equipment. This system is designed to allow administrators to add available equipment to the system, while users can reserve and rent it. Intelligent restrictions should be in place, such as disallowing reservations in the past, and so on. Access to the system is restricted to authenticated users only. There are two user roles in the system: administrator, responsible for creating and updating equipment, as well as confirming reservations; and regular users, who can browse available equipment and make reservations.

## Project Requirements / Features

### General Requirements

- The system is developed using React, Node.js/Express, and MongoDB. All these components are interconnected.
- User authentication is implemented in the system.
- The system's design is responsive to screen resolution.
- Fully implemented functionality is a little tested with Unit tests.

### Common User Actions

All users, regardless of their role, can perform the following actions:

- View the list of equipment registered in the system.
- View information about selected equipment.

### Administrator Actions

Administrators can perform the following actions:

- Create new equipment in the system.
- Update equipment information.
- Change equipment status (Not draft, draft).
- View all reservations.
- Change the status of a selected reservation (approved, not approved, rented).

### Regular User Actions

Regular users can perform the following actions:

- View their reservations.
- Create a new reservation.
- Update reservation information (e.g., change the date).
- Cancel a reservation.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository.
2. Open frontend folder and install dependencies using `npm install`.
3. Open server folder and install dependencies using `npm install`.
4. Set up the database with MongoDB.
5. Configure authentication settings.
6. Run the application in server folder using `npm run dev` and in frontend folder using `npm start`.
