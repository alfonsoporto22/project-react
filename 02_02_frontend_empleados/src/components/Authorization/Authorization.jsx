import { useContext } from "react"
import Login from "../LogIn/LogIn";
import { Context } from "../../SharedState"

function Authorization({children}) {

    const { states, actions } = useContext(Context);

    return (
        <div id="Authorization">
            { states.state.token ? children : <Login/>}
        </div>
    )
}

export default Authorization