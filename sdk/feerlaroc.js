(function(){
                var root = this;
                
                var PARSE_SIGNUP_LINK = "https://api.parse.com/1/users";
                
                var userID;
                var sessionToken;
                
                var previousfeerlaroc = root.feerlaroc;
                
                var Uri = ["http://uqamata.feerlaroc.cloudbees.net/start"];
                var activeid = [];
                var resp = [];
                
                var merchant_status = ["merchant_exist","no_merchant"];
                var Aouth_status = ["loggedin","not_loggedin","signedup","not_signedup","retrieved","not_retrieved","updated","not_updated","deposite_success","deposite_failed"];
                var server_status = ["running", "down"];
                
                var _ = root._;
                if (!_ && (typeof require !== 'undefined')) _ = require('underscore');
                var $ = root.jQuery;                                                    //add jquery
                var backbone = root.Backbone;                                   //add backbone
                var localNavigator = root.navigator;                           //add phonegap
                
                userModel = Backbone.Model.extend();
                Trade = Backbone.Model.extend({
                        urlSelect: new Array()
                });
                
                var TradeModel = new Trade();
                var UserModel = new userModel();
                
                var feerlaroc;
                if (typeof exports !== 'undefined') {
                        feerlaroc = exports;
                } else {
                       feerlaroc = root.feerlaroc = {};
                }
                
                feerlaroc.VERSION = '0.1';
                feerlaroc.MERCHANT_STATE = merchant_status[1];
                feerlaroc.SERVER_STATE = server_status[1];
                feerlaroc.LOCALATTRIBUTES = {};
                feerlaroc.AOUTHATTRIBUTES = {};
                feerlaroc.AOUTH_STATE = Aouth_status[1];
                feerlaroc.U_MODEL = UserModel;
                feerlaroc.T_MODEL = TradeModel;
                feerlaroc.PLATFORM = localNavigator.platform;
                feerlaroc.PARSE_APP_ID = "";
                feerlaroc.PARSE_REST_KEY = "";
                feerlaroc.profile = {};
                
                
                var PARSE_APP_ID = feerlaroc.PARSE_APP_ID;
                var PARSE_REST_KEY = feerlaroc.PARSE_REST_KEY;
                feerlaroc.noConflict = function() {
                        root.feerlaroc = previousfeerlaroc;
                        return this;
                 };
                 
                var sync = feerlaroc.sync = function(){
                                UserModel.clear();
                                return sync.prototype.get();
                        };
                        
                        _.extend(sync.prototype, {
                         attr: function(){
                                return UserModel.attributes;
                        },    
                                                
                         set: function(){},  
		        
		        get: function() {
		                        UserModel.urlRoot =  Uri[0];
	                                var  xhr = UserModel.fetch().done(function(data){
	                                        if(data.code == 200){
	                                                Uri = ["http://uqamata.feerlaroc.cloudbees.net/start"];
	                                                Uri.push(data.feer_attributes.logon.uri);
	                                                Uri.push(data.feer_attributes.signup.uri);
	                                                feerlaroc.SERVER_STATE = server_status[0];
	                                         }else{
	                                                feerlaroc.SERVER_STATE = server_status[1];  
	                                         }
	                                });
	                                if(xhr.status = 200){
	                                        feerlaroc.SERVER_STATE = server_status[0];
	                                        return feerlaroc.SERVER_STATE;
	                                }else{
	                                        feerlaroc.SERVER_STATE = server_status[1];
	                                        return feerlaroc.SERVER_STATE;	                                
	                                }
	                      
		        },
		        
		        post: function() {},
		        
		        put: function() {},
		        
		        delete: function() {}                     

                });

                 var login = feerlaroc.login=function(username,pass){
                                UserModel.clear();
                                feerlaroc.AOUTHATTRIBUTES = {};
                                login.prototype.set("","","",username,pass);
                                feerlaroc.AOUTHATTRIBUTES = _.clone(login.prototype.attr());
                                return login.prototype.post();
                        };
                        
                        _.extend(login.prototype, {
                        attr: function(){
                                return UserModel.attributes;
                        },
                        set: function(attr1,attr2,attr3,attr4,attr5){
                                UserModel.set({
                                        name: attr1,
                                        surname: attr2,
                                        mobile_number: attr3,
                                        username: attr4,
                                        password: attr5
                                });
		        },
		        
                        get: function() {},
                        
                        post: function() {
                                UserModel.urlRoot = Uri[1]; 
                                 if(Uri.length > 1){ 
                                        var decodedParseURI;
                                        var xhr = UserModel.save().done(function(data){
                                                decodedParseURI = decodeURIComponent(data.feer_attributes.logon.logon_at);

                                                if (data.codetext != "User is Invalid"){
                                                        //activeid.push(data._activeid.$oid);
                                                        Uri.push(decodedParseURI);
                                                        Uri.push(data.feer_attributes.logon.uri);
                                                        parse_get();
                                                }else{
                                                        alert(data.codetext);        
                                                        feerlaroc.AOUTH_STATE = Aouth_status[0];          
                                                        feerlaroc.SERVER_STATE;          
                                                }           
                                        });
	                                if(xhr.status = 200){
	                                        feerlaroc.SERVER_STATE = server_status[0];
	                                        feerlaroc.AOUTH_STATE = Aouth_status[0];
		                                return feerlaroc.AOUTH_STATE;
	                                }else{
	                                        feerlaroc.SERVER_STATE = server_status[1];
	                                        feerlaroc.AOUTH_STATE = Aouth_status[1];
					        return feerlaroc.AOUTH_STATE;	                                
	                                }
                                  }else{
                                          feerlaroc.AOUTH_STATE = Aouth_status[1];
                                          return  feerlaroc.SERVER_STATE; 
                                  }
                           },
                           put: function() {},
                           
                           delete: function() {}   
                });

                 var signup = feerlaroc.signup = function(name,sname,cell,username,pass){
                        
                                feerlaroc.AOUTHATTRIBUTES = {};
                                signup.prototype.set(name,sname,cell,username,pass);
                                feerlaroc.AOUTHATTRIBUTES = _.clone(signup.prototype.attr());
                                return signup.prototype.post();
                        };
                        
                        _.extend(signup.prototype, {
                                   
                         attr: function(){
                                return UserModel.attributes;
                        },  
                                             
                        set: function(attr1,attr2,attr3,attr4,attr5){
                                UserModel.set({
                                        name: attr1,
                                        surname: attr2,
                                        mobile_number: attr3,
                                        username: attr4,
                                        password: attr5
                                });
		        },
		        
		        get: function() {},
		        
		        post: function(){
		                UserModel.urlRoot = Uri[2];
		                 if(Uri.length > 1){
		                         var xhr = UserModel.save().done(function(data){
                                               Uri.push(data.feer_attributes.signup.signup_at); //4---signup_at(parse)
                                               Uri.push(data.feer_attributes.signup.uri); //5---ask for trade(after succeessful login)) 
                                               parse_post();
                                        });
	                                if(xhr.status = 200){
	                                        feerlaroc.SERVER_STATE = server_status[0];
	                                         feerlaroc.AOUTH_STATE = Aouth_status[2];
                                                return feerlaroc.AOUTH_STATE;
	                                }else{
	                                        feerlaroc.SERVER_STATE = server_status[1];
	                                        feerlaroc.AOUTH_STATE = Aouth_status[3];
		                                return feerlaroc.AOUTH_STATE;	                                
	                                }
                                 }else{
                                        feerlaroc.AOUTH_STATE = Aouth_status[3];
                                        return feerlaroc.SERVER_STATE;
                                 }
		        },
		        
		         put: function() {},
                           
                          delete: function() {}  

                });

                var profile = feerlaroc.profile.update = function(attr1,attr2,attr3,attr4,attr5){
                                  UserModel.clear(); 
                                  UserModel.attributes = {
                                        name: attr1,
                                        surname: attr2,
                                        mobile_number: attr3,
                                        username: attr4,
                                        password: attr5
                                        };
                                return profile.prototype.update();
                        };
                        _.extend(profile.prototype,{
                        update: function(){
                                return parse_update();
                        }
                });
                var profile = feerlaroc.profile.retrieve = function(){
                                UserModel.clear();
                                return profile.prototype.retrieve();
                };
                  _.extend(profile.prototype,{
                         retrieve: function(){  
                                return parse_retrieve();
                        }
                });               
                var trade = feerlaroc.trade = function( number, amount) {
                                TradeModel.clear();
                                trade.prototype.set(number, amount);
                                return trade.prototype.post(number, amount);
                        };
                        
                        _.extend(trade.prototype, {
                        attr: function(){
                                return TradeModel.attributes;
                        }, 
                        
                        set: function(attr1,attr2){
                                TradeModel.set({
                                        recipient: attr1,
                                        amount: attr2,
                                        location: feerlaroc.getCurrentPossion()
                                });
		        },
		        
		        get: function() {},
		        
		        post: function(attr1,attr2){
		                        var agree = confirm("You want to sell to " + attr1 + " " + "R" + attr2 + " " + "airtime" + "?");
		                        if (agree) {
		                                         if(Uri.length > 1){
		                                                TradeModel.urlRoot = Uri[6];
			                                        var xhr = TradeModel.save().done(function(data) {
			                                                   feerlaroc.SERVER_STATE = server_status[0];
				                                            switch (data.code) {
					                                        case 200:
						                                         resp.push(data.codetext);
						                                        break;
					                                        case 300:
						                                        resp.push(data.description);
						                                        break;
					                                        default:
						                                        resp.push(data.description);
					                                     }
				                                       TradeModel.clear();

			                                        }).error(function(data) {
					                                        resp.push(xhr.statusText);
			                                        });
			                                        TradeModel.clear();
			                                        return resp;
			                                   }else{
			                                        return feerlaroc.SERVER_STATE;
			                                   }
			                                
		                                } else {
			                                return "transaction cancelled";
			                                TradeModel.clear();
		                                }
		            },
		            put: function() {},
                           
                          delete: function() {}
		            
		      });
		      var deposit = feerlaroc.deposit = function(attr1,attr2){
                                TradeModel.clear();
                                return deposit.prototype.post(attr1, attr2);		      
		      }; 
		      _.extend(deposit.prototype, {
		                post: function(attr1,attr2){
		                        TradeModel.urlRoot = Uri[5];
                                        TradeModel.set({
                                                amount: attr1,
                                                pin: attr2,
                                                location: feerlaroc.getCurrentPossion()
                                        });
		                        var xhr = TradeModel.save().done(function(data) {
		                                alert(data.description);
		                        });
		                        if(xhr.status = 200){
	                                        feerlaroc.SERVER_STATE = server_status[0];
	                                         feerlaroc.AOUTH_STATE = Aouth_status[8];
                                                return feerlaroc.AOUTH_STATE;
	                                }else{
	                                        feerlaroc.SERVER_STATE = server_status[1];
	                                        feerlaroc.AOUTH_STATE = Aouth_status[9];
		                                return feerlaroc.AOUTH_STATE;	                                
	                                }
		                }
		      });
		      var merchant = feerlaroc.merchant = function(name){
		                UserModel.clear();
		                return merchant.prototype.post(name);
		       };
		       _.extend(merchant.prototype, {
		                post:function(name){
		                       UserModel.urlRoot = Uri[5];
		                       UserModel.set({merchant_name:name});
		                       if(Uri.length > 1){
		                         var xhr = UserModel.save().done(function(data){
		                                Uri.push(data.feer_attributes.trade.deposit.rel); //Uri[6]
				                Uri.push(data.feer_attributes.trade.sale.rel);//Uri[7]
		                                 return merchant_status[0];
                                        });
	                                if(xhr.status = 200){
	                                        feerlaroc.SERVER_STATE = server_status[0];
	                                         feerlaroc.AOUTH_STATE = merchant_status[0];
                                                return feerlaroc.AOUTH_STATE;
	                                }else{
	                                        feerlaroc.SERVER_STATE = server_status[1];
	                                        feerlaroc.AOUTH_STATE = merchant_status[1];
		                                return feerlaroc.AOUTH_STATE;	                                
	                                }
                                 }else{
                                        feerlaroc.AOUTH_STATE = merchant_status[1];
                                        return feerlaroc.SERVER_STATE;
                                 }
		                }
		       });
		      var geolocation = feerlaroc.getCurrentPossion = function(){
                                var packet = {latitude:"",longitude:"",altitude:"",accuracy:"",altitudeAccuracy:"",heading:"",speed:""};
                                localNavigator.geolocation.getCurrentPosition(onSuccess, onError);
                                function onSuccess(position) {

                                packet  = {
                                        latitude:  position.coords.latitude,  
                                        longitude: position.coords.longitude, 
                                        altitude:  position.coords.altitude,  
                                        accuracy: position.coords.accuracy,  
                                        altitudeAccuracy: position.coords.altitudeAccuracy, 
                                        heading:  position.coords.heading,  
                                        speed:     position.coords.speed 
                                        };   
                                };
                               function onError() {
                                        alert('location error!');
                               };
                               return packet;
                  };
                  var Contacts = feerlaroc.getContacts = function(){
                  
                              var phoneContacts = {name:[],number:[]};
                              var obj = new ContactFindOptions();
	                      obj.filter = "";
	                      obj.multiple = true;
	                      localNavigator.contacts.find([ "displayName", "name", "phoneNumbers" ], onSuccess,onError, obj);
	                      function onSuccess_success(contacts) {
	                                for (var i = 0; i < contacts.length ; i++) {
	                                         if (contacts[i].name && contacts[i].name.formatted) {
	            	                                phoneContacts = {
	            	                                       name: contacts[i].name.formatted,
	            	                                       number: contacts[i].phoneNumbers[0].value
	            	                                };
	                                         }
	                                }
	                      };
	                      function onError() {
                                        alert('contacts error!');
                              };
                             return phoneContacts;
                  };
                var parse_get = function() {
                 
                        parseUri = Uri[3]; 	        
		        var xhr = new XMLHttpRequest();		        
		        xhr.open("GET", parseUri, true);
		        xhr.setRequestHeader("X-Parse-Application-Id",feerlaroc.PARSE_APP_ID);
		        xhr.setRequestHeader("X-Parse-REST-API-Key",feerlaroc.PARSE_REST_KEY);
		        xhr.onreadystatechange = function(data) {
			        if (xhr.readyState == 4) {
				        var result = JSON.parse(xhr.responseText);
				        UserModel.clear();
				        UserModel.set({
                                                cellnumber: result.cellnumber,
                                                createdAt: result.createdAt,
                                                name: result.name,
                                                objectId: result.objectId,
                                                sessionToken: result.sessionToken,
                                                surname: result.surname,
                                                updatedAt: result.updatedAt,
                                                username: result.username     
				        });
				        
				        if (result.objectId) {
				                userID = result.objectId;
				                console.log(userID);
                                                feerlaroc.merchant_state = m_post(Uri[4]);

				        }
			        }
		        }
		        xhr.send();
	        };

		var parse_post = function() {

		        //parseUri = Uri[5] ; 	        
		        //Setup XMLHttpRequest, setup headers and content type
		        var xhr = new XMLHttpRequest();
		        xhr.open("POST",PARSE_SIGNUP_LINK, true);
		
		        xhr.setRequestHeader("X-Parse-Application-Id",feerlaroc.PARSE_APP_ID);
		        xhr.setRequestHeader("X-Parse-REST-API-Key",feerlaroc.PARSE_REST_KEY);
		        xhr.setRequestHeader("Content-Type", "application/json");
		
		        //If and only if the response is ready, userID  and sessionToken is stored in a global model for later user.
		        xhr.onreadystatechange = function() {
			        if (xhr.readyState == 4) {
				        var result = JSON.parse(xhr.responseText);
				        if (result.objectId) {
				                UserModel.clear();
		                                //Capture userID and sessionToken
		                                UserModel.set({
		                                        objectId: result.objectId,
		                                        sessionToken: result.sessionToken,
		                                        createdAt: result.createdAt,
		                                        updatedAt: result.createdAt
		                                });
                                                feerlaroc.MERCHANT_STATE = m_post(Uri[4]);      //check uri

		                        }
	                        }
		        }
		
		        //Data to be sent to server
		         var data = JSON.stringify({
			                name : UserModel.get("name"),
			                surname : UserModel.get("surname"),
			                mobile_number : UserModel.get("mobile_number"),
			                username : UserModel.get("username"),
			                password :UserModel.get("password"),
			                //merchant : UserModel.get("merchant"),
		                });
		        
		        //Send Data
		        xhr.send(data);
	        };

	        var parse_retrieve = function(){

	                //var userID = UserModel.attributes.objectId;

	                var link = "https://api.parse.com/1/users/"+userID;

	                var xhr = new XMLHttpRequest();		        
		        xhr.open("GET",link, true);
		        xhr.setRequestHeader("X-Parse-Application-Id",feerlaroc.PARSE_APP_ID);
		        xhr.setRequestHeader("X-Parse-REST-API-Key",feerlaroc.PARSE_REST_KEY);
		        xhr.onreadystatechange = function(data) {
			        if (xhr.readyState == 4) {
			                var result = JSON.parse(xhr.responseText);
			                if (result.objectId) {
                                                 feerlaroc.LOCALATTRIBUTES = _.clone(result);    
                                        }
                                }
		        }
		        xhr.send();
                        if(xhr.status = 200){
                                feerlaroc.AOUTH_STATE = Aouth_status[4];                    
                                return feerlaroc.AOUTH_STATE;
                        } else {
                                feerlaroc.AOUTH_STATE = Aouth_status[5];
                                return feerlaroc.AOUTH_STATE;
                        }
	        
	        };

	        var parse_update = function(){
	        
	                //var userID = UserModel.attributes.objectId;
	                        
	                var link = "https://api.parse.com/1/users/"+userID;
	                var xhr = new XMLHttpRequest();
	                
		        xhr.open("PUT",link, true);
		
		        xhr.setRequestHeader("X-Parse-Application-Id",feerlaroc.PARSE_APP_ID);
		        xhr.setRequestHeader("X-Parse-REST-API-Key",feerlaroc.PARSE_REST_KEY);
		        xhr.setRequestHeader("X-Parse-Session-Token",UserModel.attributes.sessionToken);
		
		        xhr.setRequestHeader("Content-Type", "application/json");
		        xhr.onreadystatechange = function() {
			        if (xhr.readyState == 4) {
				        var result = JSON.parse(xhr.responseText);
				        feerlaroc.MERCHANT_STATE = m_post(Uri[4]);      //check uri
                                }
                        //Data to be sent to server
		         var data = JSON.stringify({
			                name : UserModel.get("name"),
			                surname : UserModel.get("surname"),
			                mobile_number : UserModel.get("mobile_number"),
			                username : UserModel.get("username"),
			                password :UserModel.get("password"),
			                //merchant : UserModel.get("merchant"),
		                });
		         feerlaroc.LOCALATTRIBUTES = _.clone(data);
		        xhr.send(data);
                        if(xhr.status = 200){
                                feerlaroc.AOUTH_STATE = Aouth_status[6]; 
                                return feerlaroc.AOUTH_STATE;
                        }else{
                                feerlaroc.AOUTH_STATE = Aouth_status[7]; 
                                return feerlaroc.AOUTH_STATE;
                        }
		        }
	        
	        };
               var m_post = function(local_uri){
		       UserModel.urlRoot = local_uri;
		       UserModel.save().done(function(data){
				if(data.code == 210){
				        Uri.push(data.feer_attributes.trade.deposit.rel); //Uri[5]
				        Uri.push(data.feer_attributes.trade.sale.rel);//Uri[6]
				        for(var i=0, l = data.feer_attributes.trade.sale.services.length; i<l; i++){
		                                        TradeModel.urlSelect[i] = data.feer_attributes.trade.sale.services[i].uri;
		                        }
		                         return merchant_status[0];
		                }else{
		                         Uri.push(data.feer_attributes.merchant.uri);   //add as merchant Uri[5]
		                         return merchant_status[1];
		                }
		        });
               };
                
}).call(this);
	
