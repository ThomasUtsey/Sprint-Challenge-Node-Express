const express = require('express');
const router = express.Router();
const nmdb = require('../data/helpers/projectModel')


// const myCaps = function (req, res, next) {
//    console.log(`not sure how to convert ${req.body} to caps`)
    
  
//   next()
// }


// get a list of names
router.get('/', async (req, res) => {
  console.log(req.body);
  try {
    const name = await nmdb.get(req.action);
    console.log(name)
    res.status(200).json(name);

  } catch (error) { 
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the names',
    });
  }
})
// get a name by id
router.get('/:id',async (req, res) =>{
  try {
    
    const id = await nmdb.get(req.params.id);
    
    if (id) {
      res.status(200).json(id);
    } else {
      res.status(404).json({ message: 'name not found' });
    }
  }catch (error){
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the Project Name'
  })
  }
})
// get a names post by id

    
    router.get('/:id/posts',async (req, res) =>{
      console.log (req.params)
  try {
    const id = await nmdb.getProjectActions(req.params.id);
    
    if (id) {
      res.status(200).json(id);
    } else {
      res.status(404).json({ message: 'User posts not found' });
    }
  }catch (error){
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the posts'
  })
  }
})
// // // add a new name
router.post('/',async (req, res) => {
  
  try {
    const name = await nmdb.insert(req.body);
    res.status(201).json(name);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error adding the name',
    });
  }
});
// // // update an existing name 
router.put('/:id', async (req, res) => {
  console.log(req.body)
  try {
    const id = await nmdb.update(req.params.id, req.body);
    if (id) {
      res.status(200).json(req.body);
    } else {
      res.status(404).json({ message: 'The name could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the name',
    });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const name = await nmdb.remove(req.params.id);
    if (name) {
      res.status(200).json({ message: 'The name has been removed' });
    } else {
      res.status(404).json({ message: 'The name could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the name',
    });
  }
});

module.exports = router;