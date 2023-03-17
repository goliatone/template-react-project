import { Link, useLocation } from 'react-router-dom';

export function LocationDisplay() {
    const location = useLocation();
    return (
        <div data-testid="location-display">
            <br />
            <b>{location.pathname}</b>
        </div>
    );
}

export default function NotFound() {
    return (
        <>
            <h1>Not Found</h1>
            <Link to="/">Back Home</Link>
            <LocationDisplay />
        </>
    );
}
