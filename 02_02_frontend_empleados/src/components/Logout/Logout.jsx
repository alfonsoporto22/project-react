import { useContext } from "react"
import { Context } from "../../SharedState";
import Button from "react-bootstrap/Button";

function Logout() {

    const { actions } = useContext(Context);

    function clickHandler() {
        actions.deleteToken()
    }

    return (
        <div id="Logout">
            <Button onClick={clickHandler} variant="primary" type="submit">Logout</Button>
        </div>
    )
}

export default Logout