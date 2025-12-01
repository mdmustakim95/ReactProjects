import { div } from 'framer-motion/client';
import React from 'react';


function App(){
    return(

        <div className="quotediv">
            <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore similique ullam quae neque, dignissimos iusto sed deserunt ipsam. Cumque animi aspernatur sunt, mollitia nisi suscipit.</h3>
            <hr></hr>
            <div className="author-div">
                <p>- John Doe</p>
                <button>Reload</button>
                <button>Share</button>
            </div>
        </div>
    )
}
export default App;