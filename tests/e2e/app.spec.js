const { test, expect, _electron: electron } = require('@playwright/test');

test('End-to-end user workflow', async () => {
   // Launch the Electron app
    const electronApp = await electron.launch({ args: ['.'] });
    const window = await electronApp.firstWindow();

    const taskText = 'My new E2E test task';

    // --- TODO: Task 1: Add a new todo item ---
    // 1. Find the input field
    const todoInput = window.locator('#todo-input');
    // 2. Type the `taskText` into it
    await todoInput.fill(taskText);
    // 3. Find and click the "Add" button
    await window.click('#add-button');

    // --- TODO: Task 2: Verify the todo item was added ---
    // 1. Locate the new todo item in the list
    const todoItem = window.locator('.todo-item').last();
    // 2. Assert that its text content contains the `taskText`
    await expect(todoItem).toContainText(taskText);

    // --- TODO: Task 3: Mark the todo item as complete ---
    // 1. Find the checkbox within the new todo item
    const checkbox = todoItem.locator('input[type="checkbox"]');
    // 2. Click the checkbox
    await checkbox.click();
    // 3. Assert that the todo item now has the 'completed' class
    await expect(todoItem).toHaveClass(/completed/);

    // --- TODO: Task 4: Delete the todo item ---
    // 1. Find the delete button within the todo item
    const deleteBtn = todoItem.locator('.delete-btn');
    // 2. Click the delete button
    await deleteBtn.click();
    // 3. Assert that the todo item is no longer visible on the page
    await expect(window.locator('.todo-item')).toHaveCount(0);

    // Close the app
    await electronApp.close();
});
