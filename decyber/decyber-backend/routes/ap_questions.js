const express = require('express');
const router = express.Router();//express ke andar router hota hai
const fetch_user = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');
const Army_questions = require('../models/Army_questions');

// Route 1 : Get all the Army_questions using : GET "/api/ap_questions/fetchAllap_questions". Login required
router.get('/fetchAllap_questions', fetch_user, async (req, res) => {
    try {
        const army_questions = await Army_questions.find({ type: 0 });
        res.json(army_questions);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// Route 2 : Get all the Army_questions using : GET "/api/ap_questions/fetchAllap_questions". Login required
router.get('/fetchsingleap_questions/:qid', fetch_user, async (req, res) => {
    try {
        const army_questions = await Army_questions.find({ qid: req.params.qid });
        res.json(army_questions);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 2 : Update user details using : PUT "/api/ap_questions/updateAPQ". Login required
router.put('/updateAPQ', fetch_user, async (req, res) => {
    try {

        const { qid, type } = req.body;
        const newAPQ = {};
        newAPQ.type = type;
        // Find the army question to be updated and update it
        let apq = await Army_questions.find({ qid: qid });
        if (!apq) {
            return res.status(404).send('Not found');
        }
        apq = await Army_questions.findByIdAndUpdate(apq[0]._id, { $set: newAPQ }, { new: true });// The default is to return the original, unaltered document. If you want the new, updated document to be returned you have to pass an additional argument: an object with the new property set to true.
        // new: bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
        res.json({ apq });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;