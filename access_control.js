
export default function access_control(allowed_roles) {
  allowed_roles=['manager', 'sales'];
  return function(request, response, next) {
    // check if the user is logged in(do they have a session)
    if(request.session.user != null) {
      // check if the user has one of the allowed roles. 
      if(allowed_roles.includes(request.session.user.role)) {
        // if they do: let the request through
        next();

      } else {

         // otherwise, send back an error-access denied.
         response.status(403).render("status.ejs", {
          status: "Access Denied",
          message: "Invalid access role",
         });
      } 
    } else {
      // otherwise, (if not logged in) - send back an error: not logged in
      response.status(401).render("status.ejs", {
        status:"Access Denied",
        message:"Not logged in",
      });

    }

   

    
  }

}