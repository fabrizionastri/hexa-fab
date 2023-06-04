# Objectives

The objective of this project is to create a clean architecture project with a hexagonal architecture.

The main focus is to explore different ways to create gateways and adapters for database implementations.

Two storage implementations are provided:

- In memory
- Json server

The mock data used for tests is provided in the `/mock/` folder:

- the `mockStore` object in the `db.ts` file is used for testing the in memory store adapters.
- the `db.json` file is used for the json store adapter tests. This file is reset automatically on each test run using the `mockStore` object.

The usage of generic gateways and adapters is explored (for any entity of type "T"), and compared to the usage of specific gateways and adapters (on for each specific entity type).

## Usage

1. Start json-server from terminal with: `pnpm db`

2. Run tests with: `pnpm test`

3. Run server with: `pnpm dev`

Go to http://localhost:3000/ to see the results.

- http://localhost:3001/order : to see all orders
- http://localhost:3001/order/order1 : to see order1 details

## Interfaces vs Functions of Functions

In this project, gateways are defined as interfaces.

Another project explores the usage of functions of functions instead of interfaces, and can be found here:

https://github.com/fabrizionastri/hexa-functional
