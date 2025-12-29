import { Button } from "react-bootstrap";

const NotFound = () => {

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        window.location.href = "/";
    }

    return (
        <main className="d-flex justify-content-center align-items-center flex-column" style={{ flex: '1' }}>
            <h1>Exit the matrix</h1>
            <br></br>
            <Button variant="dark" onClick={handleLogout}>Logout</Button>
        </main>
    );
}

export default NotFound;