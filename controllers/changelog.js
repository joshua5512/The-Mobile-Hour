import express from "express";

import { getAllChangelog} from "../models/changelog.js";
import access_control from "../access_control.js";

const changelogController = express.Router();

changelogController.get('/changelog', access_control(['manager', 'sales']), (request, response) => {
 

    getAllChangelog().then(([changelog])=> {
         
        response.status(200).render("changelog.ejs", {changelog: changelog, 
          role: request.session.user.role}); 
    });
});

export default changelogController;