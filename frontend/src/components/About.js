import React from 'react';


const About = () => {
    return (
        <div className="about">
            <div className="head">
            <h1>About</h1>
            <p>This is all about us.</p>
            </div>
            <p>
                  <strong>Project One...</strong> seems like forever ago, right?
                   How many of us have revisited our games? Replayed our cohort mates games?
                   If we haven't, maybe it's because we would have to go to github, find the creator's account,
                   find the repo, find the github pages link.... Well, not anymore. One spot. For all our games.
                   Enter: <strong>GArcade</strong> . Here you can submit your games from Project One (or any others you've created!) and
                   play your classmates games as well! Maybe you're looking for something new? Well, devs from ALL cohorts will
                   have the ability to create a User account and upload their games as well! The idea behind this
                   was to create a place where we can all come together, support our previous works, and continue to develop, submit and grow!
                   Questions? Comments? Wanna see more from us? Feel free to reach out to any of the devs via LinkedIn or check out our work on Github!<br />
                   Martin Briceno: <a className="devs" target="_blank" href="https://github.com/mgustavob">Github </a><a className="devs" target="_blank" href="https://www.linkedin.com/in/martin-briceno-0825511b0/">LinkedIn</a><br />
                   David Cabassa: <a className="devs" target="_blank" href="https://github.com/decpdx584">Github </a><a className="devs" target="_blank" href="https://www.linkedin.com/in/decpdx584/">LinkedIn</a><br />
                   Barent Langwell: <a className="devs" target="_blank" href="https://github.com/blangwell">Github </a><a className="devs" target="_blank" href="https://www.linkedin.com/in/blangwell/">LinkedIn</a><br />
                   Lizz West: <a className="devs" target="_blank" href="https://github.com/lizzwest">Github </a><a className="devs" target="_blank" href="https://www.linkedin.com/in/lizzwest/">LinkedIn</a>
            </p>
        </div>
    );
}

export default About;