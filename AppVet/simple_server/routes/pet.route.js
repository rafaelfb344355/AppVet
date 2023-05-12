const express = require('express');
const app = express();
const petRoutes = express.Router();
const Pet = require('../model/Pet');

// api to add pet
petRoutes.route('/add').post(function (req, res) {
  let pet = new Pet(req.body);
  pet.save()
  .then(pet => {
    res.status(200).json({'status': 'success','mssg': 'pet added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get pets
petRoutes.route('/').get(function (req, res) {
  Pet.find(function (err, pets){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','pets': pets});
    }
  });
});

petRoutes.route('/pet/:name').get(function (req, res) {
  
  let name = req.params.name;
  
  Pet.findOne({ name: name }, function(err, pet) {
      
     
  if (err) {
        
       
  // Tratar erros de busca no banco de dados
        res.status(500).send('Erro interno do servidor');
      } else if (!pet) {
        // Lidar com o caso em que nenhum animal de estimação é encontrado com o nome fornecido
        res.status(404).send('Nenhum animal de estimação encontrado');
      } 
     
  else {
        
  // Caso um animal de estimação seja encontrado, você pode retorná-lo como resposta
        res.status(200).json(pet);
      }
    });
  });
  
      
   
  
      

 



// api to get pet
petRoutes.route('/pet/:id').get(function (req, res) {
  let ID = req.params.id;
  Pet.findById(ID, function (err, pet){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','pet': pet});
    }
  });
});

// api to update route
petRoutes.route('/update/:id').put(function (req, res) {
    Pet.findById(req.params.id, function(err, pet) {
    if (!pet){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        pet.name = req.body.name;
        pet.email = req.body.email;
        pet.phone_number = req.body.phone_number;

        pet.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
petRoutes.route('/delete/:id').delete(function (req, res) {
  Pet.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = petRoutes;