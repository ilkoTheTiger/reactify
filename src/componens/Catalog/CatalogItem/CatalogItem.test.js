import { render, screen } from '@testing-library/react';
import { CatalogItem } from './CatalogItem';
import { BrowserRouter } from 'react-router-dom';

describe('Catalog Item Component', () => {
    test('Show commute', () => {
        const from = 'Sofia';
        const to = 'Plovdiv';

        render(
            <BrowserRouter>
                <CatalogItem _id={'id'} from={from} to={to} />
            </BrowserRouter>
        );

        expect(screen.queryByText(`Commute: ${from}-${to}`)).toBeInTheDocument()
    });

    test('Show available seats', () => {
        const from = 'Sofia';
        const to = 'Plovdiv';
        const seats = '3';

        render(
            <BrowserRouter>
                <CatalogItem _id={'id'} from={from} to={to} seats={seats} />
            </BrowserRouter>
        );

        expect(screen.queryByText(`Seats: ${seats}`)).toBeInTheDocument()
    });
});