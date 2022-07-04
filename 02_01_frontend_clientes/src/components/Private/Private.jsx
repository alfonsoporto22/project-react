import { useContext, useEffect } from "react"
import { Context } from "../../SharedState"

function Private () {

    const { states, actions } = useContext(Context);

    useEffect(
        ()=>{
            actions.getAPISecrets()
        },
        []
    )

    return (
        <div id="Private">
            <h2>Private</h2>
            {states.state.secrets}
        </div>
    )
}

export default Private