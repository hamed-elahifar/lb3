'use strict';

module.exports = function(Cat) {

    Cat.afterRemote();
    Cat.beforeRemote();

    Cat.observe('before save',function(context,next){
        if (context.instance) context.instance.updated = new Date();
        next();
    });

    Cat.afterRemote('findById',function(context,cat,next){
        cat.description = cat.name + ' is ' + cat.age + ' years old and is a ' +  cat.breed;
        next();
    });

    Cat.adoptable=function(id,cb){
        // Cat.find({where:{age:{gt:10}}},function(err,cats){
        //     if (err) cb(err,null)
        //     cb(null,cats)
        // });
        Cat.findById(id,function(err,cat){
            if(err)  return cb("Error",null)
            if(!cat) return cb("Cat not found",null)
            let canAdopt = false;
            if(cat.breed != 'tiger' || (cat.age >= 10));
            canAdopt = true;
            cb(null,canAdopt);
        });
    }

    Cat.remoteMethod('adoptable',{
        http:           {path:'/adoptable/:id',verb:'GET'               },// http: { source: 'body' }
        accepts:        {arg: 'id',            type:'number'            },
        returns:        {arg: 'adoptable',     type:'boolean',root:false},
        // root:false
        // {
        //     "adoptable": true
        // }
        // ---
        // root:true
        // {
        //     true
        // }
        description:    'this is a description for this method'
    });

    // Cat.validatesInclusionOf('gender',{'in':['male','female']});
    // Cat.validatesNumericalityOf('age',{'int':true});

    // Cat.validate('age',function(err){
    //     if(this.age <= 0) err();
    // },{message:'Must be positive'});

    // Cat.validateAsync('age',function(err,done){
    //     if(this.age <= 0) err();
    //     else done();
    // },{message:'Must be positive'});

// Adding a schema to a model
// var productSchema = {
//     "name": { "type": "string", "required": true },
//     "price": "number"
// };
// var cat = Cat.extend('product', productSchema);
      
    
    
Cat.disableRemoteMethodByName('find',                       true); // GET 
Cat.disableRemoteMethodByName('create',                     true); // POST /cats
Cat.disableRemoteMethodByName('patchOrCreate',              true); // PATCH /cats
Cat.disableRemoteMethodByName('findById',                   true); // GET /cats/{id}
Cat.disableRemoteMethodByName('prototype.patchAttributes',  true); // PATCH /cats/{id}
Cat.disableRemoteMethodByName('destroyById',                true); // DELETE /cats/{id}
Cat.disableRemoteMethodByName('exists',                     true); // HEAD /cats/{id}
                                                                   // GET  /cats/{id}/exist
Cat.disableRemoteMethodByName('replaceById',                true); // PUT /cats/{id}
                                                                   // POST /cats/{id}/replace
Cat.disableRemoteMethodByName('createChangeStream',         true); // GET /cats/change-stream 
                                                                   // POST /cats/change-stream 
Cat.disableRemoteMethodByName('count',                      true); // GET /cats/count
Cat.disableRemoteMethodByName('findOne',                    true); // GET /cats/findOne
Cat.disableRemoteMethodByName('replaceOrCreate',            true); // PUT /cats
                                                                   // POST /cats/replaceOrCreate
Cat.disableRemoteMethodByName('updateAll',                  true); // POST /cats/update
Cat.disableRemoteMethodByName('upsertWithWhere',            true); // POST /cats/upsertWithWhere 

// ----- in cat.json ----- //
// "scopes": {
//     "calico": {
//       "where": {
//         "breed": "calico"
//       }
//     },
//     "oldCats": {
//       "where": {
//         "age": {
//           "gt": 10
//         }
//       }
//     },
//     "someCats": {
//       "limit": 8
//     }
//   },
};


// MyUser.disableRemoteMethodByName('create');
// MyUser.disableRemoteMethodByName('upsert');
// MyUser.disableRemoteMethodByName('updateAll');
// MyUser.disableRemoteMethodByName('prototype.updateAttributes');

// MyUser.disableRemoteMethodByName('find');
// MyUser.disableRemoteMethodByName('findById');
// MyUser.disableRemoteMethodByName('findOne');

// MyUser.disableRemoteMethodByName('deleteById');

// MyUser.disableRemoteMethodByName('confirm');
// MyUser.disableRemoteMethodByName('count');
// MyUser.disableRemoteMethodByName('exists');
// MyUser.disableRemoteMethodByName('resetPassword');

// MyUser.disableRemoteMethodByName('prototype.__count__accessTokens');
// MyUser.disableRemoteMethodByName('prototype.__create__accessTokens');
// MyUser.disableRemoteMethodByName('prototype.__delete__accessTokens');
// MyUser.disableRemoteMethodByName('prototype.__destroyById__accessTokens');
// MyUser.disableRemoteMethodByName('prototype.__findById__accessTokens');
// MyUser.disableRemoteMethodByName('prototype.__get__accessTokens');
// MyUser.disableRemoteMethodByName('prototype.__updateById__accessTokens');


// module.exports = function(user) {
//     user.validatesPresenceOf    ('name',        'email');
//     user.validatesLengthOf      ('password',    {min: 5, message: {min: 'Password is too short'}});
//     user.validatesInclusionOf   ('gender',      {in: ['male', 'female']});
//     user.validatesExclusionOf   ('domain',      {in: ['www', 'billing', 'admin']});
//     user.validatesNumericalityOf('age',         {int: true});
//     user.validatesUniquenessOf  ('email',       {message: 'email is not unique'});
//     user.validatesLengthOf      ('name',        { min: 5, message: { min: 'Name should be 5- characters' }
// };
  

// User.on('resetPasswordRequest', function (info) {
//     console.log(info.email); // the email of the requested user
//     console.log(info.accessToken.id); // the temp access token to allow password reset
  
//     // requires AccessToken.belongsTo(User)
//     info.accessToken.user(function (err, user) {
//       console.log(user); // the actual user
//     });
// });
  