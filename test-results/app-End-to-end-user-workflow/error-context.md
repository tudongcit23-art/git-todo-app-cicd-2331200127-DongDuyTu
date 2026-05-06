# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.js >> End-to-end user workflow
- Location: tests\e2e\app.spec.js:3:1

# Error details

```
Error: page.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('#add-button')

```

# Test source

```ts
  1  | const { test, expect, _electron: electron } = require('@playwright/test');
  2  | 
  3  | test('End-to-end user workflow', async () => {
  4  |    // Launch the Electron app
  5  |     const electronApp = await electron.launch({ args: ['.'] });
  6  |     const window = await electronApp.firstWindow();
  7  | 
  8  |     const taskText = 'My new E2E test task';
  9  | 
  10 |     // --- TODO: Task 1: Add a new todo item ---
  11 |     // 1. Find the input field
  12 |     const todoInput = window.locator('#todo-input');
  13 |     // 2. Type the `taskText` into it
  14 |     await todoInput.fill(taskText);
  15 |     // 3. Find and click the "Add" button
> 16 |     await window.click('#add-button');
     |                  ^ Error: page.click: Target page, context or browser has been closed
  17 | 
  18 |     // --- TODO: Task 2: Verify the todo item was added ---
  19 |     // 1. Locate the new todo item in the list
  20 |     const todoItem = window.locator('.todo-item').last();
  21 |     // 2. Assert that its text content contains the `taskText`
  22 |     await expect(todoItem).toContainText(taskText);
  23 | 
  24 |     // --- TODO: Task 3: Mark the todo item as complete ---
  25 |     // 1. Find the checkbox within the new todo item
  26 |     const checkbox = todoItem.locator('input[type="checkbox"]');
  27 |     // 2. Click the checkbox
  28 |     await checkbox.click();
  29 |     // 3. Assert that the todo item now has the 'completed' class
  30 |     await expect(todoItem).toHaveClass(/completed/);
  31 | 
  32 |     // --- TODO: Task 4: Delete the todo item ---
  33 |     // 1. Find the delete button within the todo item
  34 |     const deleteBtn = todoItem.locator('.delete-btn');
  35 |     // 2. Click the delete button
  36 |     await deleteBtn.click();
  37 |     // 3. Assert that the todo item is no longer visible on the page
  38 |     await expect(window.locator('.todo-item')).toHaveCount(0);
  39 | 
  40 |     // Close the app
  41 |     await electronApp.close();
  42 | });
  43 | 
```