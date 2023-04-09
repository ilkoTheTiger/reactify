import { render, screen } from '@testing-library/react';
import { LatestCommute } from './LatestCommute';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { formatDate } from '../../../utils/dateUtils';

describe('Latest Item Component', () => {
    test('Show commute', () => {
        const from = 'Sofia';
        const to = 'Plovdiv';

        render(
            <BrowserRouter>
                <LatestCommute _id={'id'} from={from} to={to} />
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
                <LatestCommute _id={'id'} from={from} to={to} seats={seats} />
            </BrowserRouter>
        );

        expect(screen.queryByText(`Seats: ${seats}`)).toBeInTheDocument()
    });

    test('Show scheduled time', () => {
        const time = "2023-04-19T10:50";

        render(
            <BrowserRouter>
                <LatestCommute _id={'id'} time={time} />
            </BrowserRouter>
        );

        expect(screen.queryByText(`Scheduled for: ${formatDate(time)}`)).toBeInTheDocument()
    });

    test('Click on Details', async () => {
        global.window = { location: { pathname: null } };
        const itemId = 'id'

        render(
            <BrowserRouter>
                <LatestCommute _id={itemId} />
            </BrowserRouter>
        );

        await userEvent.click(screen.queryByText('.'))

        expect(global.window.location.pathname).toContain(`/commutes/${itemId}`);
    });
});