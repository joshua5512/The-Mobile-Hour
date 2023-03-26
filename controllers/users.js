import express from 'express';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import { createStaff, deleteStaffById, getAllStaff, getStaffById, getStaffByUsername, updateStaffById } from '../models/users.js';
import { createChangelog } from '../models/changelog.js';
import access_control from '../access_control.js';


const staffController = express.Router();


// This endpoint will serve the login page view
staffController.get('/staff_login', (request, response) => {
  response.render('staff_login.ejs');

}
);

staffController.get('/contact', (request, response) => {
  response.render('contact.ejs');

}
);

// This iendpoing will accept login requests
staffController.post('/staff_login', (request, response)=> {
  const login_username = request.body.username;
  const login_password = request.body.password;

  // This is here for debugging
  console.log(login_username);
  console.log(login_password);

  

// get staff with a matching username
getStaffByUsername(login_username).then(([users])=>{

// check if we got at least one staff member
  if(users.length >=1) {
     const user = users[0]; // geth the first matching staff member
// compare the password hash from the database with the login password

    if(bcrypt.compareSync(login_password, user.user_password)) {

     // login the user(create the session)
     request.session.user = {
     user_id: user.user_id,
     role:user.user_role,
     };

      // login is complete-send the user to the order page
        response.redirect('/order_admin');

      } else {

      // send back an error -no matching user
      response.render('status.ejs', {status: 'Invalid password'});
    } 
  } else {

      // if no matching usernames-send back an errpor no matching user
      response.render('status.ejs', {status:'Username not found'});
  }

});

});

// this endpoint will handle logout requests
staffController.get('/staff_logout', (request, response)=>{
  // clear the session(this makes the bakend forget that the users is logged in)
  request.session.destroy()
  // redirect back to the home page
  response.redirect('/')

})


// 10.4 this end point with serve the staff admin CRUD page and handle the create, read, update, delete actions
staffController.get("/staff_admin", 
access_control(['manager']), 
(request, response) => {

  // This page has two varientss 1).one to show just the list and an empty edit form, 2).another to show the list and edit form with the details of the current edit_id staff member.

  // access the edit_id from the url query string
  const edit_id = request.query.edit_id;

  // if the edit_id exists then we show varient 2 otherwise show varient 1
    if(edit_id) {
      // show page varient 2

      //  load the edit_id staff member details
      getStaffById(edit_id).then(([users]) => {
        // did we find a matching staff member
        if(users.length > 0) {
          const user = users[0];

          // we now have the staff member to edit. we still need to load the list of all staff members
          getAllStaff().then(([users]) => {
            response.status(200).render("staff_admin.ejs", {
              role: request.session.user_role,
              users: users,
              edit_user: user,
            });
          });
        }

      });
    } else {
      // show page varient 1
        getAllStaff().then(([users]) => {
          response.status(200).render("staff_admin.ejs", {
            role: request.session.user.role,
            users: users,
            edit_user: {
              user_id: 0,
              user_first_name: "",
              user_last_name: "",
              user_role: "",
              user_username: "",
              user_password: "",
      
            },
          });
        });

      }
 
});

// this endpoint defines the create, update and delete logic  for the edit form. This code runs whener a button is pressed on the form
staffController.post("/edit_staff", access_control(['manager']), (request, response) => {

    // access the form data from the request
    const edit_details = request.body;

    if(!/^[0-9]{1,}$/.test(edit_details.user_id)) {
      response.status(400).render("status", {
        status:"Invalid productID",
        message:"Please pick another product"
      });
      return;
    }
  
    if(!/^[a-zA-Z- ]{2,}$/.test(edit_details.first_name)) {
      response.status(400).render("status.ejs", {
        status:"Invalid first name",
        message:"First name must be letters",
      });
  
      return;
  
    }
  
    if(!/^[a-zA-Z-]{2,}$/.test(edit_details.last_name)) {
      response.status(400).render("status.ejs", {
        status:"Invalid last name",
        message:"Last name must be letters"
      });
      return;
    }
  
    if(!/^[a-z0-9_-]{3,15}$/.test(edit_details.username)) {
      response.status(400).render("status.ejs", {
        status:"Invalid username",
        message:"Username must be a valid format"
      });
      return;
    }
  
  
    if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(edit_details.password)) {
      // if(validator.isEmail(order_details.customer_email)) {
      response.status(400).render("status.ejs", {
        status:"Invalid password",
        message:"Password must be a valid format"
      });
      return;
    }

    // determine action based on form action
    if(edit_details.action == "create") {
      createStaff(
        validator.escape(edit_details.first_name),
        validator.escape(edit_details.last_name),
        edit_details.role,
        validator.escape(edit_details.username),
        bcrypt.hashSync(edit_details.password)
      ).then(([result]) => {
        createChangelog(request.session.user.user_id, `Staff member with username ${edit_details.username} created`);
        response.redirect("/staff_admin");
      });

    }else if (edit_details.action == "update") {
      if(!edit_details.password.startsWith("$2a")){
        // hash the password
        edit_details.password = bcrypt.hashSync(edit_details.password);

      } 

      updateStaffById(
        validator.escape(edit_details.user_id),
        validator.escape(edit_details.first_name),
        validator.escape(edit_details.last_name),
        edit_details.role,
        validator.escape(edit_details.username),
        validator.escape(edit_details.password)
      ).then(([result]) => {
        createChangelog(request.session.user.user_id, `Staff member with username ${edit_details.username} updated`);
        response.redirect("/staff_admin");
      });

    }else if (edit_details.action == "delete") {
      deleteStaffById(edit_details.user_id).then(([result]) => {
        createChangelog(request.session.user.user_id, `Staff member with username ${edit_details.username} deleted`);
        response.redirect("/staff_admin");
      });

    }

});

// this is a degugging endpoint that creats a default user
// ToDO delete before pushing to production!!!

staffController.get('/create_default_user', access_control('manager'), (request, response)=>{
  // define default staff members' details
  const role = 'manager';
  const first_name = 'default';
  const last_name='user';
  const username='user';
  const password='password';


  // hash default staff members' password
  const hashed_password=bcrypt.hashSync(password);

  // create staff member with default details
  createStaff(first_name, last_name, role, username, hashed_password).then((query_result)=>{
    response.json({
      message:'Default user created',
      username:username,
      password:password,
    });
  });

});

// debug end point to check session state
staffController.get('/whoami', (request, response)=>{
  if(request.session.user) {
    response.json(request.session.user);
  } else {
    response.json('No session');
  }
  
});
// staff validator
staffController.post("/create_staff", (request, response) => {
  
  if(request.body) {


  const user_details = request.body;

  if(!/^[a-zA-Z- ]{2,}$/.test(user_details.user_first_name)) {
    response.status(400).render("status.ejs", {
      status:"Invalid first name",
      message:"First name must be letters",
    });

    return;

  }

  if(!/^[a-zA-Z-]{2,}$/.test(user_details.user_last_name)) {
    response.status(400).render("status.ejs", {
      status:"Invalid last name",
      message:"Last name must be letters"
    });
    return;
  }

  if(!/^[+0-9 ]{10,}$/.test(user_details.username)) {
    response.status(400).render("status.ejs", {
      status:"Invalid username",
      message:"Username must be at least 8 characters"
    });
    return;
  }

  if(!/^\S{1,}@\S{1,}[.]\S{1,}$/.test(user_details.password)) {
    // if(validator.isEmail(order_details.customer_email)) {
    response.status(400).render("status.ejs", {
      status:"Invalid password",
      message:"password must be at least 8 characters"
    });
    return;
  }
}
})
export default staffController;