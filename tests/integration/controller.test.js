const { TodoService } = require('../../js/model');
const { Controller } = require('../../js/controller');

// Mock the View because we are not testing the UI, only Controller-Model interaction.
const mockView = {
    update: jest.fn(),
    bindAddTodo: jest.fn(),
    bindToggleTodo: jest.fn(),
    bindRemoveTodo: jest.fn(),
};

describe('Controller-Service Integration Tests', () => {
    let service;
    let controller;

    beforeEach(() => {
        service = new TodoService();
        service.todos = []; // Reset singleton for tests
        controller = new Controller(service, mockView);
    });

    test('handleAddTodo should call service.addTodo and update the model', () => {
        // Arrange: Define the input text
        const todoText = 'Integration Test: Build CI Pipeline';

        // Act: Call the controller's handler (simulating a user UI interaction)
        controller.handleAddTodo(todoText);

        // Assert: Verify the Service's data array reflects the change
        const todos = service.todos;
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(todoText);
        expect(todos[0].completed).toBe(false);
    });

    test('handleRemoveTodo should call service.removeTodo and update the model', () => {
        // Arrange: Directly add a todo to the service to set up the state[cite: 1]
        service.addTodo('Task to be removed via Controller');
        const todoId = service.todos[0].id;

        // Act: Call the controller's handler to delete the item[cite: 1]
        controller.handleRemoveTodo(todoId);

        // Assert: Verify the service's todos array is now empty[cite: 1]
        expect(service.todos.length).toBe(0);
    });
});
