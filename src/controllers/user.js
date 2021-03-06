import User from '../models/User.js';
import Connection from '../models/Connection.js';
import Suggestion from '../models/Suggestion.js';
import notify from '../utils/Notify.js';

export default class User_{

    static async getUsers(req, res){
      try {
        const users = await User.find({});
        res.status(200).send(users)
      } catch (error) {
        console.log(error)
        res.status(500).send({
          status: 500,
          message: 'Server error'
        })
        
      }
    }
   
     static async connect(req, res) {
        try {
          const userId = req.user.id;
          const connectionId = req.params.id;

          const connection = new Connection({
            requester: userId,
            requestee: connectionId
          })

          await connection.save()
          notify(type="new connection", titleMessage='Dear, You have new connection.', connectStatus="SUGGESTION", id=userId, motiMessage="You have new connection suggestion\n You can accept or decline")
          res.status(201).send({
            message: 'connection sent'
          })
        } catch (error) {
          console.log('error: ', error)
          res.status(500).send({
            status: 500,
            message: 'Something wrong'
          })
        }
     }

     static async match(req,res){
       try {
         /**
          * Get the id of the person logged in
          * create a collection of suggestions with: Id of creator, connections, status, reason
          */

         let userId = req.user.id;
         const suggestion = new Suggestion({
          suggestionInitiator: userId,
          suggestedOne: {
            id: req.params.id,
            status: 'pending'
          },
          suggestedTwo: {
            id: req.params.connectedId,
            status: 'pending'
          },
          reason: req.body.reason
        });
  
        await suggestion.save()
  
        res.status(201).send({
          message:'Suggestion sent'
        })   

       } catch (error) {
         
       }
     }

     static async approveConnection(req,res){
       try {
        /**
         * if i am requestee
         */

         const userId = req.user.id;
         const request = await Connection.findById(req.params.id)
         const status = req.body.status;
         if(userId !== request.requestee){
           res.status(401).send({
             message:"Invalid"
           })
         }else{
            if(status === "approved"){
              // add ids in arrays
              // change status
              const requester = await User.findById(request.requester);
              const requestee = await User.findById(userId);

              requester.connections.push(userId);
              requestee.connections.push(requester.id);

              await requester.save();
              await requestee.save();
              notify(type="APPROVED", titleMessage='Connection approval.', connectStatus="APPROVED", id=requester.connection.id, motiMessage="Dear, Your connection has been approved\n You can start having conversation")
              res.status(201).send({
                message: 'Approved'
              })

            }else if(status === 'declined'){
              request.status = "declined";
              notify(type="REJECTED", titleMessage='Connection rejected.', connectStatus="REJECTED", id=userId, motiMessage="Sorry????, Your connection was rejected")
              await request.save();
              res.status(200).send({
                message: 'declined'
              })
            }else{
              res.status(400).send({
                message: "something went wrong"
              })
            }
         }

       } catch (error) {
         res.status(500).send({
           message: 'Server Error'
         })
       }
     }

     static async approveMatch(req,res){
       try {
        const userId = req.user.id;
        const suggestion = await Suggestion.findById(req.params.id)
        const status = req.body.status;
        if(userId == suggestion.suggestionInitiator){
          res.status(401).send({
            message:"Invalid"
          })
        }else{

           if(userId == suggestion.suggestedOne.id){
             if(suggestion.suggestedTwo.status == 'approved' && status=='approved'){
               // change their connections array.
               const suggestedOne = await User.findById(suggestion.suggestedOne.id);
               const suggestedTwo = await User.findById(suggestion.suggestedTwo.id);

               const approvedSuggestion = await Suggestion.updateOne({_id: req.params.id},{$set: {'suggestedOne.status':status}})
              if (approvedSuggestion) {
                suggestedOne.connections.push(suggestion.suggestedTwo.id);
                suggestedTwo.connections.push(suggestion.suggestedOne.id);
                notify(type="APPROVED", titleMessage='Connection approval.', connectStatus="APPROVED", id=suggestion.suggestedTwo.id, motiMessage="Dear, Your connection has been approved\n You can start having conversation")
              }

               await suggestedOne.save();
               await suggestedTwo.save();
               await suggestion.save();

               res.status(201).send({
                 message: 'Connected'
               })
             }

             if(suggestion.suggestedTwo.status == 'pending' && status == 'approved'){
              await Suggestion.updateOne({_id: req.params.id},{$set: {'suggestedTwo.status':status}})

              notify(type="APPROVED", titleMessage='Connection approval.', connectStatus="APPROVED", id=suggestion.suggestedOne.id, motiMessage="Dear, Your connection has been approved\n You can start having conversation")

               res.status(200).send({
                 message: 'Thanks for approving. Wait for the other person to make a decision'
               })
             }
           }

           if(userId == suggestion.suggestedTwo.id){
            if(suggestion.suggestedOne.status == 'approved' && status=='approved'){
              // change their connections array.

              const suggestedOne = await User.findById(suggestion.suggestedOne.id);
              const suggestedTwo = await User.findById(suggestion.suggestedTwo.id);

              const approvedSuggestion = await Suggestion.updateOne({_id: req.params.id},{$set: {'suggestedTwo.status':status}})
              
              if (approvedSuggestion) {
                suggestedOne.connections.push(suggestion.suggestedTwo.id);
                suggestedTwo.connections.push(suggestion.suggestedOne.id);
                notify(type="APPROVED", titleMessage='Connection approval.', connectStatus="APPROVED", id=suggestion.suggestedOne.id, motiMessage="Dear, Your connection has been approved\n You can start having conversation")
              }
              await suggestedOne.save();
              await suggestedTwo.save();

              res.status(201).send({
                message: 'Connected'
              })
            }

            if(suggestion.suggestedOne.status == 'pending' && status == 'approved'){

              await Suggestion.updateOne({_id: req.params.id},{$set: {'suggestedOne.status':status}})
              notify(type="APPROVED", titleMessage='Connection approval.', connectStatus="APPROVED", id=suggestion.suggestedOne.id, motiMessage="Dear, Your connection has been approved\n You can start having conversation")
              await suggestion.save();
              res.status(200).send({
                message: 'Thanks for approving. Wait for the other party to make a decision'
              })
            }
            
          }
        }
       } catch (error) {
         console.log(error);
         res.status(500).send({
           message:'Server error'
         })
       }
     }
   
   }