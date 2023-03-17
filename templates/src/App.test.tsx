/* eslint-disable import/no-extraneous-dependencies */
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
    it('Renders hello world', () => {
        render(<App />, { wrapper: MemoryRouter });

        expect(
            screen.getByRole('heading', {
                level: 1,
            })
        ).toHaveTextContent('Hello World');
    });

    it('Renders Not Found for unknown paths', () => {
        render(
            <MemoryRouter initialEntries={['/nothing-here']}>
                <App />
            </MemoryRouter>
        );

        expect(
            screen.getByRole('heading', {
                level: 1,
            })
        ).toHaveTextContent('Not Found');
    });
});
