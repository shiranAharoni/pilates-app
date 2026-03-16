import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import AddExercise from './AddExercise';
import { WorkoutProvider } from '../../context/WorkoutContext';
import { BrowserRouter } from 'react-router-dom';

describe('AddExercise Page', () => {

  test('Should update input value when typing', () => {
    render(
      <BrowserRouter>
        <WorkoutProvider>
          <AddExercise />
        </WorkoutProvider>
      </BrowserRouter>
    );

    const titleInput = screen.getByPlaceholderText("Exercise Title (e.g., The Hundred)");

    fireEvent.change(titleInput, { target: { value: 'Plank' } });

    expect(titleInput.value).toBe('Plank');
  });

  test('Should show that Title is a required field', () => {
    render(
      <BrowserRouter>
        <WorkoutProvider>
          <AddExercise />
        </WorkoutProvider>
      </BrowserRouter>
    );

    const titleInput = screen.getByPlaceholderText("Exercise Title (e.g., The Hundred)");

    expect(titleInput.hasAttribute('required')).toBe(true);
  });

});