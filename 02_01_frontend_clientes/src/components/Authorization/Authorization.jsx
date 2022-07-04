import { useContext } from "react"
import { Context } from "../../SharedState"

function Authorization({children}) {

    const { states, actions } = useContext(Context);

    return (
        <div id="Authorization">
            { states.state.token ? children : <h1>Please, login for view this content.</h1>}
        </div>
    )
}

export default Authorization