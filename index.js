const express = require('express')
const mongoose = require('mongoose');
const Storybook = require('./models/storybook.model.js');
const app = express()

// middleware   
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.send("Hello from node Api server");
});

app.get('/api/storybooks', async (req, res) => {
  try {
    const storybooks = await Storybook.find({});
    res.status(200).json(storybooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/storybooks/', async (req, res) => {
    try{
        const storybook = await Storybook.create(req.body);
        res.status(200).json(storybook); 
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// Updating
app.put('/api/storybooks/:id', async(req, res) => {
    try{
        const { id } = req.params;

        const storybook = await Storybook.findByIdAndUpdate(id, req.body);

        if(!storybook){
            return res.status(404).json({message: "Storybook not found!"});
        }

        const updatedStorybook = await Storybook.findById(id);

        res.status(200).json(updatedStorybook);

    } catch (error){
        res.status(500).json({message: error.message});
    }
})

//Deleting

app.delete('/api/storybooks/:id', async (req, res) => {
    try{
        const {id} = req.params;

        const storybook = await Storybook.findByIdAndDelete(id);

        if(!storybook){
            return res.status(404).json({message: "Storybook not found!"});
        }
        res.status(200).json({message: "Product deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


mongoose.connect("mongodb+srv://smitsawant45:9uJ32eby3rPEBR3p@backenddb.zua1hsk.mongodb.net/Crud-API?retryWrites=true&w=majority&appName=BackendDB")
.then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
.catch(() => {
    console.log("Connection failed!");
})