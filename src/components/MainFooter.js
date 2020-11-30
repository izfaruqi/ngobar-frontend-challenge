import React from 'react'

const MainFooter = () => {
    return (
        <div className="ui container" style={{marginTop: 25}}>
            <small>Movie data is provided by <a href="https://themoviedb.org" target="_blank" rel="noreferrer">themoviedb.org</a>.</small>
            <div style={{borderTop: "thin solid black", padding: 10, textAlign: "center"}}>
                <p>Made with ❤️ and &lt;\&gt; by <a href="https://izfaruqi.com" target="_blank" rel="noreferrer">izfaruqi</a> as a submission for Ngobar FE Challenge by KBMTI. Source code is available on <a href="https://github.com/izfaruqi/ngobar-frontend-challenge" target="_blank" rel="noreferrer">GitHub</a>.</p>
            </div>
        </div>
    )
}

export default MainFooter