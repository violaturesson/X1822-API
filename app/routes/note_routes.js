var objectId=require('mongodb').ObjectId;
var cors = require('cors');
module.exports=function(app, db){
    //create
    app.post('/notes', (req, res)=>{

         const myDB=db.db('notesdb1');
         //myDB.collection('notes');

        const note={text: req.body.body, title: req.body.title};
        myDB.collection('notes').insert(note, (err, result)=>{
            if(err){
                res.send({'error':'An error has occurred'});
            }
            else{
                res.send(result.ops[0]);
            }
        });
        console.log('Added a note');
       // res.send('Hello fron Post');
    });

    //read
    app.get('/notes/:id', cors(), (req,res) => {
        const myDB = db.db('notesdb');

        const id = req.params.id;
        const details = {'_id': new objectId(id)};
        myDB.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occured'});
            }
            else {
                res.send(item);
            }
        });
        console.log('asking for a note');
        //res.send('this should be a returned note');
    })

    app.get('/notes',cors(), (req, res)=>{

        const myDB=db.db('notesdb1');
        //const id=req.params.id;

        //const details={'_id': new objectId(id)};
        myDB.collection('notes').find({}).toArray((err, item)=>{
             if(err){
                 res.send({'error':'An error again...'});
             }
             else{
                 res.send(item);
             }
         });
      
        // myDB.collection('notes').findOne(details, (err, item)=>{
        //     if(err){
        //         res.send({'error':'An error again...'});
        //     }
        //     else{
        //         res.send(item);
        //     }
        // });

        console.log('asking for a note');
       //res.send('this should be a returned note');
    });

    //update
    app.put('/notes/:id', (req, res)=>{

        const myDB=db.db('notesdb1');
        const id=req.params.id;

        const details={'_id': new objectId(id)};
        const note={text: req.body.body, title: req.body.title};
      
        myDB.collection('notes').update(details,  note, (err, result)=>{
            if(err){
                res.send({'error':'An error again...'});
            }
            else{
                res.send(note);
            }
        });

        console.log('updating notes');
       //res.send('this should be a returned note');
    });

    //delete
app.delete('/notes/:id', (req, res)=>{

        const myDB=db.db('notesdb1');
        const id=req.params.id;

        const details={'_id': new objectId(id)};
        
      
        myDB.collection('notes').remove(details, (err, item)=>{
            if(err){
                res.send({'error':'An error again...'});
            }
            else{
                res.send('Note '+ id + ' deleted!');
            }
        });

        console.log('deleting notes');
       //res.send('this should be a returned note');
    });

};