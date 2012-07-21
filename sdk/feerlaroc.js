(function(){
                var root = this;
                
                var PARSE_SIGNUP_LINK = "https://api.parse.com/1/users";
                
                var userID;
                var sessionToken;
                
                var previousfeerlaroc = root.feerlaroc;
                
                var Uri = ["http://192.168.1.3:8080/feerlarocserver/resources/start"];
                var activeid = [];
                var resp = [];
                var current = 0;
                var merchant_status = ["merchant_exist","no_merchant"];
                var Aouth_status = ["loggedin","not_loggedin","signedup","not_signedup","retrieved","not_retrieved","updated","not_updated"];
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
	                                        Uri.push(data.logon[current].uri);
	                                        Uri.push(data.signup[current].uri);
	                                        feerlaroc.SERVER_STATE = server_status[0];
	                                });
	                                return feerlaroc.SERVER_STATE;
		        },
		        
		        post: function() {},
		        
		        put: function() {},
		        
		        delete: function() {}                     

                });

                 var login = feerlaroc.login=function(name,sname,cell,username,pass){
                                UserModel.clear();

                                login.prototype.set("","","",username,pass);
                                return login.prototype.post();
                        };
                        
                        _.extend(login.prototype, {
                        attr: function(){
                                return UserModel.attributes;
                        },
                        set: function(attr1,attr2,attr3,attr4,attr5){
                                UserModel.set({
                                        name: attr1,
                                        sname: attr2,
                                        cell: attr3,
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
                                                decodedParseURI = decodeURIComponent(data.logon[current].logon_at);

                                                if (data.codetext != "User is Invalid"){
                                                        activeid.push(data._activeid.$oid);
                                                        Uri.push(decodedParseURI);
                                                        Uri.push(data.logon[current].uri);
                                                        feerlaroc.SERVER_STATE = server_status[0];
                                                        return parse_get();
                                                }else{
                                                        alert(data.codetext);        
                                                        feerlaroc.SERVER_STATE = server_status[0]; 
                                                        feerlaroc.AOUTH_STATE = Aouth_status[0];          
                                                        return  feerlaroc.SERVER_STATE;          
                                                }           
                                        });
                                  }else{
                                          feerlaroc.AOUTH_STATE = Aouth_status[1];
                                          return  feerlaroc.SERVER_STATE; 
                                  }
                           },
                           put: function() {},
                           
                           delete: function() {}   
                });

                 var signup = feerlaroc.signup = function(name,sname,cell,username,pass){
                                UserModel.clear();

                                signup.prototype.set(name,sname,cell,username,pass);
                                return signup.prototype.post();
                        };
                        
                        _.extend(signup.prototype, {
                                   
                         attr: function(){
                                return UserModel.attributes;
                        },  
                                             
                        set: function(attr1,attr2,attr3,attr4,attr5){
                                UserModel.set({
                                        name: attr1,
                                        sname: attr2,
                                        cell: attr3,
                                        username: attr4,
                                        password: attr5
                                });
		        },
		        
		        get: function() {},
		        
		        post: function(){
		                UserModel.urlRoot = Uri[2];
		                 if(Uri.length > 1){
		                         var xhr = UserModel.save().done(function(data){
		                                feerlaroc.SERVER_STATE = server_status[0];
                                               Uri.push(data.signup[current].signup_at); //5---signup_at(parse)
                                               Uri.push(data.signup[current].uri); //6---ask for trade(after succeessful login)) 
                                               return parse_post();
                                        });
                                 }else{
                                        feerlaroc.AOUTH_STATE = Aouth_status[3];
                                        return feerlaroc.SERVER_STATE;
                                 }
		        },
		        
		         put: function() {},
                           
                          delete: function() {}  

                });

                var profile = feerlaroc.profile.update = function(name,sname,cell,username,pass){
                                UserModel.clear();
                                if(Uri.length > 1){   
                                                profile.prototype.set(name,sname,cell,username,pass);
                                                return profile.prototype.update();
                                  }else{
                                        feerlaroc.AOUTH_STATE = Aouth_status[7];
                                        return feerlaroc.SERVER_STATE;
                                 }
                        };
                        _.extend(profile.prototype,{
                        set: function(attr1,attr2,attr3,attr4,attr5){
                                UserModel.set({
                                        name: attr1,
                                        sname: attr2,
                                        cell: attr3,
                                        username: attr4,
                                        password: attr5
                                });
		        },
                        update: function(){
                                return parse_update();
                        }
                });
                var profile = feerlaroc.profile.retrieve = function(){
                                UserModel.clear();
                                if(Uri.length > 1){
                                          return profile.prototype.retrieve();
                                  }else{
                                        feerlaroc.AOUTH_STATE = Aouth_status[5];
                                        return feerlaroc.SERVER_STATE;
                                 }
                };
                  _.extend(profile.prototype,{
                         retrieve: function(){
                                parse_retrieve();
                                return feerlaroc.LOCALATTRIBUTES;
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
                                        number: attr1,
                                        amount: attr2
                                });
		        },
		        
		        get: function() {},
		        
		        post: function(attr1,attr2){
		                        var agree = confirm("You want to sell to " + attr1 + " " + "R" + attr2 + " " + "airtime" + "?");
		                        if (agree) {
		                                         if(Uri.length > 1){
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
		      
		      var recharge = feerlaroc.recharge = function(){};
		      var geolocation = feerlaroc.getCurrentPossion = function(){
                                var packet = {Latitude:"",Longitude:"",Altitude:"",Accuracy:"",Altitude_Accuracy:"",Heading:"",Speed:""};
                                localNavigator.geolocation.getCurrentPosition(onSuccess, onError);
                                function onSuccess(position) {

                                packet  = {
                                        Latitude:  position.coords.latitude,  
                                        Longitude: position.coords.longitude, 
                                        Altitude:  position.coords.altitude,  
                                        Accuracy: position.coords.accuracy,  
                                        Altitude_Accuracy: position.coords.altitudeAccuracy, 
                                        Heading:  position.coords.heading,  
                                        Speed:     position.coords.speed 
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
		        xhr.setRequestHeader("X-Parse-Application-Id",PARSE_APP_ID);
		        xhr.setRequestHeader("X-Parse-REST-API-Key",PARSE_REST_KEY);
		        xhr.onreadystatechange = function(data) {
			        if (xhr.readyState == 4) {
				        var result = JSON.parse(xhr.responseText);
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
					        ObjId = result.objectId;
					        
					        alert("logged on with object id: " + result.objectId);
                                                feerlaroc.merchant_state = m_post(Uri[4]);
                                                feerlaroc.AOUTH_STATE = Aouth_status[0];
		                                return feerlaroc.AOUTH_STATE;
				        } else {
					        feerlaroc.AOUTH_STATE = Aouth_status[1];
					        return feerlaroc.AOUTH_STATE;
				        }
			        }else{
			                feerlaroc.AOUTH_STATE = Aouth_status[1];
			        }
		        }
		        xhr.send();
	        };

		var parse_post = function() {

		        parseUri = Uri[5] ; 	        
	                
		        //Setup XMLHttpRequest, setup headers and content type
		        var xhr = new XMLHttpRequest();
		        xhr.open("POST",parseUri, true);
		
		        xhr.setRequestHeader("X-Parse-Application-Id",PARSE_APP_ID);
		        xhr.setRequestHeader("X-Parse-REST-API-Key",PARSE_REST_KEY);
		        xhr.setRequestHeader("Content-Type", "application/json");
		
		        //If and only if the response is ready, userID  and sessionToken is stored in a global model for later user.
		        xhr.onreadystatechange = function() {
			        if (xhr.readyState == 4) {
				        var result = JSON.parse(xhr.responseText);
				        if (result.objectId) {
		                                //Capture userID and sessionToken
		                                UserModel.set({
		                                        objectId: result.objectId,
		                                        sessionToken: result.sessionToken,
		                                        createdAt: result.createdAt,
		                                        updatedAt: result.createdAt
		                                });
		                                
                                                feerlaroc.MERCHANT_STATE = m_post(Uri[6]);      //check uri
                                                feerlaroc.AOUTH_STATE = Aouth_status[2];
                                                return feerlaroc.AOUTH_STATE;
		                        } else {
		                                feerlaroc.AOUTH_STATE = Aouth_status[3];
		                                return feerlaroc.AOUTH_STATE;
		                        }
	                        }else{
	                                feerlaroc.AOUTH_STATE = Aouth_status[3];
	                        }
		        }
		
		        //Data to be sent to server
		         var data = JSON.stringify({
			                name : UserModel.get("name"),
			                surname : UserModel.get("surname"),
			                cellnumber : UserModel.get("cellnumber"),
			                username : UserModel.get("username"),
			                password :UserModel.get("password"),
			                merchant : UserModel.get("merchant"),
		                });
		        
		        //Send Data
		        xhr.send(data);
	        };

	        var parse_retrieve = function(){

	                var userID = UserModel.attributes.objectId;

	                var link = "https://api.parse.com/1/users/"+userID;

	                var xhr = new XMLHttpRequest();		        
		        xhr.open("GET",link, true);
		        xhr.setRequestHeader("X-Parse-Application-Id",PARSE_APP_ID);
		        xhr.setRequestHeader("X-Parse-REST-API-Key",PARSE_REST_KEY);
		        xhr.onreadystatechange = function(data) {
			        if (xhr.readyState == 4) {
			                var result = JSON.parse(xhr.responseText);
			                if (result.objectId) {
                                                 feerlaroc.LOCALATTRIBUTES = _.clone(result);    
                                                 feerlaroc.AOUTH_STATE = Aouth_status[4];                    
                                                return feerlaroc.AOUTH_STATE;
			                } else {
			                        feerlaroc.AOUTH_STATE = Aouth_status[5];
                                                return feerlaroc.AOUTH_STATE;
			                }
		                }else{
		                        feerlaroc.AOUTH_STATE = Aouth_status[5];
		                }
		        }
		        xhr.send();
	        
	        };

	        var parse_update = function(){
	        
	                var userID = UserModel.attributes.objectId;
	                        
	                var link = "https://api.parse.com/1/users/"+userID;
	                var xhr = new XMLHttpRequest();
	                
		        xhr.open("PUT",link, true);
		
		        xhr.setRequestHeader("X-Parse-Application-Id",PARSE_APP_ID);
		        xhr.setRequestHeader("X-Parse-REST-API-Key",PARSE_REST_KEY);
		        xhr.setRequestHeader("X-Parse-Session-Token",UserModel.attributes.sessionToken);
		
		        xhr.setRequestHeader("Content-Type", "application/json");
		        xhr.onreadystatechange = function() {
			        if (xhr.readyState == 4) {
				        var result = JSON.parse(xhr.responseText);
				        feerlaroc.MERCHANT_STATE = m_post(Uri[7]);      //check uri
				        feerlaroc.AOUTH_STATE = Aouth_status[6]; 
                                       return feerlaroc.AOUTH_STATE;
	                        }else{
	                                feerlaroc.AOUTH_STATE = Aouth_status[7]; 
	                               return feerlaroc.AOUTH_STATE;
	                        }
		        }
                        //Data to be sent to server
		         var data = JSON.stringify({
			                name : UserModel.get("name"),
			                surname : UserModel.get("surname"),
			                cellnumber : UserModel.get("cellnumber"),
			                username : UserModel.get("username"),
			                password :UserModel.get("password"),
			                merchant : UserModel.get("merchant"),
		                });
		         feerlaroc.LOCALATTRIBUTES = _.clone(data);
		        xhr.send(data);
	        
	        };
               var m_post = function(local_uri){
		       UserModel.urlRoot = local_uri;
		       UserModel.save().done(function(data){
				if(data.merchant[0].input_structure.merchant_name != " "){
		                        for(var i=0, l = data.trade[current].services.length; i<l; i++){
		                                TradeModel.urlSelect[i] = data.trade[current].services[i].uri;
		                         }
		                         return merchant_status[0];
		                }else{
		                         Uri.push(data.merchant[0].uri);   //add as merchant Uri[7]
		                         return merchant_status[1];
		                }
		        });
               };
                
}).call(this);
	
