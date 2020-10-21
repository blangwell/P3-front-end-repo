# GArcade-Client-Side

Who doesn't love to play games? And who doesn't love to support their fellow classmates work? What if we took the two and combined them into one concept? Enter: GArcade. A hub, if you will, to host all our fellow cohort mates Project One games, all in one spot. As a user, you will have the ability to create an account, log in, create a list of favorite games in your profile, remove games that you don't play anymore and be able to see which games others love as well. A description of the game, a still image, and some info about the developer will all be included, all in one spot: the GArcade. So, do you want to play a game?(Or two...Or three...) 

------------------------------------------------------------------------------------------------------------

Please note: This is a decoupled app. For the full experience, it can be used in conjunction with the server-side repo [here.](https://github.com/Lizzwest/P3-back-end-repo)

## The site
![Garcade](frontend/public/assets/arcade.png?raw=true)

## Instructions to install

- Fork and clone this repo. 
- Open this application in your code editor ( we used VS code).
- Run ```npm i``` to install all dependencies.
- *```Touch```* a ```.env``` . The ```.env``` file will require a ```REACT_APP_SERVER_URL```( tells the app what port this app is running on).
- Run ```npm start```  to open and start the application in your browser.

## Technologies used
This is a full stack MERN application with Auth. The Auth portion was templated [here.](https://github.com/romebell/mern_authentication)
The technologies we are using between the front and back end are:
- Mongoose (MongoDB)
- Express
- React
- Node
    - Axios
    - Bcrypt
    - Cors
    - Dotenv
    - JWT-decode
    - JSONWebToken
    - Passport
    - Passport-JWT
    - React-Dom 
    - React-Iframe
    - React-Router-Dom 
    - React-Scripts

### User Stories

- As a User, I want to be able to create an account and log in.
- As a User, I want to be able to add a game to my favorites.
- As a User, I want to have a profile page that lists all my favorite games.
- As a User, I want to be able to upload a game to the arcade.
- As a User, I want to be able to edit my profile to reflect my details as a game Author.
- As a User, I want to be able to delete my account.

## The Setup

Knowing what we wanted to build ( an arcade) and knowing what our User wanted to get out of it (User Stories), our first big step in planning was complete. Our next step was establishing what we wanted to accomplish each day, individually and as a team. We set up sprints for every two days of the project, as well as a Trello board to keep track of tasks being completed and in need of resolution.

### The Sprints
This is the layout of what we originally wanted for each sprint and an insight into whether or not we completed it within the time constraint.

- Sprint One- Set up front and back end repos, stub out all basic routes, created database, and have all components (incomplete) rendering at their routes.
    - We completed most of this in Sprint One, save a couple routes that were more complex, or routes we weren't aware we needed yet. We had a complete database, but did restructure a few times throughout the week.

- Sprint Two- Functionality. Have games imported into our Hub, basic styling so we know exact layout of app, and tests to db functional. 
    - DB was functional and grabbing games in Sprint two. Basic styling was also completed.

- Sprint Three- Final functionality for app. All routes should be working properly, database should be receiving and storing information accurately (and hashing all pw) and we should be working on styling and any stretch goals that can be implemented in time. If app is not fully functional, push any stretch goals and everyone tackles debugging. 
    - Sprint Three was a struggle. We has some issues that took a lot longer to resolve than anticipated. We will list these in our challenges below.

- Sprint Four (?)- Styling. All styling, as well as any stretch goals that can be FULLY implemented with MINIMAL debugging potential. No more new code after MVP is completed and fully styled. 
    - Sprint Four turned into a stretch of Sprint Three. We were still having issues, primarily with the favorites functionality, so we decided to forego our retch goals and focus on the main components of the app.

### The Wireframes
![gamepage](frontend/public/assets/gamepage.png?raw=true)
![hiscore](frontend/public/assets/hiscoreindex.png?raw=true)
![landing](frontend/public/assets/landingpage.png?raw=true)


### The Challenges

- Lizz: Biggest challenge was actually managing the Github master repo and making sure everyone was able to receive code from pull requests that didn't overwrite code or create breaks in the code. I had to spend quite a bit of time studying git commands and best practices for merging to make our project code fluid and packaged properly.

- Barent: This project also offered me an excellent opportunity to gain familiarity with React, specifically the management of state in conjunction with backend database APIs, (in this case, mongoose ODM.) Becoming familiarized with the practical application of embedded references and the constraints/benefits using references in schema structure provides. With the favedGames array as an embedded reference in the User schema,  we were unable to push the entire game object into favedGames, only an ObjectId. This presented a serious challenge in getting the name of the favorite game to display. 

- Cabassa: Merging/collaborating via GitHub has been a HUGE challenge :sweat_smile: I anticipate it becoming a big part of my career moving forward so I plan to do a WHOLE LOT more collaboration once this cohort is over because practice makes perfect! As far as the code, just agreeing on the DB schema among us was a whole back and forth.

- Martin: Getting the functionality of rendering faveGames names as opposed to the ID was a struggle we couldn't overcome. I got the console.log to give us the name, but couldn't get it to render.
 ```javascript 
let Game1 = (id) =>{
        console.log(id)
        myGames.map((g, idx)=>{
            if(g._id === id){
                // console.log(g.title ? g.title : g.name)
                return(
                    <div>
                        <div key={idx}>{ g.title ? g.title : g.name }</div>
                    </div>
                    )
            } else {
                return <></>
            }
        })

        const mapThemFaves =
            props.currentUserFaves ? props.currentUserFaves.map((f, idx) => {
                console.log(f)
                const gameList = Game1(f)
                return <div key={idx}><Link to={/games/${f}} key={idx}>{gameList}</Link><br /> </div>
            })
            : <li>Loading</li>
 ```

### The Victories

- Lizz: My main victories came anytime I was able to assist someone on code that was not working properly or they were unsure of how to write it out. I also really loved making the links work within the site and redirecting to outside urls.

- Barent: For me, the most rewarding part of this experience was learning to successfully collaborate with other engineers. Up until this point, all of the apps I have worked on I have coded out by myself. Being able to work with a team of incredibly talented devs and share ownership over code was a valuable learning opportunity. 
```javascript
 const addFavorite = (e) => {    
    e.preventDefault()
    console.log('CURRENT GAME IN STATE : ', props.currentGame)
    // make a call to the database that gets the users info by ID
    axios.post(`${REACT_APP_SERVER_URL}/api/users/favorites/${props.currentUser.id}`,
    {parameters: {
      userId: props.currentUser.id,
      currentGame: props.currentGame,
    }})
    .then(response => {
      console.log('RESPONSE FROM BACK END : ', response)
      axios.get(`${REACT_APP_SERVER_URL}/api/users/profile/${props.currentUser.id}`)
      .then(response => {
        props.setCurrentUserFaves(response.data.favedGames)
          setRedirect(true)
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log('SHAME ON YOU'))
```


- Cabassa: My FAVORITE part of this whole project was working with my teammates to get the “Add to Favorites” function working. That code took an ENTIRE evening for us to bang out. The angst gave way to such sweet rapture when it finally worked, though... it was worth it!

- Martin: Figuring out how to get the Iframe height and width to render properly!
```javascript
.myClassname {
  height: calc(100vh - 95px) ;
  width: 60% ;
}
```

### Major Hurdle

Our biggest issue as a team was figuring out how to get favorite games to be added to the User's favedGames array. It took 2 days, 4 devs, 3 instructors and a lot of patience to finally get this functionality working. The final product of this coding issue is below. We still aren't able to get the game titles to render in the favorites list, but we have the object Id posting, and considering how much went into that, we moved titles to a stretch goal, post project.
```javascript 
// ADD GAME TO FAVORITES
router.post('/favorites/:id', (req, res) => {
  let userId = req.body.parameters.userId
  let currentGame = req.body.parameters.currentGame
  console.log('BACKEND LOOOOGIN', currentGame);
  db.User.findByIdAndUpdate(userId,
    {$addToSet: {favedGames: currentGame}}, {new: true})
 .then(response => {
    console.log('HERES THE RESPONSE FROM POST', response)
    res.status(200).json({response})
  })
  .catch(err => console.log('ERROR IN BACK END', err))
})
```


### What comes next?

We had several stretch goals we wanted to accomplish that we weren't able to incorporate due to time constraints and unforeseen issues in the coding process. We plan to continue to add and update to this app. Some extra features we would like to include are:
- Hi-Score: List of most faved games on the website.
- Accessibility: We want to make sure our site is user friendly for ALL users and would love to find a way to make it more accessible for anyone who may have difficulty navigating it as is.
- Genre: We would like to be able to sort games by genre and have users be able to search by genre for games.







