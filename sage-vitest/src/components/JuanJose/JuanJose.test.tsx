import {expect, test, describe, beforeEach} from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react';
import JuanJose from './JuanJose'; 
 //render
describe("JuanJose", () => {
    beforeEach(() => 
    {
        render(
            <JuanJose startPoints={3}/>
        )
    })
    // Test the cambioDeLados function
    test('cambioDeLados actualiza points y counter', () => {
     const canvas = screen.getByTestId('canvas');
     const counter = screen.getByTestId('counter');
     expect(counter.textContent).toBe('3');
     fireEvent.click(canvas);
     expect(counter.textContent).toBe('4');
     fireEvent.click(canvas);
     expect(counter.textContent).toBe('5');
     fireEvent.click(canvas);
     expect(counter.textContent).toBe('4');
     fireEvent.click(canvas);
     expect(counter.textContent).toBe('3');
  });
})