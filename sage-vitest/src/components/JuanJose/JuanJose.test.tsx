import {expect, test, describe, beforeEach} from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react';
import JuanJose from './JuanJose'; 
//describe y nombre del componente para testear
describe("JuanJose", () => {
    
// Test the cambioDeLados function
test('cambioDeLados updates points and counter', () => {
  // Render the component

  // Get the canvas element
  const canvas = screen.getByTestId('canvas');

  // Get the counter element
  const counter = screen.getByTestId('counter');

  // Initially, the points should be 3 and the counter content should be '3'
  expect(counter.textContent).toBe('3');

  // Simulate a click event on the canvas element
  fireEvent.click(canvas);

  // After the click event, the points should be updated to 4 and the counter content should be '4'
  expect(counter.textContent).toBe('4');
});
