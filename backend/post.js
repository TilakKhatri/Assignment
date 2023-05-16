const db = require('./db');
const express = require('express');

const router = express.Router();



router.post('/',(req, res) => {
    const addPost = "INSERT INTO appoinments_detail(appointmen_id,ownerName,petName,aptDate,aptTime,aptNotes) values(?,?,?,?,?,?)"
    const values = [
        req.body.id,
        req.body.ownerName,
        req.body.petName,
        req.body.aptDate,
        req.body.aptTime,
        req.body.aptNotes
    ];
    db.query(addPost, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Appointment has been added.");
    });
})

router.get('/', (req, res) => {
    db.query("SELECT * FROM appoinments_detail", (err, data) => {
        if (err) return res.status(404).json("Not Found");
        return res.status(200).json(data);
    })

})

router.put('/:id',(req, res) => {

    const updatePost = "UPDATE appoinments_detail SET ownerName=?,petName=?,aptDate=?,aptTime=?,aptNotes=?,appointmen_id=? WHERE appointmen_id=?";
    const values = [

        req.body.ownerName,
        req.body.petName,
        req.body.aptDate,
        req.body.aptTime,
        req.body.aptNotes,
        req.body.id
    ];
    db.query(updatePost, [...values, req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Appointment has been updated.");
    })

})

router.delete('/:id',(req, res) => {
    // console.log(req.params.id)
    const deletePost = "DELETE FROM appoinments_detail WHERE appointmen_id=?";
    db.query(deletePost, req.params.id, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Appointment has been deleted.");
    })

})



module.exports = router;