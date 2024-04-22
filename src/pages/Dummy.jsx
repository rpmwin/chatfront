import axios from "axios";
import React, { useEffect } from "react";

function Dummy() {
    useEffect(() => {
        try {
            dothis();
        } catch (error) {
            console.log("something went wrong in the dummy", error);
        }
    }, []);

    const dothis = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3232/api/v1/user/setcookies"
            );

            console.log("response", response);
            
            const newResponse = await axios.post("http://localhost:3232/api/v1/user/checkcookie");
            console.log("response", newResponse);
        } catch (error) {
            console.log("something went wrong in the dummy here asdasd", error);
        }
    };

    return <div>Dummy</div>;
}

export default Dummy;
